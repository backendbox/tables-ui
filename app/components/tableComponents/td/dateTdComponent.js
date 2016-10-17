import React from 'react';
import ReactDOM from 'react-dom';
import {TableRowColumn} from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

class DateTdComponent extends React.Component {
	constructor(){
		super()
		this.state = {}
	}
	componentDidMount(){
		this.state = {
			dateInput:this.dateFormat(this.props.elementData)
		}
		this.setState(this.state)
	}
	openInput(which){
		this.refs[which].openDialog()
	}
	viewChangeDate(e,data){
		console.log(data)
	}
	viewChangeTime(e,data){
		console.log(data)
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	dateFormat(date){
		return new Date(date).toISOString().slice(0,10).replace(/-/g,"/") + ", " + new Date(date).toISOString().slice(11,16)
	}
	render() {
		return (
            <td className='mdl-data-table__cell--non-numeric pointer'>
            	<span className={''}>{this.state.dateInput}</span>
            	<i className="fa fa-calendar fr mtl2" aria-hidden="true" onClick={this.openInput.bind(this,'InputDate')}></i>
            	<i className="fa fa-clock-o fr mtl2" aria-hidden="true" onClick={this.openInput.bind(this,'InputTime')}></i>
            	<DatePicker id="date" ref="InputDate" className='width0' onChange={this.viewChangeDate.bind(this)}/>
            	<TimePicker id="time" ref="InputTime" className='width0' onChange={this.viewChangeTime.bind(this)}/>
            </td>
		);
	}
}

export default DateTdComponent;