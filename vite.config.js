import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'MUMMS - St. Benedict\'s Media',
        short_name: 'MUMMS',
        start_url: '/',
        display: 'standalone', // මේකෙන් තමයි browser එකේ කෑලි අයින් කරන්නේ
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
          {
            src: 'media-logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'media-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'media-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    }),
    basicSsl() // මේක අනිවාර්යයෙන්ම දාන්න
  ],
  server: {
    host: true,
    port: 5173,
    https: true, // මේකත් දාන්න
    allowedHosts: true,
    proxy: process.env.NODE_ENV === 'development' ? {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        secure: false,
      },
    } : undefined,
  },
  preview: {
    host: true,
    port: 4173,
    https: true,
    allowedHosts: true,
    proxy: process.env.NODE_ENV === 'development' ? {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        secure: false,
      },
    } : undefined,
  }
})