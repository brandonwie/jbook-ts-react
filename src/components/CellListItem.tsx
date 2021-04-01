import { Fragment } from 'react';
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
			<Fragment>
				<div className='action-bar-wrapper'>
					<ActionBar id={cell.id} />
				</div>
				<CodeCell cell={cell} />
			</Fragment>
		);
	} else {
		child = (
			<Fragment>
				<div className='action-bar-wrapper'>
					<ActionBar id={cell.id} />
				</div>
				<TextEditor cell={cell} />
			</Fragment>
		);
	}
	return <div className='cell-list-item'>{child}</div>;
};

export default CellListItem;
