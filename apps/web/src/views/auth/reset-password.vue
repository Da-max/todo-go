<script lang="ts" setup>
import { FwbButton, FwbModal } from "flowbite-vue";
import { useModal } from "~/hooks/modal";
import ResetForm from "~/components/Auth/ResetPassword/ResetForm.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useResetPassword } from "~/hooks/auth/resetPassword";
import { isValid } from "zod";
import FormErrors from "~/components/Utils/Form/FormErrors.vue";
import ModalFooter from "~/components/Utils/Modal/ModalFooter.vue";

const router = useRouter();
const route = useRoute();
const token = ref<string>(route.query["token"] as string);

const { sendResetPassword, fields, error, errors } = useResetPassword(token);

const { modalOpen, modalClose } = useModal({
    initialValue: false,
    onClose: () => router.push({ name: "home" }),
});

const resetPassword = async () => {
    await sendResetPassword();
    modalClose();
};
</script>

<template>
    <FwbModal :open="modalOpen" @close="modalClose" @keyup.esc="modalClose">
        <template #header>
            <h1 class="text-3xl">Réinitialiser votre mot de passe</h1>
        </template>
        <template #body>
            <router-link
                :to="{ name: 'home' }"
                class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:underline"
            >
                <font-awesome-icon :icon="['fa', 'chevron-left']" />
                Accueil
            </router-link>
            <p class="my-4">
                Merci de rentrer votre nouveau mot de passe deux fois.
            </p>
            <FormErrors :errors="errors" @keyup.enter="resetPassword" />
            <ResetForm
                v-model="fields"
                v-model:is-valid="isValid"
                @submit="resetPassword"
            />
        </template>
        <template #footer>
            <ModalFooter @action="resetPassword" @cancel="modalClose">
                <template #action> Réinitialiser le mot de passe </template>
                <template #cancel> Annuler </template>
            </ModalFooter>
        </template>
    </FwbModal>
</template>
