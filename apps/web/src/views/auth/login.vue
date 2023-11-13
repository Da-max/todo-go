<script lang="ts" setup>
import { FwbModal, FwbAlert } from "flowbite-vue";
import LoginForm from "../../components/Auth/Login/LoginForm.vue";
import { reactive } from "vue";
import { Router, useRouter } from "vue-router";
import { useUserStore } from "~/stores/user";
import { whenever } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useModal } from "~/hooks/modal";
import { useLogin } from "~/hooks/auth/login";
import FormErrors from "~/components/Utils/Form/FormErrors.vue";
import ModalFooter from "~/components/Utils/Modal/ModalFooter.vue";

type State = {
    modalOpen: boolean;
    router: Router;
};

const state = reactive<State>({
    modalOpen: true,
    router: useRouter(),
});

const { modalOpen, modalClose } = useModal({
    initialValue: state.modalOpen,
    onClose: () => {
        state.router.push({ name: "home" });
    },
});

const { isAuthenticated } = storeToRefs(useUserStore());

const { fields, login, error, errors } = useLogin();

whenever(
    isAuthenticated,
    () => {
        state.router.push({ name: "home" });
    },
    { immediate: true },
);
</script>

<template>
    <FwbModal :open="modalOpen" @close="modalClose">
        <template #header>
            <h1 class="text-3xl">Se connecter</h1>
        </template>
        <template #body>
            <FormErrors :errors="errors" />
            <FwbAlert v-if="error?.text" type="danger">
                <template #default>{{
                    error?.text ?? "Une erreur est survenue"
                }}</template>
            </FwbAlert>
            <LoginForm v-model="fields" @keyup.enter="login" />
            <p class="font-medium text-sm">
                <router-link
                    :to="{ name: 'request-reset-password' }"
                    class="text-blue-600 dark:text-blue-500 hover:underline"
                    >Mot de passe oublié
                </router-link>
            </p>
        </template>
        <template #footer>
            <ModalFooter @action="login" @cancel="modalClose">
                <template #cancel> Annuler </template>
                <template #action> Se connecter </template>
            </ModalFooter>
        </template>
    </FwbModal>
</template>
