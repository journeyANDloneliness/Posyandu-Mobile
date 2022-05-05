import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';

import {Container, TextField, MenuItem, Button, List, ListItem, IconButton} from '@material-ui/core';
import { Add, Trash, CaretUp, CaretDown } from "react-ionicons"

import Pagination from '../components/Pagination'
import { useReduxData } from '../components/Hook/Use1'
import { StyleSheet , css } from 'aphrodite';
import { Popipo3 } from '../components/Popipo';
import styles from '../styles/Style'
import { UpDown } from '../components/ComponentCollection'

export default function ComponentLayer(props) {
	const up = (idx)=>{
		let temp = [...props.list]
		temp.order(idx, true)
		props.setList(temp)
	}
	const del =(idx)=>{
		let temp = [...props.list]
		temp.splice(idx, 1)
		props.setList(temp)
	}
	const down = (idx)=>{
		let temp = [...props.list]
		temp.order(idx)
		props.setList(temp)
	}
	let o = ['text', 'table', 'line', 'rect'].toObj(0)
	return <div className={css(styles.pad4, styleA.con)}>
		{props.list.map((v,i)=>{
			if(o[v.props.type] || o[v.props.type] === 0 )
				o[v.props.type]++
			return <Layer key={i} type={v.props.type} number={o[v.props.type]} trashClick={()=>del(i)} upClick={()=>up(i)} downClick={()=>down(i)} />
		})}
	</div>
}

const Layer = (props)=>{

	return <span className={css( styleA.f)}>
		<span className={css(styles.pad2, styleA.fc)}>{props.number}</span>
		<span className={css(styles.pad2, styleA.fc)}>{props.type}</span>
		<span className={css(styleA.fc)}>
		<UpDown trashClick={props.trashClick} upClick={props.upClick} downClick={props.downClick} />
		</span>
	</span>
}

const styleA = StyleSheet.create({
	con:{
		position: "fixed",
		backgroundColor: "rgb(173 173 173 / 64%)",
		right: 10,
		zIndex: 1,
		width: 150,
		padding: 4,
		color: "black",
		bottom: 0
	},
	f:{display:"flex", backgroundColor:"rgb(180 180 180 / 64%)" },
	fc:{flex:1}
})