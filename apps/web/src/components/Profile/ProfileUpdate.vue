<script lang="ts" setup>
import { UpdateUser } from "@todo-go/core";
import { useVModels } from "@vueuse/core";
import FormInput from "~/components/Utils/Form/FormInput.vue";
import { ref, watch } from "vue";

export type Props = {
    modelValue: UpdateUser;
};

export type Emits = {
    (e: "update:modelValue", value: UpdateUser): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { modelValue } = useVModels(props, emits);
</script>

<template>
    <form action="#" class="flex justify-around">
        <FormInput
            v-model="modelValue.username"
            label="Nom d’utilisateur"
            name="username"
        />
        <FormInput
            v-model="modelValue.email"
            label="Email"
            name="email"
            type="email"
        />
    </form>
</template>
