import React from 'react';
import { observer } from "mobx-react"
//components
import GenericTd from './tableComponents/genericTdComponent'

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
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {
		let { getColumns, getColumnsData,columnsData } = this.props.tableStore

		let columnsHeadings = getColumns.map((x) => {
			return <th> { x.name } </th>
		})

		let clomunTr = columnsData.map((i)=>{
			return  <tr> { getColumns.map(x => <GenericTd columnType={ x } columnData={ i }></GenericTd> ) } </tr>
		})

		return (
			<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp mauto margintop10" border="1">
		        <thead>
		          <tr>
		            { columnsHeadings }
		          </tr>
		        </thead>
		        <tbody>
		          { clomunTr }
		        </tbody>
		    </table>
		);
	}
}

export default Table;