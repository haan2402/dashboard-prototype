import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/styles/bulma.scss'
import './assets/styles/global.scss'

const app = createApp(App)

app.use(router)

app.mount('#app')
