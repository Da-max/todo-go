<script setup lang="ts">
import { Modal, Button, useToast } from 'flowbite-vue'
import ProfileDelete from '~/components/Profile/ProfileDelete.vue'
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { useDeleteAccount } from '~/hooks/profile/useDeleteAccount'
import { useModal } from '~/hooks/modal'
import { useRouter } from 'vue-router'

const isValid = ref<boolean>(false)
const router = useRouter()
const { modalOpen, modalClose } = useModal({
    initialValue: true,
    onClose: () => {
        router.push({ name: 'home' })
    },
})
const toast = useToast()
const store = useUserStore()
const { execute } = useDeleteAccount({
    onData: () => {
        store.disconnect()
        toast.add({
            time: 50_000,
            text: 'Votre compte a bien été supprimé',
            type: 'warning',
        })
        router.push({ name: 'home' })
    },
})
</script>

<template>
    <Modal :open="modalOpen" @close="modalClose">
        <template #header>
            <h1 class="text-3xl">Suppression de votre compte</h1>
        </template>
        <template #body>
            <ProfileDelete
                v-if="store.user"
                v-model:is-valid="isValid"
                :user="store.user"
                @keydown.enter="
                    () => {
                        if (isValid) {
                            execute()
                        }
                    }
                "
            />
        </template>
        <template #footer>
            <div class="flex gap-4 justify-around">
                <Button color="alternative" @click.prevent="modalClose"
                    >Annuler</Button
                >
                <Button
                    color="red"
                    :disabled="!isValid"
                    @click.prevent="execute"
                    >Supprimer</Button
                >
            </div>
        </template>
    </Modal>
</template>
