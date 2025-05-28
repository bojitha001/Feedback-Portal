import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    host: true,
    proxy: {
      '/auth/signup': 'http://localhost:3001',
      '/auth/login': 'http://localhost:3001',
      '/feedback': 'http://localhost:3001',
      '/admin/feedback': 'http://localhost:3001'
    },
    cors: true,
    allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0','minotaur']
  }
});
