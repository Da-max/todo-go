import { createApp } from 'vue'
import App from './App.vue'
import { createClient } from 'villus'
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
    url: import.meta.env.VITE_GRAPHQL_ENDPOINT || '/query', // your endpoint.
})

const pinia = createPinia()

app.use(client)
app.use(pinia)
app.use(router)

library.add(faPlus)
library.add(faClose)
library.add(faPencil)
library.add(faCaretUp)
library.add(faCircle)
library.add(faCircleCheck)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
