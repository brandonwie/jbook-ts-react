import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
	name: 'filecache',
});

const fetchPlugin = (inputCode: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {
			//! Load
			//* Load up the index.js file
			build.onLoad({ filter: /(^index\.js$)/ }, () => {
				console.log('onLoad index.js');
				return {
					loader: 'jsx',
					contents: inputCode,
				};
			});

			//* Check Cache
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				console.log('Checking caches...');
				// Check to see if we have already fetched this file
				// and if it is in the cache
				const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
					args.path
				);

				// if there is, return it immediately
				if (cachedResult) {
					return cachedResult;
				}
			});

			//* Load if CSS is in path
			build.onLoad({ filter: /.css$/ }, async (args: any) => {
				console.log('onLoading CSS...');
				const { data, request } = await axios.get(args.path);

				const escaped = data
					.replace(/\n/g, '')
					.replace(/"/g, '\\"')
					.replace(/'/g, "\\'");

				const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;

				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents,
					resolveDir: new URL('./', request.responseURL).pathname,
				};

				// store response in cache
				await fileCache.setItem(args.path, result);

				return result;
			});

			//* Load other new packages
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				console.log('onLoad other packages');
				const { data, request } = await axios.get(args.path);

				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				};

				// store response in cache
				await fileCache.setItem(args.path, result);

				return result;
			});
		},
	};
};

export default fetchPlugin;
