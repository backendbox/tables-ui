import React from 'react'
import { observer } from "mobx-react"
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

@observer
class HeaderTable extends React.Component {
	constructor(){
		super()
		this.state = {
			openNewTable: false,
			openDeleteTable: false,
			tableName:'',
			tableTodelete:''
		}
	}
	changeTable(name){
		this.props.tableStore.changeTable(name)
	}
	deleteTable(){
		this.props.tableStore.deleteTable(this.state.tableTodelete)
		this.state.openDeleteTable = false
		this.state.tableTodelete = ''
		this.setState(this.state)
	}
	addtable(e){
		e.preventDefault()
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
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {
		let { getTables,TABLE } = this.props.tableStore
		let tables = []
		if(getTables.length){
			tables = getTables.map((x,i)=>{
				if(TABLE == x.name) return <div key={ i } className="tableselected">
												<p className="white tacenter">{ x.name } { ['User','Role','Device'].indexOf(x.name) == -1 ? <i className="fa fa-caret-down deletear cp" aria-hidden="true" onTouchTap={this.handleTouchTap.bind(this,'openDeleteTable')} data-table={ x.name }></i> : ''}</p>
												
											</div>
					else return <div key={ i } className="tablenotselected cp" onClick={ this.changeTable.bind(this,x.name) }>
									<p className="tacenter">{ x.name } { ['User','Role','Device'].indexOf(x.name) == -1 ? <i className="fa fa-caret-down deletear cp" aria-hidden="true" onTouchTap={this.handleTouchTap.bind(this,'openDeleteTable')} data-table={ x.name }></i> : ''}</p>
									
								</div>
			})
		}
		return (
			<div className="headertablecrud">
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
		        <form onSubmit={ this.addtable.bind(this) }>
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
			        <button className="deletetablebtn" type="submit" onClick={ this.deleteTable.bind(this) }>Delete <i className="fa fa-trash" aria-hidden="true"></i></button>
		        </Popover>
			</div>
		);
	}
}

export default HeaderTable;