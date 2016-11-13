import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';

import TextList from './listComponents/textList.js'
import ObjectList from './listComponents/objectList.js'
import GeoList from './listComponents/geoList.js'
import FileList from './listComponents/fileList.js'
import NumberList from './listComponents/numberList.js'
import DateTimeList from './listComponents/dateTimeList.js'
import GenericAddToList from './listComponents/genericAddToList.js'

class ListTdComponent extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isModalOpen:false,
			elementData:[],
			elementToRender:TextList
		}
	}
	componentDidMount(){
		this.generaliseList(this.props)
	}
	componentWillReceiveProps(props){
		this.generaliseList(props)
	}
	generaliseList(props){
		switch (props.columnType.relatedTo) {
			case "Text":
				this.state.elementToRender =  TextList
				break;
			case "Email":
				this.state.elementToRender =  TextList
				break;
			case "Url":
				this.state.elementToRender =  TextList
				break;
			case "DateTime":
				this.state.elementToRender =  DateTimeList
				break;
			case "File":
				this.state.elementToRender =  FileList
				break;
			case "Object":
				this.state.elementToRender =  ObjectList
				break;
			case "Number":
				this.state.elementToRender =  NumberList
				break;
			case "GeoPoint":
				this.state.elementToRender =  GeoList
				break;

			default:
				this.state.elementToRender =  TextList
				break;
		}
		this.state.elementData = props.elementData
		this.setState(this.state)
	}
	openCloseModal(what,save){
		if(save){
			this.props.updateElement(this.state.elementData)
			this.props.updateObject()			
		} else {
			this.props.fetchObject()
		}
		this.state.isModalOpen = what
		this.setState(this.state)
	}
	updateElementData(data,index){
		this.state.elementData[index] = data
		this.setState(this.state)
	}
	addToElementData(data){
		if(!this.state.elementData){
			this.state.elementData = []
		}
		this.state.elementData.push(data)
		this.setState(this.state)
	}
	removeFromElementData(index){
		this.state.elementData.splice(index,1)
		this.setState(this.state)
	}
	changeHandler(value,e){
    	this.props.updateElement(value)
    }
	handleClose(){

	}
	render() {
		let elements = []
		if(this.state.elementData){
			elements = this.state.elementData.map((data,index)=>{
				return React.createElement(this.state.elementToRender, {
							index:index,
					       	key:index,
					       	data:data,
					       	addToElementData:this.addToElementData.bind(this),
					       	removeFromElementData:this.removeFromElementData.bind(this),
					       	updateElementData:this.updateElementData.bind(this)
			           })
			})
		}
		return (
            <td className='mdl-data-table__cell--non-numeric pointer'>
            	<span className="color888">List</span>
            	<i className="fa fa-expand fr" aria-hidden="true" onClick={this.openCloseModal.bind(this,true,false)}></i>
            	<Dialog title="LIST EDITOR" modal={false} open={this.state.isModalOpen} onRequestClose={this.handleClose.bind(this)} titleClassName="modaltitle">
            		<GenericAddToList
            			addToElementData={ this.addToElementData.bind(this) }
            			columnType={ this.props.columnType.relatedTo }
            		/>
	          		{ elements }
	          		<div className="savecanclist">
	          			<button className="btn btn-danger fr ml5" onClick={this.openCloseModal.bind(this,false,false)}>CLOSE</button>
	          			<button className="btn btn-primary fr" onClick={this.openCloseModal.bind(this,false,true)}>SAVE</button>
	          		</div>
        		</Dialog>
            </td>
		);
	}
}

export default ListTdComponent;