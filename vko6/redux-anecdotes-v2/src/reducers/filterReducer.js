

const filterReducer = (state='', action) => {
	if (action.type === 'FILTER') {
		return action.filter
	}
	return state
}

export function createFilter(filter) {
	return {type: 'FILTER', filter}
}

export default filterReducer