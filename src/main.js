import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moralis from './plugins/moralis'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/base.css'
const app = createApp(App)

app.use(moralis)

app.use(router)

app.use(Toast, {
    position: 'bottom-right',
    timeout: 3000,
    showCloseButtonOnHover: true
  }
)

app.mount('#app')
