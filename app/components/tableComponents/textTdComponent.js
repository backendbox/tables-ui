import React from 'react';
import ReactDOM from 'react-dom';

class TextTdComponent extends React.Component {
	constructor(){
		super()
		this.state = {}
	}
	componentDidMount(){
		this.state = {
			inputHidden:true,
			textInput:this.props.data
		}
		this.setState(this.state)
	}
	toggleInput(which,e){
		if(which){
			this.props.updateObject(this.state.textInput)
		}
		this.state['inputHidden'] = which
		this.setState(this.state)
	}
	componentDidUpdate(){
		if(!this.state['inputHidden']){
     		ReactDOM.findDOMNode(this.refs.Input).focus()
     	}
    }
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {
		return (
            <td className="mdl-data-table__cell--non-numeric pointer"  onDoubleClick={this.toggleInput.bind(this,false)}>
            	<span className={!this.state.inputHidden ? 'hide':''}>{this.state.textInput}</span>
            	<input ref="Input" value={this.state.textInput} onChange={this.changeHandler.bind(this,'textInput')} className={this.state.inputHidden ? 'hide':'form-control'} onBlur={this.toggleInput.bind(this,true)} type="text" />
            </td>
		);
	}
}

export default TextTdComponent;