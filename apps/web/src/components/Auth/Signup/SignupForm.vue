<script lang="ts" setup>
import FormInput from "../../Utils/Form/FormInput.vue";
import { SignUpFields } from "~/types/auth";
import { useVModels } from "@vueuse/core";

export type Props = {
    modelValue: SignUpFields;
};

export type Emits = {
    (e: "update:modelValue", value: SignUpFields): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { modelValue } = useVModels(props, emits);
</script>

<template>
    <form
        action="#"
        class="h-full text-xl flex flex-wrap flex-col xl:flex-row xl:justify-around items-center gap-8"
    >
        <div class="flex flex-col gap-8">
            <FormInput
                v-model="modelValue.username"
                label="Nom d’utilisateur"
                name="username"
            ></FormInput>
            <FormInput
                v-model="modelValue.email"
                label="Email"
                name="email"
                type="email"
            />
        </div>
        <div class="flex flex-col gap-8">
            <FormInput
                v-model="modelValue.password"
                label="Mot de passe"
                name="password"
                type="password"
            />
            <FormInput
                v-model="modelValue.confirmPassword"
                label="Confirmation du mot de passe"
                name="confirmPassword"
                type="password"
            />
        </div>
    </form>
</template>
