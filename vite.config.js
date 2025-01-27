import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://realmeet-eam6.onrender.com',
        ws: true
  },
  plugins: [react()],
})
