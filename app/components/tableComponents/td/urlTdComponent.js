import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';

class URLTdComponent extends React.Component {
	constructor(){
		super()
		this.state = {}
	}
	componentDidMount(){
		this.state = {
			inputHidden:true,
			errorShow:false
		}
		this.setState(this.state)
	}
	toggleInput(which,e){
		if(which){
			if(e.target.checkValidity()){
				this.props.updateObject()
				this.state.errorShow = false
				this.state['inputHidden'] = which
			} else {
				this.state.errorShow = true
			}
		} else {
			this.state.errorShow = false
			this.state['inputHidden'] = which
		}
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
            	<span className={!this.state.inputHidden ? 'hide':''}>{this.props.elementData ? this.props.elementData.slice(0,30):''}</span>
            	<input ref="Input" value={this.props.elementData || ''} onChange={this.changeHandler.bind(this)} className={this.state.inputHidden ? 'hide':'form-control'} onBlur={this.toggleInput.bind(this,true)} type="url" />
            	<Paper className={!this.state.errorShow ? 'hide':'paperError'} zDepth={1}> <p className="abstext">Please enter a valid url.</p> </Paper>
            </td>
		);
	}
}

export default URLTdComponent;