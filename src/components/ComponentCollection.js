import React, {useEffect, useState, forwardRef} from 'react'
import PropTypes from 'prop-types';

import {Container, TextField, MenuItem, Button, List, ListItem, IconButton} from '@material-ui/core';
import { Add, Trash, CaretUp, CaretDown } from "react-ionicons"

import Pagination from '../components/Pagination'
import { useReduxData } from '../components/Hook/Use1'
import { StyleSheet , css } from 'aphrodite';
import { Popipo3 } from '../components/Popipo';
import styles from '../styles/Style'

export const UpDown =(props)=>{
	return  <div className={css(props.vertical ? styles.flexColumn: styles.flexRow)}>
				<IconButton  className={css(styles.pad0)} onClick={props.upClick}>
					<CaretUp height="12px" width="12px"/>
				</IconButton>
				{props.trashClick?<IconButton  className={css(styles.pad0)} onClick={props.trashClick}>
					<Trash height="12px" width="12px"/>
				</IconButton>:null}
				<IconButton  className={css(styles.pad0)} onClick={props.downClick}>
					<CaretDown height="12px" width="12px"/>
				</IconButton>
			</div>
}

export const IoniconButton =forwardRef((props, ref)=>{
	const {icon, ...other} = props
	return  <IconButton {...other} ref={ref}>
				<props.icon height="14px" width="14px"/>
			</IconButton>
})
export const IoniconButtonBig =forwardRef((props, ref)=>{
	const {icon, ...other} = props
	return  <Button {...other} ref={ref} color="primary" variant="contained">
				<props.icon height="14px" width="14px" color="white"/>
			</Button>
})

export const TextFieldChoice = forwardRef((props,ref)=>
<TextField  InputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small" select 
 label={props.label} value={props.value}
   ref={ref} {...props}>
	  {choices.map((v) => (
		<MenuItem key={v.v} value={v.v}>
		  {v.label}
		</MenuItem>
	  ))}
</TextField>)
TextFieldChoice.propTypes = {
	choices: PropTypes.array.isRequired
}

						
export const TextFieldEdit = forwardRef((props,ref)=>
<TextField  inputProps={{input:styles.fntSz8}} className={css(styles.marT8)} variant="outlined" size="small"
 label={props.label} value={props.value} ref={ref} {...props}/>)

export const TextFieldDate= forwardRef((props,ref)=>
<TextField inputProps={{input:styles.fntSz14}} className={css(styles.marT8)} variant="outlined" size="small"    InputLabelProps={{
	  shrink: true,
	}} format="dd/mm/yyyy" label={props.label}  value={props.value} 
	ref={ref} type="date" {...props}/>)