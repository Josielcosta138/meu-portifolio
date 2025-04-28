import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/ teste
export default defineConfig({
  plugins: [react()],
  base: '/meu-portifolio/',
})
