<script lang="ts" setup>
import { reactive, ref, ComputedRef, computed } from 'vue'
import { onClickOutside, useTimeoutFn } from '@vueuse/core'
import { useUserStore } from '../../stores/user'
import { NavItems } from '../../types/nav'

type State = {
    showInfo: boolean
}

const userStore = useUserStore()
const state = reactive<State>({
    showInfo: false,
})

const navItems = computed<NavItems>(() => {
    let items: NavItems = []
    if (userStore.isAuthenticated) {
        items = [
            {
                title: 'Se déconnecter',
                onClick: userStore.disconnect,
            },
        ]
    } else {
        items = [
            {
                title: 'Se connecter',
                onClick: { name: 'login' },
            },
            {
                title: 'Se créer un compte',
                onClick: { name: 'create-account' },
            },
        ]
    }

    return items
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
        useTimeoutFn(() => {
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
            <p v-for="item in navItems" :key="item.title">
                <a v-if="typeof item.onClick === 'function'">{{
                    item.title
                }}</a>
                <router-link v-else="item.onClick" :to="item.onClick">{{
                    item.title
                }}</router-link>
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
