const { defineConfig } = require('@vue/cli-service')
export default defineConfig({
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    },
  },
  configureWebpack: {
    plugins: ['Notify'], // 在这里添加你想要的 Quasar 插件
  },
  transpileDependencies: [
    'quasar'
  ],
})
