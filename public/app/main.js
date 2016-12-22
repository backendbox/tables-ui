import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue500} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios'
injectTapEventPlugin();

//components
import Table from './components/table.js';
import Header from './components/header.js';

//stores
import TableStore from './stores/tableStore.js';

class Layout extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			appName:'',
			userProfile:''
		}
	}
	componentDidMount() {
		axios.defaults.withCredentials = true
		let appId = window.location.hash.split('/')[1]
		let tableName = window.location.hash.split('/')[2]
		axios.get(USER_SERVICE_URL+'user').then((userData)=>{
			axios.get(USER_SERVICE_URL+'app/'+appId).then((data)=>{
				if(data.data && appId){
					if(__isHosted == "true" || __isHosted == true){
						CB.CloudApp.init(appId,data.data.keys.master)
					} else CB.CloudApp.init(SERVER_URL,appId,data.data.keys.master)
					if(tableName) TableStore.initialize(tableName)
						else TableStore.initialize()
					this.setState({appName:data.data.name,userProfile:userData.data})
					document.title = "CloudBoost Table | "+data.data.name
				} else {
					window.location.href = DASHBOARD_URL
				}
			},(err)=>{
				console.log(err)
				window.location.href = DASHBOARD_URL
			})
		},(err)=>{
			window.location.href = ACCOUNTS_URL
		})
	}
	render() {
		const muiTheme = getMuiTheme({
			palette: {
				primary1Color: blue500,
				primary2Color: blue500,
				accent1Color: blue500,
				pickerHeaderColor: blue500,
			},
		})
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div id="reactmain">
		  		<Header tableStore={ TableStore } appName={ this.state.appName } userProfile={ this.state.userProfile }/>
		  		<Table tableStore={ TableStore }></Table>
				</div>
			</MuiThemeProvider>
		);
	}
}

ReactDOM.render(<Layout/>, document.getElementById('main'));