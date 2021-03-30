/**
 * @project JavaScript Notebook
 * @author Seokhyun Wie (Brandon)
 * @email brandonwie.cs@gmail.com
 * @date Mar 26, 2021
 */

import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';

const App = () => {
	return (
		<div>
			<CodeCell />
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
