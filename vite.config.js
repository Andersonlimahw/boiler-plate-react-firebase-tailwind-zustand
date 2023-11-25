import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// https://vitest.dev/guide/reporters.html
export default defineConfig({
  optimizeDeps: {
    include: ['@testing-library/jest-dom'],
  },
  plugins: [
    react(), 
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      }, 
      devOptions: {
        enabled: true
      },
    })
  ],
})
