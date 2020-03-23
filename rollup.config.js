import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/index.js',
    output: {
        file: 'public/bundle.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**'
        }),
        production && terser()
    ]
};