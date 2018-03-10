import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
	notification: notificationReducer,
	anecdotes: anecdoteReducer,
	filter: filterReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store