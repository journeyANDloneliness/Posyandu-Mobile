import React,  { useState } from 'react'; 
//import { ImageBackground, StyleSheet,
 // Modal, View, TextInput, EditText } from 'react-native';
//import { Button , Text} from 'react-native-elements';
import { DataGrid } from '@material-ui/data-grid';
import { TextField, Button, Container, Box, Paper, Grid, FormControl, RadioGroup,
 FormControlLabel, Radio, FormLabel, Divider, MenuItem, Typography} from '@material-ui/core';
import { StyleSheet , css } from 'aphrodite';
import { save , getById} from './HelperData';
import { useSelector, useDispatch } from 'react-redux'
import { setEditedData } from './store/PosyanduData'
import {Add, Trash} from "react-ionicons"
import styles from './styles/Style'
import { columnsReal } from './TableDataAnak'

import {showMsg2, showBackdrop, closeBackdrop } from './HelperUi'

export default (props)=>{
	const dataInstansi = useSelector((state)=> state.posyanduData.editedData)
	const dataAnakId = useSelector((state)=> state.posyanduData.editedDataAnak)

	const dataAnakAll = dataInstansi.dt.dataAnak != undefined ? dataInstansi.dt.dataAnak : undefined
	const dataAnakS = dataAnakAll != undefined ? dataAnakAll[dataAnakId] : undefined
	const dataAnak = dataAnakS != undefined ? dataAnakAll[dataAnakId] : undefined
	const [nama, setNama] = useState(dataAnak  != undefined ? dataAnak.nama : "" )
	const [namaIbu, setNamaIbu] = useState(dataAnak != undefined ? dataAnak.namaIbu : "")
	const [PIbu, setPIbu] = useState(dataAnak != undefined ? dataAnak.PIbu : "")
	const [namaAyah, setNamaAyah] = useState(dataAnak ? dataAnak.namaAyah : "")
	const [PAyah, setPAyah] = useState(dataAnak != undefined ? dataAnak.PAyah : "")
	const [alamat, setAlamat] = useState(dataAnak != undefined ? dataAnak.alamat : "")
	const [noTelp, setNoTelp] = useState(dataAnak != undefined ? dataAnak.noTelp : "")
	const [tanggalLahir, setTanggalLahir] = useState(dataAnak != undefined ? dataAnak.tanggalLahir : "")
	const [beratLahir, setBeratLahir] = useState(dataAnak != undefined ? dataAnak.beratLahir : "")
	const [JK, setJK] = useState(dataAnak != undefined ? dataAnak.JK : "")
	const [ket, setKet] = useState(dataAnak != undefined ? dataAnak.ket : "")

	const [additionalField, setAdditionalField] = useState(((dataInstansi || {}).dt || {}).field || [])
	const [additionalFieldData, setAdditionalFieldData] = useState((((dataInstansi || {}).dt || {}).dataAnak || {}).field || {})

	const [textNameError, setTextNameError ] = useState(false)
	const dispatch = useDispatch();

	const _save=()=>{
		if(nama == ""){
			setTextNameError(true)
			return
		}
		showBackdrop()
		let id = dataAnakId != undefined ? dataAnakId : nama + (Math.random() + 1).toString(36).substring(7)

		let y = {[id]:{nama: nama, namaIbu: namaIbu, namaAyah: namaAyah, PIbu: PIbu, PAyah: PAyah,
					alamat: alamat, noTelp: noTelp, tanggalLahir: tanggalLahir, beratLahir: beratLahir,
					JK: JK, ket: ket,field:additionalFieldData}}
		let cloned =JSON.parse(JSON.stringify(dataInstansi))
		if(cloned.dt.dataAnak === undefined )cloned.dt.dataAnak = {}
		Object.assign(cloned.dt.dataAnak, y)
		cloned.dt.field = additionalField
		console.log(dataInstansi)
		save(cloned).then((res)=>{
			dispatch(setEditedData(res))
			props.goTo('TableDataAnak')

			showMsg2({text:"data berhasil disimpan",showOk:true,show:true,
				callBack:()=>{console.log("callback..")}})
			closeBackdrop()
			});
	}

	const newField=()=>{
		showMsg2({showCancel:true, show: true, text: "nama tambahan data:", showInput1:true, callBack:((c,v)=>{
			if(additionalField.includes(v) || columnsReal.includes(v) ){
				showMsg2({showCancel:true, show:true, text:"field sudah ada! isi nama lain!"})
				return
			}
			if(!c) return
			let u = [...additionalField]
			u.push(v)
			setAdditionalField(u)
		})})

	}
	const delField=(i)=>{
		showMsg2({showCancel:true, show: true, text: "hapus tambahan data?",  callBack:((c,v)=>{
			if(!c) return
			let u = [...additionalField]
			u.splice(i,1)
			setAdditionalField(u)
		})})
	}
	return(
			
		    <Container>
		    	<Container className={css(styles.w100, styles.pad8)} >
		    		<Typography variant="button"> Data Anak</Typography>
		    	</Container>
		    	<Grid container spacing={1} justifyContent="center">
		    		<Grid className={css(styles.w100)}  item xs={6} >		    
			    		<FormControl className={css(styles.w100)}  component="fieldset">
					

		    			<TextField error={textNameError} helperText={textNameError?"harus diisi":null} inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="Nama Anak"  value={nama} onChange={(ev)=>{setTextNameError(false); setNama(ev.target.value)}}/>
		    			<TextField inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small"    InputLabelProps={{
						      shrink: true,
						    }} format="dd/mm/yyyy" label="Tanggal Lahir"  value={tanggalLahir} 
		    				onChange={(ev)=>{setTanggalLahir(ev.target.value)}} type="date"/>
		    			<TextField  inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="Nama Ibu"  value={namaIbu} onChange={(ev)=>{setNamaIbu(ev.target.value)}}/>
		    			<TextField  inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="Pekerjaan Ibu"  value={PIbu} onChange={(ev)=>{setPIbu(ev.target.value)}}/>
		    			<TextField  inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="No Telp"  value={noTelp} onChange={(ev)=>{setNoTelp(ev.target.value)}}/>
		    			{ additionalField.length < 1? 
		    			<Container>
		    				<Button size="small" variant="contained" color="primary" onClick={newField} className={css(styles.mar1)}>
								<Add color="#FFF" height="18px" width="18px" className={css(styles.marT4)}/>
							</Button>
		    				<Button size="small" variant="contained" color="primary" onClick={()=>delField(i)} className={css(styles.mar1)}>
								<Trash color="#FFF" height="18px" width="18px" className={css(styles.marT4)}/>
							</Button>
							</Container> : null}
		    			{ additionalField.map((v, i)=>
		    				{
		    				if (i% 2 ===0)
		    				return <TextField key={i} inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} 
		    				variant="outlined" size="small" label={v}  
		    				
		    				onChange={(ev)=>{
		    					
		    					additionalFieldData[v] = ev.target.value
		    					}}/>
		    				
		    				else if(i% 2 !==0 && i == additionalField.length-1 )
		    				return <Container key={i}>
		    				<Button size="small" variant="contained" color="primary" onClick={newField} className={css(styles.mar1)}>
								<Add color="#FFF" height="18px" width="18px" className={css(styles.marT4)}/>
							</Button>
		    				<Button size="small" variant="contained" color="primary" onClick={()=>delField(i)} className={css(styles.mar1)}>
								<Trash color="#FFF" height="18px" width="18px" className={css(styles.marT4)}/>
							</Button>
							</Container>
							}

		    			)}
						</FormControl>
		    		</Grid>
		    		<Grid className={css(styles.w100)}  item xs={6} >
		    			
			    		<FormControl className={css(styles.w100)}  component="fieldset">
			          	<TextField  InputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" select label="Jenis Kelamin" value={JK}
				           onChange={(ev)=>{setJK(ev.target.value)}}>
					          {[{v:"L",label:"Laki-Laki"}, {v:"P",label:"Perempuan"}].map((v) => (
					            <MenuItem key={v.v} value={v.v}>
					              {v.label}
					            </MenuItem>
					          ))}
				        </TextField>
		    			<TextField  inputProps={{input:styles.fntSz8}} className={css(styles.marT8)} variant="outlined" size="small" label="Berat Lahir"  value={beratLahir} onChange={(ev)=>{setBeratLahir(ev.target.value)}}/>
		    			<TextField  inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="Nama Ayah"  value={namaAyah} onChange={(ev)=>{setNamaAyah(ev.target.value)}}/>
		    			<TextField  inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="Pekerjaan Ayah"  value={PAyah} onChange={(ev)=>{setPAyah(ev.target.value)}}/>
		    			<TextField  inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="Alamat"  value={alamat} onChange={(ev)=>{setAlamat(ev.target.value)}}/>
						{ additionalField.map((v, i)=>
		    				{
		    				if (i% 2 !==0)
		    				return <TextField key={i} inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} 
		    				variant="outlined" size="small" label={v}
		    				
		    				onChange={(ev)=>{
		    					additionalFieldData[v] = ev.target.value
		    					}}/>
		    				else if(i% 2 ==0  && i == additionalField.length-1){
		    			
		    				return (<Container key={i}>
		    				<Button size="small" variant="contained" color="primary" onClick={newField} className={css(styles.mar1)}>
								<Add color="#FFF" height="18px" width="18px" className={css(styles.marT4)}/>
							</Button>
		    				<Button size="small" variant="contained" color="primary" onClick={()=>delField(i)} className={css(styles.mar1)}>
								<Trash color="#FFF" height="18px" width="18px" className={css(styles.marT4)}/>
							</Button>
							</Container>)
							}
		    				}

		    			)}
						</FormControl>       
		    		</Grid>
		    	</Grid>
		    	<Grid className={css(styles.w100, styles.pad5)} item xs={12} >
		    			<TextField className={css(styles.w100)} multiline variant="outlined" 
		    			label="Keterangan"  value={ket} onChange={(ev)=>{setKet(ev.target.value)}}/>
		    	</Grid>
		    	<Grid container className={css(styles.w100, styles.pad5)} justifyContent="center">
		    		<Grid item xs={6} className={css(styles.w100, styles.algCen)}>
		    			<Button variant="contained" color="primary" onClick={_save}>Simpan</Button>
		    		</Grid>
		    		<Grid item xs={6} className={css(styles.w100, styles.algCen)}>
		    			<Button variant="contained" color="secondary">Hapus</Button>

		    		</Grid>
		    	</Grid>
		   
		    </Container>
		
		);
}
