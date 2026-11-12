import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cgpa: resolve(__dirname, 'cgpa-mentorship/index.html'),
        school: resolve(__dirname, 'school-partnership/index.html'),
        policies: resolve(__dirname, 'policies/index.html'),
        exam: resolve(__dirname, 'exam-preparation/index.html'),
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
