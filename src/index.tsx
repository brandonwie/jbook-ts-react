import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import CodeCell from './components/CodeCell';

/**
 * @
 * @async bundler
 * @returns
 */
const App = () => {
	return (
		<div>
			<CodeCell />
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
