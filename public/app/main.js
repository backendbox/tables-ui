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
	componentDidMount() {
		let appId = window.location.hash.split('/')[1]
		axios.get('http://localhost:3000/app/'+appId).then((data)=>{
			if(data.data){
				CB.CloudApp.init('http://localhost:4730',appId,data.data.keys.master)
				TableStore.initialize()
			}
		})
	}
	render() {
	  return (
	  	<MuiThemeProvider>
	  		<div id="reactmain">
		  		<Header tableStore={ TableStore } appName={ 'jjwiumppcgur' }/>
		  		<Table tableStore={ TableStore }></Table>
	  		</div>
	  	</MuiThemeProvider>
	  );
	}
}

ReactDOM.render(<Layout/>, document.getElementById('main'));