import React,  { useState , useEffect} from 'react'; 
//import { ImageBackground, StyleSheet,
 // Modal, View, TextInput, EditText } from 'react-native';
//import { Button , Text} from 'react-native-elements';
import { DataGrid } from '@material-ui/data-grid';
import { TextField, Button, Container, Box, Paper, Grid, FormControl, RadioGroup,
 FormControlLabel, Radio, FormLabel, Divider, Popover, Typography, MenuItem, 
ListItemText, ListItem, List, IconButton, Table,  TableContainer, TableBody,
TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core';
import { StyleSheet , css } from 'aphrodite';
import { useSelector, useDispatch } from 'react-redux'
import { setEditedDataAnak, setEditedData, setPengukuranData, 
	setPengukuranDataAnak, setPengukuranDataID, setDataAnakTemplate } from './store/PosyanduData'
import Pagination from './components/Pagination'
import StyledButton from './components/StyledButton'
import {Trash, Pencil, ArrowDownOutline, 
	Add, Settings, ArrowUpOutline, CarretBackwardOutline, CarretforwardOutline} from "react-ionicons"

import {showMsg2, showBackdrop, closeBackdrop} from './HelperUi'
import {save , getDataPengukuran} from './HelperData'
import { useAutoSave } from './components/Hook/Use1'
import Template1 from "./templates/Template1"
import { exportPDF } from "./task/PDFMaker"

import styles from "./styles/Style"
import SmoothScrollbar from "./components/SmoothScrollbar"


export default (props) =>{

	const pengukuranData = useSelector(state => state.posyanduData.pengukuranData)
	const user = useSelector(state => state.posyanduData.editedData)

	const [rows, setRows] = useState(pengukuranData.January != undefined ? pengukuranData.January : {})
	

	const [realRow, setRealRows] = useState(Object.entries(rows))
	const [paginRealRow, setPaginRealRows] = useState(realRow.slice(current, current+limit))
	const dispatch = useDispatch()

	const [selected, setSelected] = useState([])
	const [selectActive, setSelectActive] = useState(false)

	const [limit, setLimit] = useState(user.settings2 ? user.settings2.table.limit : 16)
	const [current, setCurrent] = useState(0)

	const [f, setF] = useState("")
	const [flip, setFlip] = useState(1)

	const [year, setYear] = useState(user.settings2 ? user.settings2.table.year : "2021")
	const [month, setMonth] = useState(user.settings2 ? user.settings2.table.month : "January")
	const [monthAll, setMonthAll] = useState(user.settings2 ? user.settings2.table.monthAll : true )

	useAutoSave(user,"settings2",[{name:"year", content:year},
		{name:"month", content: month},
		{name:"monthAll", content: monthAll},
		{name:"limit",content:limit}],(v)=>dispatch(setEditedData(v)))

	useEffect(()=>{
		setRealRows(Object.entries(rows))
		setPaginRealRows(Object.entries(rows).slice(current, current+limit))
	},[rows])
	useEffect(()=>{
		filterMonth(monthAll? 'Semua' : month)
	},[pengukuranData])
	useEffect(()=>{
		getDataPengukuran(user.id,year).then((res)=>{
			dispatch(setPengukuranData(res))
		})
	},[])
	const pagination = (i,ni) =>{
		setCurrent(i)
		setPaginRealRows(realRow.slice(i, ni))
		console.log(i, ni)
		
	}


	const filterYear = (v)=>{
		setYear(v)
		getDataPengukuran(user.id,v).then((res)=>{
			dispatch(setPengukuranData(res))
			//filterMonth(v, res)
		})
	}

	const filterMonth = (v, data)=>{
		setMonth(v)
		data = data || pengukuranData 
		let show={}
		
		if(v == "Semua") {
			console.log("month", v)
			Object.entries(data).forEach((v)=>{
					if(v[0] !== 'id')
					Object.entries(v[1]).forEach((vv)=>{
						show[vv[0]] = vv[1] 
					})
				})
			setMonthAll(true)
		}else {
			show = data[v] || {}
			setMonthAll(false)
		}
		console.log("m",data[v])
		setRows(show )
	}

	const editSelected = (ev, id, r )=>{
		dispatch(setPengukuranDataID(id))
		getDataPengukuran(user.id,year).then((res)=>{
			dispatch(setPengukuranData(res))
			//setRows(res[month])
			let o = monthAll ? {}: res[month][id];
			
			if(monthAll) 
				for(var i=0;i<monthList.length;i++){
					//console.log("month",res[monthList[i]])
					if((res[monthList[i]] || {})[id]){
						o = res[monthList[i]][id]
						break
					}
				}
			dispatch(setPengukuranDataAnak(o))
			props.goTo('ViewPengukuranAnak', "TablePengukuran")
		})
	}

	const newData = ()=>{
		dispatch(setPengukuranDataID(undefined))
		dispatch(setPengukuranDataAnak({}))
		props.goTo('ViewPengukuranAnak', "TablePengukuran")
	}
	const sortColumn = (ev, field) =>{
		setFlip(flip * -1)

		setRealRows( Object.entries(rows).sort((v1,v2)=>{
			return v1[1][field].localeCompare( v2[1][field] ) * flip
		}))

		setPaginRealRows(realRow.slice(current, current+limit))

	}
	const delSelectActive = ()=>{
		showMsg2({text:"anda yakin?",showOk:true,show:true,
				callBack:()=>{
			let cloned = JSON.parse(JSON.stringify(pengukuranData))
			if(cloned[month] === undefined )cloned[month] = {}
			let k = Object.keys(cloned[month]).filter((v, i) => selected.includes(v))
			k.forEach((v) =>{
				let m = month

				delete cloned[m][v]
			})
			if(monthAll) {
				let all = {}
				let a=Object.entries(cloned).filter(v=>v[0]!=="id")
				a.forEach(v=>all={...all, ...v[1]})
				k = Object.keys(all).filter((v, i) => selected.includes(v))
				let todel=[]
				a.forEach((v,i)=>{
					k.forEach((vv) =>{
						if(v[1][vv])
						delete cloned[v[0]][vv]
					})
				})
				
			}
			save(cloned).then((res)=>{
				dispatch(setPengukuranData(res))
				setRows(cloned[month])
				showMsg2({text:"data berhasil dihapus",showOk:true,show:true,
					callBack:()=>{console.log("callback..")}})
				
				});
		}})
	}
	const changeSelectActive = (i)=>{
		let c = [...selected]
		if(selected.includes(i))
			c.remove(i)
		else
			c.push(i)
		setSelected(c) 
	}

	const _exportPDF = ()=>{
		exportPDF(Template1, columns.filter(v=> v.field !== "")
			.map(v=> v.field), paginRealRow, ["DATA PENGUKURAN", window.tanggalSekarang('-')],
			(template)=> dispatch(setDataAnakTemplate(template)) )
		props.goTo('BuatTemplate','TablePengukuran')
	}
	return (
			<Container className={css(styles.pad0)}>
			<Container>
    			<TextField  inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="Tahun"  value={year} onChange={(ev)=>{filterYear(ev.target.value)}} select>
		          {yearList.map((v) => (
		            <MenuItem key={v} value={v}>
		              {v}
		            </MenuItem>
		          ))}
    			</TextField>
    			<TextField  inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" label="Bulan"  value={monthAll ? "Semua" : month} onChange={(ev)=>{filterMonth(ev.target.value)}} select>
		          <MenuItem key={"all"} value={"Semua"}>
		              Semua
		            </MenuItem>
		          {monthList.map((v) => (
		            <MenuItem key={v} value={v}>
		              {v}
		            </MenuItem>
		          ))}
    			</TextField>
			</Container>
			<Container>
					<IconButton  variant="contained" color="primary" onClick={newData}>
						<Add/>
					</IconButton>
					<Button  variant="contained" color="primary" onClick={()=>setSelectActive(!selectActive)}>
						{selectActive ? "Selesai" : "Pilih"}
					</Button>
					<Button  variant="contained" color="primary" onClick={_exportPDF}>
						Export PDF
					</Button>
					{ selectActive ? <IconButton onClick={delSelectActive} disabled={selected.length < 1}>
						<Trash />
					</IconButton>  : null}
					
					<Container>
						<Pagination limit={limit} set={pagination} size={realRow.length} />
					</Container>
			</Container>
			<SmoothScrollbar overscroll height={document.documentElement.clientHeight - 200}>
			<TableContainer className={css(styles.pad0)} component={Paper} style={{width:"max-content", overflowX:"visible"}}>
				  <Table   className={css(styles.pad0)}  aria-label="caption table">

					<TableHead>
					  <TableRow>

					  		 {columns.map((v)=>
								<TableCell  className={css(styles.tableCell)} 
								onClick={(ev)=> {setF(v.field);sortColumn(ev, v.field)}} key={v.headerName}>
								<span>{v.headerName}</span>
								{ f == v.field && v.field != ""?
								<IconButton className={css(styles.posAbs, styles.pad0)} disabled>
									{ flip == -1 ? <ArrowUpOutline height="12px" width="12px"/> 
									: <ArrowDownOutline height="12px" width="12px"/>}
								</IconButton> : null }
								</TableCell>)}
					  </TableRow>
					</TableHead>
					<TableBody>
						{ paginRealRow.map((row, index) => (
						<TableRow className={css(styles.pad2)} key={row[0]}>
						  <TableCell className={css(styles.tableCell)} align="right">
								<IconButton onClick={(ev)=>editSelected(ev, row[0], row)}>
									<Pencil height="14px" width="14px"/>
								</IconButton>
						  </TableCell>
						  <TableCell  className={css(styles.tableCell)}  scope="row">
							{selectActive ? 
								<Checkbox
									checked={selected.includes(row[0])}
									onChange={()=>changeSelectActive(row[0])}
									inputProps={{ 'aria-label': 'primary checkbox' }}/>
								: index+1+current }
						  </TableCell>
						  <TableCell  className={css(styles.tableCell)}  align="left">{row[1].nama}</TableCell>
						  <TableCell  className={css(styles.tableCell)}  align="left">{row[1].tanggalCheck}</TableCell>
						  <TableCell  className={css(styles.tableCell)} align="right">{row[1].beratBadan}</TableCell>
						  <TableCell  className={css(styles.tableCell)} align="right">{row[1].tinggiBadan}</TableCell>
						  <TableCell  className={css(styles.tableCell)} align="left">{row[1].HC}</TableCell>
						  <TableCell  className={css(styles.tableCell)} align="left">{row[1].MUAC}</TableCell>
	

						</TableRow>
					  ))}
					</TableBody>
				  </Table>
				</TableContainer>
				</SmoothScrollbar>
			</Container>
		);
}

const columns = [ 
  { field: '', headerName: '', width: 10 },
  { field: '', headerName: 'No', width: 10 },
  {
	field: 'nama',
	headerName: 'Nama',
	width: 150,
	editable: true,
  },
  {
	field: 'tanggalCheck',
	headerName: 'Check',
	width: 150,
	editable: true,
  },
  {
	field: 'beratBadan',
	headerName: 'Berat Badan',
	width: 150,
	editable: true,
  },
  {
	field: 'tinggiBadan',
	headerName: 'Tinggi Badan',
	width: 150,
	editable: true,
  },
  {
	field: 'HC',
	headerName: 'HC',
	width: 150,
	editable: true,
  },
  {
	field: 'MUAC',
	headerName: 'MUAC',
	width: 150,
	editable: true,
  }
];

const monthList = ["January", "February","March","April","Mei","June","July","August","September",
"October","November","December"]
const yearList = Array.from({length:50}, (v,i)=> i).map((v)=>{
	return 2000 + v
})