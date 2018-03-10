import anecdoteService from '../services/anecdoteService'



const anecdoteReducer = (store = [], action) => {
	if (action.type === 'VOTE') {
		const old = store.filter(a => a.id !== action.anec.id)

		return [...old, action.anec]
	}
	if (action.type === 'CREATE') {

		return [...store, action.content]
	}
	if (action.type === 'INIT') {
		return action.content
	}

	return store
}

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({type: 'CREATE', content: newAnecdote})
	}
}

export const voteAnecdote = (anec) => {
	return async (dispatch) => {
		const votedAnec = await anecdoteService.updateVote(anec.id)
		dispatch({type: 'VOTE', anec: votedAnec})
	}
}

export const initAnecdote = () => {
	return async (dispatch) => {
		const content = await anecdoteService.getAll()
		dispatch({
			type: 'INIT', content
		})
	}
}

export default anecdoteReducer