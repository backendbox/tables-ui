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
			this.props.updateObject()
		}
		this.state['inputHidden'] = which
		this.setState(this.state)
	}
	componentDidUpdate(){
		if(!this.state['inputHidden']){
     		ReactDOM.findDOMNode(this.refs.Input).focus()
     	}
    }
	render() {
		return (
            <td className='mdl-data-table__cell--non-numeric pointer' onDoubleClick={this.toggleInput.bind(this,false)}>
            	<span className={!this.state.inputHidden ? 'hide':''}>{this.props.elementData}</span>
            	<input ref="Input" value={this.props.elementData || ''} onChange={this.props.changeHandler.bind(this,'elementData')} className={this.state.inputHidden ? 'hide':'form-control'} onBlur={this.toggleInput.bind(this,true)} type="text" />
            </td>
		);
	}
}

export default TextTdComponent;