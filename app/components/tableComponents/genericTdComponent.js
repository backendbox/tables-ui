import React from 'react';
import ReactDOM from 'react-dom';
import configObject from '../../config/app.js'

//components
import TextTd from './textTdComponent'
import DateTd from './dateTdComponent'


class GenericTdComponent extends React.Component {
	constructor(){
		super()
		this.state = {}
	}
	componentDidMount(){
		//console.log(this.props)
	}
	updateObject(data){
		this.props.columnData.set(this.props.columnType.name,data)
		this.props.columnData.save().then((res)=>{
			console.log(res)
		},(err)=>{
			console.log(err)
		})
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {
		let componentToRender = TextTd
		let columnData
		switch (this.props.columnType.dataType) {
			case "Text":
				componentToRender =  TextTd
				columnData = this.props.columnData.document[this.props.columnType.name]
				break;

			case "Id":
				componentToRender =  TextTd
				columnData = this.props.columnData.document['_id']
				break;

			case "DateTime":
				componentToRender =  DateTd
				columnData = this.props.columnData.document[this.props.columnType.name]
				break;
			
			default:
				componentToRender =  TextTd
				columnData = "a"
				break;
		}

		return (
           React.createElement(componentToRender, {data:columnData,updateObject:this.updateObject.bind(this)})
		);
	}
}

export default GenericTdComponent;