<script lang="ts" setup>
import { FwbModal, FwbButton } from "flowbite-vue";
import { useModal } from "~/hooks/modal";
import { useRouter } from "vue-router";
import ProfileUpdate from "~/components/Profile/ProfileUpdate.vue";
import { useUserStore } from "~/stores/user";
import { useUpdateAccount } from "~/hooks/profile/useUpdateAccount";
import Loader from "~/components/Utils/Loader.vue";
import { ref } from "vue";
import ModalFooter from "~/components/Utils/Modal/ModalFooter.vue";

const router = useRouter();

const { modalOpen, modalClose } = useModal({
    initialValue: true,
    onClose: () => {
        router.push({ name: "home" });
    },
});
const { input, updateAccount, loading } = useUpdateAccount({
    onData: () => {
        router.push({ name: "home" });
    },
});

const store = useUserStore();
input.value = { email: store.user?.email, username: store.user?.username };
const error = ref(false);
</script>

<template>
    <FwbModal :escapable="false" :open="modalOpen" @close="modalClose">
        <template #header>
            <h1 class="text-3xl">Mettre à jour mes informations</h1>
        </template>
        <template #body>
            <ProfileUpdate
                v-model="input"
                v-model:error="error"
                @keyup.enter="
                    () => {
                        if (!error) updateAccount();
                    }
                "
            />
        </template>
        <template #footer>
            <ModalFooter
                :action-disabled="error"
                @action="updateAccount"
                @cancel="modalClose"
            >
                <template #action>
                    <FontAwesomeIcon
                        v-if="!loading"
                        :icon="['fas', 'floppy-disk']"
                    />
                    <Loader v-else class="w-5 h-5" />
                    Enregistrer les informations
                </template>
                <template #cancel> Annuler </template>
            </ModalFooter>
        </template>
    </FwbModal>
</template>
