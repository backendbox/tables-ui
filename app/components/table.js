import React from 'react';
import { observer } from "mobx-react"
//components
import GenericTd from './tableComponents/genericTdComponent'
import GenericTh from './tableComponents/genericThTrComponent'
import RowCheckBoxComponent from './tableComponents/rowCheckBoxComponent';
import Checkbox from 'material-ui/Checkbox';

@observer
class Table extends React.Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}
	componentWillMount(){
		
	}

	addRow(){
		var row = new CB.CloudObject(this.props.tableStore.TABLE)
		row.set('updatedAt',new Date().toISOString())
		row.set('createdAt',new Date().toISOString())
		this.props.tableStore.addRow(row)
	}
	rowCheckHandler(index,id,e,data){
		if(data) {
			this.props.tableStore.addToDeleteRows(id)
			this.refs['row'+index].className = 'lgrey'
			this.refs['rowoverlap'+index].className = 'lgrey'
		} else {
			this.props.tableStore.removeFromDeleteRows(id)
			this.refs['row'+index].className = ''
			this.refs['rowoverlap'+index].className = ''
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
		let clomunTrOverlap = columnsData.map((i,index)=>{
			return  <tr key={index} ref={'rowoverlap'+index}> 
						<RowCheckBoxComponent key={index} indexValue = { index } checkHandler={ this.rowCheckHandler.bind(this) } rowObject={ i } tableStore={ this.props.tableStore }/>
						{ 	getColumns
							.filter(x => x.dataType == "Id")
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
			         	<GenericTh tableStore={ this.props.tableStore } selectDeselectAllRows={ this.selectDeselectAllRows.bind(this) }/>
			        </thead>
			        <tbody>
			          { clomunTr }
			          	<tr className="addnewrow"> 
							<td className="pointer tdplus" onClick={this.addRow.bind(this)}><i className="fa fa-plus plusrow" aria-hidden="true"></i></td>
						</tr>
			        </tbody>
			    </table>

			    <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp margintop10 secondayoverlap">
			    	<thead>
			         	<tr>
							<th className="tdtrcheck"> <Checkbox className="mlm11" onCheck={ this.selectDeselectAllRows.bind(this) }/> </th>
							<th className='taleft pb7'>
								<i className='icon ion-pound colicon'></i>
								<span className="colname">id</span>
							</th>
						</tr>
			        </thead>
			        <tbody>
			          { clomunTrOverlap }
			          <tr className="addnewrow"> 
							<td className="pointer tdplus" onClick={this.addRow.bind(this)}><i className="fa fa-plus plusrow" aria-hidden="true"></i></td>
						</tr>
			        </tbody>
			    </table>

		    </div>
		);
	}
}

export default Table;