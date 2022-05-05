import React,  { useState, useEffect } from 'react'; 
//import { ImageBackground, StyleSheet, 
  //Modal, View, TextInput, EditText } from 'react-native';
//import { Button , Text} from 'react-native-elements';
import {Transition} from 'react-transition-group'
import { bounce, slideInLeft } from 'react-animations';
import { StyleSheet , css } from 'aphrodite';
import {Container, Button, Typography, List, ListItem, ListItemText, ListItemIcon} from "@material-ui/core"
import { useSelector, useDispatch } from 'react-redux'
console.log("ruuun")


export default (props)=>{
	const user = useSelector(state=> state.posyanduData.editedData)

	const list=[{text: "Pengaturan",fun:()=>props.goTo("ViewSetup")},
				{text:"Bantuan", fun:()=>{window.open("https://desa-granting.github.io/#contact")}},
				 {text:"Tentang", fun:()=>props.goTo("Tentang")}]
	if((user.dt || {}).dataAnak) list.splice(0,0,{text:"Template PDF", fun:()=>props.goTo("BuatTemplate")})
	const l = list.map((i)=>
		<ListItem key={i.text} onClick={i.fun} button>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={i.text} />
        </ListItem>	);

	return(
		
			<div id="sideBar" className={css(styles.slideInLeft, styles.container)} style={Object.assign(
				{display: props.show ? "inherit": "none"},styles.container)}>
			 	<List component="nav" aria-label="main mailbox folders">
			 		{l}
		      	</List>
			</div>

		
		);
}

const styles = StyleSheet.create({
 bounce: {
    animationName: bounce,
    animationDuration: '1s'
  },
  slideInLeft:{
 	animationName: slideInLeft,
    animationDuration: '1s',
  },
  container : {
		position: "fixed",
		top: 58,
		left: 0,
		zIndex: 100,
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'top',
		justifyContent: 'left',
  		flexDirection: "column",
  		height: "100%",
  		width: 200,
  		contentOverflow: "hidden",
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	home:{
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center'
	},

});