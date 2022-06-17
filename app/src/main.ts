import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, provide, h } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { apolloClient } from './vue-apollo'

import App from './App.vue'
import './assets/style/style.css'

const app = createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App)
})

library.add(faPlus)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
