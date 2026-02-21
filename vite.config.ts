import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'HelgysPixelKit',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  plugins: [
    dts({
      entryRoot: 'src',
      insertTypesEntry: true,
    }),
  ],
});
