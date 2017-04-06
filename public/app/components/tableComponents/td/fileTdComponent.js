import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import Dropzone from 'react-dropzone';
import LinearProgress from 'material-ui/LinearProgress';
import FilePicker from './filePicker'
import CONFIG from '../../../config/app.js'
import Axios from 'axios'


class FileTdComponent extends React.Component {
	constructor() {
		super()
		this.state = {
			isModalOpen: false,
			file: {}
		}
	}
	componentDidMount() {
		this.fetchImageFromCB(this.props)
	}
	componentWillReceiveProps(props) {
		this.fetchImageFromCB(props)
	}

	addFile(file) {
		this.setState({ file: file })
	}
	saveFile() {
		this.props.updateElement(this.state.file)
		this.props.updateObject()
		this.openCloseModal(false)
	}
	downloadFile() {
		if (!this.checkIfPrivateFile(this.state.file)) {
			// for public files
			let win = window.open(this.state.file.url, '_blank')
			win.focus()
		} else {
			// for private files
			Axios({
				method: 'post',
				data: {
					key: CB.appKey
				},
				url: this.state.file.url,
				withCredentials: false,
				responseType: 'blob'
			}).then(function (res) {
				var blob = res.data;
				saveAs(blob, this.state.file.name)
			}.bind(this), function (err) {
				console.log(err)
			})
		}
	}
	checkIfPrivateFile(file) {
		let fileACL = file.ACL.document || file.ACL
		return fileACL.read.allow.user.indexOf('all') === -1
	}
	deleteFile() {
		this.props.updateElement(null)
		this.props.updateObject()
		this.setState({
			file: {}
		})
	}
	fetchImageFromCB(props) {
		if (props.elementData) {
			props.elementData.fetch({
				success: function (file) {
					this.setState({ file: file })
					//received file Object
				}.bind(this), error: function (err) {
					//error in getting file Object
				}
			});
		}
	}
	getFileIcon(file) {
		if (file.type) {
			let fileType = file.type.split("/")[1]
			if (fileType) {
				if (['png', 'jpeg', 'jpg', 'gif'].indexOf(fileType) > -1) {
					return <img src={this.checkIfPrivateFile(file) ? '/app/assets/images/file/file.png' : file.url} className="fileimagescr" />
				} else if (CONFIG.iconTypes.indexOf(fileType) > -1) {
					return <img src={"/app/assets/images/file/" + fileType + ".png"} className="fileimagescr" />
				} else {
					return <img src={"/app/assets/images/file/file.png"} className="fileimagescr" />
				}
			} else {
				return <img src={"/app/assets/images/file/file.png"} className="fileimagescr" />
			}
		}
	}
	getPreviewIcon(file) {
		if (file.type) {
			let fileType = file.type.split("/")[1]
			if (fileType) {
				if (['png', 'jpeg', 'jpg', 'gif'].indexOf(fileType) > -1) {
					return <img className={file.document ? 'previewSmallImage' : 'hide'} src={this.checkIfPrivateFile(file) ? '/app/assets/images/file/file.png' : file.url} />
				} else if (CONFIG.iconTypes.indexOf(fileType) > -1) {
					return <img src={"/app/assets/images/file/" + fileType + ".png"} className={file.document ? 'previewSmallImage' : 'hide'} />
				} else {
					return <img className={file.document ? 'previewSmallImage' : 'hide'} src={'/app/assets/images/file/file.png'} />
				}
			} else {
				return <img className={file.document ? 'previewSmallImage' : 'hide'} src={'/app/assets/images/file/file.png'} />
			}
		}
	}
	cancelFileSave() {
		this.props.fetchObject()
		this.openCloseModal(false)
	}
	openCloseModal(what) {
		this.state.isModalOpen = what
		//open filepicker if no file is attachced
		if(what === true && !this.state.file.document){
			setTimeout(()=>{
				$('.filepicker').click()
			},0)
		}
		this.setState(this.state)
	}
	render() {
		let requiredClass = this.props.isRequired ? " requiredred" : ""
		let dialogTitle = <div className="modaltitle">
			<span className="diadlogTitleText">File Editor</span>
			<i className='fa fa-paperclip iconmodal'></i>
		</div>
		return (
			<td className={'mdl-data-table__cell--non-numeric pointer' + requiredClass} onDoubleClick={this.openCloseModal.bind(this, true)}>
				<span className={this.state.file.document ? 'hide' : 'color888 expandleftpspan'}>Upload File</span>
				{this.getPreviewIcon(this.state.file)}
				<i className={this.state.file.document ? 'fa fa-expand fr expandCircle' : 'fa fa-expand fr expandCircle'} aria-hidden="true" onClick={this.openCloseModal.bind(this, true)}></i>
				<Dialog title={dialogTitle} modal={false} open={this.state.isModalOpen} onRequestClose={this.cancelFileSave.bind(this, false)} contentClassName={"bodyClassNamelist"}>
					<div className="filemodal">
						<div className={this.state.file.document ? 'hide' : 'nofilefound'}>
							<i className="fa fa-files-o fileimage" aria-hidden="true"></i>
							<span className="noimagetext">No file found, you can choose to add a file through our File Picker.</span>
							<FilePicker chooseFile={this.addFile.bind(this)}>
								<button className="btn btn-primary filepicker">File Picker</button>
							</FilePicker>
						</div>
						<div className={this.state.file.document ? 'nofilefound' : 'hide'}>
							{this.getFileIcon(this.state.file)}
							<span className="filenamespan">{this.state.file.name || ""}</span>
							<button className="btn btn-orange downloadbtn" onClick={this.downloadFile.bind(this)}>Download</button>
							<FilePicker chooseFile={this.addFile.bind(this)}>
								<button className="btn btn-primary filepickerother">File Picker</button>
							</FilePicker>
							<button className="btn btn-danger deletebtn" onClick={this.deleteFile.bind(this)}>Delete</button>
						</div>
					</div>
					<button disabled={!!!this.state.file.document} className="btn btn-primary fr clearboth mt10" onClick={this.saveFile.bind(this)}>Save</button>
				</Dialog>
			</td>
		);
	}
}

export default FileTdComponent;
