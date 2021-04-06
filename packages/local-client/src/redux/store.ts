import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persisMiddleware } from './middlewares/persist-middleware';
import { CellActionType } from './action-types';

export const store = createStore(
	reducers,
	{},
	composeWithDevTools(applyMiddleware(thunk, persisMiddleware))
);

store.dispatch({
	type: CellActionType.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: 'text',
	},
});
