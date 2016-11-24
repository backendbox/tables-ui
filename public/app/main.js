import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
		axios.get('https://service.cloudboost.io/user').then((userData)=>{
			axios.get('https://service.cloudboost.io/app/'+appId).then((data)=>{
				if(data.data && appId){
					CB.CloudApp.init(appId,data.data.keys.master)
					TableStore.initialize()
					this.setState({appName:data.data.name,userProfile:userData.data})
					document.title = "CloudBoost Table | "+data.data.name
				} else {
					window.location.href = "https://dashboard.cloudboost.io/"
				}
			},(err)=>{
				console.log(err)
				window.location.href = "https://dashboard.cloudboost.io/"
			})
		},(err)=>{
			window.location.href = "https://accounts.cloudboost.io"
		})
	}
	render() {
	  return (
	  	<MuiThemeProvider>
	  		<div id="reactmain">
		  		<Header tableStore={ TableStore } appName={ this.state.appName } userProfile={ this.state.userProfile }/>
		  		<Table tableStore={ TableStore }></Table>
	  		</div>
	  	</MuiThemeProvider>
	  );
	}
}

ReactDOM.render(<Layout/>, document.getElementById('main'));