import React from 'react';
import ReactDOM from 'react-dom';
import configObject from '../../config/app.js'
import Checkbox from 'material-ui/Checkbox'
import { observer } from "mobx-react"

@observer
class RowCheckBoxComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			checkHidden:true
		}
	}
	hover(what){
		this.setState({checkHidden:what})
	}
	componentDidMount(){
		//console.log(this.props)
	}
	render() {
		return (
           	<td onMouseEnter={this.hover.bind(this,false)} onMouseLeave={this.hover.bind(this,true)}> 
           		<span className={this.state.checkHidden &&  this.props.tableStore.rowsToDelete.indexOf(this.props.rowObject.id) == -1 ? 'checkStyle':'hide'}>{this.props.indexValue+1}</span>
           		<Checkbox onCheck={this.props.checkHandler.bind(this,this.props.indexValue,this.props.rowObject.id)} className={!this.state.checkHidden ||  this.props.tableStore.rowsToDelete.indexOf(this.props.rowObject.id) !=- 1 ? 'checkStyle':'hide'} checked={this.props.tableStore.rowsToDelete.indexOf(this.props.rowObject.id) !=- 1}/> 
           	</td>
		);
	}
}

export default RowCheckBoxComponent;