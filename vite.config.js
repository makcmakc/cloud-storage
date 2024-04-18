import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
// import Components from 'unplugin-vue-components/vite'

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    Icons({ autoInstall: true }),
    VitePWA({ registerType: 'autoUpdate' })
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~/': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  worker: {
    format: 'es'
  },
  manifest: {
    id: '/',
    name: 'Vite Plugin PWA',
    short_name: 'PWA for Vite',
    description: 'Zero-config PWA for Vite',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'icon_light.svg',
        sizes: '155x155',
        type: 'image/svg',
        purpose: 'any maskable',
      },
    ],
  },  
  typescript: {
    tsConfig: {
      compilerOptions: {
        // add it
        types: ["unplugin-icons/types/vue"],
      },
    },
  },
})
