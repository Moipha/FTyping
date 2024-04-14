const { defineConfig } = require('@vue/cli-service')
export default defineConfig({
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    },
  },
  transpileDependencies: [
    'quasar'
  ],
})
