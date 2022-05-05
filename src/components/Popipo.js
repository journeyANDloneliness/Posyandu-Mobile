import React, {useState, useEffect, useRef, createRef, Fragment}  from "react"
import ReactDOM from 'react-dom'

import { TextField, Button, Container, Box, Popover,List , ListItem, ListItemText} from '@material-ui/core';
import { StyleSheet , css } from 'aphrodite';
import { save , getById} from '../HelperData';
import { useSelector, useDispatch } from 'react-redux'
import { setEditedData } from '../store/PosyanduData'

import styles from '../styles/Style'

import {showMsg2, showBackdrop, closeBackdrop } from '../HelperUi'

export default function Popipo(props){
	
	 
	const closePop = () => {

		if(props.onClose)
		props.onClose()
	};

	return (
		<Popover
			
			open={ Boolean(props.anchor)}
			anchorEl={props.anchor}
			onClose={closePop}
			anchorOrigin={{
			  vertical: 'bottom',
			  horizontal: 'center',
			}}
			transformOrigin={{
			  vertical: 'top',
			  horizontal: 'center',
			}}>
			  {props.useList ? <List component="nav" >
			  	{props.listItems.map((v, i)=>
				<ListItem key={i} onClick={()=>v.fun(props.oList)} button>
				  <ListItemText primary={v.text} />
				</ListItem>)
				}
			  </List> : props.children}
		</Popover>
			)
}

export const Popipo2 = (props)=>{
	const [popActive, setPopActive] = useState(false)
	useEffect(()=>{
		props.par.onClick=(ev)=> setPopActive(popActive ?  null : ev.currentTarget)
	},[])
	return <span> {props.par}
				<Popipo {...props}/>
			</span>
}

export const Popipo3 = (props)=>{
	const [popActive, setPopActive] = useState(null)
	const [par, setPar] = useState(props.par)
	//const ownRef = createRef()
	useEffect(()=>{
		//setPar(ReactDOM.findDOMNode(this).parentNode)
		setPar(props.par)
	},[props.par])
	useEffect(()=>{
		if(par.current){
			//console.log("par exist",par)
			let fbf = par.current.onclick
			par.current.onclick = (ev)=>{
				fbf()
				console.log(ev)
				setPopActive(popActive ?  null : par.current)
			} 
		}
	},[par])
	return <Fragment>
		<props.com onClose={()=>setPopActive(null)} anchor={popActive} {...props}>
			{props.children}
		</props.com>
	</Fragment>
}

export const AnyPoper = (props)=>{
	const [popActive, setPopActive] = useState(false)
	const [par, setPar] = useState(null)
	const p = useRef()
	useEffect(()=>{
		//setPar(ReactDOM.findDOMNode(this).parentNode)
		setPar(document.getElementById(props.par))
		p.current = popActive
	},[])
	useEffect(()=>{
		if(par){
			//console.log("par exist",par)
			par.onclick = (ev)=> {

				ev.preventDefault();
				p.current = !p.current
			}
		}
	},[par])
	return <span onClick={ev=> ev.stopPropagation()}>{ p.current ? props.children : null }</span>
}

/*Popipo.propTypes = {
	listItems: PropTypes.Array.isRequired,
	anchor: PropTypes.object.isRequired,
};*/

export const MakePopipo = (hocProps)=>{
	const [popActive, setPopActive] = useState(false)

	return (parent)=>(props)=>
		<parent {...hocProps} onClick={(ev)=> setPopActive(popActive ?  null : ev.currentTarget)}>
			<Popipo {...props} onClose={()=>setPopActive(null)} anchor={popActive} />
		</parent>
}

