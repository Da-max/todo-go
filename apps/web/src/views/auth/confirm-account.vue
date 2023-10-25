<script lang="ts" setup>
import { onMounted } from "vue";
import {
    LocationQuery,
    LocationQueryValue,
    useRoute,
    useRouter,
} from "vue-router";
import { useConfirmAccount } from "~/hooks/auth/confirmAccount";
import { FwbAlert } from "flowbite-vue";

const { query }: { query: LocationQuery } = useRoute();
const router = useRouter();
const token: LocationQueryValue | LocationQueryValue[] = query.token;
const { confirmAccount, alert, error } = useConfirmAccount();

onMounted(async () => {
    if (token && !(token instanceof Array)) {
        await confirmAccount(token);
        await router.push({ name: "home" });
    }
});
</script>

<template>
    <FwbAlert v-if="alert">{{ alert }}</FwbAlert>
    <FwbAlert v-if="error">{{ error }}</FwbAlert>
</template>
