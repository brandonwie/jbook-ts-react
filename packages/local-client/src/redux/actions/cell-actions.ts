import { CellActionType } from '../action-types';
import { CellTypes } from '../cell';

export type Direction = 'up' | 'down';

export interface MoveCellAction {
	type: CellActionType.MOVE_CELL;
	payload: {
		id: string;
		direction: Direction;
	};
}

export interface DeleteCellAction {
	type: CellActionType.DELETE_CELL;
	payload: string; //id of the cell
}

export interface InsertCellAfterAction {
	type: CellActionType.INSERT_CELL_AFTER;
	payload: {
		id: string | null; // append when null
		type: CellTypes;
	};
}

export interface UpdateCellAction {
	type: CellActionType.UPDATE_CELL;
	payload: {
		id: string;
		content: string;
	};
}

export type CellAction =
	| MoveCellAction
	| DeleteCellAction
	| InsertCellAfterAction
	| UpdateCellAction;
