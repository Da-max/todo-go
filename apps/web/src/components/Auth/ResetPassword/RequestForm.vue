<script lang="ts" setup>
import FormInput from "../../Utils/Form/FormInput.vue";
import { useVModel } from "@vueuse/core";
import { RequestPasswordResetIdentifier } from "@todo-go/core/src";

export type Props = {
    modelValue: RequestPasswordResetIdentifier;
};

export type Emits = {
    (e: "update:modelValue", value: RequestPasswordResetIdentifier): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const modelValue = useVModel(props, "modelValue", emits);
</script>

<template>
    <div>
        <FormInput
            v-model="modelValue.email"
            label="Votre email"
            name="email"
        />
    </div>
</template>
