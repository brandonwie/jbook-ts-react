import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';

export const useActions = () => {
	const dispatch = useDispatch();

	return useMemo(() => {
		return bindActionCreators(actionCreators, dispatch);
	}, [dispatch]); // no need to pass actionCreators in array dependencies because it's imported on the top
};
