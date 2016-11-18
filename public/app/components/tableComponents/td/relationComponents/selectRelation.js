import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';

class SelectRelation extends React.Component {
	constructor(){
		super()
		this.state = {
			isModalOpen:false,
			tableData:[],
			search:''
		}
	}
	componentDidMount(){
		let query = new CB.CloudQuery(this.props.table)
		query.find().then((list)=>{
			this.state.tableData = list
			this.setState(this.state)
		})
	}
	selectRelation(relationObject){
		this.props.updateElement(relationObject)
		this.props.updateObject()
		this.openCloseModal(false)
	}
	openCloseModal(){
		this.props.openCloseModal(false,'isOpenSelect')
	}
	search(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
    dateFormat(date){
    	if(date) return new Date(date).toISOString().slice(0,10).replace(/-/g,"/") + ", " + new Date(date).getHours()+":"+new Date(date).getMinutes()
    		else return null
	}
	handleClose(){

	}
	render() {
		let tableData = []
		if(this.state.tableData.length){
			tableData = this.state.tableData
			.filter(x =>{
				if(this.state.search){
					let re = new RegExp(this.state.search.toLowerCase(), 'g')
					return x.id.toLowerCase().match(re) != null
				} else return true
			})
			.map((x,i)=>{
				return <div className="tabledatadiv cp" key={ i } onClick={ this.selectRelation.bind(this,x) }>
							<p className="idrelationslector">{ x.id }</p>
	        				<p className="createdatrelationslector">{ this.dateFormat(x.createdAt) }</p>
	        				<p className="updatedatrelationslector">{ this.dateFormat(x.updatedAt) }</p>
	        			</div>
			})
		}
		return (
			<div className="fr">
	            
	        	<Dialog title="Select a Relation Object" modal={false} open={this.props.open} onRequestClose={this.handleClose.bind(this)} titleClassName="modaltitle">
	        		<div className="relationselectordiv">
		        		<input className="searchrelation" placeholder="Search by id..." value={ this.state.search } onChange={ this.search.bind(this,'search') }/>
		        		{ tableData }
	          		</div>
	          		<div className="cancelselctrela">
		          			<button className="btn btn-danger fr ml5" onClick={this.openCloseModal.bind(this)}>CLOSE</button>
		          	</div>
	    		</Dialog>
    		</div>
		);
	}
}

export default SelectRelation;