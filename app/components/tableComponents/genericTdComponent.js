import React from 'react';
import ReactDOM from 'react-dom';
import configObject from '../../config/app.js'

//components
import TextTd from './td/textTdComponent'
import DateTd from './td/dateTdComponent'
import IdTd from './td/idTdComponent'
import PasswordTd from './td/passwordTdComponent'
import EmailTd from './td/emailTdComponent'
import ObjectTd from './td/objectTdComponent'
import GeoTd from './td/geoTdComponent'
import FileTd from './td/fileTdComponent'


class GenericTdComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			elementData:null,
			componentToRender:TextTd
		}
	}
	componentDidMount(){
		this.generaliseComponent(this.props)
	}
	componentWillReceiveProps(props){
		this.generaliseComponent(props)
	}
	generaliseComponent(props){
		switch (props.columnType.dataType) {
			case "Text":
				this.state.componentToRender =  TextTd
				this.state.elementData = props.columnData.document[props.columnType.name]
				break;

			case "Email":
				this.state.componentToRender =  EmailTd
				this.state.elementData = props.columnData.document[props.columnType.name]
				break;

			case "Id":
				this.state.componentToRender =  IdTd
				this.state.elementData = props.columnData.document['_id']
				break;

			case "EncryptedText":
				this.state.componentToRender =  PasswordTd
				this.state.elementData = props.columnData.document[props.columnType.name]
				break;

			case "DateTime":
				this.state.componentToRender =  DateTd
				this.state.elementData = props.columnData.document[props.columnType.name]
				break;

			case "Object":
				this.state.componentToRender =  ObjectTd
				this.state.elementData = JSON.stringify(props.columnData.document[props.columnType.name])
				break;

			case "GeoPoint":
				this.state.componentToRender =  GeoTd
				this.state.elementData = props.columnData.document[props.columnType.name]
				break;

			case "File":
				this.state.componentToRender =  FileTd
				this.state.elementData = props.columnData.document[props.columnType.name]
				break;
			
			default:
				this.state.componentToRender =  TextTd
				this.state.elementData = "a"
				break;
		}
		this.setState(this.state)
	}
	updateObject(){
		if(this.props.columnType.dataType === 'Object'){
			this.state.elementData = JSON.parse(this.state.elementData)
		}
		this.props.columnData.set(this.props.columnType.name,this.state.elementData)
		this.props.columnData.save().then((res)=>{
			//console.log(res)
		},(err)=>{
			console.log(err)
			this.fetchObject()
		})
	}
	fetchObject(){
		this.props.columnData.fetch().then((data)=>{
			this.props.tableStore.updateColumnsData(data.id,data)
		},(err)=>{
			console.log(err)
		})
	}
	updateElement(data){
		this.state.elementData = data
		this.setState(this.state)
	}

	render() {
		return (
           React.createElement(this.state.componentToRender, {
		       	elementData:this.state.elementData,
		       	updateObject:this.updateObject.bind(this),
		       	updateElement:this.updateElement.bind(this),
		       	fetchObject:this.fetchObject.bind(this),
		       	columnName:this.props.columnType.name,
		       	columnData:this.props.columnData
           })
		);
	}
}

export default GenericTdComponent;