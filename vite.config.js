import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  outDir: 'dist', // Output directory for the build
  assetsDir: 'assets', // Directory for static assets like images, etc.
  minify: true,
});

