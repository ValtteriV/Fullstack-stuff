import React from 'react'
import {createFilter} from '../reducers/filterReducer'
import {connect} from 'react-redux'

class Filter extends React.Component {
	handleChange = (event) => {
		// input-kentän arvo muuttujassa event.target.value
		this.props.createFilter(event.target.value)
	}


	render() {
		const style = {
			paddingTop: 10,
			marginBottom: 10
		}

		return (
			<div style={style}>
				filter <input onChange={this.handleChange}/>
			</div>
		)
	}
}

const mapDispatchToProps =  {
	createFilter
}

export default connect(
	null,
	mapDispatchToProps
)(Filter)