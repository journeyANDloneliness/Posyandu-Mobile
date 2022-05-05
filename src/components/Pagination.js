import React,  { useState , useEffect, Fragment} from 'react'; 
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
import PropTypes from 'prop-types';


import {Trash, Pencil, ArrowDownOutline, ArrowUpOutline,
 CaretBackOutline, CaretForwardOutline} from "react-ionicons"


import styles from "../styles/Style"




export default function Pagination(props){
	// body...

	//const [props.limit, setLimit] = useState(props.props.limit) 
	const [current, setCurrent] = useState(0)
	const [exceedL, setExceedL] = useState(true)
	const [exceedR, setExceedR] = useState(false)

	useEffect(()=>{
		setExceedR(current + props.limit > props.size)
		setExceedL(current - props.limit < 0) 
		props.set(current, current+props.limit)
		console.log("props.limit effect")
	},[current])

	const nextData = ()=>{
		if(current + props.limit > props.size) return;
		setCurrent(current + props.limit)
		
	}
	const prevData = ()=>{
		if(current - props.limit < 0) return;
		setCurrent(current - props.limit)

	}
	return(
		<Container className={css(styles.beautyBox2, styles.algRight, styles.pad0)} >
			<IconButton className={css(styles.pad2)} onClick={prevData} >
				<CaretBackOutline height="14px" width="14px" />
			</IconButton>
			<Typography className={css(styles.fntSz12, stylesA.nowrap)} variant="button">
				[{current+1}-{ current + props.limit} /{ props.size}]
			</Typography>
			<IconButton className={css(styles.pad2)} onClick={nextData} >
				<CaretForwardOutline height="14px" width="14px" />
			</IconButton>
		</Container>);
}

Pagination.propTypes = {
  	limit: PropTypes.number.isRequired,
  	set: PropTypes.func.isRequired,
  	size: PropTypes.number.isRequired
};

// WithPagination({paginDataName:"rows"})(SomeTable)
export const WithPagination = (property)=>{
	const paginDataName = property.paginDataName
	return (Component)=>(props)=>{
		const  [paginData, setPaginData] = useState({[paginDataName]:props[paginDataName]})
		const [curr, setCurr] = useState(0)
		const {size, limit, ...other} = props
		//console.log(paginData)
		const setPagin = (current, limit)=>{
			let temp = [...props[paginDataName]]
			if(temp.length > 0)
				temp = temp.slice(current, limit)
			setPaginData({[paginDataName]:temp })
			//console.log(paginData, temp)
			setCurr(current)
		}

		useEffect(()=>{
			setPagin(curr, curr+limit)
		},[props])

		return 	<Fragment>
					<Pagination set={setPagin} limit={props.limit} size={props.size}/>
					<Component {...other} {...paginData}/>
				</Fragment>
	}
}

const stylesA = StyleSheet.create({
	nowrap:{
		whiteSpace: "nowrap"
	}
})

