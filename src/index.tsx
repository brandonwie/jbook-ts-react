/**
 * @project JavaScript Notebook (JBOOK)
 * @writer Seokhyun Wie (Brandon)
 * @email brandonwie.cs@gmail.com
 * @since Mar 26, 2021
 * @copyright This project is based on the "React and Typescript: Build a Portfolio Project" course on Udemy(https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/)
 */

import './sass/main.scss';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import CellList from './components/CellList';
import CellListItem from './components/CellListItem';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				<CellList />
			</div>
		</Provider>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
