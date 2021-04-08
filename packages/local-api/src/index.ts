import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';
import cors from 'cors';

export const serve = (
	port: number,
	filename: string,
	dirName: string,
	useProxy: boolean
) => {
	const app = express();

	app.use(cors());

	app.use(createCellsRouter(filename, dirName));

	// if proxy is in use, activate local development mode
	if (useProxy) {
		app.use(
			createProxyMiddleware({
				target: 'http://localhost:3000',
				ws: true,
				logLevel: 'silent',
			})
		);
	} else {
		// else, run in user's machine
		const packagePath = require.resolve(
			'@jsnote-bw/local-client/build/index.html'
		);
		// extract dir path
		const packageDir = path.dirname(packagePath);
		app.use(express.static(packageDir));
	}

	return new Promise<void>((resolve, reject) => {
		app.listen(port, resolve).on('error', reject);
	});
};
