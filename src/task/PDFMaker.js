import { degress, PDFDocument, rgb, StandardFont } from 'pdf-lib'
//const pdfjs = require("pdfjs-dist")
//const worker = require("../libraries/pdf.worker.js")
import chroma from "chroma-js"

//const pdf = require('pdfjs')

import download from "downloadjs"

window.download = download

import resumePDF from "../assets/Resume.pdf"
import {showMsg2} from "../HelperUi"

//const { fromPath } = require("pdf2pic")

export async function createPdf(el){
	const pdfDoc =  await PDFDocument.create()
	const page = pdfDoc.addPage()
	page.drawText("tesssssssssst")



	const pdfBytes = await pdfDoc.save()
	console.log(pdfBytes)
	download(pdfBytes,"hello.pdf", "application/pdf")

}

export async function createPdf2(meta,data) {
	const pdfDoc =  await PDFDocument.create()
	const page = pdfDoc.addPage([meta.width, meta.height])
	page.moveTo(0,0)
	const { w, h} = page.getSize()

	data.forEach((v)=>{
		switch(v.type){
			case "text":
				console.log("text...")
				//page.moveTo(v.x, -v.y)
				page.drawText(String(v.text),{
					x: v.x + 2,
					y: meta.height-(v.y + parseInt(v.fontSize) + 2) ,
					color : rgb(...v.color.split(",").map(v=> parseFloat(v)/255)),
					//color: rgb(...chroma.rgb(v.color).map((v)=>255/v)),
					size: parseInt(v.fontSize)

				})
				//page.moveTo(0,0)
				console.log(v.x, v.y)
				break;
			case "line":
				console.log("line...")
				//page.moveTo(v.x, -v.y)
				page.drawLine({
					start : {x:v.x, y:meta.height-v.y},
					end : {x:v.x+ v.width, y:meta.height-v.y},
					color : rgb(...v.color.split(",").map(v=> parseFloat(v)/255)),
					//color: rgb(...chroma.rgb(v.color).map((v)=>255/v)),
					thickness: v.height 

				})
				//page.moveTo(0,0)
				console.log(v.x, v.y)
				break;
			case "rect":
				console.log("rect...")
				//page.moveTo(v.x, -v.y)
				page.drawRectangle({
					borderColor: rgb(...v.borderColor.split(",").map(v=> parseFloat(v)/255)),
					color: rgb(...v.color.split(",").map(v=> parseFloat(v)/255)),
					width: v.width,
					height:  -v.height,
					x: v.x,
					y: meta.height-v.y ,

				})
				//page.moveTo(0,0)
				console.log(v.x, v.y)
				break;
			case "table":
				let nr=0
				let nc=0
				let h = v.height/(v.listItems.length+1)
			
				v.tableInfo.forEach((vv,ii)=>{
					let w=((vv || {}).width * v.width)/100 || 1
					page.drawRectangle({
						borderColor: rgb(0,0,0),
						width: w,
						height: -h,
						x: v.x+nc,
						y: meta.height-(v.y + nr) ,

					})
					page.drawText((vv || {}).header.truncate(w/(parseInt((vv || {}).fontSizeH)/1.8 || 1),"..") || "",{
						x: v.x + 4 + nc,
						y: meta.height-(v.y + h + nr - ((h/2)-(parseInt(vv.fontSizeH) / 4))) ,
						color : rgb(...v.color.split(",").map(v=> parseFloat(v)/255)),
						//color: rgb(...chroma.rgb(v.color).map((v)=>255/v)),
						size:  parseInt((vv || {}).fontSizeH)  || 8

					})
					nc +=((vv || {}).width * v.width)/100 || 1
				})
				nr+=h
				nc = 0
				v.listItems.forEach((vv)=>{
					vv.forEach((vvv,iii)=>{
						let w=((v.tableInfo[iii] || {}).width * v.width)/100 || 1
						page.drawRectangle({
							borderColor: rgb(0,0,0),
							width: w,
							height: -h ,
							x: v.x+nc,
							y: meta.height-(v.y + nr) ,

						})
						page.drawText(String(vvv.truncate(w/(parseInt((v.tableInfo[iii] || {}).fontSize)/1.8 || 1),"..")),{
							x: v.x + 4 + nc,
							y: meta.height-(v.y + h + nr - ((h/2)-(parseInt((v.tableInfo[iii] || {}).fontSize)  / 4 || 1))) ,
							color : rgb(...v.color.split(",").map(v=> parseFloat(v)/255)),
							//color: rgb(...chroma.rgb(v.color).map((v)=>255/v)),
							size:  parseInt((v.tableInfo[iii] || {}).fontSize)  || 8

						})
						nc += w
					})
					nr+=h
					nc = 0
				})
		}	
	})

	//const pdfBytes = await  pdfDoc.saveAsBase64({dataUri: true})
	const pdfBytes1 = await  pdfDoc.saveAsBase64({dataUri: false})
	const pdfBytes2 = await  pdfDoc.save()
	console.log(pdfBytes2)
	const pdfBytes3 = new TextDecoder().decode(pdfBytes2)

/*	const doc = new pdf.Document({
				  padding: 10
				})
	doc.setTemplate(pdfBytes)
	doc.addPagesOf(pdfBytes)
	doc.addPageOf(1, pdfBytes)
	data.forEach((v)=>{
		switch(v.type){
			case "table":
				
				var table = doc.table({
				  widths: [1.5*pdf.cm, 1.5*pdf.cm, null, 2*pdf.cm, 2.5*pdf.cm],
				  borderHorizontalWidths: function(i) { return i < 2 ? 1 : 0.1 },
				  padding: 5})

				var row = table.row()
				v.listItems.forEach((v)=>{
					v.forEach((vv)=>row.cell(vv))
				})

				
				break
		}
		
	})
	await doc.end()*/
	//console.log(pdfBytes, pdfBytes1, pdfBytes2, pdfBytes3)
	console.log(pdfBytes1, pdfBytes2 , pdfBytes3)
	var blob = new Blob([pdfBytes2], {type: 'application/pdf'})
	download(blob, meta.name+".pdf") 
	saveData({name: meta.name, data:pdfBytes2})
}

export async function getPdfTemplate() {

	const pdfBytes = await fetch(resumePDF).then(res=> res.arrayBuffer())
	var bytes = new Uint8Array(pdfBytes)
	const pdfDoc = await PDFDocument.load(pdfBytes) 
	
	return await pdfDoc.saveAsBase64({dataUri: true})

}

export async function pdfToImage(canvas){
/*	if(!pdfjs.workerSrc && typeof document !== 'undefined'){

		pdfjs.GlobalWorkerOptions.workerSrc = new worker()

		//PDFJS.workerSrc = ( ()=>{
		//pdfjs.disableWorker = true
		console.log("blaaa")
		const pdf = await pdfjs.getDocument(resumePDF)

		pdf.promise.then((pdf)=>{
			const page = pdf.getPage(1)

			let viewport = page.getViewport()
			let context = canvas.getContext('2d')
			canvas.height = viewport.height
			canvas.width = viewport.width
			page.render({canvasContext: context, viewport:viewport})
		})
		//})()
	}*/

}

export async function pdfToImage2(meta){
/*	let img= fromPath(resumePDF, {
		density: 100,
		format: "png",
		width: meta.width,
		height: meta.height
	}).convert(1, true)
	console.log(img)
	return img*/
}

function saveData(data) {
	//var storageLoc="file:///D:/amat/project/android_app/phaser-3-webpack-cordova-master"
	var storageLoc=""
	switch(device.platform){
		case 'browser': 
			storageLoc =  "file:///D:/amat/project/android_app/"
		case 'android':
			storageLoc = "file:///storage/emulated/0/"
			break;
	}
	/*try{
	window.resolveLocalFileSystemURL(storageLoc, (fs)=>{
		fs.getDirectory('Download', {
			create: true,
			exlusive: false
		}, (dir)=>{
			showMsg2({show: true, text: "step1"})
			dir.getFile(data.name,{
				create: true,
				exlusive: false
			}, (fileE)=>{
				showMsg2({show: true, text: "step2"})
				fileE.createWriter((writer)=>{
					writer.onwriteend =()=>{
						console.log("file saved")
						showMsg2({show: true, text: "file saved"})
					}
					writer.seek(0)
					writer.write(data.data)
				},failSaveData)
			},failSaveData)
		},failSaveData)

	},failSaveData)
	}catch(e){
		failSaveData(e)
	}*/
	try{
	console.log("device",device)
	var type = window.PERSISTENT
	switch(device.platform){
		case 'browser': 
			type =  "file:///D:/amat/project/android_app/"
		case 'android':
			type = window.TEMPORARY
			break;
	}
	var size= 20*1024*1024
	window.requestFileSystem(type,size,
		(fs)=>{
			fs.root.getFile(data.name+".pdf", 
				{create: true,
				exlusive: false},
				(fileE)=>{
					showMsg2({show: true, text: "step2"})
					fileE.createWriter((writer)=>{
						writer.onwriteend =()=>{
							console.log("file saved")
							showMsg2({show: true, text: "file saved"})
						}
						writer.seek(0)
						var blob = new Blob([data.data], {type: 'application/pdf'})
						writer.write(blob)
				},failSaveData)
			}, failSaveData)

		},failSaveData)
	}catch(e){failSaveData(e)}
}
function failSaveData(a) {
	console.log("errora", a)
	showMsg2({show: true, text: a+"periksa pengaturan! perbolehkan applikasi acces directory"})
}

export const exportPDF = (Template1, columnActiveReal, paginRealRow, other, fun)=>{
	let template = JSON.parse(JSON.stringify(Template1)), w= 100/columnActiveReal.length
	//template.meta = {width: 1200, height: 800}
	let tbl = template.data.getOne((v)=>v.type === "table")
	let texts = template.data.filter(v=>v.type === 'text')
	other.forEach((v,i)=>{
		if(texts[i])
			texts[i].text = v
	})
	if(columnActiveReal.length > tbl.tableInfo.length){
		let n=columnActiveReal.length - tbl.tableInfo.length
		while(n > 0){
			n--
			let t={...tbl.tableInfo[0]}
			tbl.tableInfo.push(t)
		}
	}
	else
		tbl.tableInfo.splice(columnActiveReal.length-1, tbl.tableInfo.length - columnActiveReal.length)
	tbl.tableInfo.forEach((v,i)=>{
		v.header = columnActiveReal[i] || ""
		v.width = 100/columnActiveReal.length 
	}) 
	//let r = paginRealRow.objectArray()
	tbl.listItems = tbl.listItems.map((v,i)=>columnActiveReal.map((vv,ii)=>{
		if(!paginRealRow[i]) return ""
		return ((paginRealRow[i][1].field || {})[vv] ? 
			paginRealRow[i][1].field[vv] : paginRealRow[i][1][vv]) || ""
	}))
	fun(template)
	console.log(template)
	
}