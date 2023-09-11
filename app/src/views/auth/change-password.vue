<script setup lang="ts">
import { Modal, Button, Alert } from 'flowbite-vue'
import { useModal } from '~/hooks/modal'
import { useRouter } from 'vue-router'
import ChangePasswordForm from '~/components/Auth/ChangePassword/ChangePasswordForm.vue'
import { useChangePassword } from '~/hooks/auth/changePassword'

const router = useRouter()

const { modalOpen, modalClose } = useModal({
    initialValue: true,
    onClose: () => {
        router.push({ name: 'home' })
    },
})

const { fields, isValid, changePassword, error } = useChangePassword()
</script>

<template>
    <Modal :open="modalOpen" @close="modalClose">
        <template #header>
            <h1 class="text-3xl">Changer le mot de passe</h1>
        </template>
        <template #body>
            <Alert v-if="error" type="danger" class="mb-4">{{
                error.text
            }}</Alert>
            <ChangePasswordForm
                v-model="fields"
                @keyup.enter="changePassword"
            />
        </template>
        <template #footer>
            <div class="flex justify-center gap-4">
                <Button
                    color="alternative"
                    type="button"
                    @click.prevent="modalClose"
                    >Annuler</Button
                >
                <Button :disabled="!isValid" @click.prevent="changePassword"
                    >Changer le mot de passe</Button
                >
            </div>
        </template>
    </Modal>
</template>
