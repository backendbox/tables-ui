import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import Dropzone from 'react-dropzone';
import LinearProgress from 'material-ui/LinearProgress';

class File extends React.Component {
	constructor(){
		super()
		this.state = {
			isModalOpen:false,
			file:{},
			filePreview:{}
		}
	}
	componentDidMount(){
		this.fetchImageFromCB(this.props)
	}
	componentWillReceiveProps(props){
		this.fetchImageFromCB(props)
	}
	openCloseModal(what){
		if(what && this.state.filePreview.document){
			this.state.file.preview = this.state.filePreview.document.url
		}
		this.state.isModalOpen = what
		this.setState(this.state)
	}
	changeHandler(acceptedFiles, rejectedFiles){
		this.state.file = acceptedFiles[0]
		this.setState(this.state)
    }
    fileSave(){
    	let cloudFile = new CB.CloudFile(this.state.file)
		cloudFile.save({
			success: function(res) {
				console.log(res)
				this.props.updateElementData(res,this.props.columnData.name)
				this.openCloseModal(false)
			}.bind(this), error: function(err) {
				this.cancelFileSave()
			}.bind(this), uploadProgress : function(percentComplete){
			    console.log(percentComplete)
			}.bind(this)
		})
		this.openCloseModal(false)
	}
    cancelFileSave(){
		this.openCloseModal(false)
	}
	fetchImageFromCB(props){
		if(props.elementData){
			props.elementData.fetch({
			  success: function(file) {
			  	this.state.filePreview = file
			  	this.setState(this.state)
			     //received file Object
			  }.bind(this), error: function(err) {
			      //error in getting file Object
			  }
			});
		}
	}
	handleClose(){

	}
	render() {
		return (
            <div className="halfreldivfile ">
            	<span className="textnamerlation"> { this.props.columnData.name } </span>
            	<button className="addtextrecord" onClick={this.openCloseModal.bind(this,true)}>Change File</button>
            	<img className={this.state.filePreview.document ? 'previewSmallImagerelation' : 'hide'} src={ this.state.filePreview.document ?  this.state.filePreview.document.url : ''} />
            	<Dialog title="Upload File" modal={false} open={this.state.isModalOpen} onRequestClose={this.handleClose.bind(this)} titleClassName="modaltitle">
	          		<Dropzone className="dropFile" onDrop={this.changeHandler.bind(this)}>
		              <div>Try dropping some files here, or click to select files to upload.</div>
		            </Dropzone>
		            <img className="previewImage" src={this.state.file.preview || ''} />
		            <button className="btn btn-primary fr ml5 clearboth mt10" onClick={this.fileSave.bind(this)}>SUBMIT</button>
	          		<button className="btn btn-danger fr mt10" onClick={this.cancelFileSave.bind(this)}>CLOSE</button>
        		</Dialog>
            </div>
		);
	}
}

export default File;