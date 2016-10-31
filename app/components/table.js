import React from 'react';
import { observer } from "mobx-react"
//components
import GenericTd from './tableComponents/genericTdComponent'
import RowCheckBoxComponent from './tableComponents/rowCheckBoxComponent';
import Checkbox from 'material-ui/Checkbox';

@observer
class Table extends React.Component {
	constructor(){
		super()
		this.state = {

		}
	}
	componentWillMount(){
		this.props.tableStore.TABLE = 'User'
		this.props.tableStore.setColumns()
		this.props.tableStore.setColumnsData()
	}

	addRow(){
		var row = new CB.CloudObject('User')
		row.set('updatedAt',new Date().toISOString())
		row.set('createdAt',new Date().toISOString())
		this.props.tableStore.addRow(row)
	}
	rowCheckHandler(index,id,e,data){
		if(data) {
			this.props.tableStore.addToDeleteRows(id)
			this.refs['row'+index].className = 'lgrey'
		} else {
			this.props.tableStore.removeFromDeleteRows(id)
			this.refs['row'+index].className = ''
		}
	}
	selectDeselectAllRows(e,data){
		for(var key in this.refs){
			if(this.refs.hasOwnProperty(key)){
				if(data){
					this.refs[key].className = 'lgrey'
				} else {
					this.refs[key].className = ''
				}
			}
		}
		//TODO - edge case for de-selcting all
		this.props.tableStore.columnsData.map((x)=>{
			if(data) this.props.tableStore.addToDeleteRows(x.id)
				else this.props.tableStore.removeFromDeleteRows(x.id)
		})
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {

		let { getColumns,columnsData,hiddenColumns } = this.props.tableStore

		let columnsHeadings = getColumns.map((x,index) => {
			let hidden = hiddenColumns.indexOf(x.name) != -1
			return <th key={index} className={ hidden ? 'hide':'tacenter pb7'}><span> { x.name } </span></th>
		})

		let clomunTr = columnsData.map((i,index)=>{
			return  <tr key={index} ref={'row'+index}> 
						<RowCheckBoxComponent key={index} indexValue = { index } checkHandler={ this.rowCheckHandler.bind(this) } rowObject={ i } tableStore={ this.props.tableStore }/>
						{ 	getColumns
							.filter(x => hiddenColumns.indexOf(x.name) == -1)
							.map((x,index) => {
								return <GenericTd key={index} columnType={ x } columnData={ i } tableStore={ this.props.tableStore }></GenericTd> 
							})
						} 
					</tr>
		})

		return (
			<div id="datatable">
				<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp margintop10">
			        <thead>
			          <tr>
				          <th> <Checkbox className="mlm11" onCheck={ this.selectDeselectAllRows.bind(this) }/> </th>
			            	{ columnsHeadings }
			          </tr>
			        </thead>
			        <tbody>
			          { clomunTr }
			          	<tr> 
							<td className="pointer tdplus" onClick={this.addRow.bind(this)}><i className="fa fa-plus plusrow" aria-hidden="true"></i></td>
						</tr>
			        </tbody>
			    </table>
		    </div>
		);
	}
}

export default Table;