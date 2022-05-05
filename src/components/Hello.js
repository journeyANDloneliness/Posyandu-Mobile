import React from "react"


const Hello = (props)=>{
	
	return(
		<div>
		<div style={{backgroundColor: props.bg}}>Hello</div>
		</div>
	)
}

export const MyHello = Hello