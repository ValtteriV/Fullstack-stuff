

const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case 'NOTIFYVOTE':
			return `you voted '${action.id}'`
		case 'CREATENOTIFY':
			return `you created '${action.id}'`
		case 'RESET':
			return null
		default:
			return state
	}
}

export const voteNotify = (id, timeout) => {
	return async (dispatch) => {
		setTimeout(() => dispatch(forgetaboutIt()), timeout * 1000)
		dispatch({type: 'NOTIFYVOTE', id})
	}
}

export const createNotify = (id, timeout) => {

	return async (dispatch) => {
		setTimeout(() => dispatch(forgetaboutIt()), timeout * 1000)
		dispatch({type: 'CREATENOTIFY', id})
	}
}

export function forgetaboutIt() {
	return {type: 'RESET'}
}

export default notificationReducer