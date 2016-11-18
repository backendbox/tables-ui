import React from 'react';
import ReactDOM from 'react-dom';

class NumberTdComponent extends React.Component {
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
    changeHandler(e){
    	this.props.updateElement(parseInt(e.target.value))
    }
	render() {
		return (
            <td className='mdl-data-table__cell--non-numeric pointer' onDoubleClick={this.toggleInput.bind(this,false)}>
            	<span className={!this.state.inputHidden ? 'hide':''}>{this.props.elementData ? this.props.elementData.toString().slice(0,20):''}</span>
            	<input ref="Input" value={this.props.elementData || 0 } onChange={this.changeHandler.bind(this)} className={this.state.inputHidden ? 'hide':'form-control'} onBlur={this.toggleInput.bind(this,true)} type="number" />
            </td>
		);
	}
}

export default NumberTdComponent;