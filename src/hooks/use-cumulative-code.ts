import { useAppSelector } from './use-typed-selector';

export const useCulmuativeCode = (cellId: string) => {
	// connect bundles
	return useAppSelector((state) => {
		const { data, order } = state.cells;
		// create a new array with data following order
		const orderedCells = order.map((id) => data[id]);

		const showFunc = `
		import _React from 'react';
		import _ReactDOM from 'react-dom';
		var show = (value) => {
			const root = document.querySelector('#root');

			if (typeof value == 'object') {
				if (value.$$typeof && value.props) {
					_ReactDOM.render(value, root);
				} else {
					root.innerHTML = JSON.stringify(value);
				}
			} else {
				root.innerHTML = value;
			}
		};
	`;

		const showFuncNoop = 'var show = () => {}';

		// accumulate results
		const codeStack = [];

		for (let code of orderedCells) {
			if (code.type === 'code') {
				if (code.id === cellId) {
					codeStack.push(showFunc);
				} else {
					codeStack.push(showFuncNoop);
				}
				codeStack.push(code.content);
			}
			if (code.id === cellId) {
				break;
			}
		}

		return codeStack;
	}).join('\n');
};
