import urql from '@urql/vue'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(urql, {
  url: import.meta.env.VITE_GRAPQL_URL
})

app.mount('#app')
