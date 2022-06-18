import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable'
import { createApp, provide, h } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faClose, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { apolloClient } from './vue-apollo'

import App from './App.vue'
import './assets/style/style.css'
import { createPinia } from 'pinia'

const app = createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App)
})
const pinia = createPinia()

library.add(faPlus)
library.add(faClose)
provideApolloClient(apolloClient)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(pinia)

app.mount('#app')
