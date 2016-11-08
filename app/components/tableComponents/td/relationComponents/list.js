import React from 'react';
import ReactDOM from 'react-dom';

import TextList from '../listComponents/textList.js'
import ObjectList from '../listComponents/objectList.js'
import GeoList from '../listComponents/geoList.js'
import FileList from '../listComponents/fileList.js'
import NumberList from '../listComponents/numberList.js'
import DateTimeList from '../listComponents/dateTimeList.js'
import GenericAddToList from '../listComponents/genericAddToList.js'

class ListTdComponent extends React.Component {
	constructor(){
		super()
		this.state = {
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
		switch (props.columnData.relatedTo) {
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
	updateElementData(data,index){
		this.state.elementData[index] = data
		this.setState(this.state)
		this.props.updateElementData(this.state.elementData,this.props.columnData.name)
	}
	addToElementData(data){
		if(!this.state.elementData){
			this.state.elementData = []
		}
		this.state.elementData.push(data)
		this.setState(this.state)
		this.props.updateElementData(this.state.elementData,this.props.columnData.name)
	}
	removeFromElementData(index){
		this.state.elementData.splice(index,1)
		this.setState(this.state)
		this.props.updateElementData(this.state.elementData,this.props.columnData.name)
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
            <div className="listrelationdiv">
            	<span className="textnamerlation"> { this.props.columnData.name } </span>
            	<div className="listdivrel">
            		<GenericAddToList
            			addToElementData={ this.addToElementData.bind(this) }
            			columnType={ this.props.columnData.relatedTo }
            		/>
	          		{ elements }
	          		
        		</div>
           	</div>
		);
	}
}

export default ListTdComponent;