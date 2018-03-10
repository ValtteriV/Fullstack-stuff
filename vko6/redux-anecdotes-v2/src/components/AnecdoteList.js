import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {forgetaboutIt, voteNotify} from '../reducers/notificationReducer'
import {connect} from 'react-redux'

class AnecdoteList extends React.Component {
	vote = async (anecdote) => {
		this.props.voteAnecdote(anecdote)
		this.props.voteNotify(anecdote.content, 5)
	}
	render() {
		return (
			<div>
				<h2>Anecdotes</h2>
				{this.props.anecdotes.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() =>
								this.vote(anecdote)
							}>
								vote
							</button>
						</div>
					</div>
				)}
			</div>
		)
	}
}

const mapDispatchToProps = {
	voteAnecdote, voteNotify, forgetaboutIt
}

const mapStateToProps = (state) => {
	return { anecdotes: state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())).sort((a, b) => b.votes - a.votes) }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteList)
