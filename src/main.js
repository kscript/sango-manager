import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import useElementPlus from '@/element-plus'
import components from '@/components'

const app = createApp(App).use(router).use(components)
useElementPlus(app)
app.mount('#app')
