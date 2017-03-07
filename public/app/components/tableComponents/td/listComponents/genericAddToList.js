import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import SelectRelation from '../relationComponents/selectRelation.js'
import FilePicker from '../filePicker'

class GenericAddToList extends React.Component {
	constructor(){
		super()
		this.state = {
			isOpenSelect:false
		}
	}
	addRecord(type,e){
		if(type == 'Number'){
			this.props.addToElementData(0)
		} else if(type == 'DateTime'){
			this.props.addToElementData(new Date())
		} else if(type == 'GeoPoint'){
			this.props.addToElementData(new CB.CloudGeoPoint(0,0))
		} else if(type == 'Boolean'){
			this.props.addToElementData(false)
		} else {
			this.props.addToElementData('')
		}
	}
	dropHandler(file){
		this.props.addToElementData(file)
    }
    updateElementRealtion(relationObject){
		this.props.addToElementData(relationObject)
	}
	updateObject(){
		//dummy --- to make select relation re-usable
	}
	openCloseModal(what,which){
		this.state[which] = what
		this.setState(this.state)
	}
	componentDidMount(){
		
	}
	render() {
		let element = ''
		if(this.props.columnType == 'File'){
			element =	<FilePicker chooseFile={ this.dropHandler.bind(this) }>
							<div className="listilepicker">
								<i className="fa fa-paperclip attahcmentfile" aria-hidden="true"></i>
								<span className="attahctext">Click to select files to upload.</span>
							</div>
						</FilePicker>
		           		
		} else if(['Text','Email','URL','EncryptedText','Boolean','Number','DateTime','GeoPoint','Object'].indexOf(this.props.columnType) == -1){
			element = 	<button className="addtextrecord" onClick={this.openCloseModal.bind(this,true,'isOpenSelect')}>+ Add New Record</button>
		} else {
			element = <button className="addtextrecord" onClick={ this.addRecord.bind(this,this.props.columnType) }>+ Add New Record</button>
		}
		return (
			<div>
				{ element }
				{
            		this.state.isOpenSelect ? <SelectRelation 
												table={ this.props.columnType }
												updateObject={ this.updateObject.bind(this) }
												updateElement={ this.updateElementRealtion.bind(this) }
												open={ this.state.isOpenSelect }
												openCloseModal={ this.openCloseModal.bind(this) }
							            	/> : ''
            	}
			</div>
		);
	}
}

export default GenericAddToList;