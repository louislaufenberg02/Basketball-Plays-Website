import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // öffnet die Website beim Start von "npm run dev" automatisch im Browser
  },
})
