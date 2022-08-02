<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { computed } from '@vue/reactivity'

type State = {
    showInfo: boolean
}

const state = reactive<State>({
    showInfo: false,
})

const target = ref(null)
const component = ref<HTMLElement | null>(null)
const show = computed<boolean>({
    get: () => state.showInfo,
    set: (val: boolean) => {
        if (component.value && val) {
            component.value.style.display = 'block'
        }
        state.showInfo = val
        setTimeout(() => {
            if (!show.value && component.value) {
                component.value.style.removeProperty('display')
            }
        }, 300)
    },
})

function toggleInfo() {
    show.value = !show.value
}

onClickOutside(target, () => {
    state.showInfo = false
})
</script>

<template>
    <div ref="target">
        <button @click="toggleInfo">🧑</button>
        <aside
            ref="component"
            :class="[
                'navbar-user__aside',
                { 'navbar-user__aside--show': show },
            ]"
        >
            <FontAwesomeIcon
                class="navbar-user__aside__icon"
                :icon="['fas', 'caret-up']"
            />
            <p>
                <router-link :to="{ name: 'create-account' }"
                    >Se créer un compte</router-link
                >
            </p>
            <p>
                <router-link :to="{ name: 'login' }">Se connecter</router-link>
            </p>
        </aside>
    </div>
</template>

<style scoped>
.navbar-user__aside {
    @apply mt-4 p-4 hidden rounded-md fixed right-1 bg-gray-50 opacity-0 transition-all;
}

.navbar-user__aside__icon {
    @apply absolute -top-4 right-5 text-gray-50;
}

.navbar-user__aside--show {
    @apply opacity-100 shadow-md;
}
</style>
