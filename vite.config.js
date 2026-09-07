import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' + HashRouter => dist/ chạy được ở mọi nơi:
// static host, subpath (GitHub Pages), hoặc mở thẳng file index.html
export default defineConfig({
  base: './',
  plugins: [react()],
})
