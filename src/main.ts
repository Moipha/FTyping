import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from '../quasar-user-options'

import 'quasar/dist/quasar.css'
import '@/styles/global.scss'

const app = createApp(App)

app.use(Quasar, quasarUserOptions)

app.use(createPinia())
app.use(router)

app.mount('#app')
