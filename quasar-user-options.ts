import '@quasar/extras/material-icons/material-icons.css'
import { Notify } from 'quasar'

// To be used on app.use(Quasar, { ... })
// localStorage.getItem('theme')
export default {
  config: {
    // 默认主题
    brand: {
      active: '#ffc107',
      error: '#c10015',
      bg: '#282c34',
      btnText: 'black',
      text: 'whitesmoke'
    },
  },
  plugins: {
    Notify
  }
}