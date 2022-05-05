import React,  { useState } from 'react'; 
//import { Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import ReactDOM from 'react-dom'
import {  slideInDown } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import {Box, Container, Button, Typography, TextField} from "@material-ui/core"

import stylesA from "../styles/Style"

export default class Comp extends React.Component {
	state={
		show: this.props.show || false,
		showOk: this.props.showOk || true,
		showCancel: this.props.showCancel || false,
		showInput1: this.props.showInput1 || false,
		callBack: this.props.callBack || function (argument) {},
		text: this.props.text ||"",
		par: this.props.par ,
		input1: this.props.input1 || "",
		textBtn: this.props.textBtn || []
	}
	resetState(){
		this.setState({show:false, showCancel: false, text:"",
	  		showInput1: false, input1:"",callBack:()=>null,
	  		textBtn:[]});
	}
	render(){
	return (
		
		<div className={css(styles.slide, styles.modal)} style={{display: this.state.show ? "inherit": "none"}}>

		<Container className={css(styles.beautyBox1, styles.modalView, stylesA.algCen)} >
		  		<Box >
				<Typography variant="h6" >{this.state.text}</Typography>
				{this.state.showInput1 ? <TextField value={this.state.input1} size="small" label="Nama"
				onChange={(ev)=>this.setState({input1:ev.target.value})}/> : null}
			  	<Box  >
					{ this.state.showOk ?
					<Button variant="contained"
					  	color="primary"
					  onClick={()=>{
					  	this.resetState()
					  
					  	//ReactDOM.unmountComponentAtNode(this.state.par);
					  	this.state.callBack(true, this.state.input1)}}
					>
					  { this.state.textBtn[0] || "OK" }
					</Button> : null
					}
					{ this.state.showCancel ?
					<Button variant="contained"
					  	color="secondary"
					  	
					  onClick={()=>{
					  	this.resetState()
					  	//ReactDOM.unmountComponentAtNode(this.state.par);
					  	this.state.callBack(false)}}
					>
					  { this.state.textBtn[1] || "CANCEL" }	  
					</Button> : null}
			  	</Box>
		  	</Box>
		</Container>
	 
	  	</div>
	  	
	


  );}
};


const styles = StyleSheet.create({
	beautyBox1:{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "#FFFFFFFE",
		borderRadius: 20,
	 
		alignItems: "center",
		boxShadow: "0px 4px 5px 3px rgba(0, 0, 0, 0.3) "
	},
	modal:{
	width: "100vw",
	borderStyle: "hidden",
	position: "fixed",
	top: "20%",
	left: 0,
	right: 0,
	zIndex: 100,
	//transform: "translate(-50%, -50%)",
	margin: 2,
	borderRadius: 20,
	padding: 2,
	alignItems: "center",
    shadowColor: "#000",
	shadowOffset: {
	  width: 0,
	  height: 2
	},
	shadowOpacity: 0.25,
	shadowRadius: 4,
	elevation: 5
	},
	slide:{
	 	animationName: slideInDown,
    	animationDuration: '0.5s',
	},
	centeredView: {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	marginTop: 22,
	
  },
  modalView: {
	backgroundColor: "white",
	borderRadius: 20,
	padding: 35,
	alignItems: "center",
	shadowColor: "#000",

  
  },
  buttonCon:{
	flexDirection: "row"
  },
  button: {
	borderRadius: 20,
	padding: 10,
	elevation: 2,
	flex: 1
  },
  buttonOpen: {
	backgroundColor: "#F194FF",
  },
  buttonClose: {
	backgroundColor: "#2196F3",
  },
  textStyle: {
	color: "white",
	fontWeight: "bold",
	textAlign: "center"
  },
  modalText: {
	
	textAlign: "center"
  }
});
