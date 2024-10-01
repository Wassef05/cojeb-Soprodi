import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: true, // ou '0.0.0.0'
    port: process.env.PORT || 5173,
    strictPort: true,
    proxy: {
      '/soprodi': {
        target: 'https://cogeb-soprodi-api.onrender.com',
        secure: false,
        changeOrigin: true, 

      },
    },
  },
  plugins: [react()],
});
