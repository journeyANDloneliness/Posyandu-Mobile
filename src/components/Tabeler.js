import React,  { useState , useEffect, Fragment, createRef, forwardRef, Children} from 'react'; 
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import { TextField, Button, Container, Box, Paper, Grid, FormControl, RadioGroup,
 FormControlLabel, Radio, FormLabel, Divider, Popover, Typography, MenuItem, 
ListItemText, ListItem, List, IconButton, Table,  TableContainer, TableBody,
TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core';
import { StyleSheet , css } from 'aphrodite';
import { useSelector, useDispatch } from 'react-redux'
import { setEditedDataAnak, setEditedData, setPengukuranData, 
	setPengukuranDataAnak, setPengukuranDataID } from '../store/PosyanduData'
import Pagination from '../components/Pagination'
import StyledButton from '../components/StyledButton'
import {Trash, Pencil, ArrowDownOutline, 
	Add, Settings, ArrowUpOutline, CarretBackwardOutline, CarretforwardOutline} from "react-ionicons"

import {showMsg2, showBackdrop, closeBackdrop} from '../HelperUi'
import {save , getDataPengukuran} from '../HelperData'
import { useAutoSave } from '../components/Hook/Use1'

import styles from "../styles/Style"
import { IoniconButton, UpDown } from "../components/ComponentCollection"
import Popipo, { Popipo3} from "../components/Popipo"

const styleA = StyleSheet.create({
	buttonExpand :{
		borderRadius: "0px  100px 100px 0px",
		padding: 0,
		minWidth: 0,
		fontSize: 1,
		position: "absolute",
		backgroundColor: "#e6e9f7",
		boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
	}
})
export const TableCONSTANT = {
	EditColumns : 0,
	EditRows : 1,
	EditOneRow: 2,
	EditOneColumn: 3
}
Object.freeze(TableCONSTANT)

export const GenericTableCon1 = (props)=>{
	return <TableContainer className={css(styles.pad0)} component={Paper}>
		  <Table   className={css(styles.pad0)}  aria-label="caption table">
				{props.children}
		  </Table>
			</TableContainer>
}

const GenericTableHead1 = (props)=>{
	return	<TableHead>
			  <TableRow className={css(styles.tableRowHead)}>
					{ props.comCellHeader.map((Com, i)=> 
						props.show[i] ?
						<TableCell className={css(styles.tableCellHead, styles.xBlue)}
						key={i} >
							 <Com execute={props.executer} idx={i} {...props}/> 
							 {/*unames={props.unames} 
							 uname={props.unames[i]} row={props.row}*/} 
						</TableCell>: null)}		  
					 <TableCell className={css(styles.tableCellHead, styles.xBlue)}>
						No
						</TableCell> 
					 {props.columns.map((v)=>
						<TableCell  className={css(styles.tableCellHead, styles.xBlue)}
						key={v.headerName}>
						<span>{v.headerName}</span>
						
						</TableCell>)}
			  </TableRow>
			</TableHead>
}

const GenericTableBody1 = (props)=>{
	return	<TableBody>
				{ props.rows.map((row, index) => (
				<TableRow  className={css(index % 2 == 1 ? styles.cDDD :null)}  key={row.id}>
				{props.show[0] ?<TableCell key={"edit"} className={css(styles.tableCell, styles.pad4 ) }>
					{ props.comCellBody.map((Com, i)=> 
						props.show[i] ?
						
							 <Com key={i} 
							 onClick={(ev)=>props.executer(ev,{uname: props.unames[i], index: index,
							 	id: row.id})} 
							 unames={props.unames} uname={props.unames[i]} row={row} index={index}/> 
						: null)}		
				</TableCell>  : null}
					<TableCell  key={index} className={css(styles.tableCell, styles.pad4 ) }
				  		  align="left">{index+1}</TableCell>
				 	{ props.columns.map((column,i)=>
				  		<TableCell  key={i} className={css(styles.tableCell, styles.pad4 ) }
				  		  align="left">{row[column.headerName]}</TableCell>
				  	)}
				</TableRow>
			  ))}
				
			</TableBody>
}

GenericTableCon1.propTypes = {
	columns: PropTypes.array.isRequired,
	rows: PropTypes.array.isRequired
}

const Iconer = forwardRef((props, ref)=>{
	return <IoniconButton {...props} ref={ref} onClick={props.onClick} icon={props.icon || Pencil} />
})
const IconerTrash = forwardRef((props, ref)=>{
	return <IoniconButton ref={ref} onClick={props.onClick} icon={props.icon || Trash} />
})

const TripleIconer = (props)=>{
	return <Fragment>
		<Iconer {...props} uname={props.unames[0]} icon={Pencil}/>
		<Iconer {...props} uname={props.unames[1]} icon={Add}/>
		<Iconer {...props} uname={props.unames[2]} icon={Trash}/>
	</Fragment>
}

const SomeTableSetuper = (props)=>{
	const bref = createRef()
	const [columnAll, setColumnAll] = useState(props.columns)
	const [columnActiveReal, setColumnActiveReal] = useState(props.columns)
	 

	const setColumns = (col)=>{
		props.setColumns(col)
	}

	return <Fragment>
		<Iconer ref={bref} icon={Settings} onClick={(ev)=>props.execute(ev, props)}/>
		<Popipo3 par={bref} com={Popipo}>
			{props.columnsAll.map((v, i)=>
			<ListItem key={v.headerName} className={css(styles.pad2)}  >
				<Checkbox
				checked={props.columns.map(vv=> vv.headerName).includes(v.headerName)}
				onChange={()=>{props.columns.toggleItem(
					props.columns.filter(vv=> vv.headerName == v.headerName)[0] || v, i);setColumns([...props.columns])}}
				inputProps={{ 'aria-label': 'primary checkbox' }}/>
		  		<ListItemText primary={v.headerName} />
		  		<UpDown
					upClick={()=>{
						props.columnsAll.orderMatch(i,true, props.columns,
							(v,i)=>v.headerName == props.columnsAll[i].headerName, 
							(i,ii)=> props.columnsAll[i].headerName ==  (props.columns[ii] || {}).headerName);
						setColumns([...props.columns])}}
					downClick={()=>{
						props.columnsAll.orderMatch(i,false, props.columns,
							(v,i)=>v.headerName == props.columnsAll[i].headerName, 
							(i,ii)=> props.columnsAll[i].headerName ==  (props.columns[ii] || {}).headerName);
						setColumns([...props.columns])}}/>
			</ListItem>)}
		</Popipo3>
	</Fragment>
}

const TableComposer1 = ()=>{
	return (TableCon, TableHead, TableBody)=>
		(props)=>
			<Table {...props.con} {...props}>
				<TableHead {...props.head} {...props} comCellHeader={[]}/>
				<TableBody {...props.body} {...props} comCellBody={[Iconer]}/>
			</Table>
}
const TableWithTableSetuper = ()=>{

	return (TableCon, TableHead, TableBody)=>
		(props)=>{
			const {columns, ...other } = props
			const [realColumns, setRealColumns]= useState(columns)
			const setColumns = (columns)=>{
				setRealColumns(columns)
			}
			return	<Table {...props.con}  {...other}>
				<TableHead {...props.head} columns={realColumns} {...other} 
					columnsAll={props.columns} setColumns={setColumns} comCellHeader={[SomeTableSetuper]}/>
				<TableBody {...props.body} columns={realColumns} {...other} comCellBody={[Iconer, IconerTrash]}/>
			</Table>
		}
}

export const WithHiderSetup = ()=>{
	return (Table)=>(props)=>{
		const {head, body,...other} = props
		const [h, setH] = useState(head)
		const [b, setB] = useState(body)
		const [toggle, setToggle] = useState(false)

		useEffect(()=>{
			let hh = props.head, bb = props.body
			let t=toggle?[1,1]:[0,0]
			window.changeDeepProperty("show",t,hh)
			window.changeDeepProperty("show",t,bb)
			setH(hh)
			setB(bb)
		},[props])

		return	<Fragment>
		<Iconer className={css(styleA.buttonExpand)} onClick={()=>setToggle(!toggle)} icon={Add}/>
		<Table {...other} head={h} body={b}/>
		</Fragment>
	}
}

//<GenericTable1 con={{}} rows={rows}  columns={columns} head={{}}  body={{unames:["setColumn","setRow","edit","delete","modify"],executer: executer, show:[1,1]}}/>
export const GenericTable1 = TableComposer1()(GenericTableCon1, GenericTableHead1, GenericTableBody1)
export const GenericTableWithTableSetuper = TableWithTableSetuper()(GenericTableCon1, GenericTableHead1, GenericTableBody1)