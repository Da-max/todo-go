<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

type State = {
    showInfo: boolean
}

const state = reactive<State>({
    showInfo: false
})
const target = ref(null)

function toggleInfo() {
    state.showInfo = !state.showInfo
}

onClickOutside(target, () => { state.showInfo = false })

</script>

<template>
    <div ref="target">
        <button @click="toggleInfo">🧑</button>
        <aside :class="['navbar-user__aside', { 'navbar-user__aside--show': state.showInfo }]">
            <FontAwesomeIcon class="navbar-user__aside__icon" :icon="['fas', 'caret-up']" />
            <p>
                <router-link :to="{ name: 'create-account' }">Se créer un compte</router-link>
            </p>
            <p>
                <router-link :to="{ name: 'login' }">Se connecter</router-link>
            </p>
        </aside>
    </div>
</template>

<style scoped>
.navbar-user__aside {
    @apply mt-4 p-4 rounded-md fixed right-1 bg-gray-50 opacity-0 transition-all;
}

.navbar-user__aside__icon {
    @apply absolute -top-4 right-5;
}

.navbar-user__aside--show {
    @apply opacity-100 shadow-md;
}
</style>