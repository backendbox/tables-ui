import React from 'react';
import ReactDOM from 'react-dom';

class IdTdComponent extends React.Component {
	constructor(){
		super()
		this.state = {}
	}
	componentDidMount(){
		this.state = {

		}
	}
	render() {
		return (
            <td className='mdl-data-table__cell--non-numeric pointer'>
            	<span>{this.props.elementData}</span>
            </td>
		);
	}
}

export default IdTdComponent;