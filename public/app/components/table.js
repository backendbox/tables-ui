import React from 'react';
import { observer } from "mobx-react"
//components
import GenericTd from './tableComponents/genericTdComponent'
import GenericTh from './tableComponents/genericThTrComponent'
import GenericNewTd from './tableComponents/genericNewTdComponent'
import RowCheckBoxComponent from './tableComponents/rowCheckBoxComponent'
import RowErrorComponent from './tableComponents/rowErrorComponents'
import NewRowComponent from './tableComponents/newRowComponent'
import Checkbox from 'material-ui/Checkbox'

@observer
class Table extends React.Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}
	componentWillMount(){
		this.props.tableStore.showLoader()
	}
	componentDidMount(){
		$(window).scroll(function() {
		   if($(window).scrollTop() + $(window).height() == $(document).height()) {
		   		$('.morerowsbtn').removeClass('hide')
		   } else {
		   		$('.morerowsbtn').addClass('hide')
		   }
		}.bind(this))
		
	}
	componentDidUpdate(){
		setTimeout(()=>{
			$('[data-row]').mouseover(function(){
				let index = $(this).attr('data-index')
				$('[data-row="row'+index+'"]').addClass('lgreyhover')
				$('[data-row="rowoverlap'+index+'"]').addClass('lgreyhover')
			})
			$('[data-row]').mouseleave(function(){
				let index = $(this).attr('data-index')
				$('[data-row="row'+index+'"]').removeClass('lgreyhover')
				$('[data-row="rowoverlap'+index+'"]').removeClass('lgreyhover')
			})
			$('.testdt').mouseover(function(){
				$('.testdt').addClass('lgreyhover')
				$('.tdplus').addClass('lgreyhover')
			})
			$('.testdt').mouseleave(function(){
				$('.testdt').removeClass('lgreyhover')
				$('.tdplus').removeClass('lgreyhover')
			})
			$('.tdplus').mouseover(function(){
				$('.testdt').addClass('lgreyhover')
				$('.tdplus').addClass('lgreyhover')
			})
			$('.tdplus').mouseleave(function(){
				$('.testdt').removeClass('lgreyhover')
				$('.tdplus').removeClass('lgreyhover')
			})
			$('td').click(function(){
				$('td').removeClass('clickedCell')
				$(this).addClass('clickedCell')
				$('.tdtrcheck').removeClass('clickedCell')
			})
			this.props.tableStore.hideLoader()
			this.props.tableStore.hideBlur()
		},1000)
	}
	showMoreRecord(){
		this.props.tableStore.showNextRecords(10)
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
			$('[data-row="row'+index+'"]').addClass('lgrey')
			$('[data-row="rowoverlap'+index+'"]').addClass('lgrey')
		} else {
			this.props.tableStore.removeFromDeleteRows(id)
			$('[data-row="row'+index+'"]').removeClass('lgrey')
			$('[data-row="rowoverlap'+index+'"]').removeClass('lgrey')
		}
	}
	selectDeselectAllRows(e,data){
		if(data) $('[data-row]').addClass('lgrey')
			else $('[data-row]').removeClass('lgrey')
		
		if(data){
			this.props.tableStore.columnsData.map((x)=>{
				if(this.props.tableStore.rowsToDelete.indexOf(x.id) == -1){
					this.props.tableStore.addToDeleteRows(x.id)
				}
			})
		} else  this.props.tableStore.rowsToDelete = []
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {

		let { getColumns,columnsData,hiddenColumns } = this.props.tableStore

		let clomunTr = columnsData.map((i,index)=>{
			return  i.error ?
					<NewRowComponent key={index} rowObject={ i } tableStore={ this.props.tableStore } overlap={false}/>
					:
					<tr key={index} data-row={'row'+index} data-index={index}> 
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
			return  i.error ?
					<NewRowComponent key={index} rowObject={ i } tableStore={ this.props.tableStore } overlap={true}/>
					:
					<tr key={index} data-row={'rowoverlap'+index} data-index={index}> 
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
				<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp margintop10 hide" id="table">
			        <thead>
			         	<GenericTh tableStore={ this.props.tableStore } selectDeselectAllRows={ this.selectDeselectAllRows.bind(this) }/>
			        </thead>
			        <tbody>
			        	{ clomunTr }
			        	<tr className="addnewrow" onDoubleClick={this.addRow.bind(this)}> 
							<td className="pointer tdplus" onClick={this.addRow.bind(this)}><i className="fa fa-plus plusrow" aria-hidden="true"></i></td>
							{
								getColumns
								.filter(x => hiddenColumns.indexOf(x.name) == -1)
								.map((x,i)=>{
									return <td className="testdt" key={ i }></td>
								})
							}
						</tr>
			        </tbody>
			    </table>

			    <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp margintop10 secondayoverlap hide" id="tableoverlap">
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
			          	<tr className="addnewrow" onDoubleClick={this.addRow.bind(this)}> 
							<td className="pointer tdplus" onClick={this.addRow.bind(this)}><i className="fa fa-plus plusrow" aria-hidden="true"></i></td>
							<td className="testdt"></td>
						</tr>
			        </tbody>
			    </table>
				<div id="loader">
					<div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
				</div>
				<button className="btn btn-primary morerowsbtn hide" onClick={ this.showMoreRecord.bind(this) }>More</button>
				<div id="snackbar"></div>
		    </div>
		);
	}
}

export default Table;