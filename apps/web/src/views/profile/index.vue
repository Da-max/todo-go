<script lang="ts" setup>
import { useUserStore } from "~/stores/user";
import { FwbModal, FwbButton } from "flowbite-vue";
import { useRouter } from "vue-router";
import ProfileInformations from "~/components/Profile/ProfileInformations.vue";
import { useModal } from "~/hooks/modal";
import ModalFooter from "~/components/Utils/Modal/ModalFooter.vue";

const store = useUserStore();
const router = useRouter();

const { modalOpen, modalClose } = useModal({
    initialValue: true,
    onClose: () => router.push({ name: "home" }),
});
</script>

<template>
    <FwbModal :open="modalOpen" @close="modalClose">
        <template #header>
            <h1 class="text-3xl">Mon profil</h1>
        </template>
        <template #body>
            <ProfileInformations
                v-if="store.user"
                :user="store.user"
                class="text-sm"
            />
        </template>
        <template #footer>
            <div class="flex flex-col justify-center items-center gap-4">
                <ModalFooter @cancel="modalClose">
                    <template #cancel>Retour</template>
                </ModalFooter>
            </div>
        </template>
    </FwbModal>
</template>
