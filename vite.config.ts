import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Only the new course is shipped. Legacy audio and sandbox media in public/
  // must not be copied to the published build.
  publicDir: 'public-clean',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
