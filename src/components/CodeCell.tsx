import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
//esbuild bundler
import Resizable from './Resizable';
import { Cell } from '../redux';
import { useActions } from '../hooks/use-actions';
import { useAppSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
	cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell: { id, type, content } }) => {
	const { updateCell, createBundle } = useActions();
	const bundle = useAppSelector((state) => state.bundles[id]);

	useEffect(() => {
		const timer = setTimeout(async () => {
			createBundle(id, content);
		}, 750);

		// cleaner
		return () => {
			clearTimeout(timer); // cancel prev timer
		};
	}, [id, content, createBundle]);

	return (
		<Resizable direction='vertical'>
			<div
				style={{
					height: 'calc(100% - 10px)',
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue={content}
						onChange={(value) => updateCell(id, value)}
					/>
				</Resizable>
				{bundle && <Preview code={bundle.code} buildError={bundle.err} />}
			</div>
		</Resizable>
	);
};

export default CodeCell;
