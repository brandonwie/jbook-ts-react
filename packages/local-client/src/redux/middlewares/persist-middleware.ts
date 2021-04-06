import { Dispatch } from 'redux';
import { CellAction, BundleAction, FetchAction } from '../actions';
import { CellActionType } from '../action-types';
import { saveCells } from '../action-creator';
import { RootState } from '../reducers';

type Action = BundleAction | CellAction | FetchAction;

export const persisMiddleware = ({
	dispatch,
	getState,
}: {
	dispatch: Dispatch<Action>;
	getState: () => RootState;
}) => {
	let timer: any;

	return (next: (action: CellAction) => void) => {
		return (action: CellAction) => {
			next(action);

			if (
				[
					CellActionType.MOVE_CELL,
					CellActionType.UPDATE_CELL,
					CellActionType.INSERT_CELL_AFTER,
					CellActionType.DELETE_CELL,
				].includes(action.type)
			) {
				if (timer) {
					clearTimeout(timer);
				}
				// debounce
				timer = setTimeout(() => {
					saveCells()(dispatch, getState);
				}, 250);
			}
		};
	};
};
