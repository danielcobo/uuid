import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { readFile } from 'fs/promises';

const newOutput = async function newOutput(format) {
  const pkgTxt = await readFile('./package.json', 'utf8');
  const pkg = JSON.parse(pkgTxt);
  const packageName = pkg.name.replace(/^.+\//, '');
  return {
    input: './src/index.js',
    output: {
      name: packageName,
      file: `./dist/${format}/${packageName}.min.js`,
      format: format,
      preferConst: true,
    },
    plugins: [
      nodeResolve(),
      commonjs({
        sourceMap: false,
      }),
      terser(),
    ],
  };
};

export default Promise.all([newOutput('iife'), newOutput('esm')]);
