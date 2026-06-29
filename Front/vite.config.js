import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    // Proxy de desarrollo: el frontend llama a /api (mismo origen) y Vite lo
    // reenvía al backend. Así NO hay CORS y funciona aunque Vite use otro
    // puerto (5174, 5175, ...). Solo necesitas: npm run dev.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})