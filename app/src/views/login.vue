<script lang="ts" setup>
import Modal from '../components/Utils/Modal.vue'
import LoginForm from '../components/Auth/Login/LoginForm.vue'
import Button from '../components/Utils/Button.vue'
import { onMounted, onUnmounted, onUpdated, reactive, ref, watch } from 'vue'
import { Router, useRouter } from 'vue-router'
import auth from '../utils/auth'
import { useUserStore } from '../stores/user'
import { useIntervalFn } from '@vueuse/shared'

type State = {
    modalOpen: boolean
    router: Router
}

const state = reactive<State>({
    modalOpen: true,
    router: useRouter(),
})
const userStore = useUserStore()
const loginForm = ref<InstanceType<typeof LoginForm> | null>(null)

const modalClose = function () {
    state.router.push({ name: 'home' })
}

const login = function () {
    if (loginForm.value) {
        loginForm.value.login()
    } else {
        console.log('Merci de réessayer')
    }
}

onMounted(() => {
    if (userStore.isAuthenticated) {
        useRouter().push({ name: 'home' })
    }
})
</script>

<template>
    <Modal @close="modalClose" :open="state.modalOpen">
        <template #header>
            <h1>Se connecter</h1>
        </template>
        <template #content>
            <LoginForm ref="loginForm" />
        </template>
        <template #footer>
            <div class="login__footer">
                <Button @click.prevent="login">Se connecter</Button>
                <Button type="secondary" size="sm" @click.prevent="modalClose"
                    >Annuler</Button
                >
            </div>
        </template>
    </Modal>
</template>

<style>
.login__footer {
    @apply inline-flex w-full items-center flex-col;
}

.login__footer > button {
    @apply mb-4;
}
</style>
