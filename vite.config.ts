import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

import viteMdx from './src'

export default defineConfig({
  resolve: {
    alias: {
      'vite-mdx': '/src'
    }
  },
  plugins: [
    viteMdx(),
    vueJsx({ include: /\.(jsx|tsx|mdx)/ })
  ]
})
