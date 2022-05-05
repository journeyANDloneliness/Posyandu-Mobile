import React,  { useState } from 'react'; 
//import { ImageBackground, StyleSheet, 
 // Modal, View, TextInput, EditText } from 'react-native';
//import { Button , Text} from 'react-native-elements';
import {Typography, Box, Container, Button, Grid} from "@material-ui/core"
import { login, logout, loginExist} from './HelperApp'
import { showMsg2} from './HelperUi'
import { setUserID } from './store/AppData'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, css } from 'aphrodite';

import styles from "./styles/Style"

import StyledButton from "./components/StyledButton"

export default (props)=>{
	const editedData = useSelector(state => state.posyanduData.editedData)
	const [name, setName] = useState("")
	const [dataAnak, setDataAnak] = useState("")
	const dispatch = useDispatch()
	const _logout = ()=>{

		logout()
		dispatch(setUserID(undefined))
		props.goTo('Home')
		showMsg2({showCancel:false, text:"logout success...", show: true})
	}
	return(
		<Container>
		<Grid>

			<Grid item xs={12}>
			<Container className={css(styles.algCen, styles.pad8, styles.bRad, styles.xBlue)}>
				<Typography variant="button">Nama: &nbsp; </Typography>
				<Typography variant="button">{" "+editedData.dt.user} </Typography>
			</Container>
			</Grid>

			<Grid item xs={12}>
			<StyledButton className={css(styles.floRight)} onClick={()=>props.goTo('Profile','DetailInstansi')} variant="contained" color="red">Profile</StyledButton>
			</Grid>
		</Grid>
		<Grid container justifyContent="center" className={css(styles.pad10)}>
			<Grid item >			 
			<Grid className={css(styles.pad2)} container justifyContent="center">
			<StyledButton  variant="contained" color="blue" onClick={()=>props.goTo('TableDataAnak','DetailInstansi')} >Data Anak</StyledButton>
			</Grid>
			<Grid className={css(styles.pad2)}  container justifyContent="center">
			<StyledButton variant="contained" color="blue" onClick={()=>props.goTo('TablePengukuran','DetailInstansi')} >Data Pengukuran</StyledButton>
			</Grid>

			</Grid>
		</Grid>

		<Grid container justifyContent="center" className={css(styles.pad8)}  > 
			<StyledButton align="center" variant="contained" onClick={_logout} color="red">Log Out</StyledButton>
		</Grid>
		</Container>
		);
}
			/*<Grid  className={css(styles.pad2)} container justifyContent="center">
			<StyledButton  variant="contained" color="blue" onClick={()=>props.goTo('Rekap','DetailInstansi')}>Rekap</StyledButton>
			</Grid>*/