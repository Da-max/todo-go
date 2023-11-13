<script lang="ts" setup>
import { FwbAlert } from "flowbite-vue";

export type Props = {
    errors: Record<string, string | undefined>;
};

defineProps<Props>();
</script>

<template>
    <FwbAlert v-for="error in errors" class="mb-4" closable icon type="danger">
        {{ error ?? "Erreur inconnue" }}
    </FwbAlert>
</template>
