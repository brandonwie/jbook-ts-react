import { useAppSelector } from '../hooks/use-typed-selector';
import CellListItem from './CellListItem';
import AddCell from './AddCell';
import { Fragment, useEffect } from 'react';
import { useActions } from '../hooks/use-actions';

const CellList: React.FC = () => {
	const cells = useAppSelector(({ cells: { order, data } }) => {
		return order.map((id) => {
			return data[id];
		});
	});

	const { fetchCells, saveCells } = useActions();

	useEffect(() => {
		fetchCells();
	}, [fetchCells]);

	useEffect(() => {
		saveCells();
	}, [saveCells]);

	const renderedCells = cells.map((cell) => (
		<Fragment key={cell.id}>
			<CellListItem cell={cell} />
			<AddCell prevCellId={cell.id} />
		</Fragment>
	));

	return (
		<div className='cell-list'>
			{/* basic AddCell component without ID */}
			<AddCell forceVisible={cells.length === 0} prevCellId={null} />
			{renderedCells}
		</div>
	);
};

export default CellList;
