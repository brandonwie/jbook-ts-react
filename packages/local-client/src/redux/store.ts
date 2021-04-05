import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';

import { CellActionType } from './action-types';

export const store = createStore(
	reducers,
	{},
	composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch({
	type: CellActionType.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: 'code',
	},
});

store.dispatch({
	type: CellActionType.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: 'text',
	},
});

store.dispatch({
	type: CellActionType.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: 'code',
	},
});

store.dispatch({
	type: CellActionType.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: 'text',
	},
});
