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
			props.data.fetch({
			  success: function(file) {
			  	console.log(file)
			  	this.state.filePreview = file
			  	this.setState(this.state)
			     //received file Object
			  }.bind(this), error: function(err) {
			      //error in getting file Object
			  }
			});
		}
	}
	render() {
		return (
			<div>
				<img src={ 
					this.state.filePreview ? (this.state.filePreview.type.split('/')[0] == 'image' ? this.state.filePreview.url : '/app/assets/images/file.png') : '/app/assets/images/file.png' 
				} className="fileListPreveiew" />
				<button onClick={ this.deleteValue.bind(this) } className="deletefilelist"><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
			</div>
		);
	}
}

export default FileListComponent;