import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https:{
      key: './front-privateKey.key',
      cert: './front.crt',
    }
  },
  plugins: [react()],
})
