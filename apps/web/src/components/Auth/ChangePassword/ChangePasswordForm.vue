<script setup lang="ts">
import FormInput from '~/components/Utils/Form/FormInput.vue'
import { ChangePassword } from '@todo-go/core'
import { useVModels } from '@vueuse/core'
import { computed, ref } from 'vue'

export interface Props {
    modelValue: ChangePassword
    error: boolean
}
export interface Emits {
    (e: 'update:modelValue', value: ChangePassword): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const errorValue = ref(true)

const { modelValue } = useVModels(props, emits)
const error = computed({
    get: () => props.error && errorValue.value,
    set: (newValue) => {
        errorValue.value = newValue
    },
})
</script>

<template>
    <form action="#" class="flex flex-col gap-4">
        <FormInput
            v-model="modelValue.oldPassword"
            v-model:error="error"
            type="password"
            label="Ancien mot de passe"
        />
        <FormInput
            v-model="modelValue.password"
            v-model:error="error"
            type="password"
            label="Nouveau mot de passe"
        />
        <FormInput
            v-model="modelValue.confirmPassword"
            v-model:error="error"
            type="password"
            label="Confirmer le nouveau mot de passe"
        />
    </form>
</template>
