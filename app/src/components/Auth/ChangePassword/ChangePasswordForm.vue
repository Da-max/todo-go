<script setup lang="ts">
import FormInput from '~/components/Utils/Form/FormInput.vue'
import { ChangePassword } from '~/types/generated'
import { useVModel } from '@vueuse/core'

export interface Props {
    modelValue: ChangePassword
}
export interface Emits {
    (e: 'update:modelValue', value: ChangePassword): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const fields = useVModel(props, 'modelValue', emits)
</script>

<template>
    <form action="#" class="flex flex-col gap-4">
        <FormInput
            v-model="fields.oldPassword"
            type="password"
            label="Ancien mot de passe"
        />
        <FormInput
            v-model="fields.password"
            type="password"
            label="Nouveau mot de passe"
        />
        <FormInput
            v-model="fields.confirmPassword"
            type="password"
            label="Confirmer le nouveau mot de passe"
        />
    </form>
</template>
