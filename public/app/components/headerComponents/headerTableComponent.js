import React from 'react'
import { observer } from "mobx-react"
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

@observer
class HeaderTable extends React.Component {
	constructor(){
		super()
		this.state = {
			openNewTable: false,
			openDeleteTable: false,
			openTableSelector:false,
			tableName:'',
			tableTodelete:'',
			isModalOpen:false,
			confirmDeleteValue:'',
			tableSearch:''
		}
	}
	changeTable(name){
		this.props.tableStore.changeTable(name)
		this.props.tableStore.showLoader()
		this.setState({openTableSelector:false})
	}
	deleteTable(){
		this.props.tableStore.showLoader()
		this.props.tableStore.deleteTable(this.state.tableTodelete)
		this.state.openDeleteTable = false
		this.state.tableTodelete = ''
		this.state.isModalOpen = false
		this.setState(this.state)
	}
	addtable(e){
		e.preventDefault()
		this.props.tableStore.showLoader()
		this.props.tableStore.createTable(this.state.tableName)
		this.state.openNewTable = false
		this.state.tableName = ''
		this.setState(this.state)
	}
	handleTouchTap(which,event){
		// This prevents ghost click.
		event.preventDefault();
		if(which == 'openDeleteTable'){
			this.state.tableTodelete = event.target.getAttribute("data-table")
		}
		this.state[which] = true
		this.state['anchorEl'] = event.currentTarget
		this.setState(this.state)
	}
	handleRequestClose(which){
		this.state[which] = false
		this.setState(this.state)
	}
	openCloseModal(what){
		this.handleRequestClose('openDeleteTable')
		this.setState({isModalOpen:what})
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {
		let { getTables,TABLE } = this.props.tableStore
		let tables = []
		let tableSelectorList = []
		if(getTables.length){
			tables = getTables.map((x,i)=>{
				if(TABLE == x.name) return <div key={ i } className="tableselected">
												<p className="tacenter" style={{fontWeight:'bold'}}>{ x.name } { ['User','Role','Device'].indexOf(x.name) == -1 ? <i className="fa fa-caret-down deletear cp" aria-hidden="true" onTouchTap={this.handleTouchTap.bind(this,'openDeleteTable')} data-table={ x.name }></i> : ''}</p>
												
											</div>
					else return <div key={ i } className="tablenotselected cp" onClick={ this.changeTable.bind(this,x.name) }>
									<p className="tacenter">{ x.name } { ['User','Role','Device'].indexOf(x.name) == -1 ? <i className="fa fa-caret-down deletear cp" aria-hidden="true" onTouchTap={this.handleTouchTap.bind(this,'openDeleteTable')} data-table={ x.name }></i> : ''}</p>
									
								</div>
			})

			tableSelectorList = getTables.filter((x)=>{
				if(this.state.tableSearch){
					return x.name.toLowerCase().includes(this.state.tableSearch)
				} else return true
			})
			.map((x,i)=>{
				return 	<p className="tablenameselector" onClick={ this.changeTable.bind(this,x.name) } key={ i }>
							{
								TABLE == x.name ? <i className="fa fa-check tablecheckcselected" aria-hidden="true"></i> : ''
							}
							{ x.name }
						</p>
			})
		}
		return (
			<div className="headertablecrud">
				<i className="fa fa-bars tablemenuheading" aria-hidden="true" onTouchTap={this.handleTouchTap.bind(this,'openTableSelector')}></i>
				<Popover
		          open={this.state.openTableSelector}
		          anchorEl={this.state.anchorEl}
		          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		          targetOrigin={{horizontal: 'left', vertical: 'top'}}
		          onRequestClose={this.handleRequestClose.bind(this,'openTableSelector')}
		          className="popuptableselector"
		        >	
					<i className="fa fa-search tablesearchnameicon" aria-hidden="true"></i>
					<input type="text" className="tablesearchname" placeholder="Find a table." onChange={ this.changeHandler.bind(this,'tableSearch') } value={ this.state.tableSearch }/>
					<div className="tablenamecontainer">
						{ tableSelectorList }
					</div>
		        </Popover>
				{ tables }
				<div className="tableadd cp" onTouchTap={this.handleTouchTap.bind(this,'openNewTable')}><i className="fa fa-plus addicoontable" aria-hidden="true"></i></div>
				<Popover
		          open={this.state.openNewTable}
		          anchorEl={this.state.anchorEl}
		          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
		          targetOrigin={{horizontal: 'left', vertical: 'top'}}
		          onRequestClose={this.handleRequestClose.bind(this,'openNewTable')}
		          animation={PopoverAnimationVertical}
		          className="popupaddtable"
		        >
					<img src="/app/assets/images/arrow-up.png"  className="tablepoparrow"/>
					<form onSubmit={ this.addtable.bind(this) }>
						<p className="headingpop">ADD NEW TABLE</p>
						<input className="inputaddtable" placeholder="Table name" onChange={ this.changeHandler.bind(this,'tableName') } value={ this.state.tableName } required />
						<button className="addtablebutton" type="submit">Add</button>
					</form>
		        </Popover>

		        <Popover
		          open={this.state.openDeleteTable}
		          anchorEl={this.state.anchorEl}
		          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
		          targetOrigin={{horizontal: 'left', vertical: 'top'}}
		          onRequestClose={this.handleRequestClose.bind(this,'openDeleteTable')}
		          animation={PopoverAnimationVertical}
		          className="popupdeletetable"
		        >
			        <button className="deletetablebtn" type="submit" onClick={this.openCloseModal.bind(this,true)}><i className="ion ion-ios-trash-outline trash-icon" aria-hidden="true"></i> Delete </button>
					
		        </Popover>
		        <Dialog title="Delete Confirmation" modal={false} open={this.state.isModalOpen} onRequestClose={this.openCloseModal.bind(this,false)} titleClassName="deletemodal" contentClassName={"contentclassdeletemodal"}>
					
					<p className="deleteconfirmtext">Please confirm that you want to delete this table, by entering the table name i.e. { this.state.tableTodelete } </p>
					<input className="deleteconfirminput" value={ this.state.confirmDeleteValue } onChange={ this.changeHandler.bind(this,'confirmDeleteValue') }/>

					<button className="btn btn-danger fr mt10" onClick={ this.deleteTable.bind(this) } disabled={ this.state.confirmDeleteValue != this.state.tableTodelete }>Delete</button>
				</Dialog>

			</div>
		);
	}
}

export default HeaderTable;