import React from 'react';
import ReactDOM from 'react-dom';
import CONFIG from '../../../../config/app.js'
import Axios from 'axios'

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
	getPreviewIcon(file){
		if(file){
			let fileType = file.type.split("/")[1]
			if(fileType){
				if(['png','jpeg','jpg','gif'].indexOf(fileType) > -1){
					return <img className={file.document ? 'fileListPreveiew cp' : 'hide'} src={ this.checkIfPrivateFile(file) ? '/app/assets/images/file/file.png' : file.url } />
				} else if(CONFIG.iconTypes.indexOf(fileType) > -1){
					return <img src={"/app/assets/images/file/"+fileType+".png"} className={file.document ? 'fileListPreveiew cp' : 'hide'} />
				} else {
					return <img className={file.document ? 'fileListPreveiew cp' : 'hide'} src={'/app/assets/images/file/file.png'} />
				}
			} else {
				return <img className={file.document ? 'fileListPreveiew cp' : 'hide'} src={'/app/assets/images/file/file.png'} />
			}
		}
    }
	downloadFile(){
		if(!this.checkIfPrivateFile(this.state.filePreview)){
			// for public files
			let win = window.open(this.state.filePreview.url, '_blank')
			win.focus()
		} else {
			// for private files
			Axios({
                method: 'post',
                data: {
                    key: CB.appKey
                },
                url: this.state.filePreview.url,
                withCredentials: false,
                responseType: 'blob'
            }).then(function(res) {
                var blob = res.data;
				saveAs(blob,this.state.filePreview.name)
            }.bind(this), function(err) {
                console.log(err)
            })
		}
	}
	checkIfPrivateFile(file){
		let fileACL = file.ACL.document || file.ACL
		return fileACL.read.allow.user.indexOf('all') === -1
	}
	render() {
		let previewIcon = React.cloneElement(( this.getPreviewIcon(this.state.filePreview) || <div/> ) ,{
			onClick : this.downloadFile.bind(this)
		})
		return (
			<div>
				{ previewIcon }
				<button onClick={ this.deleteValue.bind(this) } className="deletefilelist"><i className="fa fa-times" aria-hidden="true"></i> Delete</button>
			</div>
		);
	}
}

export default FileListComponent;