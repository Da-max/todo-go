<script setup lang="ts">
import { FwbModal, FwbButton, FwbAlert, useToast } from "flowbite-vue";
import { useModal } from "~/hooks/modal";
import { useRouter } from "vue-router";
import ChangePasswordForm from "~/components/Auth/ChangePassword/ChangePasswordForm.vue";
import { useChangePassword } from "~/hooks/auth/changePassword";

const router = useRouter();

const { modalOpen, modalClose } = useModal({
    initialValue: true,
    onClose: () => {
        router.push({ name: "home" });
    },
});

const toast = useToast();

const { fields, isValid, changePassword, error, isError } = useChangePassword({
    onData: () => {
        toast.add({
            time: 50_000,
            text: "Votre mot de passe a bien été modifié.",
            type: "success",
        });
        router.push({ name: "home" });
    },
});
</script>

<template>
    <FwbModal :open="modalOpen" @close="modalClose">
        <template #header>
            <h1 class="text-3xl">Changer le mot de passe</h1>
        </template>
        <template #body>
            <FwbAlert v-if="error" type="danger" class="mb-4">{{
                error.text
            }}</FwbAlert>
            <ChangePasswordForm
                v-model="fields"
                v-model:error="isError"
                @keyup.enter="changePassword"
            />
        </template>
        <template #footer>
            <div class="flex justify-center gap-4">
                <FwbButton
                    color="alternative"
                    type="button"
                    @click.prevent="modalClose"
                    >Annuler</FwbButton
                >
                <FwbButton :disabled="!isValid" @click.prevent="changePassword"
                    >Changer le mot de passe</FwbButton
                >
            </div>
        </template>
    </FwbModal>
</template>
