import React from 'react'
//import { StyleSheet,  View,  EditText } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { showMsg2 } from './HelperUi';
import {StyleSheet , css} from "aphrodite";
import {Container, Box, TextField, Grid, Button, Typography} from "@material-ui/core" 
import {save } from './HelperData'
import styles from './styles/Style' 


export default function(props){
	const user = useSelector((state)=> state.posyanduData.editedData)
	const [text, onChangeText] = React.useState(user.id != undefined ? user.dt.user : "");
 
	const [pass1,onChangePass1]   = React.useState(user.dt != undefined ? user.dt.password : "");

	const [pass2, onChangePass2] = React.useState(user.dt != undefined ? user.dt.password : "");
	const dispatch = useDispatch();

	const  _save =  (ev) => {
		let cloned = user.id != undefined ? JSON.parse(JSON.stringify(user)) : 
			{id:'@posyandu_data'+(Math.random() + 1).toString(36).substring(7)+text }
		if(cloned.dt === undefined )cloned.dt = {}

		cloned.dt["user"] = text
		cloned.dt["password"] = pass1

		save(cloned).then((res)=>{
			//dispatch(setEditedData(res))

			showMsg2({text:"data berhasil disimpan",showOk:true,show:true,
				callBack:()=>{console.log("callback..")}})
			
			});
		
	}

		return(
			<Container >
				<Container className={css(styles.algCen, styles.flexColumn, styles.pad4)}>
					<Typography align="center" variant="subtitle1" >Input Nama</Typography>
				</Container>
				<Container  className={css(styles.algCen, styles.flexColumn, styles.pad4)}>
				<TextField label="Nama" variant="outlined"
				value={text} onChange={(ev)=>onChangeText(ev.target.value)}/>
				
				<TextField error={ pass1 !== pass2}
				label="Password"
				variant="outlined"
				value={pass1}
				onChange={(ev)=>onChangePass1(ev.target.value)}
				type="password"/>

				<TextField error={ pass1 !== pass2}
				label="Ketik Ulang Password"
				variant="outlined"
				value={pass2}
				onChange={(ev)=>onChangePass2(ev.target.value)}
				type="password"
				helperText={pass1 !== pass2 ?"password tidak sama" : ""}/>

				</Container>
				<Container>
				<Grid container justifyContent="center" spacing={2}>
				<Grid item className={css(styles.algCen, styles.flexColumn, styles.pad4)}>
				<Button variant="contained" color="primary" onClick={(ev)=>{
					if(pass1 != pass2) {
						showMsg2({text:"password tidak sama!",showOk:true,show:true,callBack:()=>{console.log("callback..")},showCancel:false});
						return;
					}
					_save(ev);
					
					}} >Simpan </Button>
				</Grid>
				</Grid>
				</Container>
			</Container>);
	

}



