<script lang="ts" setup>
import { UpdateUser } from "@todo-go/core";
import { useVModels } from "@vueuse/core";
import FormInput from "~/components/Utils/Form/FormInput.vue";
import { ref, watch } from "vue";

export type Props = {
    modelValue: UpdateUser;
    error: boolean;
};

export type Emits = {
    (e: "update:modelValue", value: UpdateUser): void;
    (e: "update:error", value: boolean): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { modelValue, error } = useVModels(props, emits);

watch(
    modelValue.value,
    () => {
        error.value =
            modelValue.value.username === "" || modelValue.value.email === "";
    },
    { immediate: true },
);
</script>

<template>
    <form action="#" class="flex justify-around">
        <FormInput
            v-model="modelValue.username"
            v-model:error="error"
            label="Nom d’utilisateur"
        />
        <FormInput
            v-model="modelValue.email"
            v-model:error="error"
            label="Email"
            type="email"
        />
    </form>
</template>
