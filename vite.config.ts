import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/PatronesMain/'  // 👈 cambia esto por el nombre real del repo
})
