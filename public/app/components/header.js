import React from 'react'
import { observer } from "mobx-react"
import Snackbar from 'material-ui/Snackbar'
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover'
//components
import HideColumns from './headerComponents/hideColumnsComponent.js';
import FilterRows from './headerComponents/filterRowsComponent.js';
import Search from './headerComponents/searchComponent.js';
import HeaderTable from './headerComponents/headerTableComponent.js';

@observer
class Header extends React.Component {
	constructor(){
		super()
		this.state = {
			searchString:'',
			searchErrorOpen: false,
			open: false,
		}
	}
	search(searchString){
		this.state.searchString = searchString
		this.setState(this.state)
		this.props.tableStore.search(searchString).then((res)=>{
			if(res.length){
				this.props.tableStore.updateColumnsData(res)
				this.props.tableStore.showLoader()
			}
		},(err)=>{
			this.setState({
				searchErrorOpen: true
			})
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
	handleRequestClose(which){
		this.state[which] = false
		this.setState(this.state)
	}
	refreshRows(){
		this.props.tableStore.setColumnsData()
		this.props.tableStore.showLoader()
	}
	deleteRows(){
		this.props.tableStore.deleteRows()
	}
	newPageRedirect(where){
		let win = window.open(where, '_blank')
  		win.focus()
	}
	dashRedirect(){
		window.location.href=DASHBOARD_URL
	}
	dashprofileRedirect(){
		window.location.href=DASHBOARD_URL+"/#/profile"
	}
	logout(){
		window.location.href=ACCOUNTS_URL
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {
		return (
			<div>
				<div id="dataHeader">
					<i className="fa fa-arrow-left dasbardlikarrow cp" aria-hidden="true" onClick={ this.dashRedirect.bind(this) }></i>
					<span className="dasboardlink cp" onClick={ this.dashRedirect.bind(this) }> Dashboard</span>
					<p className="appname">{ this.props.appName }</p>
					{ 
						this.props.userProfile.file ? 
						<img src={ this.props.userProfile.file.document ? this.props.userProfile.file.document.url : '' } className="userlogoimage cp" onTouchTap={this.handleTouchTap.bind(this)} />
						:
						<i className="fa fa-user userLogoheadng cp" aria-hidden="true" onTouchTap={this.handleTouchTap.bind(this)} ></i> 
					}
					<Popover
				          open={this.state.open}
				          anchorEl={this.state.anchorEl}
				          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				          targetOrigin={{horizontal: 'left', vertical: 'top'}}
				          onRequestClose={this.handleRequestClose.bind(this,'open')}
				          animated={false}
				          className="columnpop"
				        >
				        	<button className="coloptbtn" onClick={ this.dashprofileRedirect.bind(this) }><i className="fa fa-user" aria-hidden="true"></i> Profile</button>
				        	<button className="coloptbtn" onClick={ this.dashRedirect.bind(this) }><i className="fa fa-home" aria-hidden="true"></i> Dashboard</button>
				        	<button className="coloptbtn" onClick={ this.logout.bind(this) }><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
				    </Popover>
					<i className="fa fa-book userHelpheadng cp" aria-hidden="true" onClick={ this.newPageRedirect.bind(this,"https://tutorials.cloudboost.io/") }></i>
					<i className="fa fa-question userHelpheadng cp" aria-hidden="true" onClick={ this.newPageRedirect.bind(this,"https://slack.cloudboost.io") }></i>
					<HeaderTable tableStore={ this.props.tableStore }/>
				</div>
				<div id="dataSubHeader">
					<div className="btn subhbtn ml5" onClick={ this.refreshRows.bind(this) }><i className="fa fa-refresh mr2" aria-hidden="true"></i> Refresh rows</div>
					<button className={this.props.tableStore.rowsToDelete.length > 0 ? 'btn subhbtn':'hide'} onClick={ this.deleteRows.bind(this) }><i className="fa fa-trash mr2" aria-hidden="true"></i> Delete rows</button>
					<HideColumns tableStore={ this.props.tableStore }/>
					<FilterRows tableStore={ this.props.tableStore }/>
					<Search tableStore={ this.props.tableStore } searchString={ this.state.searchString } search={ this.search.bind(this) }/>
				</div>
				<Snackbar
		          open={this.state.searchErrorOpen}
		          message="Cannot Search, Table does not have a text datatype column."
		          autoHideDuration={4000}
		          onRequestClose={this.handleRequestClose.bind(this,'searchErrorOpen')}
		        />
			</div>
		);
	}
}

export default Header;