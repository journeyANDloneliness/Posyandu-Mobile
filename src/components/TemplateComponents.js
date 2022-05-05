import React, {useState, useEffect}  from "react"
import PropTypes from 'prop-types';


import { TextField, Button, Container, Box, Popover} from '@material-ui/core';
import { StyleSheet , css } from 'aphrodite';
import { save , getById} from '../HelperData';
import { useSelector, useDispatch } from 'react-redux'
import { setEditedData } from '../store/PosyanduData'

import { withStyles } from '@material-ui/core/styles';

import styles from '../styles/Style'

import rez from '../img/rez.png'

import {showMsg2, showBackdrop, closeBackdrop } from '../HelperUi'

const styleA = {
	box:{
		//backgroundImage: `url(${rez})`,
		position: "absolute",
		//backgroudSize: "cover",
		//backgroudRee
		//top: (props)=>props.feature.y,
		//left: (props)=>props.feature.x,
		//transform: (props) => `translate(${props.feature.x}px,${props.feature.y}px)`,

		width: (props ) => props.feature.width,
		height: (props ) => props.feature.height,
	},
	corner:{
		width: 8,
		height: 8,
		position: "absolute",
		backgroundColor: "#888"
	},
	hider:{
		backgroundColor: "#FFF"
	},
	b:{
		//position :"absolute",
		touchAction: "none",
		userSelect: "none"
	},
	tl:{top:0, left:0},
	tr:{top:0, right:0},
	br:{bottom:0, right:0},
	bl:{bottom:0, left:0},
	simpleInput:{
		border: "none",
		borderBottom: "1px solid black",
		color: (props)=> props.feature.color,
		backgroundColor: "#FFFFFF11",
		fontSize: (props) => props.feature.fontSize
	},
	tableCell:{
		border: "1px solid black",
		width: "40px",
		height: "20px",
		backgroundColor: "#FFFFFF33",
		overflow: "hidden",
		whiteSpace:"nowrap"
	},
	myTable:{
		position: "absolute",
		overflow: "hidden"
	},
	basic:{
		position: "absolute"
	},
	basicI:{
		width: "100%",
		height: "100%",
	},
	tableRow :{

	}
}
const styleB = StyleSheet.create({
	tableCell:{
		border: "1px solid black",
		width: "100px",
		height: "20px",
		backgroundColor: "#FFFFFF33"
	}
})

const TextObjectRaw =(props)=>{
	const [trgGetMyProp, setTrgGetMyProp] = useState(props.getMyPropOn)

	const [text, setText] = useState(props.feature.text)
	const [size, setSize] = useState("")
	const [color, setColor] = useState("")

	/*const [input, setInput] = useState(null)

	useEffect(()=>{
		let t = React.createRef()
		t
	},[trgGetMyProp])*/
	const {classes, ...other} = props
 	const getMyProp =()=>{

		props.getProperty({
			color: color,
			size: size,
			text: text,
			pos: pos
		})
	}

	useEffect(()=>{
		//getMyProp()
	},[trgGetMyProp])
	return(
		<div onMouseUp={props.onMouseUp} onMouseDown={props.onMouseDown} className={props.className+" "+classes.box+" "+classes.b+" "+css(styles.pad8)}  >
			<div className={css( styles.mar8)}>
				<input defaultValue={text} type="text"  onChange={props.onChange}/> 
			</div>
			<div className={classes.tl+" "+classes.corner}></div>
			<div className={classes.tr+" "+classes.corner}></div>
			<div className={classes.br+" "+classes.corner}></div>
			<div className={classes.bl+" "+classes.corner}></div>
		</div>
		)
}
const SimpleTextObjectRaw =(props)=>{
	const [trgGetMyProp, setTrgGetMyProp] = useState(props.getMyPropOn)

	const [text, setText] = useState(props.feature.text)
	const [size, setSize] = useState("")
	const [color, setColor] = useState("")


	/*const [input, setInput] = useState(null)

	useEffect(()=>{
		let t = React.createRef()
		t
	},[trgGetMyProp])*/
	const {classes, ...other} = props
 	const getMyProp =()=>{

		props.getProperty({
			color: color,
			size: size,
			text: text,
			pos: pos
		})
	}


	return(
		<div data-x={props["data-x"]} data-y={props["data-x"]} style={props.style} onMouseUp={props.onMouseUp} onMouseDown={props.onMouseDown} 
		className={props.className+" "+classes.box+" "+classes.b} >
			<input disabled={props.disabled} style={{color: `rgb(${props.feature.color})`, fontSize: parseInt(props.feature.fontSize)}}
			className={classes.simpleInput} defaultValue={props.feature.text} type="text"  onChange={props.onChange}/> 
		</div>
		)
}


const TableObjectRaw =(props)=>{
	const [trgGetMyProp, setTrgGetMyProp] = useState(props.getMyPropOn)
	const [fMax, setFMax] = useState(0)
	const [fMin, setFMin] = useState(0)

	const {classes, ...other} = props
	useEffect(()=>{
		let fn=100
		let fx=0
		props.feature.listItems.forEach((v)=>{
			if(fn > v.length)
				fn = v.length
			if(fx < v.length)
				fx = v.length
		})
		setFMin(fn)
		setFMax(fx)
	},[props.feature])
	return(
		<table data-x={props["data-x"]} data-y={props["data-x"]} style={props.style} className={props.className+" "+classes.myTable} 
		onMouseUp={props.onMouseUp} onMouseDown={props.onMouseDown}>
			
			<thead>
			<tr className={classes.tableRow }>
				{props.feature.tableInfo.length > 0 ? props.feature.tableInfo.map((v,i)=>
						<td key={i} className={classes.tableCell} style={{width:v.width+"%",fontSize: v.fontSizeH}} >
						 {v.header}
						</td>
					): null }
			</tr>
			</thead>
			<tbody>
			{props.feature.listItems.length > 0 ? props.feature.listItems.map((v,i)=>
				
				<tr data={Array.from({length:fMax-v.length}, (v,i)=> i).forEach(vv=>v.push("-"))}
				 key={i} className={classes.tableRow }>

					 { v.map((vv,ii)=><td key={ii} className={classes.tableCell} style={{fontSize: (props.feature.tableInfo[ii] || {}).fontSize,
					  width:(props.feature.tableInfo[ii] || {}).width+"%" || "1%"}}>
					  { vv.truncate(((((props.feature.tableInfo[ii] || {}).width || 1 ) 
					  	* props.feature.width)/100)/((props.feature.tableInfo[ii] || {}).fontSize/2.2 || 1))}</td>) }
				</tr>)
			: [[1,2,3],[2,3,4],[5,6,7]].map((v,i)=>
				
				<tr key={i} className={classes.tableRow }>
					 { v.map((vv,ii)=><td style={{width:(props.feature.tableInfo[ii] || {}).width+"%" || "1%"}} key={ii} className={classes.tableCell}> {vv}</td>) }
				</tr>)
			}
			</tbody>
			
		</table>
		)
}
const RectObjectRaw =(props)=>{
	const [trgGetMyProp, setTrgGetMyProp] = useState(props.getMyPropOn)

	const {classes, ...other} = props

	return(
		<div data-x={props["data-x"]} data-y={props["data-x"]} 
		style={{...props.style, width: props.feature.width, 
			height: props.feature.height, borderRadius: props.feature.borderRadius}} 
		onMouseDown={props.onMouseDown}
		onMouseUp={props.onMouseUp}
		className={props.className+" "+classes.basic} >
			<div style={{backgroundColor:`rgb(${props.feature.color})`}} className={classes.basicI}></div>
		</div>
		)
}
const LineObjectRaw =(props)=>{
	const [trgGetMyProp, setTrgGetMyProp] = useState(props.getMyPropOn)

	const {classes, ...other} = props

	return(
		<div data-x={props["data-x"]} data-y={props["data-x"]} 
		style={{...props.style, width: props.feature.width}} 
		onMouseDown={props.onMouseDown}
		onMouseUp={props.onMouseUp}
		className={props.className+" "+classes.basic} >
			<div style={{borderBottom:props.feature.height+"px "+props.feature.lineStyle+" "+`rgb(${props.feature.color})` }}></div>
		</div>
		)
}
/*fTextObject.propTypes = {
	getProperty: PropTypes.Function.isRequired,
	text: PropTypes.String.isRequired
};*/
TextObjectRaw.propTypes ={
	feature: PropTypes.object.isRequired,
}

export const TextObject = withStyles(styleA)(TextObjectRaw) ;
export const SimpleTextObject = withStyles(styleA)(SimpleTextObjectRaw) ;
export const TableObject =  withStyles(styleA)(TableObjectRaw);
export const LineObject =  withStyles(styleA)(LineObjectRaw);
export const RectObject =  withStyles(styleA)(RectObjectRaw);
