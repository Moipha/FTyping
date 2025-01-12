import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from '../quasar-user-options'
import piniaPersist from 'pinia-plugin-persist'

import 'quasar/dist/quasar.css'
import '@/styles/global.scss'
import 'overlayscrollbars/overlayscrollbars.css'
const app = createApp(App)

app.use(Quasar, quasarUserOptions)

app.use(router)

const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

app.mount('#app')

// /* 禁用右键弹窗 */
// document.oncontextmenu = function () {
//   return false
// }
