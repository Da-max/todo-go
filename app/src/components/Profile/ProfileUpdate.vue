<script setup lang="ts">
import { UpdateUser } from '~/types/generated'
import { useVModels } from '@vueuse/core'
import FormInput from '~/components/Utils/Form/FormInput.vue'
import { ref, watch } from 'vue'

export type Props = {
    modelValue: UpdateUser
    error: boolean
}

export type Emits = {
    (e: 'update:modelValue', value: UpdateUser): void
    (e: 'update:error', value: boolean): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const errorValue = ref(false)

const { modelValue, error } = useVModels(props, emits)

watch(
    modelValue.value,
    () => {
        error.value =
            modelValue.value.username === '' || modelValue.value.email === ''
    },
    { immediate: true },
)
</script>

<template>
    <form action="#" class="flex justify-around">
        <FormInput
            v-model:error="errorValue"
            v-model="modelValue.username"
            label="Nom d’utilisateur"
        />
        <FormInput
            v-model:error="errorValue"
            v-model="modelValue.email"
            label="Email"
            type="email"
        />
    </form>
</template>
