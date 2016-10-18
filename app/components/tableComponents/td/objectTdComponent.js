import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/github';

class ObjectTdComponent extends React.Component {
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
	jsonValidate(){
		try {
        	JSON.parse(this.props.elementData)
        	this.props.updateObject()
        	this.openCloseModal(false)
	    } catch (e) {
	        //this.cancelJsonUpdate(false)
	    }		
	}
	cancelJsonUpdate(){
		this.props.fetchObject()
		this.openCloseModal(false)
	}
	handleClose(){

	}
	render() {
		return (
            <td className='mdl-data-table__cell--non-numeric pointer'>
            	<span className="color888">Json Object</span>
            	<i className="fa fa-expand fr" aria-hidden="true" onClick={this.openCloseModal.bind(this,true)}></i>
            	<Dialog title="JSON EDITOR" modal={false} open={this.state.isModalOpen} onRequestClose={this.handleClose.bind(this)}>
	          		<AceEditor
					    mode="json"
					    theme="github"
					    onChange={this.changeHandler.bind(this)}
					    value={ this.props.elementData || '' }
					    name="json"
					    className="jsonmodal"
					/>
	          		<button className="btn btn-primary fr ml5" onClick={this.jsonValidate.bind(this)}>SUBMIT</button>
	          		<button className="btn btn-danger fr" onClick={this.cancelJsonUpdate.bind(this)}>CLOSE</button>
        		</Dialog>
            </td>
		);
	}
}

export default ObjectTdComponent;