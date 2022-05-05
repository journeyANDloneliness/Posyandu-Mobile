import React,  { useState, useEffect, useRef } from 'react'; 
//import { ImageBackground, StyleSheet,
 // Modal, View, TextInput, EditText } from 'react-native';
//import { Button , Text} from 'react-native-elements';
import { DataGrid } from '@material-ui/data-grid';
import Interact from "interactjs"
import { TextField, Button, Container, Box, Paper, Grid, FormControl, RadioGroup,
 FormControlLabel, Radio, FormLabel, Divider, MenuItem, Typography} from '@material-ui/core';
import { StyleSheet , css } from 'aphrodite';
import { save , getById} from '../HelperData';
import { useSelector, useDispatch } from 'react-redux'
import { setEditedData, setDataAnakTemplate } from '../store/PosyanduData'
import { TextObject, SimpleTextObject, TableObject, 
	LineObject, RectObject } from '../components/TemplateComponents'
import  Popipo, { AnyPoper}  from '../components/Popipo'
import { colorListRgb, colorListHex, colorWithName} from '../util/Color'
import dot from '../img/dot.png'

import {createPdf, getPdfTemplate, pdfToImage2, createPdf2} from '../task/PDFMaker'

import { Add, AddCircle, ListOutline, Settings, ArrowDownCircle, 
	Grid as GridIcon, DocumentAttach, Checkmark } from "react-ionicons"

import styles from '../styles/Style'

import {showMsg2, showBackdrop, closeBackdrop } from '../HelperUi'

import { MyHello } from '../components/Hello'
import SmoothScrollbar from '../components/SmoothScrollbar'
import ComponentProperties from '../components/ComponentProperties'
import ComponentLayer from '../components/ComponentLayer'

const tempEl = []

const resizeListener = (event, f, props)=>{
	/*var target = event.currentTarget
	var x = (parseFloat(target.getAttribute('data-x')) ||// 0)
		+getComputedStyle(target).getPropertyValue('transform').split(",")[4])
	var y = (parseFloat(target.getAttribute('data-y')) || //0)
		+getComputedStyle(target).getPropertyValue('transform').split(",")[5].replace(")","") )

	// update the element's style
	target.style.width = event.rect.width + 'px'
	target.style.height = event.rect.height + 'px'

	// translate when resizing from top or left edges
	var xi = x + event.deltaRect.left
	var yi = y + event.deltaRect.top

	target.style.transform = 'translate(' + xi + 'px,' + yi + 'px)'

	target.setAttribute('data-x', xi)
	target.setAttribute('data-y', yi)
  	console.log("resize..")
	f({x:x, y:y, width:event.rect.width , height: event.rect.height})
	//target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)

	onMove= true*/
	event.preventDefault()
	var target = event.target
	// keep the dragged position in the data-x/data-y attributes
	var x = (props.x || 0)
		//+getComputedStyle(target).getPropertyValue('transform').split(",")[4]) + event.dx
	var y = (props.y || 0)
		//+getComputedStyle(target).getPropertyValue('transform').split(",")[5].replace(")","") ) + event.dy

	// translate the element
	target.style.width = event.rect.width + 'px'
	target.style.height = event.rect.height + 'px'

	// translate when resizing from top or left edges
	var xi = x + event.deltaRect.left
	var yi = y + event.deltaRect.top

	target.style.transform = 'translate(' + xi + 'px,' + yi + 'px)'

	// update the posiion attributes
	
  	console.log("drag..")
	f({x:xi, y:yi , width:event.rect.width , height: event.rect.height})
}
const resizeListenerW = (event, f, props)=>{
	
	event.preventDefault()
	var target = event.target
	// keep the dragged position in the data-x/data-y attributes
	var x = (props.x || 0)
		//+getComputedStyle(target).getPropertyValue('transform').split(",")[4]) + event.dx
	var y = (props.y || 0)
		//+getComputedStyle(target).getPropertyValue('transform').split(",")[5].replace(")","") ) + event.dy

	// translate the element
	target.style.width = event.rect.width + 'px'

	// translate when resizing from top or left edges
	var xi = x + event.deltaRect.left

	target.style.transform = 'translate(' + xi + 'px,' + y + 'px)'
	
  	console.log("drag..")
	f({x:xi, y:y , width:event.rect.width})
}


const dragMoveListener = (event, f, props) => {
/*	var target = event.target
	// keep the dragged position in the data-x/data-y attributes
	var x = (parseFloat(target.getAttribute('data-x')) || //props.x)+event.dx// 30)+ event.dx
		+getComputedStyle(target).getPropertyValue('transform').split(",")[4]) + event.dx
	var y = (parseFloat(target.getAttribute('data-y')) || //props.y)+event.dy //30)+ event.dy
		+getComputedStyle(target).getPropertyValue('transform').split(",")[5].replace(")","") ) + event.dy

	// translate the element
	target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

	// update the posiion attributes
	target.setAttribute('data-x', x)
  	target.setAttribute('data-y', y)
  	console.log("drag..")*/
  	event.preventDefault()
	var target = event.target
	// keep the dragged position in the data-x/data-y attributes
	var x = (props.x || 0)+ event.dx
		//+getComputedStyle(target).getPropertyValue('transform').split(",")[4]) + event.dx
	var y = (props.y || 0)+ event.dy
		//+getComputedStyle(target).getPropertyValue('transform').split(",")[5].replace(")","") ) + event.dy

	// translate the element
	target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

	// update the posiion attributes
	
  	console.log("drag..")
	f({x:x, y:y })

}

export default (props) =>{
	const dispatch = useDispatch()
	const user = useSelector(state=> state.posyanduData.editedData)
	const [dataAnak, setDataAnak] = useState(user.dt.dataAnak || {})
	const [anak, setAnak] = useState(null)

	const [dataTable, setDataTable] = useState([
			{name:"data anak", info:[], data: Object.entries(dataAnak).map(
				(v)=>Object.entries(v[1]).map((vv)=>vv[1]))}
		])

	const autoRunTemplate = useSelector(state=> state.posyanduData.dataAnakTemplate)
	const [autoPrint, setAutoPrint] = useState(false)
	const templateList = useSelector(state=> state.posyanduData.editedData.templates)

	const [onStart, setOnStart] = useState(true)
	const [fieldList, setFieldList] = useState(["a","b",'c'])
	const [classElList, setClassElList] = useState([])
	const [pop1Active, setPop1Active] = useState(false)
	const [pop2Active, setPop2Active] = useState(false)
	const [pop3Active , setPop3Active] = useState(false)
	const [pop4Active , setPop4Active] = useState(false)
	const [pop5Active , setPop5Active] = useState(false)

	const [objList, setObjList] = useState([])
	const objListRef = useRef(objList)
	const [sizeProps, setSizeProps] = useState({x: 0, y: 0, width: 0, height: 0})
	const [onObjCreated, SetOnObjCreated] = useState(false)
	const [onSizePropsUpdated, setOnSizePropsUpdated] = useState(false)

	const [currentObj, setCurrentObj] = useState(-1)
	const [currentObjChanged, setCurrentObjChanged] = useState(false)
	const currentObjRef = useRef()
	const [tempObj, setTempObj] = useState(null)
	const [colorTest, setColorTest] = useState("red")

	const [onInteract, setOnInteract] = useState(false)
	const [onMove, setOnMove] = useState(false)
	const onMoveRef = useRef()

	const [meta, setMeta] = useState({width:800, height:1200, bgColor: "#FFF"})
	const [paperList, setPaperList] = useState([
		{name:"A3", size:{w:1754,h:2480}},
		{name:"A4", size:{w:1240,h:1754}},
		{name:"A5", size:{w:874,h:1240}}])
	const [colorList, setColorList] = useState(colorWithName())

	const [funList, setFunList] = useState([
		{text:"Teks", fun: (o)=>addObject("text",o)},
		{text:"Table", fun: (o)=>addObject("table",o)},
		{text:"Line", fun: (o)=>addObject("line",o)},
		{text:"Rect", fun: (o)=>addObject("rect",o)},
		])
	const [fun2List, setFun2List] = useState([])
	const [fun3List, setFun3List] = useState([
		{text:"Biasa", fun:()=>setBg(0)}])

	const [bg, setBg] = useState(-1)

	const [templName, setTemplName] = useState(null)
	const [onSave, setOnSave] = useState({go:false})
	useEffect(()=>{
		return ()=>dispatch(setDataAnakTemplate(null))
	},[])
	useEffect(()=>{
		let t= JSON.parse(JSON.stringify(templateList || []))
		t.splice(0,0,{name: "Template Baru", meta:{
		    "width": 800,
		    "height": 1200,
		    "bgColor": "#FFF"
			}, data:[]})
		setFun2List(
			(t || []).map((v)=> {return {text:v.name, fun:(o)=>{
		 	initObject(o,v)
		 	setTemplName(v.name)
		 	setMeta(v.meta || meta)
		 	console.log("name template",v.name) 
		}}}))
	},[templateList])
	useEffect(()=>{
		
		pdfToImage2(bg)
	},[bg])
	useEffect(()=>{
		if(autoRunTemplate){
			initObject(objList, JSON.parse(JSON.stringify(autoRunTemplate)))
		 	setTemplName(autoRunTemplate.name)
		 	setMeta(autoRunTemplate.meta)
		 	setCurrentObj(-1)
			setCurrentObjChanged(false)

			setAutoPrint(true)
		}
	},[autoRunTemplate])
	useEffect(()=>{
		if(autoPrint)
			showMsg2({textBtn:['Edit', 'Langsung Jadikan PDF'], show:true,
				text: "edit data atau langsung jadikan pdf?",
				showCancel:true, callBack:(c)=>{
					if(!c)
					_createPdf()
				}})
	},[autoPrint])
	useEffect(()=>{
		console.log("data adnak",dataAnak)

		if(!anak) return
		setFunList([...funList, ...Object.entries(anak).map((v)=>
		{	console.log("anak",v)
			return {text:v[0], fun:(o)=>addObject("field_text",o,{text: v[1]})}
		})])
	},[anak])

	const initObject =(o,vo)=>{
		let tempObjList = []
		setObjList([])

		vo.data.forEach((v,i)=>{
			addObject(v.type, {o:tempObjList},v, true)
			
		})

	}

	const addObject=(type, o, feature, n)=>{
		let l = o.o.length
		let obj = makeObject(type,o, l, feature, n)
		setCurrentObj(l)
		console.log(o.o) 
		console.log(feature) 
		if(n){
			o.o.push(obj)
			setObjList(o.o)
		}
		else
			setObjList([...o.o, obj])

		SetOnObjCreated(true)
	}
	useEffect(()=>{
		console.log("obj list...")
	},[objList])

	const makeObject=(type, o, l, feature)=>{
		var obj = {}
		//console.log("make object...")
		
		var objProps = feature || {x: 50, y:50, width: 200, height: 10, color: "1,1,1"}
		switch(type){
			case "text":
				objProps = feature || {...objProps, ...{type:"text", text: "", width: 194}, fontSize:18}
				//console.log("make object...")
/*				var objEl = <TextObject onChange={(ev)=>objProps.text = ev.target.value}
				onMouseUp={()=> setOnSizePropsUpdated(true)}
				 onMouseDown={ ()=>{console.log(l);setCurrentObj(l)}} 
				key={(Math.random() + 1).toString(36).substring(7)} className={"e"} feature={ objProps} />*/
				//onMouseUp={()=>{if(!o.fromRender)setOnInteract(false);setOnSizePropsUpdated(true)}}
				//onMouseDown={ ()=>{if(o.fromRender)setOnInteract(true);console.log(l);setCurrentObj(l)}} 
				var objEl = <SimpleTextObject testme={ o.c} onChange={(ev)=>objProps.text = ev.target.value}
				onMouseDown={ ()=>{console.log(l);setCurrentObj(l);setOnMove(true)}} 
				onMouseUp={()=>{setOnMove(false)}}
				data-x={objProps.x} data-y={objProps.y}
				style={{transform:'translate(' + objProps.x + 'px, ' + objProps.y + 'px)'}}
				key={l} className={"mov"} 
				feature={ objProps} />
				obj.props = objProps
				obj.el = objEl
				break;
			case "table":
				objProps = feature || {...objProps, ...{type: "table", width: 200, height: 200},
				 tableInfo: [],listItems:[]}

				//onMouseUp={()=> setOnSizePropsUpdated(true)}
				var objEl = <TableObject 
				onMouseDown={ ()=>{console.log(l);setCurrentObj(l);setOnMove(true)}} 
				onMouseUp={()=>{setOnMove(false)}}
				data-x={objProps.x} data-y={objProps.y}
				style={{transform:'translate(' + objProps.x + 'px, ' + objProps.y + 'px)'}}
				key={l} className={"rez mov"} feature={ objProps}/>
				obj.props = objProps
				obj.el = objEl
				break;
			case "line":
				objProps = feature || {...objProps, ...{type: "line", height: 2}, lineStyle: "solid"}

				//onMouseUp={()=> setOnSizePropsUpdated(true)}
				var objEl = <LineObject 
				onMouseDown={ ()=>{console.log(l);setCurrentObj(l);setOnMove(true)}} 
				onMouseUp={()=>{setOnMove(false)}}
				data-x={objProps.x} data-y={objProps.y}
				style={{transform:'translate(' + objProps.x + 'px, ' + objProps.y + 'px)'}}
				key={l} className={"rezW mov "} feature={ objProps}/>
				obj.props = objProps
				obj.el = objEl
				break;
			case "rect":
				objProps = feature || {...objProps, ...{type: "rect", height: 50}, borderRadius: 0, borderColor: "1,1,1"}

				//onMouseUp={()=> setOnSizePropsUpdated(true)}
				var objEl = <RectObject 
				onMouseDown={ ()=>{console.log(l);setCurrentObj(l);setOnMove(true)}} 
				onMouseUp={()=>{setOnMove(false);console.log("stop.. on move")}}
				data-x={objProps.x} data-y={objProps.y}
				style={{transform:'translate(' + objProps.x + 'px, ' + objProps.y + 'px)'}}
				key={l} className={"rez mov "} feature={ objProps}/>
				obj.props = objProps
				obj.el = objEl
				break;
			case "field_text":
/*				objProps = {...objProps, ...{width: 194, height: objProps.fontSize + 10, type: "field_text"}}

				var objEl = <SimpleTextObject 
				 testme={ o.c} disabled onChange={(ev)=>objProps.text = ev.target.value}
				onMouseUp={()=> setOnSizePropsUpdated(true)}
				 onMouseDown={ ()=>{console.log(l);setCurrentObj(l)}} 
				key={(Math.random() + 1).toString(36).substring(7)} className={o.fromRender ? "":"mov"} 
				feature={ (objList[currentObj] || {}).props|| objProps} />
				obj.props = objProps
				obj.el = objEl*/
				break;
		}	
		return obj
	}

	const setObjProp = (o) =>{
		let a = [...objList]
		a[currentObj].props
	}
	useEffect(()=>{
		//console.log(objList)

		if(!tempObj)return
		setObjList([...objList, tempObj])
		console.log("tempporary XD")
	},[ tempObj])

	useEffect(()=>{
		//console.log(objList)

		initDrag()
		SetOnObjCreated(false)
		setColorTest(colorList[Math.floor(Math.random()*colorList.length)].hex)
		
	},[onObjCreated])

	//useEffect(()=>console.log("obj list update?"),[objList])
	useEffect(()=>setA(a),[colorTest])
	useEffect(()=>{
/*		if(currentObj < 0)return
		let a = [...objList]
		let i = a[currentObj].props
		Object.assign(i, sizeProps)
		a[currentObj].props = i
		console.log(a, currentObj,sizeProps)
		setObjList(a)
		onMove= false
		setOnSizePropsUpdated(false)*/
		//setCurrentObj(-1)
	},[onSizePropsUpdated])

	const setObjectSize = (o)=>{	
		if(currentObjRef.current < 0)return

		let i = {...objListRef.current[currentObjRef.current].props}
		Object.assign(i, o)
		objListRef.current[currentObjRef.current].props = i
		console.log(objListRef.current, currentObjRef.current,o)
		//setObjList(a)
		//setSizeProps(o)
	}

	const initDrag = () =>{
		

		
			Interact(".rez").resizable({
				// resize from all edges and corners
				edges: { left: true, right: true, bottom: true, top: true },

				listeners: {
				  move: (ev)=>{
				  	//if(ev.duration > 100)
					resizeListener(ev, setObjectSize, objListRef.current[currentObjRef.current].props)
					 },
					end:()=>setOnMove(false)
				},
				modifiers: [
				  // keep the edges inside the parent
					Interact.modifiers.restrictEdges({
						outer: 'parent'
					}),
					Interact.modifiers.snap({
						targets: [
							Interact.snappers.grid({ x: 10, y: 10 })
						],
						range: Infinity,
						relativePoints: [ { x: 0, y: 0 } ]
				  }),
				  // minimum size
				  Interact.modifiers.restrictSize({
					min: { width: 10, height: 10 }
				  })
				],
			  })
			Interact(".rezW").resizable({
				// resize from all edges and corners
				edges: { left: true, right: true, bottom: false, top: false },

				listeners: {
				  move: (ev)=>{
				  	//if(ev.duration > 100)
					resizeListenerW(ev, setObjectSize, objListRef.current[currentObjRef.current].props)
					 },
					end:()=>setOnMove(false)
				},
				modifiers: [
				  // keep the edges inside the parent
					Interact.modifiers.restrictEdges({
						outer: 'parent'
					}),
					Interact.modifiers.snap({
						targets: [
							Interact.snappers.grid({ x: 10, y: 10 })
						],
						range: Infinity,
						relativePoints: [ { x: 0, y: 0 } ]
				  }),
				  // minimum size
				  Interact.modifiers.restrictSize({
					min: { width: 10, height: 10 }
				  })
				],
			  })
			Interact(".mov")
			.draggable({
			listeners: { move: (ev)=>{
				//if(ev.duration > 100)
				dragMoveListener(ev, setObjectSize, objListRef.current[currentObjRef.current].props)
				console.log("currentObj", currentObjRef.current, "time", ev,"dur",ev.duration)
				 },
					end:()=>{
						setObjList([...objListRef.current])
						setCurrentObjChanged(true)
						setOnMove(false)
					}
			},
			inertia: true,
			modifiers: [
				Interact.modifiers.restrictRect({
					restriction: 'parent',
					endOnly: true
				}),
				Interact.modifiers.snap({
					targets: [
						Interact.snappers.grid({ x: 10, y: 10 })
					],
					range: Infinity,
					relativePoints: [ { x: 0, y: 0 } ]
				  }),
			]})

	}

	const _save =()=>{
		showMsg2({show:true, showCancel: true, text: "Masukan Nama Template",showInput1: true, input1: templName,
			callBack:(continu, input)=>{
				if(continu){
					setOnSave({go:true, name:input})
					
					
					console.log("nama template m", input)
				}
			}})

	}

	useEffect(()=>{
		if(!onSave.go)return
		setTemplName(onSave.name)
		

	},[onSave])
	useEffect(()=>{
		if(!onSave.go)return
		let tprops = objList.map((v)=>{
			return v.props
		})

		let o = {name:templName, data: tprops, meta: meta}
		let ttemp = []
		if(templateList){
			ttemp = [...templateList]
		}
		let tuser = {...user}
		let found=false;
		ttemp = ttemp.map((v)=>{
			let u = {...v}
			if(u.name == templName){
				u.data = tprops
				found =true
			}
			return u
		})
		if(!found || ttemp.length == 0) ttemp.push(o)
		tuser.templates = ttemp
		console.log("ttemp",o)
		console.log("trops",tprops)
		save(tuser)
		dispatch(setEditedData(tuser))

		setFun2List(
			ttemp.map((v)=> {return {text:v.name, fun:(o)=>{
		 	initObject(o,v)
		 	setTemplName(v.name)
		 	console.log("name template",v.name) 
		 	}}}))
		setOnSave({go:false})
	},[templName])

	useEffect(()=>{		
		setCurrentObjChanged(false)
	},[currentObjChanged])
	useEffect(()=>{
		currentObjRef.current = currentObj
		setCurrentObjChanged(true)
		console.log("current obj changed")
	},[currentObj])

	useEffect(()=>{
		onMoveRef.current = onMove
	},[onMove])
	useEffect(()=>{
		objListRef.current = objList
	},[objList])

	const _createPdf = () =>{
		showMsg2({show: true, showCancel:true, showInput1:true, text:"nama file", callBack:(c,i)=>{
			if(!c)return
			createPdf2({...meta, name: i}, objList.map((v)=>v.props))
			props.goTo('back')
		}})
	}
	const [a, setA] = useState(<MyHello bg={ colorTest }/>)
	return(
		<Container className={css(styles.pad0, styleA.croot)}>
			<Container>
			{console.log("render update..", currentObj)
			//a
			}	
				<Button variant="contained" onClick={(ev)=> setPop1Active(pop1Active ?  null : ev.currentTarget)} color="primary" >
					<Add color="#FFF"/>
				</Button>
				<Button variant="contained" onClick={(ev)=> setPop3Active(pop3Active ?  null : ev.currentTarget)} color="primary" >
					<ListOutline color="#FFF"/>
				</Button>
				<Button variant="contained" onClick={(ev)=> setPop4Active(pop4Active ?  null : ev.currentTarget)} color="primary" >
					<Settings color="#FFF"/>
				</Button>
				<Button variant="contained" onClick={(ev)=> setPop5Active(pop5Active ?  null : ev.currentTarget)} color="primary" >
					<DocumentAttach color="#FFF"/>
				</Button>
				<Popipo  onClose={()=>setPop1Active(null)} anchor={pop1Active}  >
					{funList.map((v)=>
						<MenuItem key={v.text} onClick={()=>v.fun({o:objList, c:colorTest})}>
							{v.text}
			            </MenuItem>
						)}
				</Popipo>
				<Popipo oList={objList} onClose={()=>setPop3Active(null)} useList anchor={pop3Active} listItems={fun2List} />
				<Popipo oList={objList} onClose={()=>setPop5Active(null)} useList anchor={pop5Active} listItems={fun3List} />
				<Popipo onClose={()=>setPop4Active(null)} anchor={pop4Active} >
					<Container className={css(styles.flexColumn)}>
					<TextField  variant="outlined" 
						size="small" label="Anak" 
						onChange={(ev)=> setAnak(ev.target.value)} select>
						{	
							Object.entries(dataAnak).map((v)=>
								<MenuItem key={v[0]} value={v[1]}>
					              {v[1].nama}
					            </MenuItem>
					        )
					    }
					</TextField>
					<TextField  variant="outlined" 
						size="small" label="Width" value={meta.width} 
						onChange={(ev)=> setMeta({...meta, width:parseInt(ev.target.value.size.w) || 0,
							height:parseInt(ev.target.value.size.h) || 0 }) } select>
						{ paperList.map((v)=>
							<MenuItem key={v.name} value={v}>
				              	{v.name}
				            </MenuItem>) }
					</TextField>
					<TextField  variant="outlined" 
						size="small" label="Width" value={meta.width} 
						onChange={(ev)=> setMeta({...meta, width:parseInt(ev.target.value) || 0})}/>
					<TextField  variant="outlined" 
						size="small" label="Height" value={meta.height} 
						onChange={(ev)=> setMeta({...meta, height:parseInt(ev.target.value) || 0})} />
					<TextField  variant="outlined" 
						size="small" label="Warna Latar" value={meta.bgColor} 
						onChange={(ev)=> setMeta({...meta, bgColor:ev.target.value.hex})} select >
						{ colorList.map((v)=>
							<MenuItem key={v.hex} value={v}>
								<AddCircle color={v.hex}/>
				              	{v.nama}
				            </MenuItem>) }
					</TextField>
					</Container>
				</Popipo>
				<Button variant="contained" onClick={(ev)=> setPop2Active(pop2Active ?  null : ev.currentTarget)} color="primary" >
					<GridIcon color="#FFF"/>
				</Button>
				<Button variant="contained" id="showLayer" color="primary" >
					<GridIcon color="#FFF"/>
				</Button>
					<AnyPoper par="showLayer">
						<ComponentLayer setList={(v)=>setObjList(v)} list={objList} />
					</AnyPoper>
				
				<Button variant="contained" onClick={_save} color="primary" >
					<Checkmark color="#FFF"/>
				</Button>
				<Button variant="contained" onClick={()=>{
					//getPdfTemplate().then((res)=>{
						//console.log("pdf",res)
						_createPdf()
					//})
				}} color="primary" >
					<ArrowDownCircle color="#FFF"/>
				</Button>
				{pop2Active && currentObj >= 0 && !currentObjChanged ?
				<ComponentProperties feature={(objList[currentObj] || {}).props} 
				setFeature={v => objList[currentObj].props = v} /> :  null}
			</Container>
		
		<SmoothScrollbar preventChild overscroll callBack={()=>null} height="76vh">
		
		<Container className={ `dropzone ${css(styles.pad0, styleA.c)}`} 
			style={{width: meta.width || 1, height: meta.height || 1, backgroundColor: meta.bgColor}}>
			<div className={css(styles.pad0, styleA.c, styleA.dot)} 
			style={{width: meta.width || 1, height: meta.height || 1}}> </div>

			{/*!onMove && currentObj >= 0? <div className={css(styleA.basic)} style={{ width: objList[currentObj].props.width+20, 
					height: objList[currentObj].props.height+20,
					transform: `translate(${objList[currentObj].props.x-10}px,${objList[currentObj].props.y-10}px)`}} >
				
				<div className={css(styleA.corner, styleA.tl)}></div>
				<div className={css(styleA.corner, styleA.tr)}></div>
				<div className={css(styleA.corner, styleA.br)}></div>
				<div className={css(styleA.corner, styleA.bl)}></div>
			</div>: null*/}
			{//!onInteract ?
			 objList.map((v, i)=> 
			
			makeObject(v.props.type, {c: colorTest}, i, v.props).el)
			//:
			//objList.map((v, i)=>v.el)
			}

		</Container>
	
		</SmoothScrollbar>
	
		</Container>
		);
}
//<canvas id="pdfViewer" className={css(styles.pad0, styleA.c)} ></canvas>
const styleA = StyleSheet.create({
	croot:{
		height: "100%",
		width: "100%",
		overflow: "hidden",
	},
	c:{
		overflow: "hidden",
		border: "1px solid #888",
		position: "absolute",
		
	},
	dot:{
		background: `url(${dot})`
	},
	b:{
		//position :"absolute",
		touchAction: "none",
		userSelect: "none"
	},
	basic:{position:"absolute"},
	tl:{top:0, left:0},
	tr:{top:0, right:0},
	br:{bottom:0, right:0},
	bl:{bottom:0, left:0},
	corner:{
		width: 8,
		height: 8,
		position: "absolute",
		backgroundColor: "red"
	},
})