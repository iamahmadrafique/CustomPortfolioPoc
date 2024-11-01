import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './preview-deployment',  // specify the preview directory as root
  build: {
    outDir: 'dist',               // output folder for deployment
    rollupOptions: {
      input: './preview-deployment/index.html',  // entry point
    },
  },
  plugins: [react()],
});