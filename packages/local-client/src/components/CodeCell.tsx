import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
//esbuild bundler
import Resizable from './Resizable';
import { Cell } from '../redux';
import { useActions } from '../hooks/use-actions';
import { useAppSelector } from '../hooks/use-typed-selector';
import { useCulmuativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
	cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell: { id, content } }) => {
	const { updateCell, createBundle } = useActions();
	// single bundle
	const bundle = useAppSelector((state) => state.bundles[id]);
	const cumulativeCode = useCulmuativeCode(id);

	useEffect(() => {
		// first bundle execute immediately
		if (!bundle) {
			createBundle(id, cumulativeCode);
			return;
		}

		const timer = setTimeout(async () => {
			createBundle(id, cumulativeCode);
		}, 750);

		// cleaner
		return () => {
			clearTimeout(timer); // cancel prev timer
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cumulativeCode, id, content, createBundle]);

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
				<div className='progress-wrapper'>
					{!bundle || bundle.loading ? (
						<div className='progress-cover'>
							<progress className='progress is-small is-info' max='100'>
								Loading
							</progress>
						</div>
					) : (
						<Preview code={bundle.code} buildError={bundle.err} />
					)}
				</div>
			</div>
		</Resizable>
	);
};

export default CodeCell;
