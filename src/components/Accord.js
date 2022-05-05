import React, {Fragment, useState, Children} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from '@material-ui/core';
import {CarretBackwardOutline, CarretforwardOutline, CaretDown } from "react-ionicons" 

const useStyles = makeStyles((theme) => ({
  root: {
	width: '100%',
  },
  heading: {
	fontSize: theme.typography.pxToRem(15),
	flexBasis: '33.33%',
	flexShrink: 0,
  },
  secondaryHeading: {
	fontSize: theme.typography.pxToRem(15),
	color: theme.palette.text.secondary,
  },
}));

const Accord = (props)=>{
	const classes = useStyles()
	const myChild = Children.toArray(props.children || [])
	const [expanded, setExpanded] = useState(props.showFirst)

	const handleChange = (idx)=>{
		setExpanded(idx === expanded ? false: idx)
	}

	return 	<Fragment>
		{ myChild.map((v, i)=>
		<Accordion key={i} expanded={expanded === i} onChange={()=>handleChange(i)}>
		<AccordionSummary
			  expandIcon={<CaretDown height="12px" width="12px"/>}
			  aria-controls="panel1bh-content"
			  id="panel1bh-header">
		  	<Typography className={classes.heading}>{props.info[i].title}</Typography>
		  	<Typography className={classes.secondaryHeading}>{props.info[i].detail}</Typography>
		</AccordionSummary>
		<div>
		  	
		   		{ v }
		  	
		</div>
	  </Accordion>)
		}
	  </Fragment>

 }

 Accord.propTypes={
 	info: PropTypes.array,
 	showFirst: PropTypes.number
 }


 export default Accord