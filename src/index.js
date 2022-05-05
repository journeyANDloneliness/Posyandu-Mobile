/*import Phaser from 'phaser'
import config from './config'
import './styles/index.scss'

new Phaser.Game(config)
*/


import React from 'react'; 
import ReactDOM from 'react-dom'; 
import InputNamaInstansi from './InputNamaInstansi';
import Home from './Home';
import LihatData from './LihatData';
import DetailInstansi from './DetailInstansi';
import ViewDataAnak from './ViewDataAnak';
import TableDataAnak from './TableDataAnak';
import TablePengukuran from './TablePengukuran';
import ViewPengukuranAnak from './ViewPengukuranAnak';
import Profile from './view/Profile';
import Tentang from './view/Tentang';
import ViewSetup from './ViewSetup';
import BuatTemplate from './view/BuatTemplate';
import store from './store'
import { Provider } from 'react-redux'
/*import { ImageBackground, StyleSheet, 
	Modal, Text, Button, View, TextInput } from 'react-native';
import { Header, ThemeProvider, Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';*/
import {SimpleGlobal} from './Global'


import MsgBox from './components/MsgBox';
import SideBar from './components/SideBar';
import Login from './components/Login';
import bg from './img/bg.png';
//import { NativeRouter, Route, Link } from "react-router-native";
import { StyleSheet, css } from 'aphrodite';
import Header from './components/Header';

import { Container, Paper, Backdrop, CircularProgress } from "@material-ui/core"



const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',

		backgroundColor: "#FFFFFFFE",
		borderRadius: 10,

		elevation: 5,
		minWidth: 220,
		marginTop: 70,
		left: 0,
		right: 0,
		padding: 0,
		height: "100%",
		width: "100%"
	},
	image: {
		flex: 1,
		justifyContent: "center"
	},
	backdrop: {
    	zIndex: 100,
    	color: '#fff',
  	},
  	back:{
  		 backgroundImage: `url(${bg})`,
  		 backgroundSize: "cover",
  		 width:"100%",
  		 height:"100%",
  		 bottom: 0,
  		position:"absolute",
  		zIndex: -100
  	}
});


export default class App extends React.Component{
	state = {view:'Home', viewBef:[], listView:[],viewIndex:0, 
	showSideBar: false, backdrop: false, login: false }

	goTo = (address, bef) =>{

		let b=[...this.state.viewBef]
		if(address == undefined)
			return {
				bef : this.state.viewBef 
			}
		else if(address === 'back'){
			if(this.state.viewBef.length < 1)return
			this.setState({view:b[b.length-1]})
			b.pop()
			this.setState({viewBef:b})
			if(b.length < 1)window.SGlobal.backFunc = null
			return;
		}
		if(bef){
			b.push(bef)
			window.SGlobal.backFunc = ()=>{this.goTo("back")}
		}
		this.setState({view:address, viewBef: b})
		console.log("bef",b)
	}
	constructor(props){
		super(props)
		window.SGlobal.backFunc = ()=>{this.goTo("back")}
	}
	render(){
		var v;
		switch(this.state.view){
			case 'Home':
				v = this.state.login ? <DetailInstansi goTo={this.goTo }/> : < Home goTo={this.goTo}/> 
			break;
			case 'InputNamaInstansi':
				v = <InputNamaInstansi dataInstansi={this.state.dataInstansi} goTo={this.goTo} />
			break;
			case 'LihatData':
				v = <LihatData  goTo={this.goTo} />
			break;
			case 'DetailInstansi':
				v = <DetailInstansi goTo={this.goTo }/>
			break;
			case 'TableDataAnak':
				v = <TableDataAnak goTo={this.goTo}/>
			break;
			case 'ViewDataAnak':
				v = <ViewDataAnak goTo={this.goTo}/>
			break;
			case 'ViewPengukuranAnak':
				v = <ViewPengukuranAnak goTo={this.goTo}/>
			break;
			case 'TablePengukuran':
				v = <TablePengukuran goTo={this.goTo}/>
			break;
			case 'ViewSetup':
				v = <ViewSetup goTo={this.goTo}/>
			break;
			case 'BuatTemplate':
				v = <BuatTemplate goTo={this.goTo}/>
			break;
			case 'Profile':
				v = <Profile goTo={this.goTo}/>
			break;
			case 'Tentang':
				v = <Tentang goTo={this.goTo}/>
			break;
		}
		return (
		<Provider store={store}>
			<Login login={(l)=>this.setState({login: l})} goTo={this.goTo}/>
			<MsgBox ref={el => SimpleGlobal.MsgBoxEl = el} />
			<SideBar show={this.state.showSideBar}  goTo={this.goTo} />
			<Backdrop open={this.state.backdrop} className={css(styles.backdrop)} onClick={()=> this.setState({backdrop:false})}>
			  	<CircularProgress color="inherit" />
			</Backdrop>
			<Header showSideBar={()=>this.setState({showSideBar: !this.state.showSideBar})} goTo={this.goTo}/>
	 		<div  className={css(styles.back)}></div>
			<Paper className={css(styles.container)}>
				{v}
			</Paper>
		

		</Provider>
		
	);
	}
}
const MainRoot= document.getElementById('react');
const M = React.createElement(App, {} , null)
SimpleGlobal.MainAppEl =  ReactDOM.render( M ,MainRoot );


window.addEventListener('click', (e)=>{
	if(!document.getElementById('sideBar').contains(e.target) 
		&& !document.getElementById('menu').contains(e.target) ){
		SimpleGlobal.MainAppEl.setState({showSideBar:false})
	}
})


