import React from 'react'; 
import ReactDOM from 'react-dom'; 
import MsgBox from './components/MsgBox';
import {SimpleGlobal} from './Global'

//import {MsgBoxEl} from './App'
/*
approach to show modal:
1. use state from parent.
cons: its overbloating parents'state
very unecesary for simple msg box.
and not so handy to pass prop many times.

2. redux
cons: cant pass callback function. cant store function

3. store el to global variable
cons: variable might changed its value. cuz cants set to constant

4. each component has its own msgbox component
cons: why need to make many msg box when its has same functionality?

5. create with dom dynamicaly


5. use static function to access parent's state
fail: dun know to acces global var yet

*/


export const showMsg2 = (msg) => {
	if(SimpleGlobal.MsgBoxEl == undefined)return;
	SimpleGlobal.MsgBoxEl.setState(msg)
}
export const showMsg = (msg, caller) => {
	let msgBox = document.getElementById('msg-box');
	ReactDOM.render( React.createElement(MsgBox, {par: msgBox, ...msg} , null),msgBox ); 
}

export const showBackdrop = ()=>{
	if(SimpleGlobal.MainAppEl == undefined)return;
	SimpleGlobal.MainAppEl.setState({backdrop: true})
}
export const closeBackdrop = ()=>{
	if(SimpleGlobal.MainAppEl == undefined)return;
	SimpleGlobal.MainAppEl.setState({backdrop: false})
}