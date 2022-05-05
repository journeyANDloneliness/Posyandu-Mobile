import React, {useState, useEffect} from 'react'
import {Box, Grid, AppBar, IconButton, Toolbar, Typography, MenuIcon, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {ListOutline, Home, ArrowUndoOutline, ArrowUndo} from "react-ionicons"
import { StyleSheet , css } from 'aphrodite';
import PropTypes from 'prop-types';
import Interact from "interactjs"

const dragMoveListener = (event, f, props) => {
	var target = event.target
	// keep the dragged position in the data-x/data-y attributes
	var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
		
	var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
		

	// translate the element
	target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

	// update the posiion attributes
	target.setAttribute('data-x', x)
  	target.setAttribute('data-y', y)
  	console.log("drag..")
  	let data={ ...props,...{x:x, y:y, percentage: props.horizontal?(y * 100) / props.height: (x * 100) / props.width } }
	f(data)
	return data

}


const ScrollBar=(props)=>{
	const [inter, setInter] = useState(null)
	const [onDragg, setOnDragg] = useState(false)
	const [dataX, setDataX] = useState(null)
	useEffect(()=>{
	  let i = Interact(".touchbar"+props.horizontal)
	  i.draggable({
		startAxis: props.horizontal?'y':'x',
		lockAxis: props.horizontal?'y':'x',
		
		inertia: true,
		modifiers: [
			Interact.modifiers.restrictRect({
				restriction: 'parent',
				endOnly: true
			})
			/*Interact.modifiers.restrict({
				restriction: 'self'
			})*/
		]})
		setInter(i)
	},[])
	useEffect(()=>{
		//inter.listeners = {move:drag}
		if(!inter) return
	 	inter.draggable({

		listeners:{
			move: drag
		},
		})
/*		inter.on('dragstart dragmove',(ev)=>{
			 	console.log("start drag...")
				setOnDragg(true)
				drag(ev)
			 })*/
		inter.on('dragend', ()=>{
			 	console.log("end drag...")
			 	setOnDragg(false)
			 	props.getPosition(dataX || props)
			 })
		
	},[props])
	const setupData = (data)=>{
		setDataX(data)
	}
	const drag=(ev)=>{
		dragMoveListener(ev,setupData, props)
	}
	//data-x={onDragg?(props.scrollAt * props.max)/100:13}
	return <div style={{
		[props.y >  0 ?"top":"bottom"]: props.y * (props.y >  0 ? 1: -1)
		, [props.x >  0 ?"left":"right"]: props.x * (props.x >  0 ? 1: -1),
	 height: props.height, width: props.width}} 
	className={ css(props.horizontal ? styleA.containerHor : styleA.containerVer )}>
			<div style={{[props.horizontal?"height":"width"]:
			 (((props.visible * 100)/props.max)*
			 	(props.horizontal? props.height: props.width))/100 || 0,
			 	[props.horizontal?"width":"height"]: 10,
			 	[onDragg?"xxx":props.horizontal?"top":"left"]: 
			 	(props.scrollAt * props.horizontal? props.height:props.width)/100 || 0 }} 
			 	 className={"touchbar"+props.horizontal+" "+css(styleA.touchbar)}
			 	>
			{//console.log("tmax..", props.max)
			}
			</div>
		</div>
}

ScrollBar.propTypes ={
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	horizontal: PropTypes.bool.isRequired,
	getPosition: PropTypes.func.isRequired,
	max: PropTypes.number.isRequired,
	visible: PropTypes.number.isRequired,
}
export default ScrollBar
const styleA = StyleSheet.create({
	containerHor:{
		//width: 10,
		//height: "100%",
		position: "fixed",
		backgroundColor: "#FFFFFF44",
		borderRadius: 10,
		border: "1px solid #44444444"
	},
	containerVer:{
		//width: "100%",
		//height: 10,
		position: "fixed",
		backgroundColor: "#FFFFFF44",
		borderRadius: 10,
		border: "1px solid #44444444"
	},
	touchbar:{
		borderRadius: 10,
		position: "absolute",
		backgroundColor: "#3f51b5",
		//width: 15,
		//left: 2
		//height: 10
	}
})