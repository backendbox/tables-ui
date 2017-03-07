import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import Dropzone from 'react-dropzone';
import LinearProgress from 'material-ui/LinearProgress';

// icons
import NewFile from 'material-ui/svg-icons/file/file-upload'
import File from 'material-ui/svg-icons/editor/insert-drive-file'
import Folder from 'material-ui/svg-icons/file/folder'
import PDF from 'material-ui/svg-icons/image/picture-as-pdf'
import ImageIcon from 'material-ui/svg-icons/image/collections'
import DocIcon from 'material-ui/svg-icons/action/description'


class FilePicker extends React.Component {
    constructor() {
        super()
        this.state = {
            isModalOpen: false,
            files: [],
            path: "/",
            progress:false,
            completed: 0,
        }
    }
    componentDidMount() {
        this.getAllfiles()
    }
    getAllfiles() {
        let query = new CB.CloudQuery("_File")
        query.setLimit(9999)
        query.find({
            success: function (list) {
                this.setState({ files: list })
            }.bind(this),
            error: function (error) {
                console.log(error)
            }
        })
    }
    setFolder(folder){
        let path = folder.path.split("/")
        path.splice(0,2,"")
        path.push(folder.name)
        this.setState({path:path.join("/")})
    }
    navigate(where){
        if(where == '/'){
            this.setState({path:"/"})
        } else {
            let path = this.state.path.split("/")
            let pos = path.indexOf(where)
            this.setState({path:path.slice(0,pos+1).join("/")})
        }
    }
    addFile(e){
        let path = this.state.path == "/" ? null : ("/"+CB.appId+this.state.path)
        if(e.target.files[0]){
            let cloudFile = new CB.CloudFile(e.target.files[0],null,null,path)
            this.setState({progress:true})
            cloudFile.save({
                success: function(res) {
                    this.setState({progress:false,completed:0})
                    this.getAllfiles()
                }.bind(this), error: function(err) {
                    console.log(err)
                    this.setState({progress:false,completed:0})
                    this.getAllfiles()
                }.bind(this), uploadProgress : function(percentComplete){
                    this.setState({completed:(percentComplete*100)})
                }.bind(this)
            })
        }
    }
    getFileIcon(file){
        let fileType = file.type.split("/")[1]
        if(fileType){
            if(['png','jpeg','jpg','gif'].indexOf(fileType) > -1){
                return <ImageIcon className="devfileicon" />
            } else if(['pdf'].indexOf(fileType) > -1){
                return <PDF className="devfileicon" />
            } else if(['doc','xls','docx'].indexOf(fileType) > -1){
                return <DocIcon className="devfileicon" />
            } else return <File className="devfileicon" />
        } else {
            return <File className="devfileicon" />
        }
    }
    chooseFile(file){
        this.props.chooseFile(file)
        this.openCloseModal(false)
    }
    openAddFile(){
        document.getElementById("fileBox").click()
    }
    openCloseModal(what) {
        this.state.isModalOpen = what
        this.setState(this.state)
    }
    handleClose() {

    }
    render() {
        let dialogTitle = <div className="modaltitle">
                            <span className="diadlogTitleText">File Picker</span>
                            <i className='fa fa-paperclip iconmodal'></i>
                        </div>
        let files = this.state.files.filter((file) => {
            let filePathExist = file.path.includes(this.state.path)
            let fileInFolder = file.path.split(this.state.path).filter(x => x !== "").length === 1
            return filePathExist && fileInFolder
        }).map((file, i) => {
            if (file.type == "folder/folder") {
                return  <div className="filediv" key={i} onDoubleClick={this.setFolder.bind(this, file)}>
                            <Folder className="divfoldericon" />
                            <span className="divfilename">{file.name}</span>
                        </div>
            } else {
                return  <div className="filediv" key={i} onDoubleClick={ this.chooseFile.bind(this,file) }>
                            {
                                this.getFileIcon(file)
                            }
                            <span className="divfilename">{file.name}</span>
                        </div>
            }
        })
        return (
            <div>
                {
                    React.cloneElement(this.props.children,{
                        onClick : this.openCloseModal.bind(this, true)
                    })
                }
                <Dialog title={dialogTitle} modal={false} open={this.state.isModalOpen} onRequestClose={this.handleClose.bind(this)}>
                    <div className={ this.state.progress ? "hide" : "topnav"}>
                        <span className="topnavsnav" onClick={ this.navigate.bind(this,'/') }>Home</span>
                        <span className="slash">/</span>
                        {
                            this.state.path.split("/").filter(x => x !== "").map((x,i)=>{
                                let lastFolder = i == this.state.path.split("/").filter(x => x !== "").length - 1
                                return  <div style={{display:"inline-block"}}>
                                            <span className={lastFolder ? "topnavsnavselected" : "topnavsnav" } onClick={ this.navigate.bind(this,x) } key={ i }>{ x }</span>
                                            <span className="slash">/</span>
                                        </div>
                            })
                        }
                        <span onClick={ this.openAddFile.bind(this) } className="addfiletext">+Add File</span>
                        <input type="file" style={{display:"none"}} onChange={ this.addFile.bind(this) } id="fileBox"/>
                        <NewFile className="file" onClick={ this.openAddFile.bind(this) }/>
                    </div>
                    <div className={ this.state.progress ? "hide" : "content"}>
                        {files}
                    </div>

                    <p className={ !this.state.progress ? "hide" : "pprogresslineaer"}>Please wait while we upload your file.</p>
		            <p className={ !this.state.progress ? "hide" : "pprogresslineaer99"}>( { this.state.completed == 100 ? 99 : Math.floor(this.state.completed) }% )</p>
                    <LinearProgress mode="determinate" value={this.state.completed} className={ !this.state.progress ? "hide" : "linaerprogfile"}/>
                    <button className="btn btn-danger fr mt10" onClick={this.openCloseModal.bind(this, false)} disabled={ this.state.progress }>CLOSE</button>
                </Dialog>
            </div>
        );
    }
}

export default FilePicker;