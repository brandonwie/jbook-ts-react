import { Dispatch } from 'redux';
import { BundleActionType } from '../action-types';
import {
	BundleStartAction,
	BundleCompleteAction,
	BundleAction,
} from '../actions';
import { Bundle } from '../bundle';
import bundle from '../../bundler';

export const bundleStart = (cellId: string): BundleStartAction => {
	return {
		type: BundleActionType.BUNDLE_START,
		payload: { cellId },
	};
};

export const bundleComplete = (
	cellId: string,
	bundle: Bundle
): BundleCompleteAction => {
	return {
		type: BundleActionType.BUNDLE_COMPLETE,
		payload: {
			cellId,
			bundle,
		},
	};
};

export const createBundle = (cellId: string, input: string) => {
	return async (dispatch: Dispatch<BundleAction>) => {
		dispatch({
			type: BundleActionType.BUNDLE_START,
			payload: {
				cellId,
			},
		});

		const result = await bundle(input);

		dispatch({
			type: BundleActionType.BUNDLE_COMPLETE,
			payload: {
				cellId,
				bundle: result,
			},
		});
	};
};
