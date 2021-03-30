import './Preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
	code: string;
	buildError: string;
}

// hard-coded
const html = `
<html>
  <head>
	</head>
  <body>
    <div id="root"></div>
    <script>
			<!-- DISPLAY ERROR HANDLER -->
			const handleError = (err) => {
				const root = document.querySelector('#root');
				root.innerHTML = '<div style="color: red;" ><h3 >Runtime Error</h3>' + '<p>' + err + '</p>' + '</div>';
				console.error(err);
			};

			<!-- ASYNC ERROR HANDLER -->
			window.addEventListener('error', (event) => {
				event.preventDefault();
				console.err(event.error)
				handleError(event.error);
			});

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch(err) {
					console.log('try-catch error:')
					handleError(err);
        }
      }, false)
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, buildError }) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = html;
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

	console.log('buildError: ' + buildError);

	return (
		<div className='preview-wrapper'>
			<iframe
				title='preview'
				srcDoc={html}
				ref={iframe}
				sandbox='allow-scripts'
			/>
			{buildError && (
				<div className='preview-error'>
					<h4 className='preview-error-title'>Compilation Error</h4>
					<p>{buildError}</p>
				</div>
			)}
		</div>
	);
};

export default Preview;
