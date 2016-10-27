import React from 'react'
import { observer } from "mobx-react"
//components
import HideColumns from './headerComponents/hideColumnsComponent.js';

@observer
class Header extends React.Component {
	constructor(){
		super()
		this.state = {
			
		}
	}
	componentWillMount(){

	}
	refreshRows(){
		this.props.tableStore.setColumnsData('User')
	}
	deleteRows(){
		this.props.tableStore.deleteRows()
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {
		return (
			<div>
				<div id="dataHeader">
					<img src="/app/assets/images/icon.png" className="logoCB" />
					<p className="appname">{ this.props.appName }</p>
					<i className="fa fa-user userLogoheadng" aria-hidden="true"></i>
					<i className="fa fa-question userLogoheadng" aria-hidden="true"></i>
				</div>
				<div id="dataSubHeader">
					<button className="btn subhbtn ml5" onClick={ this.refreshRows.bind(this) }><i className="fa fa-refresh mr2" aria-hidden="true"></i> Refresh rows</button>
					<button className={this.props.tableStore.rowsToDelete.length > 0 ? 'btn subhbtn':'hide'} onClick={ this.deleteRows.bind(this) }><i className="{fa fa-trash mr2" aria-hidden="true"></i> Delete rows</button>
					<HideColumns tableStore={ this.props.tableStore }/>
					<button className="btn subhbtnpop"><i className="fa fa-filter mr2" aria-hidden="true"></i> Filters</button>
					<i className="fa fa-search searchheading" aria-hidden="true"></i>
				</div>
			</div>
		);
	}
}

export default Header;