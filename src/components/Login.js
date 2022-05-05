import React, {useState, useEffect} from 'react'
//import { StyleSheet,  View,  EditText } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { setUserID, setSettings } from '../store/AppData'
import { setEditedData} from '../store/PosyanduData'

import {save, getByID } from '../HelperData'
import { login, logout, loginExist} from '../HelperApp'


export default  (props)=>{
	const [onStart, setOnStart] = useState(true)
	const dispatch = useDispatch()
	const userID = useSelector(state => state.appData.userID)
	const user = useSelector(state => state.posyanduData.editedData )
	const settings = useSelector(state => state.appData.settings)

	useEffect(()=>{
		console.log("on Start...")

		getByID('app').then((res)=>{
			if(!(res.settings || {}).autoLogin){
				logout().then(()=>{
					console.log("onStart")

					dispatch(setUserID(undefined))
				})
			}
			dispatch(setSettings(res.settings))
			console.log("on Start...2")

			props.goTo('Home')
		})
	},[onStart])

	useEffect(()=>{
		props.login(false)

		if(userID == undefined){
		loginExist((id)=>{
			//dispatch(setUserID(id))
			console.log("login does exist...")
			console.log("auto login",settings.autoLogin)
			getByID(id).then((res)=>{
				dispatch(setEditedData(res));
				console.log("get data1...", res.id)
				dispatch(setUserID(res.id))
				props.login(true)

			});
			
		})}
		else {
			getByID(userID).then((res)=>{

				dispatch(setEditedData(res));
				console.log("get data2...")
				props.login(true)

			});
			
		}

		console.log("effect running...")

	},[userID])



	return (<div></div>)

}