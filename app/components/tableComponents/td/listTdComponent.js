import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';

import TextList from './listComponents/textList.js'

class ListTdComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			isModalOpen:false
		}
	}
	componentDidMount(){
		
	}
	openCloseModal(what){
		this.state.isModalOpen = what
		this.setState(this.state)
	}
	changeHandler(value,e){
    	this.props.updateElement(value)
    }
	handleClose(){

	}
	render() {
		return (
            <td className='mdl-data-table__cell--non-numeric pointer'>
            	<span className="color888">List</span>
            	<i className="fa fa-expand fr" aria-hidden="true" onClick={this.openCloseModal.bind(this,true)}></i>
            	<Dialog title="JSON EDITOR" modal={false} open={this.state.isModalOpen} onRequestClose={this.handleClose.bind(this)}>
	          		
	          		<button className="btn btn-danger fr" onClick={this.openCloseModal.bind(this,false)}>CLOSE</button>
        		</Dialog>
            </td>
		);
	}
}

export default ListTdComponent;