import React from 'react';
import ReactDOM from 'react-dom';
import configObject from '../../config/app.js'
import Checkbox from 'material-ui/Checkbox';

class CheckBoxTdComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			checkHidden:true
		}
	}
	componentDidMount(){
		//console.log(this.props)
	}
	render() {
		return (
           	<td> 
           		<span className={''}>{this.props.indexValue+1}</span>
           		<Checkbox onCheck={this.props.checkHandler.bind(this,this.props.indexValue)} /> 
           	</td>
		);
	}
}

export default CheckBoxTdComponent;