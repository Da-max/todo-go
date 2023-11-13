<script lang="ts" setup>
import { FwbModal, FwbButton } from "flowbite-vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useUserStore } from "~/stores/user";
import RequestForm from "~/components/Auth/ResetPassword/RequestForm.vue";
import { useModal } from "~/hooks/modal";
import { useRequestResetPassword } from "~/hooks/auth/requestResetPassword";
import FormErrors from "~/components/Utils/Form/FormErrors.vue";
import ModalFooter from "~/components/Utils/Modal/ModalFooter.vue";

const router = useRouter();
const userStore = useUserStore();
const { modalOpen, modalClose } = useModal({
    initialValue: true,
    onClose: () => {
        router.push({ name: "home" });
    },
});
const { values, sendRequestEmail, error, errors } = useRequestResetPassword();

onMounted(() => {
    if (userStore.isAuthenticated) {
        router.push({ name: "home" });
    }
});
</script>

<template>
    <FwbModal :open="modalOpen" @close="modalClose">
        <template #header>
            <h1 class="text-3xl">Mot de passe perdu</h1>
        </template>
        <template #body>
            <router-link
                :to="{ name: 'login' }"
                class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:underline"
            >
                <font-awesome-icon :icon="['fa', 'chevron-left']" />
                Retour
            </router-link>
            <p class="my-4">
                Merci de rentrer votre email afin de réinitialiser votre mot de
                passe.
            </p>
            <FormErrors :errors="errors" />
            <RequestForm v-model="values" />
        </template>
        <template #footer>
            <ModalFooter @action="sendRequestEmail" @cancel="modalClose">
                <template #action> Envoyer la demande </template>
                <template #cancel> Annuler </template>
            </ModalFooter>
        </template>
    </FwbModal>
</template>
