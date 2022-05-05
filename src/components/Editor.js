import React,  { useState , useEffect, Fragment, createRef, forwardRef, Children} from 'react'; 
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import { TextField, Button, Container, Box, Paper, Grid, FormControl, RadioGroup,
 FormControlLabel, Radio, FormLabel, Divider, Popover, Typography, MenuItem, 
ListItemText, ListItem, List, IconButton, Table,  TableContainer, TableBody,
TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core';
import { StyleSheet , css } from 'aphrodite';
import { useSelector, useDispatch } from 'react-redux'
import { setEditedDataAnak, setEditedData, setPengukuranData, 
	setPengukuranDataAnak, setPengukuranDataID } from '../store/PosyanduData'
import Pagination from '../components/Pagination'
import StyledButton from '../components/StyledButton'
import {Trash, Pencil, ArrowDownOutline, 
	Add, Settings, ArrowUpOutline, CarretBackwardOutline, CarretforwardOutline} from "react-ionicons"

import {showMsg2, showBackdrop, closeBackdrop} from '../HelperUi'
import {save , getDataPengukuran} from '../HelperData'
import { useAutoSave } from '../components/Hook/Use1'

import styles from "../styles/Style"
import { IoniconButton, UpDown, TextFieldChoice, TextFieldEdit, TextFieldDate } from "../components/ComponentCollection"

export const EditorCONSTANT = {
	Type:{
		Text:0,
		Date:1,
		Choice:2,
		Multiline:3,
		Number: 4,
		Password: 5
	}
}
Object.freeze(EditorCONSTANT)
export const BasicEditor = (props)=>{
	const eFields = Children.toArray(props.children)
	const eFieldsLeft = Children.toArray((eFields[0] || {}).props.children || [])
	const eFieldsRight = Children.toArray((eFields[1] || {}).props.children || [])
	const eFieldsAddLeft = Children.toArray((eFields[2] || {}).props.children || [])
	const eFieldsAddRight = Children.toArray((eFields[3] || {}).props.children || [])
	//console.log("child", eFields, eFieldsLeft, eFieldsRight, eFieldsAddLeft, eFieldsAddRight )
	return  <Container>
				<Grid container spacing={1} justifyContent="center">
					<Grid className={css(styles.w100)}  item xs={6} >		    
						<FormControl className={css(styles.w100)}  component="fieldset">
						{ eFieldsLeft.map((Com,i)=>{
							return <Com.type {...Com.props} key={i} ref={Com.ref}/>
						}) }
						{ eFieldsAddLeft.map((Com,i)=>{
							return <Com.type {...Com.props} key={i} ref={Com.ref}/>
						})}

						</FormControl>
					</Grid>
					<Grid className={css(styles.w100)}  item xs={6} >
						
						<FormControl className={css(styles.w100)}  component="fieldset">
						{ eFieldsRight.map((Com,i)=>{
							return <Com.type {...Com.props} key={i} ref={Com.ref}/>
						})}
						{ eFieldsAddRight.map((Com,i)=>{
							return <Com.type {...Com.props} key={i} ref={Com.ref}/>
						})}
						</FormControl>       
					</Grid>
				</Grid>
				<Grid container className={css(styles.w100, styles.pad5)} justifyContent="center">
					<Grid item xs={6} className={css(styles.w100, styles.algCen)}>
						<Button variant="contained" color="primary" onClick={props.save}>Simpan</Button>
					</Grid>
					<Grid item xs={6} className={css(styles.w100, styles.algCen)}>
						<Button variant="contained" color="secondary">Hapus</Button>

					</Grid>
				</Grid>
		   
			</Container>
}

//properties: columns:[{label: ,type: }]
export const MakeEditor = (properties)=>{
	const Comps = properties.columns.map((v)=>{
		let obj={}
		let {type, ...other} = v
		switch (v.type){
			case EditorCONSTANT.Type.Text:
				obj = {com: TextFieldEdit, ...other}
				break;
			case EditorCONSTANT.Type.Date:
				obj = {com: TextFieldDate, ...other}
				break;
			case EditorCONSTANT.Type.Choice:
				obj = {com: TextFieldChoice, ...other}
				break;
			case EditorCONSTANT.Type.Multiline:
				break;
			case EditorCONSTANT.Type.Number:
				break;
			case EditorCONSTANT.Type.Password:
				break;
		}
		return obj
	})

	return()=>(props)=>{
		const c = Children.toArray(props.children)
		const Al =  Children.toArray((c[0] || {}).props.children || [])
		const Ar =  Children.toArray((c[1] || {}).props.children || [])
		const [allFieldData, setAllFieldData] = useState([])
		const {fieldValue, ...other} = props
		useEffect(()=>{
			setAllFieldData(Comps.map((v)=>{
				return {label: v.label, value: (fieldValue || {})[v.label] || ""}
			}))
		},[])
		const _save = ()=>{
			if( fieldValue.id ){
				let obj = {label: "id", value: fieldValue.id}
				allFieldData.push(obj)
			}
			props.save(allFieldData)
		}

		const setAllFieldDataF = (ev, i)=>{
			let temp = [...allFieldData]
			temp[i].value = ev.target.value
			setAllFieldData(temp)
		}

		//console.log("comps",Comps)
		return <BasicEditor save={_save}>
			<div>
				{ Comps.map((V, i)=> i % 2 ===0 ? <V.com key={i} onChange={(ev)=> setAllFieldDataF(ev, i)} {...V} 
					defaultValue={fieldValue[V.label]}/> : null) }
			</div>
			<div>
				{ Comps.map((V, i)=> i % 2 !==0 ? <V.com key={i} onChange={(ev)=> setAllFieldDataF(ev, i)} {...V} 
					defaultValue={fieldValue[V.label]}/> : null) }
			</div>
			<div>
				{Al}
			</div>
			<div>
				{Ar}
			</div>
		</BasicEditor>
	}
}

export const MakeExtendable = (properties) =>{
	return(Editor)=>(props)=>{
		const [additionalFieldData, setAdditionalFieldData] = useState(props.additionalFieldData || {})
		const newField=()=>{
			showMsg2({showCancel:true, show: true, text: "nama tambahan data:", showInput1:true, callBack:((c,v)=>{
				if(props.additionalField.includes(v) || props.allField.includes(v) ){
					showMsg2({showCancel:true, show:true, text:"field sudah ada! isi nama lain!"})
					return
				}
				if(!c) return
				let u = [...props.additionalField]
				u.push(v)
				props.setAdditionalField(u)
			})})

		}
		const delField=(i)=>{
			showMsg2({showCancel:true, show: true, text: "hapus tambahan data?",  callBack:((c,v)=>{
				if(!c) return
				let u = [...props.additionalField]
				u.splice(i,1)
				props.setAdditionalField(u)
			})})
		}
		const setAdditionalFieldDataF = (v, vindex)=>{
			let u = {...additionalFieldData}
			u[vindex] = v
			setAdditionalFieldData(u)
		}

		const _save = (data)=>{ 
			data.push({label: "field", value: additionalFieldData})
			props.save(data)
		}
		return <Editor {...props} save={_save} >
			<div>
				{props.additionalField.length < 1 && props.allField.length % 2 ===0 ? <AdditionalFieldControl newField={newField} delField={delField} /> : null}
				{ props.additionalField.map((v, i)=>
				 { 
				 	return  (props.allField.length+i) % 2 === 0?<TextFieldEdit key={"f"+i} label={v} value={additionalFieldData[v]} 
				 	onChange={(ev)=>setAdditionalFieldDataF(ev.target.value,v)}/>
					: ( i === props.additionalField.length-1 ? <AdditionalFieldControl key={"a"+i} newField={newField} delField={delField} /> : null)
				}) }
			</div>
			<div>
				{props.additionalField.length < 1 && props.allField.length % 2 !==0 ? <AdditionalFieldControl newField={newField} delField={delField} /> : null}
				{ props.additionalField.map((v, i)=>
				 { 
				 	return  (props.allField.length+i) % 2 !== 0?<TextFieldEdit key={"f"+i} label={v} value={additionalFieldData[v]}
				 	onChange={(ev)=>setAdditionalFieldDataF(ev.target.value,v)}/>
					: ( i === props.additionalField.length-1 ? <AdditionalFieldControl key={"a"+i} newField={newField} delField={delField} /> : null)
				}) }
			</div>
		</Editor>
	} 
}

const AdditionalFieldControl = (props)=>{
	return <Container className={css(styles.flexRow)}>
			<Button size="small" variant="contained" color="primary" onClick={props.newField} className={css(styles.mar1)}>
				<Add color="#FFF" height="18px" width="18px" className={css(styles.marT4)}/>
			</Button>
			<Button size="small" variant="contained" color="primary" onClick={()=>props.delField(i)} className={css(styles.mar1)}>
				<Trash color="#FFF" height="18px" width="18px" className={css(styles.marT4)}/>
			</Button>
			</Container>
}