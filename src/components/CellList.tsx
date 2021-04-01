import { useAppSelector } from '../hooks/use-typed-selector';
import CellListItem from './CellListItem';
import AddCell from './AddCell';
import { Fragment } from 'react';

const CellList: React.FC = () => {
	const cells = useAppSelector(({ cells: { order, data } }) => {
		return order.map((id) => {
			return data[id];
		});
	});

	const renderedCells = cells.map((cell) => (
		<Fragment key={cell.id}>
			<AddCell nextCellId={cell.id} />
			<CellListItem cell={cell} />
		</Fragment>
	));

	return (
		<div>
			{renderedCells}
			{/* basic AddCell component without ID */}
			<AddCell forceVisible={cells.length === 0} nextCellId={null} />
		</div>
	);
};

export default CellList;
