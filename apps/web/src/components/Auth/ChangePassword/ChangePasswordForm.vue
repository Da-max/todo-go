<script lang="ts" setup>
import FormInput from "~/components/Utils/Form/FormInput.vue";
import { ChangePassword, ChangePasswordSchema } from "@todo-go/core";
import { z } from "zod";
import { useVModels } from "@vueuse/core";

export interface Props {
    modelValue: Partial<z.infer<ReturnType<typeof ChangePasswordSchema>>>;
}

export interface Emits {
    (e: "update:modelValue", value: ChangePassword): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { modelValue } = useVModels(props, emits);
</script>

<template>
    <form action="#" class="flex flex-col gap-4">
        <FormInput
            v-model="modelValue.oldPassword"
            label="Ancien mot de passe"
            name="oldPassword"
            type="password"
        />
        <FormInput
            v-model="modelValue.password"
            label="Nouveau mot de passe"
            name="password"
            type="password"
        />
        <FormInput
            v-model="modelValue.confirmPassword"
            label="Confirmer le nouveau mot de passe"
            name="confirmPassword"
            type="password"
        />
    </form>
</template>
