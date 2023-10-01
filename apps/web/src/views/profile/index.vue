<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { Modal, Button } from 'flowbite-vue'
import { useRouter } from 'vue-router'
import ProfileInformations from '~/components/Profile/ProfileInformations.vue'
import { useModal } from '~/hooks/modal'

const store = useUserStore()
const router = useRouter()

const { modalOpen, modalClose } = useModal({
    initialValue: true,
    onClose: () => router.push({ name: 'home' }),
})
</script>

<template>
    <Modal :open="modalOpen" @close="modalClose">
        <template #header>
            <h1 class="text-3xl">Mon profil</h1>
        </template>
        <template #body>
            <ProfileInformations
                v-if="store.user"
                class="text-sm"
                :user="store.user"
            />
        </template>
        <template #footer>
            <div class="flex flex-col justify-center items-center gap-4">
                <Button color="alternative" @click.prevent="modalClose"
                    >Retour</Button
                >
            </div>
        </template>
    </Modal>
</template>
