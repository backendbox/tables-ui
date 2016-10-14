import React from 'react';
import { observer } from "mobx-react"
//components
import GenericTd from './tableComponents/genericTdComponent'
import CheckBoxTdComponent from './tableComponents/checkBoxTdComponent';
import Checkbox from 'material-ui/Checkbox';

@observer
class Table extends React.Component {
	constructor(){
		super()
		this.state = {

		}
	}
	componentWillMount(){
		this.props.tableStore.setColumns('User')
		this.props.tableStore.setColumnsData('User')
	}

	addRow(){
		var row = new CB.CloudObject('User')
		row.set('updatedAt',new Date().toISOString())
		row.set('createdAt',new Date().toISOString())
		this.props.tableStore.addRow(row)
	}
	rowCheckHandler(index,e,data){
		if(data) this.refs['row'+index].className = 'lgrey'
			else this.refs['row'+index].className = ''
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {

		let { getColumns, getColumnsData,columnsData } = this.props.tableStore

		let columnsHeadings = getColumns.map((x,index) => {
			return <th key={index} className="tacenter"> { x.name } </th>
		})

		let clomunTr = columnsData.map((i,index)=>{
			return  <tr key={index} ref={'row'+index}> 
						<CheckBoxTdComponent key={index} indexValue = { index } checkHandler={ this.rowCheckHandler.bind(this) }/>
						{ getColumns.map((x,index) => <GenericTd key={index} columnType={ x } columnData={ i }></GenericTd> ) } 
					</tr>
		})

		return (
			<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp mauto margintop10">
		        <thead>
		          <tr>
			          <th> <Checkbox/> </th>
		            	{ columnsHeadings }
		          </tr>
		        </thead>
		        <tbody>
		          { clomunTr }
		          	<tr> 
						<td className="pointer" onClick={this.addRow.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i></td>
					</tr>
		        </tbody>
		    </table>
		);
	}
}

export default Table;