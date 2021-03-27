import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

interface UnpkgPathPlugin {
	name: string;
	setup: (build: esbuild.PluginBuild) => void;
}

const unpkgPathPlugin = (): UnpkgPathPlugin => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			// overwrite|hijacks the path of index.js
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				console.log('onResolve', args);

				if (args.path === 'index.js') {
					return { path: args.path, namespace: 'a' };
				}

				// handle resolution of relative files
				if (args.path.includes('./') || args.path.includes('../')) {
					return {
						namespace: 'a',
						path: new URL(
							args.path,
							'https://unpkg.com' + args.resolveDir + '/'
						).href,
					};
				}

				return {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`,
				};
			});

			// load up the index.js file
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				console.log('onLoad', args);

				if (args.path === 'index.js') {
					return {
						loader: 'jsx',
						contents: `
              import React, { useState } from 'react-select'
              console.log(React, useState);
            `,
					};
				}

				const { data, request } = await axios.get(args.path);
				console.log(request);
				return {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				};
			});
		},
	};
};

export default unpkgPathPlugin;
