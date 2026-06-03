import { defineConfig } from 'vite'
import inertia from '@adonisjs/inertia/vite'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [inertia({ ssr: { enabled: false } }), react(), adonisjs({ entrypoints: ['inertia/app.tsx'], reload: ['resources/views/**/*.edge'] })],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${import.meta.dirname}/inertia/`,
    },
  },
})
