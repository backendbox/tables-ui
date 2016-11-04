import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';

//components
import Text from './text.js'
import Email from './email.js'
import Password from './password.js'
import NumberC from './number.js'
import Id from './id.js'
import DateC from './date.js'

class ViewRelation extends React.Component {
	constructor(){
		super()
		this.state = {
			isModalOpen:false,
			elementData:'',
			tableData:''
		}
	}
	componentDidMount(){
		if(this.props.elementData){
			this.props.elementData.fetch().then((data)=>{
				this.state.elementData = data
				this.setState(this.state)
			},(err)=>{
				console.log(err)
			})
		}
		CB.CloudTable.get(this.props.table).then((data)=>{
			this.state.tableData = data.document.columns
			this.setState(this.state)
		})
	}
	generaliseComponent(data){
		let returnObj = {}
		switch (data.dataType) {
			case "Text":
				returnObj.componentToRender =  Text
				returnObj.elementData = this.state.elementData.document[data.name]
				break;
			case "Number":
				returnObj.componentToRender =  NumberC
				returnObj.elementData = this.state.elementData.document[data.name]
				break;
			case "Email":
				returnObj.componentToRender =  Email
				returnObj.elementData = this.state.elementData.document[data.name]
				break;
			case "EncryptedText":
				returnObj.componentToRender =  Password
				returnObj.elementData = this.state.elementData.document[data.name]
				break;
			case "Id":
				returnObj.componentToRender =  Id
				returnObj.elementData = this.state.elementData.document['_id']
				break;
			case "DateTime":
				returnObj.componentToRender =  DateC
				returnObj.elementData = this.state.elementData.document[data.name]
				break;
			
			default:
				returnObj.componentToRender =  Text
				returnObj.elementData = 'a'
				break;
		}
		return returnObj
	}
	updateElementData(data,columnName){
		this.state.elementData.set(columnName,data)
		this.setState(this.state)
	}
	openCloseModal(){
		this.props.openCloseModal(false,'isOpenView')
	}
	handleClose(){

	}
	render() {
		let tableColumns = []
		if(this.state.tableData && this.state.elementData){
			tableColumns = this.state.tableData.map((x,i)=>{
				let { componentToRender,elementData } = this.generaliseComponent(x.document)
				return React.createElement(componentToRender, {
					       	elementData:elementData,
					       	columnData:x.document,
					       	key:i ,
					       	updateElementData:this.updateElementData.bind(this)
			           })
			})
		}
		return (
			<div className="fr">
	            
	        	<Dialog title="Relation Object" modal={false} open={this.props.open} onRequestClose={this.handleClose.bind(this)}>
	        		<div className="relationselectordiv">
		        		{ tableColumns }
	          		</div>
	        		<div className="cancelselctrela">
		          			<button className="btn btn-danger fr ml5" onClick={this.openCloseModal.bind(this)}>CLOSE</button>
		          	</div>
	    		</Dialog>
    		</div>
		);
	}
}

export default ViewRelation;