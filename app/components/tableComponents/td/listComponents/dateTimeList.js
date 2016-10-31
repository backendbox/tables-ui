import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

class DateTimeListComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			
		}
	}
	deleteValue(){
		this.props.removeFromElementData(this.props.index)
	}
	openInput(which){
		this.refs[which].openDialog()
	}
	viewChangeDate(e,data){
		let date = new Date(this.props.data)
		date.setDate(data.getDate())
		date.setFullYear(data.getFullYear())
		date.setMonth(data.getMonth())
		this.props.updateElementData(date,this.props.index)
	}
	viewChangeTime(e,data){
		let date = new Date(this.props.data)
		date.setHours(data.getHours())
		date.setMinutes(data.getMinutes())
		date.setSeconds(data.getSeconds())
		this.props.updateElementData(date,this.props.index)
	}
	dateFormat(date){
		return new Date(date).toISOString().slice(0,10).replace(/-/g,"/") + ", " + new Date(date).getHours()+":"+new Date(date).getMinutes()
	}
	componentDidMount(){
		
	}
	render() {
		let data = this.props.data
		return (
			<div className="datetimelist">
				<span className='fl'>{ this.dateFormat(this.props.data) }</span>
            	<i className="fa fa-calendar fl dateml" aria-hidden="true" onClick={this.openInput.bind(this,'InputDate')}></i>
            	<i className="fa fa-clock-o fl dateml" aria-hidden="true" onClick={this.openInput.bind(this,'InputTime')}></i>
            	<DatePicker id="date" ref="InputDate" className='width0 fl' onChange={this.viewChangeDate.bind(this)}/>
            	<TimePicker id="time" ref="InputTime" className='width0 fl' onChange={this.viewChangeTime.bind(this)}/>
            	<i className="fa fa-trash datedeletebt" aria-hidden="true" onClick={ this.deleteValue.bind(this) }></i>
			</div>
		);
	}
}

export default DateTimeListComponent;