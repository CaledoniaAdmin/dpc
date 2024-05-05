import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

console.log('pinia: ', pinia)

app.use(pinia)
app.mount('#app')
