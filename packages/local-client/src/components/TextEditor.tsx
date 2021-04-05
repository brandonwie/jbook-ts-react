import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../redux';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
	cell: Cell;
}
const TextEditor: React.FC<TextEditorProps> = ({
	cell: { id, type, content },
}) => {
	const ref = useRef<HTMLDivElement | null>(null);
	// no benifit to move to store
	const [isEditing, setIsEditing] = useState(false);
	const { updateCell } = useActions();

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			// if ref.current and event.target exist
			// and ref.current is the event.target
			if (
				ref.current &&
				event.target &&
				ref.current.contains(event.target as Node)
			) {
				return; // do nothing
			}

			setIsEditing(false);
		};

		document.addEventListener('click', listener, { capture: true });

		return () => {
			document.removeEventListener('click', listener, { capture: true });
		};
	}, []);

	if (isEditing) {
		return (
			<div className='text-editor' ref={ref}>
				<MDEditor
					value={content}
					onChange={(val) => updateCell(id, val || '')}
				/>
			</div>
		);
	}

	// preview component
	return (
		<div className='text-editor card' onClick={() => setIsEditing(true)}>
			<div className='card-content'>
				<MDEditor.Markdown source={content || 'Click to edit'} />
			</div>
		</div>
	);
};

export default TextEditor;
