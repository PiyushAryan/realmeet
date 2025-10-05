import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  preview: {
    open: true,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  build: {
    outDir: 'dist'
  },
  plugins: [react()],
})
