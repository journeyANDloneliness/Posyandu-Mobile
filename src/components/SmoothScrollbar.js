import React, {useState, useEffect} from 'react'
import {Container} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {ListOutline, Home, ArrowUndoOutline, ArrowUndo} from "react-ionicons"
import { StyleSheet , css } from 'aphrodite';
import PropTypes from 'prop-types';
import Scrollbar, {ScrollbarPlugin} from 'smooth-scrollbar';
import styles from "../styles/Style"
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll'


const SmoothScroolbar = (props)=>{
	useEffect(()=>{

		Scrollbar.use( MyPlugin, OverscrollPlugin )
		//console.log("p child",props.preventChild)
		Scrollbar.init(document.querySelector('#scroller'),{
			damping: 0.1,
			thumbMinSize: 10,
			renderByPixel: true,
			alwaysShowTracks: true,
			continousScrolling: true,
			plugins:{
				overscroll:props.overscroll?{
					effect :'glow',
					damping: 0.15,
					maxOverscroll: 80
				}:false,
				test:props.preventChild?{
					callBack: props.callBack,
					mainEl: document.getElementById('scroller')
				}:false
			}
		})
		//console.log("would u callin me?")
	},[props])
	return <Container id="scroller" style={{width: props.width, height: props.height}} className={css(styles.pad0, styleA.scroller)} onScroll={props.onScroll}>
		{props.children}
	</Container>
}
export default SmoothScroolbar
SmoothScroolbar.propTypes ={
	overscroll : PropTypes.bool,
	preventChild : PropTypes.bool
}
/*SmoothScroolbar.defaultProps ={
	overscroll : false,
	preventChild : true,
}*/
const styleA = StyleSheet.create({
	scroller:{
		//height: "76vh",
		width: "100%",
		overflow:"auto"
	}
})

class MyPlugin extends ScrollbarPlugin{
	static pluginName = 'test';
	defaultOptions ={
		callBack: ()=>{},
		mainEl: null
	}
	transformDelta(delta, fromEvent){
		this.options.callBack(delta, fromEvent)
		//console.log(delta, fromEvent)
		if(fromEvent.path.length > 11 ){
			return{x: 0,y: 0}
			console.log("deltaaaaaaa")
		}
		else return delta
	}
}

export const WithSmoothScrollbar = (property)=>{
	return (Component)=>(props)=>{
		return <SmoothScroolbar {...property}>
			<Component {...props} />
		</SmoothScroolbar>
	}
}