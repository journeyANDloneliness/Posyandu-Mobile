import React, {useEffect, useState, Fragment} from 'react'
import PropTypes from 'prop-types';

import {Container, TextField, MenuItem, Button, List, ListItem, IconButton} from '@material-ui/core';
import { Add, Trash, CaretUp, CaretDown } from "react-ionicons"

import Pagination from '../components/Pagination'
import { useReduxData } from '../components/Hook/Use1'
import { StyleSheet , css } from 'aphrodite';
import { AnyPoper } from '../components/Popipo';
import styles from '../styles/Style'


export default function ComponentProperties(props){
	const [user] = useReduxData(['user'])
	const limit = 5
	const [current, setCurrent] = useState(0)
	const [dataTableDataAnak, setDataTableDataAnak] = useState(toBeautyArray(user.dt.dataAnak))
	const [dataTable, setDataTable] = useState([])
	const [tableInfo, setTableInfo] = useState(props.feature.tableInfo || [])
	const tableInfoData = {header:"",width:50, height: 50, fontSize: 12,fontSizeH: 18}

	useEffect(()=>{
		setDataTable([{name:"data anak", info:[], data:dataTableDataAnak}
				])
	},[props.feature])
	useEffect(()=>{
		if(!props.listItems) return
		let temp={...props.feature}
		temp.tableInfo = tableInfo
		props.setFeature(temp)
	},[tableInfo])
	useEffect(()=>{
		if(props.listItems !== dataTableDataAnak)return
		let temp={...props.feature}
		temp.listItems = dataTableDataAnak
		props.setFeature(temp)
	},[dataTableDataAnak])

	const setFeature = (ev)=>{
		console.log(dataTableDataAnak)
		console.log(ev.target.name, ev.target.value)
		props.feature[ev.target.name] = ev.target.value
		props.setFeature({...props.feature})
	}

	const setPagination=(i, lim)=>{
		setCurrent(i)
	}
	const inPag=(nn)=>nn >= current && nn < current + limit 
	let nn=0
	if(props.feature){
	return 	<Container className={css(styles.flexColumn, styleA.con)}>
			{ props.feature.text && inPag(nn) ? <MyInput name="text" defaultValue={props.feature.text} 
				 onChange={(ev)=> { setFeature(ev)}} /> : null}
			{ props.feature.text ? <span nn={nn++}></span>:null}

			{ props.feature.fontSize &&  inPag(nn) ?<MyInput name="fontSize" defaultValue={props.feature.fontSize} 
				 onChange={(ev)=> { ev.target.value = parseInt(ev.target.value ) || 0;setFeature(ev)}} /> : null}
			{ props.feature.fontSize ? <span nn={nn++}></span>:null}
			
			{ props.feature.color &&  inPag(nn) ?<MyInput name="color" defaultValue={props.feature.color} 
				 onChange={(ev)=> { ev.target.value =  ev.target.value || "1,1,1";setFeature(ev)}} /> : null}
			{ props.feature.color ? <span nn={nn++}></span>:null}
			
			{ props.feature.x &&  inPag(nn) ?<MyInput name="x" defaultValue={props.feature.x} 
				 onChange={(ev)=> { ev.target.value =  ev.target.value || 0;setFeature(ev)}} /> : null}
			{ props.feature.x ? <span nn={nn++}></span>:null}
			
			{ props.feature.y &&   inPag(nn) ?<MyInput name="y" defaultValue={props.feature.y} 
				 onChange={(ev)=> { ev.target.value =  ev.target.value || 0;setFeature(ev)}} /> : null}
			{ props.feature.y ? <span nn={nn++}></span>:null}
			
			{ props.feature.width &&  inPag(nn) ? <MyInput name="width" defaultValue={props.feature.width} 
				 onChange={(ev)=> { ev.target.value =  ev.target.value || 0;setFeature(ev)}} /> : null}
			{ props.feature.width ? <span nn={nn++}></span>:null}
			
			{ props.feature.height &&  inPag(nn) ?<MyInput name="height" defaultValue={props.feature.height} 
				 onChange={(ev)=> { ev.target.value =  ev.target.value || 0;setFeature(ev)}} /> : null}
			{ props.feature.height ? <span nn={nn++}></span>:null}
			
			{ props.feature.borderColor &&  inPag(nn) ?<MyInput name="borderColor" defaultValue={props.feature.borderColor} 
				 onChange={(ev)=> { ev.target.borderColor =  ev.target.borderColor || 0;setFeature(ev)}} /> : null}
			{ props.feature.borderColor ? <span nn={nn++}></span>:null}

			{ props.feature.lineStyle &&  inPag(nn) ?<MyInput name="lineStyle" defaultValue={props.feature.lineStyle} 
				 onChange={(ev)=> { ev.target.lineStyle =  ev.target.lineStyle || 0;setFeature(ev)}} /> : null}
			{ props.feature.lineStyle ? <span nn={nn++}></span>:null}
			
			{ props.feature.borderRadius &&  inPag(nn) ?<MyInput name="borderRadius" defaultValue={props.feature.borderRadius} 
				 onChange={(ev)=> { ev.target.borderRadius =  ev.target.borderRadius || 0;setFeature(ev)}} /> : null}
			{ props.feature.borderRadius ? <span nn={nn++}></span>:null}
			
			{  props.feature.listItems &&  inPag(nn) ? 
			 <TextField variant="outlined" name="listItems"
				 size="small" label="List Item"
				 select  onChange={(ev)=>{setFeature(ev)}} >
				 { dataTable.map((v)=>
				 	<MenuItem key={v.name} value={v.data}>
		              	{v.name}
		            </MenuItem>
				 	)}
			</TextField> : null}
			{ props.feature.listItems ? <span nn={nn++}></span>:null}

			{  props.feature.tableInfo &&  inPag(nn) ?
				<Fragment>
				<Button id="b1" variant="contained" color="primary" >
					<Add color="#FFF"/>
				</Button>
					<AnyPoper par="b1">
						<List component="nav" >
						<ListItem >
							<Add color="#000" onClick={()=>{let t=[...tableInfo, {...tableInfoData}];setTableInfo(t)}}/>
							<Add color="#000" onClick={()=>{
								let l=0
								props.feature.listItems.check(0, (n,v)=> n < v.length, (v)=>v.length, (n)=>l=n)
								setTableInfo(Array.from({length:l},(v,i)=>i).map((v)=>{return{...tableInfoData}}))
							}}/>
							<Add color="#000" onClick={()=>{tableInfo.map(vv => vv.height)
								.distributeEvenly(100,(vv,ii)=>tableInfo[ii].height = vv);tableInfo.setFun(setTableInfo)}}/>
						</ListItem>
						{
							tableInfo.map((v, i)=>
							<ListItem key={randomKey()} className={css(styles.pad2)}  >
						  		<MyInput name="header"  defaultValue={v.header} onChange={ev=>{tableInfo[i].header = ev.target.value}} onBlur={()=>tableInfo.setFun(setTableInfo)}/>
						  		<MyInput name="u font"  defaultValue={v.fontSize} onChange={ev=>{tableInfo[i].fontSize = parseInt(ev.target.value)}} onBlur={()=>tableInfo.setFun(setTableInfo)}/>
						  		<MyInput name="u font h"  defaultValue={v.fontSizeH} onChange={ev=>{tableInfo[i].fontSizeH = parseInt(ev.target.value)}} onBlur={()=>tableInfo.setFun(setTableInfo)}/>
						  		<MyInput name="width" defaultValue={v.width} onChange={(ev)=> 
						  			{console.log(ev)
						  				tableInfo.map(vv => vv.width)
						  			.distributeLength(i,parseFloat(ev.target.value) || 1, 100 ).forEach((vv,ii) => tableInfo[ii].width = vv)
						  			}} onBlur={()=>tableInfo.setFun(setTableInfo)}/>
						  		<MyInput name="height" defaultValue={v.height} onChange={(ev)=> 
						  			{tableInfo.map(vv => vv.height)
						  			.distributeLength(i,parseFloat(ev.target.value) || 1, 100 ).forEach( (vv,ii) => tableInfo[ii].height = vv)
						  			}} onBlur={()=>tableInfo.setFun(setTableInfo)}/>
						  		<div className={css(styles.flexRow)}>
						  			<IconButton  className={css(styles.pad0)} onClick={(ev)=>{
						  				tableInfo.order(i, true).setFun(setTableInfo)
						  				dataTableDataAnak.forEach(v=>v.order(i, false)).setFun(setDataTableDataAnak)
						  				 }}>
										<CaretUp height="12px" width="12px"/>
									</IconButton>
						  			<IconButton  className={css(styles.pad0)} onClick={(ev)=>tableInfo.splice(i,1)}>
										<Trash height="12px" width="12px"/>
									</IconButton>
						  			<IconButton  className={css(styles.pad0)} onClick={(ev)=>{
						  				tableInfo.order(i, false);setTableInfo([...tableInfo])
						  				dataTableDataAnak.forEach(v=>v.order(i, false)).setFun(setDataTableDataAnak)
						  				}}>
										<CaretDown height="12px" width="12px"/>
									</IconButton>
						  		</div>
							</ListItem>)
						}

						</List>
					</AnyPoper>
				</Fragment>: null}
			{ props.feature.tableInfo ? <span nn={nn++}></span>:null}


			<Pagination set={setPagination} size={nn} limit={limit}/>
			</Container>
		}
		else return <div>nothin!</div>
}

ComponentProperties.propTypes = {
	feature : PropTypes.object.isRequired
}

const MyInput = (props)=>{
	
	return <div className={css(styleA.lblMyInput)} >{props.name}
	<input type="text" {...props} className={css(styleA.myInput)}/></div>

}

const styleA = StyleSheet.create({
	con:{
		position: "fixed",
		backgroundColor: "rgb(173 173 173 / 64%)",
		right: 10,
		zIndex: 1,
		width: 130,
		padding: 2
	},
	lblMyInput:{
		fontSize: 12
	},
	myInput:{
		width: 50,
		fontSize: 12,
		float: "right"
	}
})