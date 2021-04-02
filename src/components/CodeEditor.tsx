import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import MonacoJSXHighLighter from 'monaco-jsx-highlighter';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

interface CodeEditorProps {
	initialValue: string;
	onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
	// connect format button with editor
	const editorRef = useRef<any>();

	const onEditorDidMount: EditorDidMount = (
		getValue: () => string,
		monacoEditor
	) => {
		// assign Ref with the editor
		editorRef.current = monacoEditor;
		monacoEditor.onDidChangeModelContent(() => {
			onChange(getValue());
		});
		// tab size from 4 to 2
		monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

		// Highlighter Setting

		const babelParse = (code: string) =>
			parse(code, {
				sourceType: 'module',
				plugins: ['jsx'],
			});

		const highlighter = new MonacoJSXHighLighter(
			// @ts-ignore
			window.monaco,
			babelParse,
			traverse,
			monacoEditor
		);

		highlighter.highLightOnDidChangeModelContent();
	};

	// formatting with prettier
	const onFormatClick = () => {
		// get current value from editor
		const unformatted = editorRef.current.getModel().getValue();

		// format that value
		const formatted = prettier
			.format(unformatted, {
				parser: 'babel',
				plugins: [parser],
				useTabs: false,
				semi: true,
				singleQuote: true,
			})
			.replace(/\n$/, ''); // remove new line at the end
		// set the formatted value back in the editor
		editorRef.current.setValue(formatted);
	};

	return (
		<div className='editor-wrapper'>
			<button
				className='button button-format is-info is-small'
				onClick={onFormatClick}
			>
				Format
			</button>
			<MonacoEditor
				editorDidMount={onEditorDidMount}
				value={initialValue}
				language='javascript'
				height='100%'
				theme='vs-dark'
				options={{
					wordWrap: 'on',
					minimap: { enabled: false },
					showUnused: false, // not fade out unused statements
					folding: false, // give space on the right
					lineNumbersMinChars: 3, // space on the left
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true,
				}}
			/>
		</div>
	);
};

export default CodeEditor;
