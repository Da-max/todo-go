<script lang="ts" setup>
import FormInput from "../../Utils/Form/FormInput.vue";
import { useVModels } from "@vueuse/core";
import { ResetPasswordFields } from "~/types/auth";
import { computed, ref, watch } from "vue";

export type Props = {
    modelValue: ResetPasswordFields;
};

export type Emits = {
    (e: "update:modelValue", value: ResetPasswordFields): void;
};

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const { modelValue } = useVModels(props, emits);
</script>

<template>
    <form action="#" class="flex flex-col gap-8">
        <FormInput
            v-model="modelValue.password"
            label="Votre mot de passe"
            name="password"
            type="password"
        />
        <FormInput
            v-model="modelValue.confirmPassword"
            label="Confirmation de votre mot de passe"
            name="confirmPassword"
            type="password"
        />
    </form>
</template>
