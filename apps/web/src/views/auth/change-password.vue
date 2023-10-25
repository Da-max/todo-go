<script lang="ts" setup>
import { FwbModal, FwbButton, useToast } from "flowbite-vue";
import { useModal } from "~/hooks/modal";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ChangePasswordForm from "~/components/Auth/ChangePassword/ChangePasswordForm.vue";
import { useChangePassword } from "~/hooks/auth/changePassword";
import { ChangePasswordSchema } from "@todo-go/core";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const router = useRouter();

const { modalOpen, modalClose } = useModal({
    initialValue: true,
    onClose: () => {
        router.push({ name: "home" });
    },
});

const toast = useToast();
const error = ref(false);

const { changePassword, fields } = useChangePassword({
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

const { handleSubmit, errors } = useForm({
    validationSchema: toTypedSchema(ChangePasswordSchema()),
});

const onSubmit = handleSubmit((values) => {
    changePassword();
});
</script>

<template>
    <FwbModal :open="modalOpen" @close="modalClose">
        <template #header>
            <h1 class="text-3xl">Changer le mot de passe</h1>
        </template>
        <template #body>
            <ChangePasswordForm
                v-model="fields"
                v-model:error="error"
                @keyup.enter="changePassword"
            />
        </template>
        <template #footer>
            <div class="flex justify-center gap-4">
                <FwbButton
                    color="alternative"
                    type="button"
                    @click.prevent="modalClose"
                    >Annuler
                </FwbButton>
                <FwbButton @click.prevent="onSubmit"
                    >Changer le mot de passe
                </FwbButton>
            </div>
        </template>
    </FwbModal>
</template>
