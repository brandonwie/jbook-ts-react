import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import cors from 'cors';

export const serve = (port: number, filename: string, dir: string) => {
	const app = express();

	const packagePath = require.resolve('local-client/build/index.html');
	// you only need dir path
	const packageDir = path.dirname(packagePath);
	app.use(express.static(packageDir));
	// app.use(
	// 	createProxyMiddleware({
	// 		target: 'http://localhost:3000',
	// 		ws: true,
	// 		logLevel: 'silent',
	// 	})
	// );

	return new Promise<void>((resolve, reject) => {
		app.listen(port, resolve).on('error', reject);
	});
};
