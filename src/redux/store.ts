import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';

import { ActionTypes } from './action-types';

export const store = createStore(
	reducers,
	{},
	composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch({
	type: ActionTypes.INSERT_CELL_BEFORE,
	payload: {
		id: null,
		type: 'code',
	},
});

store.dispatch({
	type: ActionTypes.INSERT_CELL_BEFORE,
	payload: {
		id: null,
		type: 'text',
	},
});

store.dispatch({
	type: ActionTypes.INSERT_CELL_BEFORE,
	payload: {
		id: null,
		type: 'code',
	},
});

store.dispatch({
	type: ActionTypes.INSERT_CELL_BEFORE,
	payload: {
		id: null,
		type: 'text',
	},
});
