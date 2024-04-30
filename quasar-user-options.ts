import '@quasar/extras/material-icons/material-icons.css'
import { Notify } from 'quasar'

// To be used on app.use(Quasar, { ... })

// 获取本地内存中的主题
const theme = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme') as string).color : {
  active: '#42b883',
  error: '#ff6464',
  text: '#213547',
  btnText: '#ffffff',
  bg: '#ffffff'
}
export default {
  config: {
    // 主题
    brand: theme
  },
  plugins: {
    Notify
  }
}