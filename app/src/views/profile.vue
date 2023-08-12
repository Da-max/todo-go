<script setup lang="ts">
import { useUserStore } from '../stores/user'
import Modal from '../components/Utils/Modal.vue'
import { useRouter } from 'vue-router'
import ProfileInformations from '../components/Profile/ProfileInformations.vue'

const store = useUserStore()
const router = useRouter()

const onClose = () => {
    router.push({ name: 'home' })
}
</script>

<template>
    <Modal :open="true" @close="onClose">
        <template #header>Mon profil</template>
        <template #content>
            <ProfileInformations
                v-if="store.user"
                class="p-10 text-xl"
                :user="store.user"
            />
        </template>
    </Modal>
</template>
