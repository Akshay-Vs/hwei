import { defineConfig, Options } from 'tsup';
import { globSync } from 'glob';

const entries = globSync(['src/types/**/*.{ts,tsx}', 'src/dto/**/*.{ts,tsx}', 'src/index.ts']);

const entryPoints = entries.reduce((acc, file) => {
  // Remove 'src/' prefix and file extension to get the output path
  const key = file.replace(/^src\//, '').replace(/\.(ts|tsx)$/, '');
  acc[key] = file;
  return acc;
}, {} as Record<string, string>);

export default defineConfig((options: Options) => ({
  entry: entryPoints,
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  clean: true,
  ...options,
  onSuccess: async () => {
    console.log('Build successful');
  },
}));
