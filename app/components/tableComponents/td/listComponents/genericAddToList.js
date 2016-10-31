import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

class GenericAddToList extends React.Component {
	constructor(){
		super()
		this.state = {
			
		}
	}
	addRecord(type,e){
		if(type == 'Number'){
			this.props.addToElementData(0)
		} else if(type == 'DateTime'){
			this.props.addToElementData(new Date())
		} else if(type == 'GeoPoint'){
			this.props.addToElementData(new CB.CloudGeoPoint(0,0))
		} else {
			this.props.addToElementData('')
		}
	}
	dropHandler(acceptedFiles, rejectedFiles){
		let cloudFile = new CB.CloudFile(acceptedFiles[0])
		this.props.addToElementData(cloudFile)
    }
	componentDidMount(){
		
	}
	render() {
		let element = ''
		if(this.props.columnType == 'File'){
			element =	<Dropzone className="dropFileList" onDrop={ this.dropHandler.bind(this) }>
		            		<div>Try dropping some files here, or click to select files to upload.</div>
		            	</Dropzone>
		           		
		} else {
			element = <button className="addtextrecord" onClick={ this.addRecord.bind(this,this.props.columnType) }>Add New Record</button>
		}
		return (
			<div>
				{ element }
			</div>
		);
	}
}

export default GenericAddToList;