import { CellsState } from './reducers/cellsReducer';

const firstCode = `import { useState } from 'react';

const Counter = () => {
	const [count, setCount] = useState(0);
	return (
		<div>
			<button onClick={() => setCount(count + 1)}>Click</button>
			<h3>Count: {count}</h3>
		</div>
	);
};

// Display any variable or React Component by calling 'show'
show(Counter);
`;

const secondCode = `const App = () => {
	return (
		<div>
			<h3>App Says Hi!</h3>
			<i>Counter component will be rendered below...</i>
			<hr />
			{/*
				Counter was declared in the previous cell - you can reference it here!
			*/}
			<Counter />
		</div>
	);
};

show(App);
`;

const initText = `# JSNote \nThis is an interactive environment. You can write JavaScript, see it executed, and write comprehensive documentation using Markdown.\n- Click any text cell (including this one) to edit it\n- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!\n- You can show any React component, string, number, or anything else by calling the \`show\`function. This is a function built into this environment. Call show multiple times to show multiple values\n- Re-order or delete cells using the buttons on the top right\n- Add new cells by hovering on the divider between each cell\nAll of your changes get saved to the file you opened JBook with. So if you ran \`npx jbook serve test.js\`, all of the text and code you write will be saved to \`test.js\` file in the same folder where the command is executed.
		`;

export const preloadedState: CellsState = {
	loading: false,
	error: null,
	order: ['initText', 'firstCode', 'secondCode'],
	data: {
		secondCode: { id: 'secondCode', type: 'code', content: secondCode },
		firstCode: { id: 'firstCode', type: 'code', content: firstCode },
		initText: { id: 'initText', type: 'text', content: initText },
	},
};
