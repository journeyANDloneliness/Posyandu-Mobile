import React,  { useState , useEffect, useLayoutEffect} from 'react'; 
//import { ImageBackground, StyleSheet,
 // Modal, View, TextInput, EditText } from 'react-native';
//import { Button , Text} from 'react-native-elements';
import { DataGrid } from '@material-ui/data-grid';
import { TextField, Button, Container, Box, Paper, Grid, FormControl, RadioGroup,
 FormControlLabel, Radio, FormLabel, Divider, Popover, Typography,
ListItemText, ListItem, List, IconButton, Table,  TableContainer, TableBody,
TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core';
import { StyleSheet , css } from 'aphrodite';
import { useSelector, useDispatch } from 'react-redux'
import { setEditedDataAnak, setEditedData, setPengukuranDataID, setPengukuranDataAnak, setDataAnakTemplate } from './store/PosyanduData'
import Pagination from './components/Pagination'
import {Trash, Pencil, ArrowDownOutline, CaretUp, CaretDown,
	Add, Settings, ArrowUpOutline, CarretBackwardOutline, CarretforwardOutline} from "react-ionicons"

import {showMsg2, showBackdrop, closeBackdrop} from './HelperUi'
import {save } from './HelperData'

import styles from "./styles/Style"
import {useReduxData} from "./components/Hook/Use1"
import ScrollBar from "./components/ScrollBar"
import Popipo from "./components/Popipo"
import SmoothScrollbar from "./components/SmoothScrollbar"
import Template1 from "./templates/Template1"
import { exportPDF } from "./task/PDFMaker"


export default (props)=>{
	const [user] = useReduxData(['user'])

	const [rows, setRows] = useState(user.dt.dataAnak != undefined ? user.dt.dataAnak : {})
	const [realRow, setRealRows] = useState(Object.entries(rows))
	const [paginRealRow, setPaginRealRows] = useState(realRow.slice(current, current+limit))
	const dispatch = useDispatch()
	const [anchorEl, setAnchorEl] = useState(null);
	const [pop1Active, setPop1Active] = useState(false)
	const [selected, setSelected] = useState([])
	const [selectActive, setSelectActive] = useState(false)

	const [columnReal, setColumnReal] = useState(columns.filter((v)=> v.field!== '' ).map((v)=>v.field))
	const [columnActiveReal, setColumnActiveReal] = useState(columnReal)
	const [fieldSettings, setFieldSettings] = useState((user.settings || {}).fieldSettings || columnReal.map((v)=>{return{name:v,active:true}}))

	const [usePagination, setUsePagination] = useState(user.settings ? user.settings.table.usePagination : false)
	const [limit, setLimit] = useState(user.settings ? user.settings.table.limit || 1000 : 1000)
	const [current, setCurrent] = useState(0)

	const [f, setF] = useState("")
	const [flip, setFlip] = useState(1)

	const [showLeftOpt,setShowLeftOpt] = useState(user.settings ? user.settings.table.showLeftOpt : false)
	const [showHeader, setShowHeader] = useState(false)
	const [delOneRow, setDelOneRow] = useState(false)
	const showLeftOptRef = React.useRef()
	const usePaginationRef = React.useRef()
	const columnRealRef = React.useRef()
	const columnActiveRealRef = React.useRef()
	const limitRef = React.useRef()

	useEffect(()=>{
		if(user.dt.field){
			let temp=[...columnReal]
			user.dt.field.forEach((v)=>{
				temp.push(v)
				console.log("am i exist?")}
			)

			let temp2 = temp.filter((v)=>{
				console.log(v)
				for(var i=0;i< fieldSettings.length;i++){
					//console.log("actually contain somethin...")
					if(fieldSettings[i].name == v && fieldSettings[i].active) return true
				}
				return false
			})
			setColumnReal(temp)
			setColumnActiveReal(temp2)

		}
		return saveOnUnomunt
		
	},[])
	useEffect(()=>{
		showLeftOptRef.current =showLeftOpt
		usePaginationRef.current = usePagination
		limitRef.current = limit
		columnActiveRealRef.current = columnActiveReal
		columnRealRef.current = columnReal
	},[showLeftOpt, usePagination, limit, columnActiveReal, columnReal])
	const saveOnUnomunt= ()=>{
			console.log("unmount....")
			let clone = JSON.parse(JSON.stringify(user))
			let fSet = columnRealRef.current.map((v)=>{
				let actv = columnActiveRealRef.current.includes(v)
				return {name: v, active: actv}
			})

			clone.settings ={
				fieldSettings : fSet,
				table: {
					showLeftOpt: showLeftOptRef.current,
					usePagination: usePaginationRef.current,
					limit: limitRef.current
				}
			}
			dispatch(setEditedData(clone))
			save(clone)
		}
/*	const [tableLeftPos, setTableLeftPos] = useState(0)
	const [tableTopPos, setTableTopPos] = useState(0)
	const [tableXpos,setTableXpos] = useState(0)
	const [tableH, setTableH] = useState(30000)
	const [tableW, setTableW] = useState(30000)
	const [tableVW, setTableVW] = useState(30000)
	const [tableVH, setTableVH] = useState(30000)
	const [scroller, setScroller] = useState({})*/

	/*useEffect(()=>{
		let el = document.getElementById('table-container')
		let scroller =  document.getElementById("scroller-table")
		console.log("el",el)
		console.log("el w...",el.offsetWidth)
		setTableW(el.offsetWidth)
		setTableH(el.offsetHeight)
		setTableVW(scroller.offsetWidth )
		setTableVH(scroller.offsetHeight )
		setScroller( scroller)
		console.log("el..", document.documentElement.clientWidth )
		console.log("el..", document.documentElement.innerHeight )
		console.log("vw", Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0))
		//setTableLeftPos(-500)
	},[tableW])*/

	useEffect(()=>{
		setRealRows(Object.entries(rows))
		setPaginRealRows(Object.entries(rows).slice(current, current+limit))
		
		console.log('row updated')
	},[rows, user])

	const openPop = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const closePop = () => {
		setAnchorEl(null);
	};

	const newData = () =>{
		dispatch(setEditedDataAnak(undefined))
		props.goTo('ViewDataAnak','TableDataAnak')
	}

	const editSelected = (ev, id)=>{
		//console.log(row)
		dispatch(setEditedDataAnak(id))
		props.goTo('ViewDataAnak','TableDataAnak')
	}
	const editSelectedToPengukuran = (ev, id,nama)=>{
		//console.log(row)
		dispatch(setEditedDataAnak(id))
		if(!nama) nama = rows[id].nama
		dispatch(setPengukuranDataAnak({nama:nama}))

		dispatch(setPengukuranDataID(id+(Math.random() + 1).toString(36).substring(7)))
		props.goTo('ViewPengukuranAnak','TableDataAnak')
	}
	const changeSelectActive = (i)=>{
		let c = [...selected]
		if(selected.includes(i))
			c.remove(i)
		else
			c.push(i)
		setSelected(c) 
	}
	useEffect(()=>{
		if(delOneRow)
			delSelectActive()
		setDelOneRow(false)
	},[delOneRow])

	const changeColumnActiveReal = (i)=>{
		let c = [...columnActiveReal]
		if(columnActiveReal.includes(i))
			c.remove(i)
		else
			c.push(i)
		setColumnActiveReal(c) 
	}

	const delSelectActive = ()=>{
		showMsg2({text:"anda yakin?",showOk:true,show:true, showCancel: true,
				callBack:(c)=>{
					if(!c)return
						let cloned = JSON.parse(JSON.stringify(user))
						if(cloned.dt.dataAnak === undefined )cloned.dt.dataAnak = {}
						let k = Object.keys(cloned.dt.dataAnak).filter((v, i) => selected.includes(v))
						k.forEach((v) => delete cloned.dt.dataAnak[v])
						save(cloned).then((res)=>{
							dispatch(setEditedData(res))
							setRows(cloned.dt.dataAnak)
							showMsg2({text:"data berhasil dihapus",showOk:true,show:true,
								callBack:()=>{console.log("callback..")}})
				
						});
		}})
	}
	useEffect(()=>{
		let t=[["firstEver",{}]]
		if(realRow.length > 0)
			t =realRow.slice(current, current+limit)
		setPaginRealRows(t)
	},[limit])
	const sortColumn = (ev, field) =>{
		setFlip(flip * -1)

		setRealRows( Object.entries(rows).sort((v1,v2)=>{
			return v1[1][field].localeCompare( v2[1][field] ) * flip
		}))
		let t=[["firstEver",{}]]
		if(realRow.length > 0)
		t =	realRow.slice(current, current+limit)
		setPaginRealRows(t)

	}

	const pagination = (i,ni) =>{
		setCurrent(i)
		let t=[["firstEver",{}]]
		if(realRow.length > 0)
		t = realRow.slice(i, ni)
		setPaginRealRows(t)
		console.log(i, ni)
		
	}

	const matchToHeader = (p1, p2) =>{
		console.log(columnReal, p1, p2)
		if(columnReal.indexOf(p1[0]) > columnReal.indexOf(p2[0])) return 1
		if(columnReal.indexOf(p1[0]) < columnReal.indexOf(p2[0])) return -1
		return 0
	}

	const orderTableColumn = (i, up)=>{
		let t=[...columnReal]
		let u=t.splice(i,1)[0]
		console.log(t)
		let v =up? -1:1
		t.splice(i+v ,0,u)
		console.log(t)
		setColumnReal(t)
		let temp2 = t.filter((v)=>columnActiveReal.includes(v))
		setColumnActiveReal(temp2)
	}

	const _exportPDF = ()=>{
		exportPDF(Template1, columnActiveReal, paginRealRow, ["DATA ANAK", window.tanggalSekarang('-')],
			(template)=> dispatch(setDataAnakTemplate(template)) )
		props.goTo('BuatTemplate','TableDataAnak')
	}
	
	return(
			<Container className={css(styles.pad1)} >
			{ //console.log("wwww...",tableW)
			}
			<Container className={css(styles.contentCenter, styles.flexRow, styles.pad0)} >
				<Container className={css(styles.flexColumn, styles.pad2)}>
					<Container className={css(styles.pad0, styles.algLeft)}>
					<Button size="small" variant="contained" color="primary" onClick={newData} className={css(styles.mar1)}>
						<Add color="#FFF" height="18px" width="18px" className={css(styles.marT4)}/>
					</Button>
					<Button size="small" variant="contained" color="primary" onClick={openPop} className={css(styles.mar1)}>
						<Settings color="#FFF" height="18px" width="18px" className={css(styles.marT4)}/>
					</Button>
					<Button  size="small" variant="contained" color="primary" onClick={()=>setSelectActive(!selectActive)} className={css(styles.mar1)}>
						{selectActive ? "Selesai" : "Pilih"}
					</Button>
					{ selectActive ?
					 <span>
					{ selected.length !=1? null:
						<span><IconButton size="small" onClick={(ev)=>editSelected(ev, selected[0])}  disabled={selected.length !=1 }>
						<Pencil />
					</IconButton> 
					<IconButton size="small" onClick={(ev)=>editSelectedToPengukuran(ev, selected[0] )} disabled={selected.length != 1}>
						<Add />
					</IconButton> </span>}
					<IconButton size="small" onClick={delSelectActive} disabled={selected.length < 1}>
						<Trash />
					</IconButton> </span>
					 : null}
					</Container>
					{usePagination?
					<Container className={css(styles.algRight, styles.pag0)}>
						<Pagination className={css(styles.algRight)} limit={limit} set={pagination} size={realRow.length} />
					</Container>: null}
				</Container>
				<Popover
					
					open={ Boolean(anchorEl) }
					anchorEl={anchorEl}
					onClose={closePop}
					anchorOrigin={{
					  vertical: 'bottom',
					  horizontal: 'center',
					}}
					transformOrigin={{
					  vertical: 'top',
					  horizontal: 'center',
					}}>
					  <List component="nav" >
						<ListItem button onClick={_exportPDF}> 
						  <ListItemText primary="Export Data" />
						</ListItem>
						<ListItem button>
						  <ListItemText primary="Hapus Seluruh Data" />
						</ListItem>
						<ListItem button>
						  <TextField label="Limit" value={limit} onChange={(ev)=>{
						  	console.log("hello",ev.target.value )
						  	setLimit(parseInt(ev.target.value) || 0)}}
						   variant="outlined" size="small"/>
						</ListItem>
						<ListItem>
							<Checkbox
							checked={showLeftOpt}
							onChange={()=>setShowLeftOpt(!showLeftOpt)}
							inputProps={{ 'aria-label': 'primary checkbox' }}/>
						  	<ListItemText primary="Lihat Opsi Samping" />
						</ListItem>
						<ListItem>
							<Checkbox
							checked={usePagination}
							onChange={()=>setUsePagination(!usePagination)}
							inputProps={{ 'aria-label': 'primary checkbox' }}/>
						  	<ListItemText primary="Lihat Paginasi" />
						</ListItem>
						
					  </List>
				</Popover>
				<Popipo onClose={()=>setPop1Active(null)} anchor={pop1Active}>
					  <List component="nav" >
							{
							columnReal.map((v, i)=>
							<ListItem key={v} className={css(styles.pad2)}  >
								<Checkbox
								checked={columnActiveReal.includes(v)}
								onChange={()=>changeColumnActiveReal(v)}
								inputProps={{ 'aria-label': 'primary checkbox' }}/>
						  		<ListItemText primary={v} />
						  		<div className={css(styles.flexColumn)}>
						  			<IconButton  className={css(styles.pad0)} onClick={(ev)=>orderTableColumn(i, true)}>
										<CaretUp height="12px" width="12px"/>
									</IconButton>
						  			<IconButton  className={css(styles.pad0)} onClick={(ev)=>orderTableColumn(i, false)}>
										<CaretDown height="12px" width="12px"/>
									</IconButton>
						  		</div>
							</ListItem>)
							}
						
					  </List>
				</Popipo>
			</Container>
				{//style={{left: tableLeftPos, top: tableTopPos+ 145}} 
				}
			<SmoothScrollbar overscroll height={document.documentElement.clientHeight - 144} onScroll={(ev)=>{
					console.log(ev.target.scrollTop)
					if(ev.target.scrollTop < 40)
						setShowHeader(true)
					else
						setShowHeader(false)
				}}
				callBack={(delta,ev)=>{
					console.log(ev)
					if(ev.target.scrollTop > 40)
						setShowHeader(true)
					else
						setShowHeader(false)
				if(delta.y > 40){

					console.log("header hidden...")
					//setShowHeader(true)
				} 
			}}>
			{/*<Container id="scroller-table" className={css(styles.pad2)} 
				onScroll={(ev)=>{
					
					console.log("scrolll",ev.target.scrollLeft)
					setTableXpos(ev.target.scrollLeft)
				}} style={{overflow: "scroll",height: "70vh"}}>

			<ScrollBar x={-2} y={150} width={10} height={tableVH} scrollAt={(((scroller.scrollTop || 0)*100)/tableW)}
				getPosition={(data)=>{
					console.log(data, (data.percentage * data.max) / 100,"table w:", tableW, data.max)
					//setTableTopPos(-((data.percentage * data.max) / 100))
					//setTableW(100)
					scroller.scrollTop = (data.percentage * data.max) / 100
				}} 
				max={tableH} visible={tableVH} horizontal/>

			<ScrollBar x={2} y={-2} width={tableVW} height={10} scrollAt={(((scroller.scrollLeft || 0)*100)/tableW)}
				getPosition={(data)=>{
					console.log(data, (data.percentage * data.max) / 100,"table w:", tableW, data.max)
					//setTableLeftPos(-((data.percentage * data.max) / 100))
					//setTableW(100)
					scroller.scrollLeft = (data.percentage * data.max) / 100
				}} 
				max={tableW} 
				visible={tableVW} horizontal={false}/>*/}

			<TableContainer id="table-container" className={css(styles.pad0,styles.maxContent)} component={Paper}
				 >
				{ showHeader ? 
				<Table className={css(styles.pad0)}  aria-label="caption table">

					<TableHead>
					  <TableRow className={css(styles.tableRowHead)}>

					  		 {columns.map((v)=>
								<TableCell  className={css(styles.tableCellHead, styles.xBlue)} 
								onClick={(ev)=> {setF(v.field);sortColumn(ev, v.field)}} key={v.headerName}>
								<div className={css(styles.table)}>{v.headerName}</div>
								{ f == v.field && v.field != ""?
								<IconButton className={css(styles.posAbs, styles.pad0)} disabled>
									{ flip == -1 ? <ArrowUpOutline height="12px" width="12px"/> 
									: <ArrowDownOutline height="12px" width="12px"/>}
								</IconButton> : null }
								</TableCell>)}
					  </TableRow>
					</TableHead></Table> : null }
				  <Table className={css(styles.pad0)}  aria-label="caption table">

					<TableHead>
					  <TableRow className={css(styles.tableRowHead)}>

					  		 {["","No"].map((v, idx)=>
								{return showLeftOpt || idx !==0 ? <TableCell  className={css(styles.tableCellHead, styles.xBlue)} 
								key={idx}>
								<span className={css(styles.table)}>{showLeftOpt ? v:""}</span>
								{
									(showLeftOpt && idx ===0) || (!showLeftOpt && idx===1)?
									<IconButton  onClick={(ev)=>setPop1Active(ev.currentTarget)}>
										<Settings height="18px" width="18px"/>
									</IconButton>: null
								}								
								</TableCell>: null })}
					  		 {columnActiveReal.map((v, idx)=>
								<TableCell  className={css(styles.tableCellHead, styles.xBlue)} 
								onClick={(ev)=> {setF(v);sortColumn(ev, v)}} key={v}>
								<span className={css(styles.table)}>{v}</span>
								
								{ f == v ?
								<IconButton className={css(styles.posAbs, styles.pad0)} disabled>
									{ flip == -1 ? <ArrowUpOutline height="12px" width="12px"/> 
									: <ArrowDownOutline height="12px" width="12px"/>}
								</IconButton> : null }
								</TableCell> )}
					  </TableRow>
					</TableHead>
					<TableBody className={css(styles.pad2)}>
						{ paginRealRow.map((row, index) => (
						<TableRow className={css(index % 2 == 1 ? styles.cDDD :null)} key={row[0]}>
						{ showLeftOpt ?
						  <TableCell className={css(styles.tableCell2, styles.algCen )} align="left">
								<IconButton  onClick={(ev)=>editSelected(ev, row[0], row)}>
									<Pencil height="18px" width="18px"/>
								</IconButton>
								<IconButton  onClick={(ev)=>editSelectedToPengukuran(ev, row[0],row[1].nama, row)}>
									<Add height="18px" width="18px"/>
								</IconButton>
								<IconButton  onClick={(ev)=>{changeSelectActive(row[0]);setDelOneRow(true)}}>
									<Trash height="18px" width="18px"/>
								</IconButton>
						  </TableCell> : null}

						  <TableCell  className={css(styles.tableCell, styles.pad2)}  scope="row">
							{selectActive ? 
								<Checkbox
									checked={selected.includes(row[0])}
									onChange={()=>changeSelectActive(row[0])}
									inputProps={{ 'aria-label': 'primary checkbox' }}/>
								: index+1+current }
						  </TableCell>
						  {columnActiveReal.map((v,i)=> {

						  	return (row[1].field || {})[v]? <TableCell  key={i} className={css(styles.tableCell, styles.pad4 ) }  align="left">{row[1].field[v]}</TableCell>:
							  <TableCell  key={i} className={css(styles.tableCell, styles.pad4 ) }  align="left">{row[1][v]}</TableCell>
						  })}						  
						</TableRow>
					  ))}
					</TableBody>
				  </Table>
				</TableContainer>
			</SmoothScrollbar>
			</Container>
		
		);
}





/*const styles = StyleSheet.create({
	conView:{
		flexDirection: "row",
		display: "flex",
	},
	conViewChild:{
		flex: 0.5,
		padding: 5
	},
	tableRow:{
		height:5
	}
})*/

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
		field: 'JK',
		headerName: 'JK',
		width: 150,
		editable: true,
	  },
	  {
		field: 'tanggalLahir',
		headerName: 'TTL',
		width: 150,
		editable: true,
	  },
	  {
		field: 'namaIbu',
		headerName: 'Ibu',
		width: 150,
		editable: true,
	  },
	  {
		field: 'namaAyah',
		headerName: 'Ayah',
		width: 150,
		editable: true,
	  },
	  {
		field: 'PIbu',
		headerName: 'Pek Ibu',
		width: 150,
		editable: true,
	  },
	  {
		field: 'PAyah',
		headerName: 'Pek Ayah',
		width: 150,
		editable: true,
	  },
	  {
		field: 'alamat',
		headerName: 'Alamat',
		width: 150,
		editable: true,
	  },
	  {
		field: 'noTelp',
		headerName: 'NoTelp',
		width: 150,
		editable: true,
	  },
	  {
		field: 'beratLahir',
		headerName: 'Berat Lahir',
		width: 150,
		editable: true,
	  },
	  {
		field: 'ket',
		headerName: 'Ket',
		width: 150,
		editable: true,
	  }
	];

export const columnsReal = columns.filter((v)=> v.field!== '' ).map((v)=>v.field)