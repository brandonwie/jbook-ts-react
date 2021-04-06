import { Dispatch } from 'redux';
import axios from 'axios';
import { FetchAction } from '../actions';
import { FetchActionType } from '../action-types';
import { Cell } from '../cell';
import { RootState } from '../reducers';

export const fetchCells = () => {
	return async (dispatch: Dispatch<FetchAction>) => {
		dispatch({
			type: FetchActionType.FETCH_CELLS,
		});

		try {
			// get data(= array of cells)
			const { data }: { data: Cell[] } = await axios.get('/cells');

			dispatch({ type: FetchActionType.FETCH_CELLS_COMPLETE, payload: data });
		} catch (err) {
			dispatch({
				type: FetchActionType.FETCH_CELLS_ERROR,
				payload: err.message,
			});
		}
	};
};

export const saveCells = () => {
	return async (dispatch: Dispatch<FetchAction>, getState: () => RootState) => {
		const {
			cells: { data, order },
		} = getState();

		const cells = order.map((id) => data[id]);

		try {
			await axios.post('/cells', { cells });
		} catch (err) {
			dispatch({
				type: FetchActionType.SAVE_CELLS_ERROR,
				payload: err.message,
			});
		}
	};
};
