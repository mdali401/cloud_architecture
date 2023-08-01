import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    proxy: {
      '/target': {
        target: "https://app.eraser.io/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/target/, '')
      }
    }
  }
})
