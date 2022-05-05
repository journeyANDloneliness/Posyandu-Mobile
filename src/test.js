import React from 'react'; 
import ReactDOM from 'react-dom'; 


class App extends React.Component{
	render(){
		return(<div> hello </div>);
	}
}

ReactDOM.render(React.createElement(App, {} , null), document.getElementById('react'))