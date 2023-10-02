<script setup lang="ts">
import { Modal, Button } from 'flowbite-vue'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useUserStore } from '~/stores/user'
import RequestForm from '~/components/Auth/ResetPassword/RequestForm.vue'
import { useModal } from '~/hooks/modal'

const router = useRouter()
const userStore = useUserStore()
const form = ref<InstanceType<typeof RequestForm> | null>(null)
const { modalOpen, modalClose } = useModal({
    initialValue: true,
    onClose: () => {
        router.push({ name: 'home' })
    },
})

const sendRequestResetPassword = async () => {
    if (form.value) {
        const res = await form.value.sendRequestEmail()
        if (res) {
            await router.push({ name: 'home' })
        }
    }
}

onMounted(() => {
    if (userStore.isAuthenticated) {
        router.push({ name: 'home' })
    }
})
</script>

<template>
    <Modal :open="modalOpen" @close="modalClose">
        <template #header>
            <h1 class="text-3xl">Mot de passe perdu</h1>
        </template>
        <template #body>
            <router-link
                class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:underline"
                :to="{ name: 'login' }"
            >
                <font-awesome-icon :icon="['fa', 'chevron-left']" />
                Retour
            </router-link>
            <p class="my-4">
                Merci de rentrer votre email afin de réinitialiser votre mot de
                passe.
            </p>
            <RequestForm ref="form" />
        </template>
        <template #footer>
            <div class="flex items-center justify-center flex-col gap-4">
                <Button @click.prevent="sendRequestResetPassword"
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
