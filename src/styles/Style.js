import { StyleSheet, css } from 'aphrodite';
import {  slideInDown } from 'react-animations';


let pad={}
let mar={}
let fntSz={}
let flexChild={}
let marT={}
Array.from({length:11}, (v,i)=> i).forEach((v)=>{
	pad[`pad${v}`] ={}
	pad[`pad${v}`].padding = v
	mar[`mar${v}`] ={}
	mar[`mar${v}`].margin = v
	marT[`marT${v}`] ={}
	marT[`marT${v}`].marginTop = v
	flexChild[`flexChild${v}`] ={}
	flexChild[`flexChild${v}`].flex = v
	fntSz[`fntSz${v+8}`] ={}
	fntSz[`fntSz${v+8}`].fontSize = v+8
})

export default StyleSheet.create({
	...pad,
	...mar,
	...marT,
	...flexChild,
	...fntSz,
	flexColumn:{
		display: "flex",
		flexDirection: "column"
	},
	flexRow:{
		display: "flex",
		flexDirection: "row"
	},
	contentCenter:{
		alignContent: "center"
	},
	beautyBox1:{
		flex: 1,
		display: "flex",
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "#FFFFFFFE",
		borderRadius: 20,
/*		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowOpacity: 0.40,
		shadowRadius: 10,*/
		boxShadow: "2px 2px 10px 2px #000"
	},
	beautyBox2:{
		flex: 1,
		display: "flex",
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "#FFFFFFFE",
		borderRadius: 5,
		boxShadow: "0px 2px 3px 2px rgba(0,0,0,0.2)"
	},
	tableCell:{
		height: 10,
		contentOverflow: "hidden",
		//padding: "2px 40px 2px 10px",
		margin: 0,
		border: "solid 1px #999",
		whiteSpace: "nowrap",
	},
	tableCell2:{
		height: 10,
		contentOverflow: "hidden",
		//padding: "2px 40px 2px 10px",
		margin: 0,
		border: "none",
		whiteSpace: "nowrap",
	},
	cellPad:{
		padding: "2px 40px 2px 10px",

	},
	tableRowHead:{
		border: "1px solid rgb(5, 22, 47)"
	},
	tableCellHead:{
		height: 10,
		contentOverflow: "hidden",
		padding: "8px 5px",
		margin: 0,
		whiteSpace: "nowrap",
		overflow: "hidden",
		textAlign: "center",
		border: "2px solid rgb(89, 136, 206)",
		fontWeight: "bold"
	},
	posAbs:{
		position: "absolute"
	},
	posFix:{
		position: "fixed"
	},
	w100:{
		width:"100%"
	},
	algCen:{
		display: "flex",
		alignItems: 'center',
		justifyContent: 'center',
	},
	algRight:{
		display: "flex",
		alignItems: 'right',
		justifyContent: 'right',
	},
	cDDD:{
		backgroundColor: "#DDD"
	},
	floLeft:{
		float: 'left'
	},
	floRight:{
		float: 'right'
	},
	xBlue:{
		color: "#FFF",
		backgroundColor: "#3f51b5"
	},
	bRad:{
		borderRadius: 10
	},
	mS:{
		paddingTop: 100,
		paddingBottom: 100,
		marginTop: 30,
		marginBottom: 30
	},
	slideDown:{
	 	animationName: slideInDown,
    	animationDuration: '1s',
	},
	maxContent:{
		width: "max-content"
	}

})