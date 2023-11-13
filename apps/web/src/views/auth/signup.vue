<script lang="ts" setup>
import { FwbModal, FwbButton } from "flowbite-vue";
import SignupForm from "~/components/Auth/Signup/SignupForm.vue";
import { useRouter } from "vue-router";
import { useModal } from "~/hooks/modal";
import { useSignUp } from "~/hooks/auth/signup";
import FormErrors from "~/components/Utils/Form/FormErrors.vue";
import ModalFooter from "~/components/Utils/Modal/ModalFooter.vue";

const { modalOpen, modalClose } = useModal({
    initialValue: true,
    onClose: () => {
        router.push({ name: "home" });
    },
});
const { fields, signUp, errors } = useSignUp({
    onData: () => {
        modalClose();
    },
});

const router = useRouter();
</script>

<template>
    <FwbModal :open="modalOpen" @close="modalClose">
        <template #header>
            <h1>Créer un compte</h1>
        </template>
        <template #body>
            <FormErrors :errors="errors" />
            <SignupForm v-model="fields" />
        </template>
        <template #footer>
            <ModalFooter @action="signUp" @cancel="modalClose">
                <template #action> Créer le compte </template>
                <template #cancel> Annuler </template>
            </ModalFooter>
        </template>
    </FwbModal>
</template>
