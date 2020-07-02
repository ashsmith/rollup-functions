import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import zip from 'rollup-plugin-zip';
import { readdirSync } from 'fs';
import path from 'path';
import builtins from 'builtin-modules';

// build array of all directories from a given starting dir.
// getDirectories('src') => [ 'getProducts', 'getUsers']
const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const functionsToExport = getDirectories(path.resolve(__dirname, 'src/functions'));

export default functionsToExport.map((functionDir) => ({
  input: `src/functions/${functionDir}`,
  output: {
      dir: `dist/${functionDir}`,
      format: 'cjs',
      exports: 'named'
    },
  plugins: [
    commonjs(),
    resolve(),
    json(),
    zip({ file: 'function.zip' })
  ],
  external: builtins,
}));
