import React from 'react';
import { Cell } from '../redux';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import ActionBar from './ActionBar';

interface CellListItemProps {
	cell: Cell;
}
const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	let child: JSX.Element;
	if (cell.type === 'code') {
		child = (
			<React.Fragment>
				<div className='action-bar-wrapper'>
					<ActionBar id={cell.id} />
				</div>
				<CodeCell cell={cell} />
			</React.Fragment>
		);
	} else {
		child = (
			<React.Fragment>
				<div className='action-bar-wrapper'>
					<ActionBar id={cell.id} />
				</div>
				<TextEditor cell={cell} />
			</React.Fragment>
		);
	}
	return <div className='cell-list-item'>{child}</div>;
};

export default CellListItem;
