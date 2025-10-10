import { defineConfig } from 'tsup';
import { glob } from 'glob';

export default defineConfig({
  entry: glob.sync('src/**/*.ts', {
    ignore: ['**/*.test.ts', '**/*.spec.ts']
  }),
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.js',
    };
  },
});
