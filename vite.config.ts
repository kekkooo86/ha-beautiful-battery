import { defineConfig } from 'vite';
import resolve from '@rollup/plugin-node-resolve';

export default defineConfig({
  plugins: [resolve()],
  build: {
    rollupOptions: {
      input: 'src/index.ts',
      output: {
        entryFileNames: 'beautiful-battery.js',
        format: 'es',
      },
    },
    target: 'es2022',
    minify: 'esbuild',
    sourcemap: false,
  },
});
