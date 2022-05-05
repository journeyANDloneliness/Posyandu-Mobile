import React,  { useState , useEffect} from 'react'; 
//import { ImageBackground, StyleSheet, 
 // Modal, View, TextInput, EditText } from 'react-native';
//import { Button , Text} from 'react-native-elements';
import {Typography, Box, Container, Button, Grid, MenuItem, TextField, FormControl} from "@material-ui/core"
import { login, logout, loginExist} from './HelperApp'
import { showMsg2} from './HelperUi'
import { setUserID } from './store/AppData'
import { save , getByID, getDataPengukuran} from './HelperData';

import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, css } from 'aphrodite';

import styles from "./styles/Style"



export default (props)=>{
	const dataInstansi = useSelector((state)=> state.posyanduData.editedData)
	const dataAnakId = useSelector((state)=> state.posyanduData.pengukuranDataID)
	const dataPengukuran = useSelector((state)=> state.posyanduData.pengukuranData)
	const dataPengukuranAnak = useSelector((state)=> state.posyanduData.pengukuranDataAnak)
	const user = useSelector(state => state.posyanduData.editedData)

	const dataAnakAll = dataInstansi.dt.dataAnak != undefined ? dataInstansi.dt.dataAnak : {}

	const [textDateError, setTextDateError] = useState(false)
	const [textNameError, setTextNameError] = useState(false)

	const [dataAnakIDList, setDataAnakIDList] = useState(Object.entries(dataAnakAll).map((v)=>{
		return {id:v[0], nama: v[1].nama}
	}))

	const [nama, setNama] = useState(dataAnakId  != undefined ? {id: dataAnakId, nama: dataPengukuranAnak.nama} : {})
	const [tanggalCheck, setTanggalCheck] = useState(dataPengukuranAnak.tanggalCheck  != undefined ?
		dataPengukuranAnak.tanggalCheck : "" )
	const [beratBadan, setBeratBadan] = useState(dataPengukuranAnak.beratBadan  != undefined ?
	 	dataPengukuranAnak.beratBadan : "" )
	const [tinggiBadan, setTinggiBadan] = useState(dataPengukuranAnak.tinggiBadan  != undefined ? 
		dataPengukuranAnak.tinggiBadan : "" )
	const [hc, setHc] = useState(dataPengukuranAnak.HC  != undefined ? 
		dataPengukuranAnak.HC : "" )
	const [muac, setMuac] = useState(dataPengukuranAnak.MUAC  != undefined ? 
		dataPengukuranAnak.MUAC : "" )

	useEffect(()=>{
		if(Object.entries(dataAnakAll).length < 1){
			showMsg2({text:"isilah data anak dahulu!", show: true})
			props.goTo("TableDataAnak")
		}
	
	},[])
	const resetField = ()=>{
		setTanggalCheck("")
		setBeratBadan("")
		setTinggiBadan("")
		setHc("")
		setMuac("")
	}

	const _save = ()=>{
		if(tanggalCheck == ""){
			setTextDateError(true)
			return
		}
		if(nama.nama == "" || !nama.nama){
			setTextNameError(true)
			return
		}
		let year = tanggalCheck.split("-")[0]
		let month = new Date(tanggalCheck).toLocaleString('default',{month: 'long'})
		let data = {
			id: `#${user.id}_${year}`,
			[month]:{
				[dataAnakId != undefined ? dataAnakId : nama.id+ (Math.random() + 1).toString(36).substring(7)]:{
					nama: nama.nama,
					tanggalCheck: tanggalCheck,
					beratBadan: beratBadan,
					tinggiBadan: tinggiBadan,
					HC : hc,
					MUAC : muac,
					month : month,
					year : year
				}
			}
		}
		
		getDataPengukuran(user.id,year).then((res)=>{

			if(res.id == undefined){
				save(data)
			}else{
				if(dataPengukuranAnak.year == year)
				if( dataPengukuranAnak.month != month && dataPengukuranAnak.month){
					console.log("month ...")
					delete res[dataPengukuranAnak.month][dataAnakId]
				}

				let d = Object.assign(res[month] != undefined ? res[month]: {}, data[month])
				res[month] = d
				save(res)
			}
			
		})
		if(dataPengukuranAnak.year != year && dataPengukuranAnak.year)
		getDataPengukuran(user.id,dataPengukuranAnak.year).then((res)=>{

			if(res.id == undefined){
				save(data)
			}else{
				
				delete res[dataPengukuranAnak.month][dataAnakId]
				save(res)
			}
			
		})
		showMsg2({text:"berhasil disimpan",showOk:true,show:true})
		resetField()
	}


	return (<Container className={css(styles.w100)} >
				<Container className={css(styles.w100, styles.pad8)} >
		    		<Typography variant="button"> Data Pengukuran Anak</Typography>
		    	</Container>
		    	<Grid container spacing={1} justifyContent="center">
		    		<Grid className={css(styles.w100)}  item xs={6} >		    
			    		<FormControl className={css(styles.w100)}  component="fieldset">
			    			<TextField error={textNameError} helperText={textNameError?"harus diisi":null} inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="Nama Anak"  value={dataAnakId != undefined? nama.nama : nama} onChange={(ev)=>{setTextNameError(false);setNama(ev.target.value)}} select={dataAnakId == undefined} disabled={dataAnakId != undefined}>
					          { dataAnakIDList.map((v) => (
					            <MenuItem key={v.id} value={v}>
					              {v.nama}
					            </MenuItem>
					          ))}
			    			</TextField>
			    			<TextField error={textDateError} helperText={textDateError?"harus diisi":null}  inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" format="dd/mm/yyyy" label="Tanggal Check"  value={tanggalCheck} onChange={(ev)=>{setTextDateError(false); setTanggalCheck(ev.target.value)}} InputLabelProps={{
						      shrink: true,
						    }} type="date"/>
			    			<TextField  inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="Berat Badan(kg)"  value={beratBadan} onChange={(ev)=>{setBeratBadan(ev.target.value)}}/>
			    			<TextField  inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="Tinggi Badan(cm)"  value={tinggiBadan} onChange={(ev)=>{setTinggiBadan(ev.target.value)}}/>
			    			<TextField  inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="HC"  value={hc} onChange={(ev)=>{setHc(ev.target.value)}}/>
			    			<TextField  inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="MUAC"  value={muac} onChange={(ev)=>{setMuac(ev.target.value)}}/>
						</FormControl>
		    		</Grid>
			    	<Grid container className={css(styles.w100, styles.pad5)} justifyContent="center">
			    		<Grid item xs={6} className={css(styles.w100, styles.algCen)}>
			    			<Button variant="contained" color="primary" onClick={_save}>Simpan</Button>
			    		</Grid>
			    		<Grid item xs={6} className={css(styles.w100, styles.algCen)}>
			    			<Button variant="contained" color="secondary">Hapus</Button>

			    		</Grid>
		    		</Grid>
		    	</Grid>
			</Container>)
}