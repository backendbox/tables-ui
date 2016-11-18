import React from 'react';
import ReactDOM from 'react-dom';

class TextListComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			
		}
	}
	updateValue(e){
		this.props.updateElementData(e.target.value,this.props.index)
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
				<input type="text" className="listtexttableinput" value={ this.props.data } onChange={ this.updateValue.bind(this) }/>
				<i className="fa fa-trash trashlistinputtext" aria-hidden="true" onClick={ this.deleteValue.bind(this) }></i>
			</div>
		);
	}
}

export default TextListComponent;