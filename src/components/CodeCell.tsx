import { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
//esbuild bundler
import bundler from '../bundler';
import Resizable from './Resizable';
import { Cell } from '../redux';
import { useActions } from '../hooks/use-actions';
/**
 * Create independent code +
 * @returns
 */

interface CodeCellProps {
	cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell: { id, type, content } }) => {
	const [code, setCode] = useState('');
	const [err, setErr] = useState('');
	const { updateCell } = useActions();

	useEffect(() => {
		const timer = setTimeout(async () => {
			// feed input to bundler
			const output = await bundler(content);
			// update value with output
			setCode(output.code);
			setErr(output.err);
		}, 1000);

		// cleaner
		return () => {
			clearTimeout(timer); // cancel prev timer
		};
	}, [content]);

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
				<Preview code={code} buildError={err} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
