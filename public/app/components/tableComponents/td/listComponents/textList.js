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
			<div className="textlistinputcontainer">
				<input type="text" className="listtexttableinput" value={ this.props.data } onChange={ this.updateValue.bind(this) } placeholder="Enter text."/>
				<i className="fa fa-times trashlistinputtext" aria-hidden="true" onClick={ this.deleteValue.bind(this) }></i>
			</div>
		);
	}
}

export default TextListComponent;