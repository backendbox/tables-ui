import React from 'react';
import ReactDOM from 'react-dom';

class TextListComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			
		}
	}
	componentDidMount(){
		
	}
	
	render() {
		console.log(this.props)
		return (
            <h3>TEXT</h3>
		);
	}
}

export default TextListComponent;