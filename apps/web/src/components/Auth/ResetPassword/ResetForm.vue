<script setup lang="ts">
import FormInput from '../../Utils/Form/FormInput.vue'
import { useVModels } from '@vueuse/core'
import { ResetPasswordFields } from '~/types/auth'
import { computed, ref, watch } from 'vue'

export type Props = {
    modelValue: ResetPasswordFields
    isValid: boolean
}

export type Emits = {
    (e: 'update:modelValue', value: ResetPasswordFields): void
    (e: 'update:isValid', value: boolean): void
    (e: 'submit', value: ResetPasswordFields): void
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()

const { modelValue, isValid } = useVModels(props, emits)

const error = ref<boolean>(false)
const errorCompute = computed<boolean>({
    get: () =>
        error.value ||
        modelValue.value.password !== modelValue.value.confirmPassword,
    set: (newValue) => {
        error.value = newValue
    },
})

watch(errorCompute, () => {
    isValid.value = !errorCompute.value
})
</script>

<template>
    <form
        action="#"
        class="flex flex-col gap-8"
        @keydown.enter="emits('submit', modelValue)"
    >
        <FormInput
            v-model="modelValue.password"
            v-model:error="errorCompute"
            label="Votre mot de passe"
            type="password"
        />
        <FormInput
            v-model="modelValue.confirmPassword"
            v-model:error="errorCompute"
            label="Confirmation de votre mot de passe"
            type="password"
        />
    </form>
</template>
