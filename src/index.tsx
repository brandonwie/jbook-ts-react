/**
 * @project JavaScript Notebook (JBOOK)
 * @writer Seokhyun Wie (Brandon)
 * @email brandonwie.cs@gmail.com
 * @since Mar 26, 2021
 * @copyright This project is based on the "React and Typescript: Build a Portfolio Project" course on Udemy(https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/)
 */

import './sass/main.scss';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				<TextEditor />
			</div>
		</Provider>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
