import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'


const app = createApp(App)

app.use(Toast , {
    position: 'bottom-right',
    timeout: 5000, // Default timeout for all toasts
    closeOnClick: true,
    pauseOnHover: true,
})
app.use(router)

app.mount('#app')

