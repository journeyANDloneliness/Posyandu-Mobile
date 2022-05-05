import React,  { useState } from 'react'; 
//import { Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import ReactDOM from 'react-dom'
import {  slideInDown } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import {Box, Container, Button, Typography} from "@material-ui/core"

export default class Comp extends React.Component {
	state={
		show: this.props.show || false,
		showOk: this.props.showOk || true,
		showCancel: this.props.showCancel || false,
		callBack: this.props.callBack || function (argument) {},
		text: this.props.text ||"",
		par: this.props.par 
	}
	render(){
	return (
		
		<div className={css(styles.slide, styles.modal)} style={{display: this.state.show ? "inherit": "none"}}>

		<Container className={css(styles.modalView)} >
		  	<Box >
				<Typography variant="h6" >{this.state.text}</Typography>
			  	<Box  >
					{ this.state.showOk ?
					<Button variant="contained"
					  	color="primary"
					  onClick={()=>{
					  	this.setState({show:false});
					  	//ReactDOM.unmountComponentAtNode(this.state.par);
					  	this.state.callBack(true)}}
					>
					  LOGIN
					</Button> : null
					}
					{ this.state.showCancel ?
					<Button variant="contained"
					  	color="secondary"
					  	
					  onClick={()=>{
					  	this.setState({show:false});
					  	//ReactDOM.unmountComponentAtNode(this.state.par);
					  	this.state.callBack(false)}}
					>
					  CANCEL
					</Button> : null}
			  	</Box>
		  	</Box>
		</Container>
	 
	  	</div>
	  	
	


  );}
};


const styles = StyleSheet.create({
	modal:{
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
	margin: 20,
	backgroundColor: "white",
	borderRadius: 20,
	padding: 35,
	alignItems: "center",
	shadowColor: "#000",
	shadowOffset: {
	  width: 0,
	  height: 2
	},
	shadowOpacity: 0.25,
	shadowRadius: 4,
	elevation: 5,
	left:0,
	right:0
  
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
