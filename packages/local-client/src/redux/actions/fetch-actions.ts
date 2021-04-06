import { FetchActionType } from '../action-types';
import { Cell } from '../cell';

export interface FetchCellsAction {
	type: FetchActionType.FETCH_CELLS;
}

export interface FetchCellsCompleteAction {
	type: FetchActionType.FETCH_CELLS_COMPLETE;
	payload: Cell[];
}

export interface FetchCellsErrorAction {
	type: FetchActionType.FETCH_CELLS_ERROR;
	payload: string;
}

export interface SaveCellsErrorAction {
	type: FetchActionType.SAVE_CELLS_ERROR;
	payload: string;
}
export type FetchAction =
	| FetchCellsAction
	| FetchCellsCompleteAction
	| FetchCellsErrorAction
	| SaveCellsErrorAction;
