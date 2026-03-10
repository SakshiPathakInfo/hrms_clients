import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const backendUrl = env.BACKEND_URL || 'http://localhost:3001';
  let backendHost = 'localhost';
  try {
    backendHost = new URL(backendUrl).hostname;
  } catch (e) {
    // fallback to localhost if parsing fails
    backendHost = 'localhost';
  }
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      // Allow the backend host (useful when proxying to a deployed backend hostname).
      allowedHosts: [
        backendHost,
        "localhost",
        "127.0.0.1",
        "hrms-backend-3-tlnb.onrender.com" // allow this host too
      ],
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/api': {
          target: env.BACKEND_URL || 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
