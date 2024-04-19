import '@quasar/extras/material-icons/material-icons.css'
import { Notify } from 'quasar'

// To be used on app.use(Quasar, { ... })

// 获取本地内存中的主题
const theme = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme') as string).color : {
  active: '#ffc107',
  error: '#c10015',
  bg: '#282c34',
  btnText: 'black',
  text: 'whitesmoke'
}
export default {
  config: {
    // 默认主题
    brand: theme
  },
  plugins: {
    Notify
  }
}