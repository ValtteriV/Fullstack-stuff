import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import {connect} from 'react-redux'
import {initAnecdote} from './reducers/anecdoteReducer'

class App extends React.Component {

	componentDidMount = () => {
		this.props.initAnecdote()
	}

	render() {
		const notify = () => (
			<Notification />
		)
		return (
			<div>
				<h1>Programming anecdotes</h1>
				{this.props.notification !== null && notify()}
				<Filter />
				<AnecdoteList />
				<AnecdoteForm />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { notification: state.notification }
}

export default connect(
	mapStateToProps, {initAnecdote}
)(App)
