import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import Dropzone from 'react-dropzone';
import LinearProgress from 'material-ui/LinearProgress';

class FileTdComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			isModalOpen:false,
			file:{},
			filePreview:{},
			completed: 0,
			progress:false
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
    	this.setState({progress:true})
    	cloudFile.save({
			success: function(res) {
				this.setState({progress:false})
				this.setState({completed:0})
		    	this.props.updateElement(cloudFile)
		 		this.props.updateObject()
		 		this.openCloseModal(false)
			}.bind(this), error: function(err) {
				console.log(err)
				this.props.fetchObject()
				this.openCloseModal(false)
			}.bind(this), uploadProgress : function(percentComplete){
			    this.setState({completed:(percentComplete*100)})
			}.bind(this)
		})
	}
    cancelFileSave(){
		this.props.fetchObject()
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
            <td className='mdl-data-table__cell--non-numeric pointer'>
            	<span className="color888">Uploaded File</span>
            	<img className={this.state.filePreview.document ? 'previewSmallImage' : 'hide'} src={ this.state.filePreview.document ?  this.state.filePreview.document.url : ''} />
            	<i className={this.state.filePreview.document ? 'mt10 fa fa-expand fr' : 'fa fa-expand fr'} aria-hidden="true" onClick={this.openCloseModal.bind(this,true)}></i>
            	<Dialog title="Upload File" modal={false} open={this.state.isModalOpen} onRequestClose={this.handleClose.bind(this)} titleClassName="modaltitle">
	          		<Dropzone className={ this.state.progress ? "hide" : "dropFile"} onDrop={this.changeHandler.bind(this)}>
		              <div>Try dropping some files here, or click to select files to upload.</div>
		              <button className="Choosefilebtn">Choose File</button>
		            </Dropzone>
		            <img className={ this.state.progress ? "hide" : "previewImage"} src={this.state.file.preview || ''} />
		            <p className={ !this.state.progress ? "hide" : "pprogresslineaer"}>Please wait while we upload your file.</p>
		            <p className={ !this.state.progress ? "hide" : "pprogresslineaer99"}>( { this.state.completed == 100 ? 99 : Math.floor(this.state.completed) }% )</p>
		            <LinearProgress mode="determinate" value={this.state.completed} className={ !this.state.progress ? "hide" : "linaerprogfile"}/>
		            <button className="btn btn-primary fr ml5 clearboth mt10" onClick={this.fileSave.bind(this)} disabled={ this.state.progress || !this.state.file.name }>SUBMIT</button>
	          		<button className="btn btn-danger fr mt10" onClick={this.cancelFileSave.bind(this)} disabled={ this.state.progress }>CLOSE</button>
        		</Dialog>
            </td>
		);
	}
}

export default FileTdComponent;