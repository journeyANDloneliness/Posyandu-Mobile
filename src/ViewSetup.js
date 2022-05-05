import React,  { useState } from 'react'; 
//import { ImageBackground, StyleSheet, 
 // Modal, View, TextInput, EditText } from 'react-native';
//import { Button , Text} from 'react-native-elements';
import {Typography, Box, Container, Button, Grid, Checkbox,
 FormControlLabel, FormControl, TextField} from "@material-ui/core"
import { login, logout, loginExist} from './HelperApp'
import { showMsg2} from './HelperUi'
import { setUserID , setSettings} from './store/AppData'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, css } from 'aphrodite';
import { save , getByID} from './HelperData';

import styles from "./styles/Style"


export default (props)=>{
	const settings = useSelector(state => state.appData.settings)
	const [autoLogin, setAutoLogin] = useState((settings || {}).autoLogin )
	const dispatch = useDispatch()
	const _save = () =>{
		getByID('app').then((res)=>{
			
			Object.assign(res,{
				settings:{
					autoLogin: autoLogin
				}
			})
			console.log("autoLogin:", autoLogin)
			save(res)
			showMsg2({show:true, text:"berhasil simpan pengaturan"})
			dispatch(setSettings(res.settings))

			props.goTo("Home")
		})
	}

	return(<Container className={css(styles.pad0)}>
				<Container className={css(styles.w100, styles.pad8)} >
		    		<Typography variant="button"> Pengaturan</Typography>
		    	</Container>
		    	<Grid container spacing={1} justifyContent="center">
		    		<Grid className={css(styles.w100)}  item xs={6} >		    
			    		<FormControl className={css(styles.w100)}  component="fieldset">

			    			<FormControlLabel label="Login Otomatis" control={<Checkbox 
			    				variant="outlined" size="small" checked={autoLogin} 
			    			onChange={(ev)=>{console.log(ev.target.checked);setAutoLogin(ev.target.checked)}} />} className={css(styles.marT8)} />
		

			    			<TextField  className={css(styles.marT8)}
			    			 variant="outlined" size="small" label="test" />
			    		
						</FormControl>
		    		</Grid>
			    	<Grid container className={css(styles.w100, styles.pad5)} justifyContent="center">
			    		<Grid item xs={12} className={css(styles.w100, styles.algCen)}>
			    			<Button variant="contained" color="primary" onClick={_save}>Simpan</Button>
			    		</Grid>
		    		</Grid>
		    	</Grid>
		</Container>);
}