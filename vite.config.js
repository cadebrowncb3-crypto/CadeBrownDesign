import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps asset paths relative so the build works from any subpath
// (e.g. GitHub Pages at /CadeBrownDesign/).
export default defineConfig({
  plugins: [react()],
  base: './'
});
