import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persisMiddleware } from './middlewares/persist-middleware';
import { preloadedState } from './preloadedState';

export const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(thunk, persisMiddleware))
);
