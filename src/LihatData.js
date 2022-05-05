import React , {useState, useEffect} from 'react'; 
//import { StyleSheet, Text, Button, View, TextInput,
 //EditText, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch } from 'react-redux'
import { setUserID } from './store/AppData'
import { setEditedData } from './store/PosyanduData'

import { showMsg2 } from './HelperUi'

import {Container, Box, Button, Typography, IconButton, List, ListItem, ListItemText, ListItemIcon} from "@material-ui/core"
import {Trash, Pencil} from "react-ionicons"
import { StyleSheet, css } from 'aphrodite';

import {delByKey, getByID, getAllKeys} from './HelperData'
import { login, logout, loginExist} from './HelperApp'


function useGetByID(id) {
	const [o, setO] = useState({})
	var res = async () => {
	    try {
	      	const value = await AsyncStorage.getItem(id)
	      	setO(value != undefined ? JSON.parse(value) : {});
	    } catch(e) {
	        console.log(e);
	    }
	};
	res();
	return [o, setO]
}

function useGetItems(init) {
	const [o, setO] = useState(init)
	
	useEffect(() => {
		getAllKeys().then((res)=> setO(res));
		
	},[]);

	return [o, setO]
}




export default  (props)=>{

	const dispatch = useDispatch()
	const continu = useSelector((state)=> state.modal.continu)
	const [items, setItems] = useGetItems([])
	const [single, setSingle] = useState({id:"",dt:{user:"",password:""}})
	const edit = ( id)=>{
		console.log(id)
		getByID(id).then((res)=>{

			dispatch(setEditedData(res));
			props.goTo('InputNamaInstansi',"LihatData")
		});
	}
	const del = (id)=>{
		showMsg2({show:true, showOk:true, showCancel:true, text:"yakin hapus data?",callBack:(continu)=>{
			if(!continu)return;
			delByKey(id)
			getAllKeys().then((res)=>setItems(res))
		}});

	}

	const view = ( id)=>{
		console.log(id)
		getByID(id).then((res)=>{
			login(id)
			dispatch(setUserID(id))
			dispatch(setEditedData(res));
			props.goTo('DetailInstansi')
		});
	}
	const listCom =  items.map((i) => 
			 	<ListItem key={i} >
		          	<ListItemText primary={i.replace("@posyandu_data","").substring(5)}
		          		onClick={()=>view(i)} />
		        
	              	<IconButton onClick={()=>edit(i)}>
	            		<Pencil />
	          		</IconButton>
	                <IconButton onClick={()=>del(i)}>
	            		<Trash />
	          		</IconButton>
          		</ListItem> ); 
	return (
		<Container>
			<Container>
		      	<List component="nav" aria-label="secondary mailbox folders">
		        	{ listCom }
		      	</List>
			</Container>
		</Container>
		);
	
	
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },  
  listme: {
   display: "flex",
   flexDirection: "row",
   paddingTop: 22
  },
  itemB:{
    flex: 0.2,
  },
  item: {
    color: "#fff",
  	backgroundColor: "#000",
    padding: 10,
    fontSize: 18,
    height: 44,
    flex: 1,
    flexGrow: 4
  },
});