import React from 'react'
import { observer } from "mobx-react"
import configObject from '../../config/app.js'

@observer
class FilterRow extends React.Component {
	constructor(){
		super()
		this.state = {

		}
	}
	componentWillMount(){

	}
	setDataType(e){
		let types = configObject.filterTypes.filter((x)=>{
			return x.type.indexOf(e.target.options[e.target.options.selectedIndex].getAttribute('type')) != -1
		})
		console.log(types)
		this.props.changeHandler('columnType',e.target.options[e.target.options.selectedIndex].getAttribute('type'),this.props.filterData.id)
		this.props.changeHandler('filterTypes',types[0].options,this.props.filterData.id)
		this.props.changeHandler('filterType','',this.props.filterData.id)
		this.props.changeHandler('dataType',e.target.value,this.props.filterData.id)
	}
	setType(e){
		this.props.changeHandler('selectedType',e.target.value,this.props.filterData.id)
	}
	setFilterType(e){
		this.props.changeHandler('filterType',e.target.value,this.props.filterData.id)
	}
	setDataValue(e){
		let value = e.target.value ? e.target.value : e.target.checked
		this.props.changeHandler('dataValue',value,this.props.filterData.id)
	}
	getInputType(props){
		let inputType
		if(props.filterData.columnType){
			if(['Text','Email','URL','EncryptedText','Number'].indexOf(props.filterData.columnType) != -1){
				inputType = <input type="text" className="inputfilter" value={ props.filterData.dataValue } onChange={ this.setDataValue.bind(this) }/>
			} 
			else if(['DateTime'].indexOf(props.filterData.columnType) != -1){
				inputType = <input type="date" className="inputfilter" value={ props.filterData.dataValue } onChange={ this.setDataValue.bind(this) }/>
			} 
			else if(['Boolean'].indexOf(props.filterData.columnType) != -1){
				inputType = <input type="checkbox" className="inputfilter boolfilter" checked={ props.filterData.dataValue } onChange={ this.setDataValue.bind(this) }/>
			}
			else if(['List'].indexOf(props.filterData.columnType) != -1){
				inputType = this.getListInput(props)
			}
			else {
				inputType = <input type="text" className="inputfilter" disabled="true" value={ props.filterData.dataValue } onChange={ this.setDataValue.bind(this) }/>
			}
		} else {
			inputType = <input type="text" className="inputfilter" disabled="true" value={ props.filterData.dataValue } onChange={ this.setDataValue.bind(this) }/>
		}
		return inputType
	}
	getListInput(props){
		let inputType
		if(props.filterData.relatedTo){
			if(['Text','Email','URL','EncryptedText','Number'].indexOf(props.filterData.relatedTo) != -1){
				inputType = <input type="text" className="inputfilter" value={ props.filterData.dataValue } onChange={ this.setDataValue.bind(this) }/>
			} 
			else if(['DateTime'].indexOf(props.filterData.relatedTo) != -1){
				inputType = <input type="date" className="inputfilter" value={ props.filterData.dataValue } onChange={ this.setDataValue.bind(this) }/>
			} 
			else if(['Boolean'].indexOf(props.filterData.relatedTo) != -1){
				inputType = <input type="checkbox" className="inputfilter boolfilter" checked={ props.filterData.dataValue } onChange={ this.setDataValue.bind(this) }/>
			}
			else {
				inputType = <input type="text" className="inputfilter" disabled="true" value={ props.filterData.dataValue } onChange={ this.setDataValue.bind(this) }/>
			}
		} else {
			inputType = <input type="text" className="inputfilter" disabled="true" value={ props.filterData.dataValue } onChange={ this.setDataValue.bind(this) }/>
		}
		return inputType
	}
	render() {

		let dataTypes = this.props.tableStore.getColumns
						.filter((x)=>{
							return !(x.dataType == 'Id' || x.dataType == 'ACL') 
						})
						.map((data,i)=>{
							return <option key={ i } value={ data.name } type={ data.dataType }>{ data.name }</option>
						})
		let type = this.props.filterData.type.map((x,i)=>{
			return <option key={ i } value={ x }>{ x }</option>
		})
		let filterTypes = this.props.filterData.filterTypes.map((data,i)=>{
			return <option key={ i } value={ data }>{ data }</option>
		})
		let inputType = this.getInputType(this.props)

		return (
          	<div className="filterrow">
	          	<select className="form-control selectfilter" value={ this.props.filterData.selectedType } onChange={ this.setType.bind(this) }>
	          		{ type }
	          	</select>
	          	<select className="form-control selectfilter" value={ this.props.filterData.dataType } onChange={ this.setDataType.bind(this) }>
	          		<option value=''>-select-</option>
	          		{ dataTypes }
	          	</select>
	          	<select className="form-control selectfilter" value={ this.props.filterData.filterType } onChange={ this.setFilterType.bind(this) }>
	          		{ filterTypes }
	          	</select>
	          	{ inputType }
	          	<i onClick={ this.props.deleteFilter.bind(this,this.props.filterData.id) } className="fa fa-close filterclose" aria-hidden="true"></i>
	        </div>
		);
	}
}

export default FilterRow