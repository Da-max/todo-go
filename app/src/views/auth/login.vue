<script lang="ts" setup>
import { Modal } from 'flowbite-vue'
import LoginForm from '../../components/Auth/Login/LoginForm.vue'
import { Button } from 'flowbite-vue'
import { onMounted, reactive, ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

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

const login = async () => {
    if (loginForm.value) {
        await loginForm.value.login()
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
            <h1 class="text-3xl">Se connecter</h1>
        </template>
        <template #body>
            <LoginForm ref="loginForm" />
            <p class="font-medium text-sm">
                <router-link
                    :to="{ name: 'request-reset-password' }"
                    class="text-blue-600 dark:text-blue-500 hover:underline"
                    >Mot de passe oublié</router-link
                >
            </p>
        </template>
        <template #footer>
            <div class="inline-flex w-full items-center flex-col mb-4 gap-4">
                <Button @click.prevent="login">Se connecter</Button>
                <Button
                    color="alternative"
                    size="sm"
                    @click.prevent="modalClose"
                    >Annuler</Button
                >
            </div>
        </template>
    </Modal>
</template>
