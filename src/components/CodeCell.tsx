import { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
//esbuild bundler
import bundler from '../bundler';
import Resizable from './Resizable';

/**
 * Create independent code +
 * @returns
 */
const CodeCell = () => {
	const [code, setCode] = useState('');
	const [err, setErr] = useState('');
	const [input, setInput] = useState('');

	useEffect(() => {
		const timer = setTimeout(async () => {
			// feed input to bundler
			const output = await bundler(input);
			// update value with output
			setCode(output.code);
			setErr(output.err);
		}, 1000);

		// cleaner
		return () => {
			clearTimeout(timer); // cancel prev timer
		};
	}, [input]);

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue='const a = 1;'
						onChange={(value) => setInput(value)}
					/>
				</Resizable>
				<Preview code={code} buildError={err} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
