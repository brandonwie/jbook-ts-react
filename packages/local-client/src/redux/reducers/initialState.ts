import { CellsState } from './cellsReducer';

const preLoadedCode = `import { userState } from 'react';

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

//TODO React Hook "useAppSelector" cannot be called at the top level. React Hooks must be called in a React function component or a custom React Hook function

const preLoadedMarkdown = `# JBook \nThis is an interactive environment. You can write JavaScript, see it executed, and write comprehensive documentation using Markdown.\n- Click any text cell (including this one) to edit it\n- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!\n- You can show any React component, string, number, or anything else by calling the \`show\`function. This is a function built into this environment. Call show multiple times to show multiple values\n- Re-order or delete cells using the buttons on the top right\n- Add new cells by hovering on the divider between each cell\nAll of your changes get saved to the file you opened JBook with. So if you ran \`npx jbook serve test.js\`, all of the text and code you write will be saved to \`test.js\` file in the same folder where the command is executed.
		`;

export const initialState: CellsState = {
	loading: false,
	error: null,
	order: ['pre-markdown', 'pre-code'],
	data: {
		'pre-code': {
			id: 'pre-code',
			type: 'code',
			content: preLoadedCode,
		},
		'pre-markdown': {
			id: 'pre-markdown',
			type: 'text',
			content: preLoadedMarkdown,
		},
	},
};
