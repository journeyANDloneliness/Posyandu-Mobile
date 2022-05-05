import React from 'react'; 
//import { StyleSheet,   View, TextInput, EditText } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { setEditedData } from './store/PosyanduData'
import {Button, Card, Paper, Box, Grid, Container, Typography} from '@material-ui/core'

import { StyleSheet, css} from "aphrodite";
import StyledButton from "./components/StyledButton"

import styles from './styles/Style' 
import pImg from './img/p.png' 

export default (props)=>{
	const dispatch = useDispatch();
	return(
	<Container>
	<Container className={css(styles.pad5)}>
		<Card  className={css(styles.mar10, styles.mS, myStyle.p)}>
		<div className={css(styles.beautyBox1)}>
		<Typography style={{opacity:1, color: "#000"}} variant="subtitle1" align="center" >Selamat datang di aplikasi posyandu-mobile v.1</Typography>
		</div>
		</Card>
		<Grid container justifyContent="center" spacing={2} className={css(styles.pad5)} >
			<Grid item sm={6} className={css(styles.flexRow, styles.algCen)}>
				<StyledButton  onClick={()=>{dispatch(setEditedData({}));props.goTo('InputNamaInstansi','Home')}}   color="blue" variant="contained">
					Data Baru
				</StyledButton>
			</Grid>
			<Grid item sm={6} className={css(styles.flexRow, styles.algCen)}>
				<StyledButton  onClick={()=>{props.goTo('LihatData', 'Home')}}   color="blue" variant="contained">
					Lihat Data
				</StyledButton>
			</Grid>
		</Grid>

	</Container>
	</Container>
	);
	 
 }

 const myStyle = StyleSheet.create({
 	p:{
 		backgroundImage : `url(${pImg})`,
 		opacity : 0.5,
 		backgroundSize : "auto 100%",
 		backgroundRepeat: "no-repeat",
 		backgroundPosition: "center"

 	}
 })
