<script lang="ts" setup>
import FormInput from "../../Utils/Form/FormInput.vue";
import { computed, ref } from "vue";
import { SignUpFields } from "~/types/auth";
import { useVModels } from "@vueuse/core";

export type Props = {
    modelValue: SignUpFields;
    error: boolean;
};

export type Emits = {
    (e: "update:modelValue", value: SignUpFields): void;
    (e: "update:error", value: boolean): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { modelValue, error } = useVModels(props, emits);

const errorValue = ref<boolean>(false);

const errorComputed = computed<boolean>({
    get: () => errorValue.value || !!error.value,
    set: (newError: boolean) => {
        errorValue.value = newError;
    },
});
</script>

<template>
    <form
        class="h-full text-xl flex flex-wrap flex-col xl:flex-row xl:justify-around items-center gap-8"
        action="#"
    >
        <div class="flex flex-col gap-8">
            <FormInput
                v-model:error="errorComputed"
                v-model="modelValue.username"
                :error="!!error"
                label="Nom d’utilisateur"
            ></FormInput>
            <FormInput
                v-model:error="errorComputed"
                v-model="modelValue.email"
                label="Email"
                type="email"
                :error="!!error"
            />
        </div>
        <div class="flex flex-col gap-8">
            <FormInput
                v-model:error="errorComputed"
                v-model="modelValue.password"
                type="password"
                :error="!!error"
                label="Mot de passe"
            />
            <FormInput
                v-model:error="errorComputed"
                v-model="modelValue.confirmPassword"
                type="password"
                :error="!!error"
                label="Confirmation du mot de passe"
            />
        </div>
        <p v-if="error?.text" class="text-error mt-4 p-4 min-w-full">
            {{ error?.text }}
        </p>
    </form>
</template>
