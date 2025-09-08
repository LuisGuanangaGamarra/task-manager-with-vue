import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/presentation/router'
import '@/style.css'

export const mountApp = (selector = '#app') => {
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.mount(selector)
}