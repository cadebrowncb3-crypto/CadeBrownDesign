import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Libraries go in their own long-cached chunks so site updates only
// re-download the small app chunk.
const vendor = (id) => {
  if (!id.includes('node_modules')) return undefined;
  if (/node_modules\/(gsap|@gsap|lenis)\//.test(id)) return 'motion-gsap';
  if (/node_modules\/(motion|framer-motion|motion-dom|motion-utils)\//.test(id)) return 'motion-react';
  if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) return 'react';
  return undefined;
};

export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
  build: {
    rollupOptions: { output: { manualChunks: vendor } }
  }
});
