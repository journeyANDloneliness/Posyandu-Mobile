import React, {useState} from 'react'
import {Box, Grid, AppBar, IconButton, Toolbar, Typography, MenuIcon, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {ListOutline, Home, ArrowUndoOutline, ArrowUndo} from "react-ionicons"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
    position: "fixed",
    left: 0,
    top: 0,
    width: "100vw",
    zIndex: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  bar: {
  	margin: 0,
  	padding: 0
  }
}))

;
export default (props)=>{
	const classes = useStyles()
	const viewBef = props.goTo().bef
	return (
		<div className={classes.root}>
		<AppBar  position="fixed" className={classes.root}>
		  <Toolbar>
		    <IconButton id="menu" onClick={props.showSideBar} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
				<ListOutline
				  color={'#FFF'} 
				  height="28px"
				  width="28px"/>
		    </IconButton>
		    <Typography variant="button" className={classes.title}>
		      Posyandu-Mobile
		    </Typography>
		    { viewBef.length > 0 ?
		    <IconButton onClick={(ev)=>{props.goTo("back")}} edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
				<ArrowUndo
				  color={'#FFF'} 
				  height="28px"
				  width="28px"/>
		    </IconButton> : <IconButton  edge="end" color="inherit" aria-label="menu" disabled>
				<ArrowUndoOutline
				  color={'#FFFFFF55'} 
				  height="28px"
				  width="28px"/>
		    </IconButton >}
		    <IconButton onClick={()=>{props.goTo("Home")}} edge="end" color="inherit" aria-label="menu">
				<Home
				  color={'#FFF'} 
				  height="28px"
				  width="28px"/>
		    </IconButton>
		  </Toolbar>
		</AppBar>
		</div>
		);
}