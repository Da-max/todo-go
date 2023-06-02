<script lang="ts" setup>
import Modal from '../components/Utils/Modal.vue'
import LoginForm from '../components/Auth/Login/LoginForm.vue'
import Button from '../components/Utils/Button.vue'
import { onMounted, reactive, ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

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
        state.router.push({ name: 'home' })
    }
})
</script>

<template>
    <Modal :open="state.modalOpen" @close="modalClose">
        <template #header>
            <h1>Se connecter</h1>
        </template>
        <template #content>
            <LoginForm ref="loginForm" />
        </template>
        <template #footer>
            <div class="inline-flex w-full items-center flex-col mb-4">
                <Button @click.prevent="login">Se connecter</Button>
                <Button type="secondary" size="sm" @click.prevent="modalClose"
                    >Annuler</Button
                >
            </div>
        </template>
    </Modal>
</template>
