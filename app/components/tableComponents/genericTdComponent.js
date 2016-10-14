import React from 'react';
import ReactDOM from 'react-dom';
import configObject from '../../config/app.js'

//components
import TextTd from './textTdComponent'
import DateTd from './dateTdComponent'


class GenericTdComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			initialElementData:null,
			elementData:null,
			componentToRender:TextTd
		}
	}
	componentDidMount(){
		switch (this.props.columnType.dataType) {
			case "Text":
				this.state.componentToRender =  TextTd
				this.state.elementData = this.props.columnData.document[this.props.columnType.name]
				break;

			case "Email":
				this.state.componentToRender =  TextTd
				this.state.elementData = this.props.columnData.document[this.props.columnType.name]
				break;

			case "Id":
				this.state.componentToRender =  TextTd
				this.state.elementData = this.props.columnData.document['_id']
				break;

			case "DateTime":
				this.state.componentToRender =  DateTd
				this.state.elementData = this.props.columnData.document[this.props.columnType.name]
				break;
			
			default:
				this.state.componentToRender =  TextTd
				this.state.elementData = "a"
				break;
		}
		this.setState(this.state)
	}
	updateObject(data){
		this.props.columnData.set(this.props.columnType.name,this.state.elementData)
		this.props.columnData.save().then((res)=>{
			//console.log(res)
		},(err)=>{
			console.log(err)
		})
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {		
		return (
           React.createElement(this.state.componentToRender, {elementData:this.state.elementData,updateObject:this.updateObject.bind(this),changeHandler:this.changeHandler.bind(this)})
		);
	}
}

export default GenericTdComponent;