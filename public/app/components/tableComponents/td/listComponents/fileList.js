import React from 'react';
import ReactDOM from 'react-dom';

class FileListComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			filePreview:null
		}
	}
	deleteValue(){
		this.props.removeFromElementData(this.props.index)
	}
	componentDidMount(){
		this.fetchImageFromCB(this.props)
	}
	fetchImageFromCB(props){
		if(props.data){
			try {
				props.data.fetch({
				  success: function(file) {
				  	this.state.filePreview = file
				  	this.setState(this.state)
				     //received file Object
				  }.bind(this), error: function(err) {
				  	console.log(err)
				      //error in getting file Object
				  }
				});
			} catch(e){
				console.log(e)
			}
		}
	}
	downloadFile(){
		let win = window.open(this.state.filePreview.url, '_blank')
  		win.focus()
	}
	render() {
		return (
			<div>
				<img src={ 
					this.state.filePreview ? (this.state.filePreview.type.split('/')[0] == 'image' ? this.state.filePreview.url : '/app/assets/images/file.png') : '/app/assets/images/file.png' 
				} className="fileListPreveiew cp" onClick={ this.downloadFile.bind(this) }/>
				<button onClick={ this.deleteValue.bind(this) } className="deletefilelist"><i className="fa fa-times" aria-hidden="true"></i> Delete</button>
			</div>
		);
	}
}

export default FileListComponent;