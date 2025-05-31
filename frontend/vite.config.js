import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: env.FRONTEND_PORT || 5151,
      host: true
    },
    define: {
      'import.meta.env.VITE_BACKEND_HOST': JSON.stringify(env.VITE_BACKEND_HOST || 'localhost'),
      'import.meta.env.VITE_BACKEND_PORT': JSON.stringify(env.VITE_BACKEND_PORT || '3131')
    }
  }
})
