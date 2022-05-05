import React, {useState, useEffect, useRef, createRef, Fragment, Children}  from "react"
import ReactDOM from 'react-dom'

import { TextField, Button, Container, Box, Popover,List , ListItem, ListItemText} from '@material-ui/core';
import { StyleSheet , css } from 'aphrodite';
import { save , getById} from '../HelperData';
import { useSelector, useDispatch } from 'react-redux'
import { setEditedData } from '../store/PosyanduData'

import styles from '../styles/Style'

import {showMsg2, showBackdrop, closeBackdrop } from '../HelperUi'

export const StateClear =(props)=>{
	const ch = Children.toArray(props.children)
	const [data, setData] = useState({})
	const [switchD, setSwitchD] = useState(true)

	useEffect(()=>{
		setData(switchD ? props.v1 : props.v2)
	},[switchD])
 
	const Ch1 = ch[0].type
	const Ch2 = ch[1].type
	return <Fragment>
		<Ch1 onClick={()=> setSwitchD(!switchD)} {...ch[0].props}/>
		<Ch2 {...ch[1].props} {...data}/>
	</Fragment>
}