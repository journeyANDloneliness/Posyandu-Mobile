import React, {useState, useEffect, Fragment}  from "react"
import PropTypes from 'prop-types';


import { TextField, Button, Container, Box, Popover} from '@material-ui/core';
import { StyleSheet , css } from 'aphrodite';
import { save , getById} from '../HelperData';
import { useSelector, useDispatch } from 'react-redux'
import { setEditedData } from '../store/PosyanduData'

import { withStyles } from '@material-ui/core/styles';

import styles from '../styles/Style'

import { useAutoSave, useReduxData } from '../components/Hook/Use1'
import { WithPagination } from '../components/Pagination'
import { GenericTableWithTableSetuper, WithHiderSetup } from '../components/Tabeler'
import { MakeExtendable, MakeEditor, EditorCONSTANT } from '../components/Editor'
import { WithSmoothScrollbar } from '../components/SmoothScrollbar'
import { AnyPoper } from '../components/Popipo'

import { KaderColumns, BidanColumns } from '../templates/TemplateSetup'
import {Add, Trash} from "react-ionicons"
import { IoniconButton, IoniconButtonBig, UpDown } from "../components/ComponentCollection"
import Accord from '../components/Accord'
import { StateClear } from '../components/StateClear'

import {showMsg2, showBackdrop, closeBackdrop } from '../HelperUi'

const TheTable = WithPagination({paginDataName:"rows"})(WithSmoothScrollbar({height:document.documentElement.clientHeight-280, overscroll:true})
		(WithHiderSetup()(GenericTableWithTableSetuper)))


export default (props)=>{
	const dispatch = useDispatch()
	const [user] = useReduxData(['user'])
	let profile = JSON.parse(JSON.stringify(user.profile || {table:{}}))
	const [kaderRows, setKaderRows] = useState(profile.table.kaderData || [])
	const [kaderAddColumns, setKaderAddColumns] = useState(profile.table.kaderAddColumns || [] )
	const [kaderColumns, setKaderColumns] = useState(KaderColumns )
	const [selectedKader, setSelectedKader] = useState(-1)

	const [bidanRows, setBidanRows] = useState(profile.table.bidanData || [])
	const [bidanAddColumns, setBidanAddColumns] = useState(profile.table.bidanAddColumns || [] )
	const [bidanColumns, setBidanColumns] = useState(BidanColumns)
	const [selectedBidan, setSelectedBidan] = useState(-1)



	const [onBeforeSave, setOnBeforeSave] = useState(false)

	const saver = useAutoSave(user,"profile",[{name:"kaderData", content:kaderRows},
	{name:"kaderAddColumns", content: kaderAddColumns},
	{name:"bidanData", content: bidanRows},
	{name:"bidanAddColumns", content: bidanAddColumns},
	],(v)=>dispatch(setEditedData(v))) 

	useEffect(()=>{
		let temp = [...kaderColumns]
		kaderAddColumns.forEach((v)=>temp.push({headerName:v}))
		setKaderColumns(temp)
	},[kaderAddColumns])
	useEffect(()=>{
		let temp = [...bidanColumns]
		bidanAddColumns.forEach((v)=>temp.push({headerName:v}))
		setBidanColumns(temp)
		console.log('bidanColumns add', temp)
		console.log('bidan row flat', bidanRows.flattenObject())
	},[bidanAddColumns])

	useEffect(()=>{
/*		profile = JSON.parse(JSON.stringify(user.profile || {}))
		setKaderRows(profile.table.kaderData|| [] )
		setKaderAddColumns(profile.table.kaderAddColumns|| [])

		setBidanRows(profile.table.bidanData|| [])
		setBidanAddColumns(profile.table.bidanAddColumns|| [])
		console.log(profile.table.kaderData)
		console.log(profile)
		console.log(user)*/
	},[user])

	useEffect(()=>{
		if(onBeforeSave)
			saver()
		setOnBeforeSave(false)
	},[kaderRows,
		kaderAddColumns,
		bidanRows,
		bidanAddColumns])



	const saveRows = (rows, data, set = ()=>null)=>{
		console.log("save rows...", data)
		let id = ( data.filter((v, i)=>{
			return v.label == "id"
		})[0] || {}).value
		let temp = [...rows], obj={
			id: id || window.randomKey(),
		}
		data.forEach((v)=>{
			obj[v.label] = v.value
		})
		if(id){
			let f = temp.findIndex(v=>v.id === id)
			temp.splice(f,1,obj)
		} 
		else temp.push(obj)
		set(temp)
		/*let clone = JSON.parse(JSON.stringify(user))
		clone.profile.table.kaderRows = 
		dispatch(setEditedData(clone))*/
		setOnBeforeSave(true)
	}

	const EditorKader = MakeExtendable()(MakeEditor({columns:[
				{label: "Nama", type: EditorCONSTANT.Type.Text },
				{label: "Alamat", type: EditorCONSTANT.Type.Text },
				{label: "No. Telp", type: EditorCONSTANT.Type.Text },
				{label: "Pekerjaan", type: EditorCONSTANT.Type.Text },
				]})())
	const EditorBidan = MakeExtendable()(MakeEditor({columns:[
				{label: "Nama", type: EditorCONSTANT.Type.Text },
				{label: "Alamat", type: EditorCONSTANT.Type.Text },
				{label: "No. Telp", type: EditorCONSTANT.Type.Text },
				]})())
	const executer = (ev, p)=>{
		switch(p.uname){
			case "editOneBidan":
				let el = document.getElementById('editor-bidan')
				el.click("something")
				setSelectedBidan(p.index)
				console.log("soe",el)
				break
			case "delOneBidan":
				let t= [...bidanRows]
				let r = t.filter(v=>v.id == p.id)[0]
				if(r) t.remove(r)
				setBidanRows(t)
				break;
			case "editOneKader":
				let el2 = document.getElementById('editor-kader')
				el2.click("something")
				setSelectedKader(p.index)
				console.log("soe",el2)
				break
			case "delOneKader":
				let t2= [...kaderRows]
				let r2 = t2.filter(v=>v.id == p.id)[0]
				if(r2) t2.remove(r2)
				setKaderRows(t2)
				break;

		}
		console.log(ev, p)
	}

	return <Container className={css(styles.pad0)}>
			<Accord showFirst={0} info={[{title: "Bidan", detail:"Bidan Data" }, {title: "Kader", detail:"Kader Data" }]}>

			<Fragment>
				<IoniconButtonBig id="editor-bidan" icon={Add} onClick={()=>setSelectedBidan(-1)}/>

				<AnyPoper par="editor-bidan">
					<EditorBidan 
					fieldValue={bidanRows[selectedBidan] || {}}
					additionalField={bidanAddColumns} allField={bidanColumns.map((v)=>v.headerName)} 
					additionalFieldData={bidanRows.field} 
					setAdditionalField={(data)=>setBidanAddColumns(data)}
					save={(data)=>saveRows(bidanRows, data, setBidanRows)}/>
				</AnyPoper>

				<TheTable limit={5} size={bidanRows.length} con={{}} rows={bidanRows.flattenObject()}  columns={bidanColumns} 
				head={{show:[1,1], executer: executer}}  
				body={{unames:["editOneBidan","delOneBidan","modify","setColumn","setRow",],executer: executer, show:[1,1]}}/>
			</Fragment>

			<Fragment>
				<IoniconButtonBig id="editor-kader" icon={Add}/>

				<AnyPoper par="editor-kader">
					<EditorKader 
					fieldValue={kaderRows[selectedKader] || {}}
					additionalField={kaderAddColumns} allField={KaderColumns.map((v)=>v.headerName)} 
					additionalFieldData={kaderRows.field} 
					setAdditionalField={(data)=>setKaderAddColumns(data)}
					save={(data)=>saveRows(kaderRows, data, setKaderRows)}/>
				</AnyPoper>

				<TheTable limit={5} size={kaderRows.length} con={{}} rows={kaderRows.flattenObject()}  columns={kaderColumns} 
				head={{show:[1,1], executer: executer}}  
				body={{unames:["editOneKader","delOneKader","modify","setColumn","setRow",],executer: executer, show:[1,1]}}/>
			</Fragment>
			</Accord>
		</Container>
}