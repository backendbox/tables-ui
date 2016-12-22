import React from 'react';
import ReactDOM from 'react-dom';
import configObject from '../../config/app.js'
import Checkbox from 'material-ui/Checkbox'
import { observer } from "mobx-react"
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover'

@observer
class AddColumnComponent extends React.Component {
	constructor(){
		super()
		
	}
	componentWillMount(){
		this.setInitialState()
	}
	setDataType(e){
		this.state.uniqueCheck = configObject.dataTypes.filter(x => x.name == e.target.value)[0].unique	
		this.state['dataType'] = e.target.value
		this.setState(this.state)
	}
	buildColumn(e){
		e.preventDefault();
		try{
			if(!this.state.dataType) this.state.dataType = 'Text'
			let column = new CB.Column(this.state.name)
			column.required = this.state.required
			column.dataType = this.state.dataType
			if(this.state.dataType == 'Relation'){
				column.relatedTo = this.state.target
			} else if(this.state.dataType == 'List'){
				if(this.props.tableStore.getTables.filter(x => x.name == this.state.target).length){
					column.relatedTo = this.state.target
				} else {
					column.relatedTo = this.state.target
					column.listDataType = this.state.target
				}
			} else {
				if(this.state.uniqueCheck) column.unique = this.state.unique
			}
			this.props.tableStore.showLoader()
			this.props.tableStore.addColumn(column)
			this.setInitialState()
		} catch(e){
			this.props.tableStore.showSnackbar(3000,e)
		}
	}
	handleTouchTap(event){
		// This prevents ghost click.
		event.preventDefault();
		this.setState({
		  open: true,
		  anchorEl: event.currentTarget
		})
	}
	handleRequestClose(){
		this.setState({
		  open: false
		})
		this.setInitialState()
	}
	checkHandler(which,e,data){
		this.state[which] = data
		this.setState(this.state)
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	setInitialState(){
		this.state = {
			open: false,
			name:'',
			dataType:'',
			uniqueCheck:false,
			target:'',
			unique:false,
			required:false
		}
		this.setState(this.state)
	}
	render() {
		let { dataTypes } = configObject
		let columnTypes = dataTypes
		.filter( x => ['ACL','Id'].indexOf(x.name) == -1 )
		.map((x,i)=>{
			return <option key={ i } value={ x.name }>{ x.name }</option>
		})
		let targetTypesData = []
		let targetTypesTable = []
		targetTypesData = configObject.dataTypes.filter(x => ['ACL','Id','List'].indexOf(x.name) == -1 ).map((x,i)=>{
			return <option key={ i } value={ x.name }>{ x.name }</option>
		})
		targetTypesTable = this.props.tableStore.getTables.map((x,i)=>{
			return <option key={ i } value={ x.name }>{ x.name }</option>
		})
		return (
	           	<th className='tacenter pb7 tdtrcheck addcolthbtn' onTouchTap={this.handleTouchTap.bind(this)}>
	           		<i className="fa fa-plus addcolumns" aria-hidden="true"></i>
	           		<Popover
			          open={this.state.open}
			          anchorEl={this.state.anchorEl}
			          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
			          targetOrigin={{horizontal: 'left', vertical: 'top'}}
			          onRequestClose={this.handleRequestClose.bind(this)}
			          animation={PopoverAnimationVertical}
			          className="popupaddcolumns"
			        >
			        <form onSubmit={this.buildColumn.bind(this)}>
				        <div className="addcoldiv">
				        	<input className="addcolinput" placeholder="Column name." type="text" value={ this.state.name } onChange={ this.changeHandler.bind(this,'name') } required/>
				        	<p className="paddcolumns"> Select the column type </p>
				        	<select required className="addcolselect" value={ this.state.dataType || 'Text' } onChange={ this.setDataType.bind(this) }>
				        		{ columnTypes }
				        	</select>
				        	<p className={ this.state.dataType ? ( this.state.dataType == 'List' || this.state.dataType == 'Relation' ? "paddcolumns" : 'hide' ) : "hide"}> Select target type </p>
				        	<select className={ this.state.dataType ? ( this.state.dataType == 'List' || this.state.dataType == 'Relation' ? "addcolselect" : 'hide' ) : "hide"} value={ this.state.target } onChange={ this.changeHandler.bind(this,'target') }>
				        		<option value=''>-select-</option>
				        		<optgroup label="DataTypes" className={ this.state.dataType ? ( this.state.dataType == 'List' ? "" : 'hide' ) : "hide"}>
				        			{ targetTypesData }
				        		</optgroup>
				        		<optgroup label="Tables">
				        			{ targetTypesTable }
				        		</optgroup>
				        	</select>
				        	<p className="paddcolumnsfl"> Required </p>
				        	<Checkbox className='checkStyleaddcolfl' onCheck={this.checkHandler.bind(this,'required')} checked={this.state.required}/>
				        	<p className={ this.state.uniqueCheck ? 'paddcolumnsfr' : 'hide'}> Unique </p>
				        	<Checkbox className={ this.state.uniqueCheck ? 'checkStyleaddcolfr' : 'hide' } onCheck={this.checkHandler.bind(this,'unique')} checked={this.state.unique}/>
				        </div>
				        <button className="fl addcol" type="submit">Add</button>
			        </form>
			    	</Popover>
	           	</th>
		);
	}
}

export default AddColumnComponent;