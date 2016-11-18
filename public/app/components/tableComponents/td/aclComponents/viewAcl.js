import React from 'react'
import ReactDOM from 'react-dom'

class ViewACL extends React.Component {
	constructor(){
		super()
		this.state = {

		}
	}
	componentDidMount(){
		
	}
	render() {
		let users = 0
		let roles = 0
		let all = 0
		let str = ''
		if(this.props.aclList){
			for(var k in this.props.aclList){
				if(this.props.aclList[k].type == 'user' && this.props.aclList[k].id != 'all') users++
				if(this.props.aclList[k].type == 'role') roles++
				if(this.props.aclList[k].id == 'all') all++
			}
		}
		if(!users && !roles && all){
			str = <span>
            		<i className="fa fa-wikipedia-w" aria-hidden="true"></i>
	            	<span className="color888">  Public Read Write</span>
            	</span>
		} else {
			str = <span>
            		<i className="fa fa-wikipedia-w" aria-hidden="true"></i>
	            	<span className="color888">  { users +' Users ' + roles + ' Roles' }</span>
            	</span>
		}
		if(!users && !roles && !all){
			str = <span>
            		<i className="fa fa-minus-circle" aria-hidden="true"></i>
	            	<span className="color888">  No rules specefied</span>
            	</span>
		}
		return (
            <span>{ str }</span>
		);
	}
}

export default ViewACL;