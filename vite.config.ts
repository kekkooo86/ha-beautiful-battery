import { defineConfig } from 'vite';
import resolve from '@rollup/plugin-node-resolve';

export default defineConfig({
  plugins: [resolve()],
  server: { cors: true },
  preview: { cors: true },
  build: {
    rollupOptions: {
      input: 'src/index.ts',
      output: {
        entryFileNames: 'beautiful-battery.js',
        format: 'es',
        inlineDynamicImports: true,
      },
    },
    target: 'es2022',
    minify: 'esbuild',
    sourcemap: false,
  },
});
