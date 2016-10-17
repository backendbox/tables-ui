import React from 'react';
import ReactDOM from 'react-dom';

class TextTdComponent extends React.Component {
	constructor(){
		super()
		this.state = {}
	}
	componentDidMount(){
		this.state = {
			inputHidden:true
		}
		this.setState(this.state)
	}
	toggleInput(which,e){
		if(which){
			this.props.updateObject('username')
		}
		this.state['inputHidden'] = which
		this.setState(this.state)
	}
	componentDidUpdate(){
		if(!this.state['inputHidden']){
     		ReactDOM.findDOMNode(this.refs.Input).focus()
     	}
    }
    changeHandler(e){
    	this.props.updateElement(e.target.value)
    }
	render() {
		return (
            <td className='mdl-data-table__cell--non-numeric pointer' onDoubleClick={this.toggleInput.bind(this,false)}>
            	<span className={!this.state.inputHidden ? 'hide':''}>{this.props.elementData}</span>
            	<input ref="Input" value={this.props.elementData || ''} onChange={this.changeHandler.bind(this)} className={this.state.inputHidden ? 'hide':'form-control'} onBlur={this.toggleInput.bind(this,true)} type="text" />
            </td>
		);
	}
}

export default TextTdComponent;