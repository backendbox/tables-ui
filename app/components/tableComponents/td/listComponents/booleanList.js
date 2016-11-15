import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from 'material-ui/Checkbox';

class BooleanListComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			
		}
	}
	updateValue(e){
		this.props.updateElementData(e.target.checked,this.props.index)
	}
	deleteValue(){
		this.props.removeFromElementData(this.props.index)
	}
	componentDidMount(){
		
	}
	render() {
		let data = this.props.data
		return (
			<div>
				<Checkbox
			      label="Boolean Select"
			      className='booleanlistval'
			      onCheck={ this.updateValue.bind(this) }
			      checked={ this.props.data ? this.props.data : false }
			    />
				<i className="fa fa-trash trashlistinputtext boollistel" aria-hidden="true" onClick={ this.deleteValue.bind(this) }></i>
			</div>
		);
	}
}

export default BooleanListComponent;