import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/github';

class ObjectListComponent extends React.Component {
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
	deleteValue(){
		this.props.removeFromElementData(this.props.index)
	}
	changeHandler(value,e){
		try{
    		this.props.updateElementData(JSON.parse(value),this.props.index)
    	} catch(e){
    		console.log(e)
    	}
    }
	handleClose(){

	}
	render() {
		let data = this.props.data
		return (
			<div>
				<Dialog title="JSON EDITOR" modal={false} open={this.state.isModalOpen} onRequestClose={this.handleClose.bind(this)}>
	          		<AceEditor
					    mode="json"
					    theme="github"
					    onChange={this.changeHandler.bind(this)}
					    value={ JSON.stringify(this.props.data) || '' }
					    name="json"
					    className="jsonmodal"
					/>
	          		<button className="btn btn-primary fr ml5" onClick={this.openCloseModal.bind(this,false)}>SUBMIT</button>
	          		<button className="btn btn-danger fr" onClick={this.openCloseModal.bind(this,false)}>CLOSE</button>
        		</Dialog>
				<input type="text" className="listtexttableinput" value={ JSON.stringify(this.props.data) } disabled="true" />
				<i className="fa fa-pencil trashlistinputtext" aria-hidden="true" onClick={ this.openCloseModal.bind(this,true) }></i>
				<i className="fa fa-trash trashlistinputtext" aria-hidden="true" onClick={ this.deleteValue.bind(this) }></i>
			</div>
		);
	}
}

export default ObjectListComponent;