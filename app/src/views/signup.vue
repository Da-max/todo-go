<script lang="ts" setup>
import Modal from '../components/Utils/Modal.vue'
import Button from '../components/Utils/Button.vue'
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
        <template #content>
            <SignupForm ref="signUpForm" />
        </template>
        <template #footer>
            <div class="create-account__footer">
                <Button @click.prevent="signUp">Créer le compte</Button>
                <Button type="secondary" @click.prevent="modalClose" size="sm"
                    >Annuler</Button
                >
            </div>
        </template>
    </Modal>
</template>

<style>
.create-account__footer {
    @apply inline-flex w-full items-center flex-col;
}

.create-account__footer > button {
    @apply mb-4;
}
</style>
