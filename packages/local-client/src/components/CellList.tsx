import { useAppSelector } from '../hooks/use-typed-selector';
import CellListItem from './CellListItem';
import AddCell from './AddCell';
import { Fragment, useEffect, useState } from 'react';
import { useActions } from '../hooks/use-actions';

const CellList: React.FC = () => {
	const cells = useAppSelector(({ cells: { order, data } }) => {
		return order.map((id) => {
			return data[id];
		});
	});

	const { fetchCells, saveCells } = useActions();
	const [firstLoad, setFirstLoad] = useState(false);

	useEffect(() => {
		if (firstLoad === true) {
			fetchCells();
		}
	}, []);

	useEffect(() => {
		saveCells();
		setFirstLoad(true);
	}, []);

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
