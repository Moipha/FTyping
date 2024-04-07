import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './options/quasar-user-options'

const app = createApp(App)

app.use(Quasar, quasarUserOptions)

app.use(createPinia())
app.use(router)

app.mount('#app')
