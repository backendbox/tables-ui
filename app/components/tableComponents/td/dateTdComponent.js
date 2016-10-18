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

	}
	openInput(which){
		this.refs[which].openDialog()
	}
	viewChangeDate(e,data){
		let date = new Date(this.props.elementData)
		date.setDate(data.getDate())
		date.setFullYear(data.getFullYear())
		date.setMonth(data.getMonth())
		this.props.updateElement(date.toISOString())
		this.props.updateObject()
	}
	viewChangeTime(e,data){
		let date = new Date(this.props.elementData)
		date.setHours(data.getHours())
		date.setMinutes(data.getMinutes())
		date.setSeconds(data.getSeconds())
		this.props.updateElement(date.toISOString())
		this.props.updateObject()
	}
	dateFormat(date){
		return new Date(date).toISOString().slice(0,10).replace(/-/g,"/") + ", " + new Date(date).getHours()+":"+new Date(date).getMinutes()
	}
	render() {
		return (
            <td className='mdl-data-table__cell--non-numeric pointer'>
            	<span className={''}>{ this.dateFormat(this.props.elementData) }</span>
            	<i className="fa fa-calendar fr mtl2" aria-hidden="true" onClick={this.openInput.bind(this,'InputDate')}></i>
            	<i className="fa fa-clock-o fr mtl2" aria-hidden="true" onClick={this.openInput.bind(this,'InputTime')}></i>
            	<DatePicker id="date" ref="InputDate" className='width0' onChange={this.viewChangeDate.bind(this)}/>
            	<TimePicker id="time" ref="InputTime" className='width0' onChange={this.viewChangeTime.bind(this)}/>
            </td>
		);
	}
}

export default DateTdComponent;