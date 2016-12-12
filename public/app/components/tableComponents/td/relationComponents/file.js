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
			filePreview:{},
			completed: 0,
			progress:false,
			showWrapper:false,
			showWrapperRel:false,
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
    cancelFileSave(){
		this.openCloseModal(false)
	}
	downloadFile(){
		let win = window.open(this.state.file.preview, '_blank')
  		win.focus()
	}
    fileSave(){
    	this.setState({showWrapper:false})
    	let cloudFile = new CB.CloudFile(this.state.file)
    	this.setState({progress:true})
		cloudFile.save({
			success: function(res) {
				this.setState({progress:false})
				this.setState({completed:0})
				console.log(res)
				this.props.updateElementData(res,this.props.columnData.name)
				this.openCloseModal(false)
			}.bind(this), error: function(err) {
				this.cancelFileSave()
				this.openCloseModal(false)
			}.bind(this), uploadProgress : function(percentComplete){
				 this.setState({completed:(percentComplete*100)})
			    console.log(percentComplete)
			}.bind(this)
		})
	}
	deleteFile(){
		this.props.updateElement(null)
		this.props.updateObject()
		this.setState({
			file:{},
			filePreview:{}
		})
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
	toggleShowWrapper(what){
		this.setState({showWrapper:what})
	}
	toggleShowWrapperRel(what){
		this.setState({showWrapperRel:what})
	}
	render() {
		return (
            <div className="halfreldivfile ">
            	<span className="textnamerlation"> { this.props.columnData.name } </span>
            	<img className={this.state.filePreview.document ? 'previewSmallImagerelation' : 'hide'} src={ this.state.filePreview.document ?  this.state.filePreview.document.url : ''} onMouseEnter={ this.toggleShowWrapperRel.bind(this,true) }/>
            	<div className={this.state.showWrapperRel ? "imagewrapperfilerel":"hide" } onMouseLeave={ this.toggleShowWrapperRel.bind(this,false) }>
		            <i className="fa fa-pencil-square-o filerelwrapperedit cp" aria-hidden="true" onClick={this.openCloseModal.bind(this,true)}></i>
		        </div>
            	<Dialog title="Upload File" modal={false} open={this.state.isModalOpen} onRequestClose={this.handleClose.bind(this)} titleClassName="modaltitle">
	          		<Dropzone className={ this.state.progress ? "hide" : "dropFile"} onDrop={this.changeHandler.bind(this)}>
		              <div>Try dropping some files here, or click to select files to upload.</div>
		              <button className="Choosefilebtn">Choose File</button>
		            </Dropzone>
		            <img className={ this.state.progress ? "hide" : "previewImage"} src={this.state.file.preview || ''} onMouseEnter={ this.toggleShowWrapper.bind(this,true) }/>
		            <div className={this.state.showWrapper ? "imagewrapperfile":"hide" } onMouseLeave={ this.toggleShowWrapper.bind(this,false) }>
		            	<i className="fa fa-download cp filewrapperdownload" onClick={this.downloadFile.bind(this)} aria-hidden="true"></i>
		            	<i className="fa fa-trash-o cp filewrapperdelete" onClick={this.deleteFile.bind(this)} aria-hidden="true"></i>
		            </div>
		            <p className={ !this.state.progress ? "hide" : "pprogresslineaer"}>Please wait while we upload your file.</p>
		            <p className={ !this.state.progress ? "hide" : "pprogresslineaer99"}>( { this.state.completed == 100 ? 99 : Math.floor(this.state.completed) }% )</p>
		            <LinearProgress mode="determinate" value={this.state.completed} className={ !this.state.progress ? "hide" : "linaerprogfile"}/>
		            <button className="btn btn-primary fr ml5 clearboth mt10" onClick={this.fileSave.bind(this)} disabled={ this.state.progress || !this.state.file.name }>SUBMIT</button>
	          		<button className="btn btn-danger fr mt10" onClick={this.cancelFileSave.bind(this)} disabled={ this.state.progress }>CLOSE</button>
        		</Dialog>
            </div>
		);
	}
}

export default File;