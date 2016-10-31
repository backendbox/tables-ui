import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class GeoListComponent extends React.Component {
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
	changeHandler(which,e){
		let location
		if(which == 'longitude'){
			if(this.props.data){
				location = new CB.CloudGeoPoint(e.target.value,( this.props.data.document.latitude || 0));
			} else {
				location = new CB.CloudGeoPoint(e.target.value,0);
			}
		} else {
			if(this.props.data){
				location = new CB.CloudGeoPoint((this.props.data.document.longitude || 0),e.target.value);
			} else {
				location = new CB.CloudGeoPoint(0,e.target.value);
			}
		}
		this.props.updateElementData(location,this.props.index)
    }
	handleClose(){

	}
	render() {
		let data = {}
		data.lat = this.props.data.latitude || 0
		data.long = this.props.data.longitude || 0
		console.log(data)
		return (
			<div>
        		<Dialog title="Geo Location EDITOR" modal={false} open={this.state.isModalOpen} onRequestClose={this.handleClose.bind(this)}>
	          		<TextField
				      hintText="Latitude"
				      floatingLabelText="Enter a Latitude"
				      value={
				      	this.props.data ? (this.props.data.document.latitude || '') : ''
				      }
				      onChange={this.changeHandler.bind(this,'latitude')}
				      type="number"
				    />
				    <TextField
				      hintText="Longitude"
				      floatingLabelText="Enter a Longitude"
				      value={
				      	this.props.data ? (this.props.data.document.longitude || '') : ''
				      }
				      onChange={this.changeHandler.bind(this,'longitude')}
				      type="number"
				    />
	          		<button className="btn btn-primary fr ml5" onClick={this.openCloseModal.bind(this,false)}>SUBMIT</button>
	          		<button className="btn btn-danger fr" onClick={this.openCloseModal.bind(this,false)}>CLOSE</button>
        		</Dialog>
				<input type="text" className="listtexttableinput" disabled="true" value={ JSON.stringify(data) }/>
				<i className="fa fa-pencil trashlistinputtext" aria-hidden="true" onClick={ this.openCloseModal.bind(this,true) }></i>
				<i className="fa fa-trash trashlistinputtext" aria-hidden="true" onClick={ this.deleteValue.bind(this) }></i>
			</div>
		);
	}
}

export default GeoListComponent;