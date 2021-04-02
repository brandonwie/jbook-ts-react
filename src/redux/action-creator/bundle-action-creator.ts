import { BundleActionType } from '../action-types';
import { BundleStartAction, BundleCompleteAction } from '../actions';
import { Bundle } from '../bundle';

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
