<script lang="ts" setup>
import { Modal } from 'flowbite-vue'
import { Button } from 'flowbite-vue'
import { reactive, ref } from 'vue'
import SignupForm from '../components/Auth/Signup/SignupForm.vue'
import { Router, useRouter } from 'vue-router'

type State = {
    modalOpen: boolean
    router: Router
}

const state = reactive<State>({
    modalOpen: true,
    router: useRouter(),
})
const signUpForm = ref<InstanceType<typeof SignupForm> | null>(null)

const signUp = function () {
    if (signUpForm.value) {
        signUpForm.value.signUp()
    } else {
        console.log('Merci de réessayer')
    }
}

const modalClose = function () {
    state.router.push({ name: 'home' })
}
</script>

<template>
    <Modal :open="state.modalOpen" @close="modalClose">
        <template #header>
            <h1>Créer un compte</h1>
        </template>
        <template #body>
            <SignupForm ref="signUpForm" />
        </template>
        <template #footer>
            <div class="inline-flex w-full items-center flex-col">
                <Button class="mb-4" @click.prevent="signUp"
                    >Créer le compte</Button
                >
                <Button
                    class="mb-4"
                    size="sm"
                    color="alternative"
                    @click.prevent="modalClose"
                    >Annuler</Button
                >
            </div>
        </template>
    </Modal>
</template>
