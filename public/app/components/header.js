import React from 'react'
import { observer } from "mobx-react"
import { Popover, PopoverAnimationVertical } from 'material-ui/Popover'
//components
import HideColumns from './headerComponents/hideColumnsComponent.js';
import FilterRows from './headerComponents/filterRowsComponent.js';
import Search from './headerComponents/searchComponent.js';
import HeaderTable from './headerComponents/headerTableComponent.js';

@observer
class Header extends React.Component {
	constructor() {
		super()
		this.state = {
			searchString: '',
			open: false,
			appSelectorOpen: false
		}
	}
	search(searchString) {
		this.state.searchString = searchString
		this.setState(this.state)
		this.props.tableStore.search(searchString).then((res) => {
			if (res.length) {
				this.props.tableStore.updateColumnsData(res)
				this.props.tableStore.showTopLoader()
			}
		}, (err) => {
			this.props.tableStore.showSnackbar("Cannot Search, Table does not have a text datatype column.")
		})
	}
	handleTouchTap(which, event) {
		// This prevents ghost click.
		event.preventDefault();
		this.state[which] = true
		this.state.anchorEl = event.currentTarget
		this.setState(this.state)
	}
	handleRequestClose(which) {
		this.state[which] = false
		this.setState(this.state)
	}
	refreshRows() {
		this.props.tableStore.setColumnsData()
		this.props.tableStore.showTopLoader()
	}
	deleteRows() {
		this.props.tableStore.deleteRows()
	}
	newPageRedirect(where) {
		let win = window.open(where, '_blank')
		win.focus()
	}
	dashRedirect() {
		window.location.href = DASHBOARD_URL
	}
	dashprofileRedirect() {
		window.location.href = DASHBOARD_URL + "/#/profile"
	}
	switchApp(appId){
		window.location.pathname = "/"+appId
	}
	logout() {
		window.location.href = ACCOUNTS_URL
	}
	changeHandler(which, e) {
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {
		let allApps = []
		if(this.props.tableStore.apps) {
			allApps = this.props.tableStore.apps.map((app, i) => {
				return <button className="coloptbtn" key={i} onClick={this.switchApp.bind(this,app.appId)}>{app.name}</button>
			})
		}
		return (
			<div>
				<div id="dataHeader">
					<i className="fa fa-arrow-left dasbardlikarrow cp" aria-hidden="true" onClick={this.dashRedirect.bind(this)}></i>
					<span className="dasboardlink cp" onClick={this.dashRedirect.bind(this)}> Dashboard</span>
					<p className="appname cp" onTouchTap={this.handleTouchTap.bind(this, 'appSelectorOpen')}>
						{this.props.appName}
						<i className="fa fa-caret-down appselectoracarte" aria-hidden="true"></i>
					</p>
					<Popover
						open={this.state.appSelectorOpen}
						anchorEl={this.state.anchorEl}
						anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
						targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
						onRequestClose={this.handleRequestClose.bind(this, 'appSelectorOpen')}
						animated={true}
						className="profilepop"
					>
						<p className="headingpop">{'YOUR APPS'}</p>
						{allApps}
					</Popover>
					{
						this.props.userProfile.file ?
							<img src={this.props.userProfile.file.document ? this.props.userProfile.file.document.url : ''} className="userlogoimage cp" onTouchTap={this.handleTouchTap.bind(this, 'open')} />
							:
							<img src='/app/assets/images/user-image.png' className="userlogoimage cp" onTouchTap={this.handleTouchTap.bind(this, 'open')} />
					}
					<Popover
						open={this.state.open}
						anchorEl={this.state.anchorEl}
						anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
						targetOrigin={{ horizontal: 'left', vertical: 'top' }}
						onRequestClose={this.handleRequestClose.bind(this, 'open')}
						animated={true}
						className="profilepop"
					>
						<img src="/app/assets/images/arrow-up.png"  className="profilepoparrow"/>
						<p className="headingpop">{this.props.userProfile ? this.props.userProfile.user.name.toUpperCase() : ''}</p>
						<button className="coloptbtn" onClick={this.dashprofileRedirect.bind(this)}>Profile</button>
						<button className="coloptbtn" onClick={this.dashRedirect.bind(this)}>Dashboard</button>
						<button className="coloptbtn" onClick={this.logout.bind(this)}>Logout</button>
					</Popover>
					<i className="fa fa-book userHelpheadng cp expandCircle" aria-hidden="true" onClick={this.newPageRedirect.bind(this, "https://tutorials.cloudboost.io/")}></i>
					<i className="fa fa-question userHelpheadng cp expandCircle" aria-hidden="true" onClick={this.newPageRedirect.bind(this, "https://slack.cloudboost.io")}></i>
					<HeaderTable tableStore={this.props.tableStore} />
				</div>
				<div id="dataSubHeader">
					<div className="btn subhbtn" onClick={this.refreshRows.bind(this)}><i className="fa fa-refresh mr2" aria-hidden="true"></i> Refresh rows</div>
					<button className={this.props.tableStore.rowsToDelete.length > 0 ? 'btn subhbtn' : 'hide'} onClick={this.deleteRows.bind(this)}><i className="fa fa-trash mr2" aria-hidden="true"></i> Delete rows</button>
					<HideColumns tableStore={this.props.tableStore} />
					<FilterRows tableStore={this.props.tableStore} />
					<Search tableStore={this.props.tableStore} searchString={this.state.searchString} search={this.search.bind(this)} />
				</div>
			</div>
		);
	}
}

export default Header;