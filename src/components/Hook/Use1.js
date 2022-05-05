import React, { useEffect, useRef} from 'react'	
import { useSelector, useDispatch } from 'react-redux'
import {save } from '../../HelperData'


export const useAutoSave = (user, title, data, callback)=>{
	const dispatch = useDispatch()
	const dataRef = data.map((v)=>{return{ref:useRef(),data:v}})
	useEffect(()=>{
		dataRef.forEach((v)=>v.ref.current = v.data.content)
	},[...data.map((v)=>v.content)])
	useEffect(()=>saveOnUnmount,[])
	const saveOnUnmount= ()=>{
		console.log("unmount....")
		let clone = JSON.parse(JSON.stringify(user))
		let d = {}
		dataRef.forEach((v)=>d[v.data.name] = v.ref.current)
		clone[title] ={
			table: d
		}
		if(callback)
			callback(clone)

		save(clone)
	}
	return saveOnUnmount
}

export const useReduxData = (data)=>{
	data.replace('user','editedData').replace('dataAnak','editedDataAnak')
	const dtName = ['editedData',
	'editedDataAnak',
	'pengukuranDataID',
	'pengukuranData',
	'pengukuranDataAnak',
	'dataAnakTemplate']
	const reduxData = data.filter((v)=>dtName.includes(v)).map((v)=>useSelector(state=> state.posyanduData[v]))
	//console.log("reduxData", reduxData)
	return reduxData

}