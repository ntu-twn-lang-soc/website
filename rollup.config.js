import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

export default {
	input: "src/index.js",
	output: {
		file: "dist/bundle.js",
		format: "iife",
	},
    plugins: [
        resolve(),
        json(),
        babel({babelHelpers: "bundled"})
    ]
};
