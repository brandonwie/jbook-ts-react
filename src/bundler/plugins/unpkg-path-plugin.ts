import * as esbuild from 'esbuild-wasm';

interface UnpkgPathPlugin {
	name: string;
	setup: (build: esbuild.PluginBuild) => void;
}

const unpkgPathPlugin = (): UnpkgPathPlugin => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			//! Resolve
			// Handle root entry file of 'index.js'
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return {
					path: 'index.js',
					namespace: 'a',
				};
			});

			// Handle relative paths in a module ('./' or '../')
			build.onResolve({ filter: /^\.+\// }, (args: any) => {
				return {
					namespace: 'a',
					path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
						.href,
				};
			});

			// Handle main file of a module
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`,
				};
			});
		},
	};
};

export default unpkgPathPlugin;
