import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moralis from './plugins/moralis'
import './assets/base.css'
const app = createApp(App)

app.use(moralis)
app.use(router)
app.mount('#app')
