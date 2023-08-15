import { createApp } from 'vue'
import App from './App.vue'
import auth from './utils/auth'
import { createClient, defaultPlugins } from 'villus'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCaretUp,
    faCheck,
    faCircleCheck,
    faClose,
    faPencil,
    faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

import './assets/style/index.css'
import router from './router'

const app = createApp(App)

const client = createClient({
    url: import.meta.env.VITE_GRAPHQL_ENDPOINT || '/query',
    use: [auth.villusPlugin, ...defaultPlugins()],
})

const pinia = createPinia()

app.use(client)
app.use(pinia)
app.use(router)

library.add(faPlus)
library.add(faClose)
library.add(faPencil)
library.add(faCaretUp)
library.add(faCheck)
library.add(faCircle)
library.add(faCircleCheck)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
