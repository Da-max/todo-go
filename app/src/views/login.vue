<script lang="ts" setup>
import Modal from '../components/Utils/Modal.vue'
import LoginForm from '../components/Auth/Login/LoginForm.vue'
import Button from '../components/Utils/Button.vue'
import { reactive, ref } from 'vue'
import { Router, useRouter } from 'vue-router'

type State = {
    modalOpen: boolean
    router: Router
}

const state = reactive<State>({
    modalOpen: true,
    router: useRouter(),
})
const loginForm = ref<InstanceType<typeof LoginForm> | null>(null)

const modalClose = function () {
    state.modalOpen = false
    state.router.push('/')
}

const login = function () {
    if (loginForm.value) {
        loginForm.value.login()
    } else {
        console.log('Merci de réessayer')
    }
}
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
