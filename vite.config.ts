import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/f-typing/',
  build: {
    outDir: 'docs'
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // 默认引入quasar提供的样式变量
  css:{
    preprocessorOptions: {
      scss: { 
        additionalData: '@import "@/assets/variables.scss";'
      }
    }
  }
})
