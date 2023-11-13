<script lang="ts" setup>
import { FwbModal, FwbButton, useToast } from "flowbite-vue";
import { useModal } from "~/hooks/modal";
import { useRouter } from "vue-router";
import ChangePasswordForm from "~/components/Auth/ChangePassword/ChangePasswordForm.vue";
import { useChangePassword } from "~/hooks/auth/changePassword";

import FormErrors from "~/components/Utils/Form/FormErrors.vue";
import ModalFooter from "~/components/Utils/Modal/ModalFooter.vue";

const router = useRouter();

const { modalOpen, modalClose } = useModal({
    initialValue: true,
    onClose: () => {
        router.push({ name: "home" });
    },
});

const toast = useToast();

const { changePassword, fields, errors } = useChangePassword({
    onData: () => {
        toast.add({
            time: 50_000,
            text: "Votre mot de passe a bien été modifié.",
            type: "success",
        });
        router.push({ name: "home" });
    },
    onError(error) {
        toast.add({
            time: 50_000,
            text: `Une erreur est survenue, merci de vérifier que
                    vous avez remplis tous les champs puis réessayer (${error.message})`,
            type: "danger",
        });
    },
});
</script>

<template>
    <FwbModal :open="modalOpen" @close="modalClose">
        <template #header>
            <h1 class="text-3xl">Changer mon mot de passe</h1>
        </template>
        <template #body>
            <FormErrors :errors="errors" />
            <ChangePasswordForm
                v-model="fields"
                @keyup.enter="changePassword"
            />
        </template>
        <template #footer>
            <ModalFooter @action="changePassword" @cancel="modalClose">
                <template #action> Changer le mot de passe </template>
                <template #cancel> Annuler </template>
            </ModalFooter>
        </template>
    </FwbModal>
</template>
