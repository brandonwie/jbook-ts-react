import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
//esbuild bundler
import bundler from './bundler';

/**
 * @
 * @async bundler
 * @returns
 */
const App = () => {
	const [code, setCode] = useState('');
	const [input, setInput] = useState('');

	const onClick = async () => {
		// feed input to bundler
		const output = await bundler(input);
		// update value with output
		setCode(output);
	};

	return (
		<div>
			<CodeEditor
				initialValue='const a = 1;'
				onChange={(value) => setInput(value)}
			/>
			<div>
				<button onClick={onClick} type='submit'>
					Submit
				</button>
			</div>
			<Preview code={code} />
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
