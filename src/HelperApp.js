import AsyncStorage from '@react-native-async-storage/async-storage';
import {getByID, save} from './HelperData'

export const login = (id) =>{
	return getByID('app').then((res)=>{
		res.userID = id
		console.log("login success ")
		console.log(res)
		res.id = "app"
		return save(res)
	}).catch(()=>{
		let res = {}
		res.userID = id
		res.id = "app"
		res.settings = {}
		return save(res)
	})

}
export const logout = () =>{
	return getByID('app').then((res)=>{
		console.log("logout...")
		res.userID = undefined
		res.id = "app"
		return save(res)
	}).catch(()=>{
		let res = {}
		res.userID = id
		res.id = "app"
		res.settings = {}
		return save(res)
	})

}

export const loginExist =(callback)=>{
	getByID('app').then((res)=>{
		console.log(res)
		console.log("login exist...")
		if(res.userID != undefined)
			callback(res.userID, res)
	}).catch(()=>{
		let res = {}
		res.settings = {}
		save(res)
	})
}