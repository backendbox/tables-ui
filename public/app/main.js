import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios'
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
injectTapEventPlugin();

//components
import Table from './components/table.js';
import Header from './components/header.js';

//stores
import TableStore from './stores/tableStore.js';

class Layout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			appName: '',
			userProfile: ''
		}
	}
	componentDidMount() {
		axios.defaults.withCredentials = true
		let appId = window.location.pathname.split('/')[1]
		let tableName = window.location.pathname.split('/')[2]


		axios.get(USER_SERVICE_URL + 'user').then((userData) => {
			axios.get(USER_SERVICE_URL + 'app').then((data) => {

				if(data.data.length){
	
					let app = null
					if(appId){
						app = data.data.filter(x => x.appId == appId)[0]
					}

					if(app){
						if (__isHosted == "true" || __isHosted == true) {
							CB.CloudApp.init(app.appId, app.keys.master)
						} else CB.CloudApp.init(SERVER_URL, appId, app.keys.master)
						if (tableName) TableStore.initialize(appId,tableName,data.data)
						else TableStore.initialize(appId,null,data.data)
						this.setState({ appName: app.name, userProfile: userData.data })
						document.title = "CloudBoost Table | " + app.name
					} else {
						window.location.pathname = "/"+data.data[0].appId
					}

				} else {
					window.location.href = DASHBOARD_URL
				}

			}, (err) => {
				console.log(err)
				window.location.href = DASHBOARD_URL
			})
		}, (err) => {
			window.location.href = ACCOUNTS_URL + '?redirectUrl=' + encodeURIComponent(window.location.href);
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
					<Header tableStore={TableStore} appName={this.state.appName} userProfile={this.state.userProfile} />
					<Table tableStore={TableStore}></Table>
				</div>
			</MuiThemeProvider>
		);
	}
}

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/:appId/:tableName" component={Layout}>
			<IndexRoute component={Layout} />
		</Route>
		<Route path="/:appId" component={Layout}>
			<IndexRoute component={Layout} />
		</Route>
		<Route path="/" component={Layout}>
			<IndexRoute component={Layout} />
		</Route>
	</Router>, document.getElementById('main'));