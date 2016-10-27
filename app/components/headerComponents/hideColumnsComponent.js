import React from 'react'
import { observer } from "mobx-react"
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

@observer
class HideColumns extends React.Component {
	constructor(){
		super()
		this.state = {
			open: false
		}
	}
	componentWillMount(){

	}
	hideShowColumn(name,status,e){
		if(!status){
			this.props.tableStore.hideColumn(name)
		} else {
			this.props.tableStore.removeHiddenColumn(name)
		}
	}
	showAll(){
		this.props.tableStore.showAll()
	}
	hideAll(){
		this.props.tableStore.getColumns.map((x)=>{
			if(x.name != '_id'){
				this.hideShowColumn(x.name,false)
			}
		})
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
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {
		let columns = this.props.tableStore.getColumns
		let hiddenColumns = this.props.tableStore.hiddenColumns
		let hiddenButtonText = "Hide Columns"
		if(hiddenColumns.length){
			hiddenButtonText = hiddenColumns.length + " Hidden Columns"
		}
		columns = columns.map((data,i)=>{
			let hidden = hiddenColumns.indexOf(data.name) != -1
			return <p key={ i } className="parapop"><input checked={ hidden } type="checkbox" className="checkselect" onChange={ this.hideShowColumn.bind(this,data.name,hidden) }/>{ data.name }</p>
		})
		return (
			<div style={{display:'inline'}}>
				<button className="btn subhbtnpop" onTouchTap={this.handleTouchTap.bind(this)}><i className="fa fa-columns mr2" aria-hidden="true"></i>{ hiddenButtonText }</button>
				<Popover
		          open={this.state.open}
		          anchorEl={this.state.anchorEl}
		          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
		          targetOrigin={{horizontal: 'left', vertical: 'top'}}
		          onRequestClose={this.handleRequestClose.bind(this)}
		          animation={PopoverAnimationVertical}
		          className="popuphidecol"
		        >
		          <button className="btn popupshowhideleft" onClick={ this.showAll.bind(this) }>show all</button>
		          <button className="btn popupshowhideright" onClick={ this.hideAll.bind(this) }>hide all</button>
		          {columns}
		        </Popover>
			</div>
		);
	}
}

export default HideColumns;