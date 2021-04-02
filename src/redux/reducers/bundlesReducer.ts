import produce from 'immer';
import { BundleActionType } from '../action-types';
import { BundleAction } from '../actions';

interface BundlesState {
	[key: string]: {
		loading: boolean;
		code: string;
		err: string;
	};
}

const initialState: BundlesState = {};

const reducer = produce(
	(state: BundlesState, action: BundleAction): BundlesState => {
		switch (action.type) {
			case BundleActionType.BUNDLE_START:
				state[action.payload.cellId] = {
					loading: true,
					code: '',
					err: '',
				};
				return state;

			case BundleActionType.BUNDLE_COMPLETE:
				const { cellId, bundle } = action.payload;
				state[cellId] = {
					loading: false,
					code: bundle.code,
					err: bundle.code,
				};
				return state;
			default:
				return state;
		}
	},
	initialState
);

export default reducer;
