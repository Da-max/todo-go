<script setup lang="ts">
import { Button, Modal } from 'flowbite-vue'
import { useModal } from '~/hooks/modal'
import ResetForm from '~/components/Auth/ResetPassword/ResetForm.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useResetPassword } from '~/hooks/auth/resetPassword'

const router = useRouter()
const route = useRoute()

const { sendResetPassword, fields, error, isValid } = useResetPassword()

const { modalOpen, modalClose } = useModal({
    initialValue: false,
    onClose: () => router.push({ name: 'home' }),
})

const token = ref<string>(route.query['token'] as string)

const resetPassword = async () => {
    await sendResetPassword(token)
    modalClose()
}
</script>

<template>
    <Modal :open="modalOpen" @keyup.esc="modalClose" @close="modalClose">
        <template #header>
            <h1 class="text-3xl">Réinitialiser votre mot de passe</h1>
        </template>
        <template #body>
            <router-link
                class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:underline"
                :to="{ name: 'home' }"
            >
                <font-awesome-icon :icon="['fa', 'chevron-left']" />
                Accueil
            </router-link>
            <p class="my-4">
                Merci de rentrer votre nouveau mot de passe deux fois.
            </p>
            <ResetForm
                v-model="fields"
                v-model:is-valid="isValid"
                @submit="resetPassword"
            />
            <p v-if="error">{{ error.text }}</p>
        </template>
        <template #footer>
            <div class="flex items-center justify-center flex-col gap-4">
                <Button :disabled="!isValid" @click.prevent="resetPassword"
                    >Se connecter</Button
                >
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
