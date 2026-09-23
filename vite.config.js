import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        id: 'cl.pololosafe.app',
        name: 'PololoSafe Chile - Red de Trabajo Libre',
        short_name: 'PololoSafe',
        description: 'Plataforma comunitaria de trabajo libre y pololos directos en Chile libre de intermediarios.',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'es-CL',
        dir: 'ltr',
        categories: ['productivity', 'utilities', 'lifestyle'],
        icons: [
          {
            src: 'https://raw.githubusercontent.com/r0p0s/pololo-safe-app/main/public/favicon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80',
            sizes: '800x600',
            type: 'image/jpeg',
            form_factor: 'wide',
            label: 'Mapa interactivo de pololos en Chile'
          },
          {
            src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
            sizes: '400x800',
            type: 'image/jpeg',
            form_factor: 'narrow',
            label: 'Detalles del acuerdo P2P'
          }
        ]
      }
    })
  ],
})
