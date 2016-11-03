import React from 'react'
import { observer } from "mobx-react"
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
			searchString:''
		}
	}
	componentWillMount(){
		this.props.tableStore.initialize()
	}
	search(searchString){
		this.state.searchString = searchString
		this.setState(this.state)
		this.props.tableStore.search(searchString)
	}
	refreshRows(){
		this.props.tableStore.setColumnsData()
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
					<i className="fa fa-question userHelpheadng" aria-hidden="true"></i>
					<HeaderTable tableStore={ this.props.tableStore }/>
				</div>
				<div id="dataSubHeader">
					<button className="btn subhbtn ml5" onClick={ this.refreshRows.bind(this) }><i className="fa fa-refresh mr2" aria-hidden="true"></i> Refresh rows</button>
					<button className={this.props.tableStore.rowsToDelete.length > 0 ? 'btn subhbtn':'hide'} onClick={ this.deleteRows.bind(this) }><i className="fa fa-trash mr2" aria-hidden="true"></i> Delete rows</button>
					<HideColumns tableStore={ this.props.tableStore }/>
					<FilterRows tableStore={ this.props.tableStore }/>
					<Search tableStore={ this.props.tableStore } searchString={ this.state.searchString } search={ this.search.bind(this) }/>
				</div>
			</div>
		);
	}
}

export default Header;