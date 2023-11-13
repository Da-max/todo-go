<script lang="ts" setup>
import FormInput from "../../Utils/Form/FormInput.vue";
import { z } from "zod";
import { IdentifierSchema } from "@todo-go/core/src";
import { Identifier } from "@todo-go/core";
import { useVModels } from "@vueuse/core";

export type Props = {
    modelValue: Partial<z.infer<ReturnType<typeof IdentifierSchema>>>;
};

export type Emits = {
    (e: "update:modelValue", value: Identifier): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { modelValue } = useVModels(props, emits);
</script>
<template>
    <form
        action="#"
        class="h-full text-md flex flex-col justify-center mx-20 mt-8 gap-8"
    >
        <FormInput
            v-model="modelValue.username"
            label="Nom d’utilisateur"
            name="username"
            type="text"
        />

        <FormInput
            v-model="modelValue.password"
            label="Mot de passe"
            name="password"
            type="password"
        />
    </form>
</template>
