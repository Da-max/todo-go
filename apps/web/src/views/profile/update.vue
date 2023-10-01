<script setup lang="ts">
import { Modal, Button } from 'flowbite-vue'
import { useModal } from '~/hooks/modal'
import { useRouter } from 'vue-router'
import ProfileUpdate from '~/components/Profile/ProfileUpdate.vue'
import { useUserStore } from '~/stores/user'
import { useUpdateAccount } from '~/hooks/profile/useUpdateAccount'
import Loader from '~/components/Utils/Loader.vue'
import { ref } from 'vue'

const router = useRouter()

const { modalOpen, modalClose } = useModal({
    initialValue: true,
    onClose: () => {
        router.push({ name: 'home' })
    },
})
const { input, updateAccount, loading } = useUpdateAccount({
    onData: () => {
        router.push({ name: 'home' })
    },
})

const store = useUserStore()
input.value = { email: store.user?.email, username: store.user?.username }
const error = ref(false)
</script>

<template>
    <Modal :escapable="false" :open="modalOpen" @close="modalClose">
        <template #header>
            <h1 class="text-3xl">Mettre à jour mes informations</h1>
        </template>
        <template #body>
            <ProfileUpdate
                v-model:error="error"
                v-model="input"
                @keyup.enter="
                    () => {
                        if (!error) updateAccount()
                    }
                "
            />
        </template>
        <template #footer>
            <div class="flex justify-center gap-8">
                <Button :disabled="error" type="button" @click="updateAccount"
                    ><FontAwesomeIcon
                        v-if="!loading"
                        :icon="['fas', 'floppy-disk']"
                    />
                    <Loader v-else class="w-5 h-5" />
                    Enregistrer les informations</Button
                >
                <Button color="alternative" @click="modalClose">Annuler</Button>
            </div>
        </template>
    </Modal>
</template>
