import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   port: 80
  // },
  // base: '/f-typing/',
  build: {
    outDir: 'docs'
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      // 定义src目录的路径别名为@
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // 默认引入自定义样式变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/customVariables.scss";'
      }
    }
  }
})
