<script setup lang="ts">
import { UserFragment } from '~/types/generated'
import { useVModels, whenever } from '@vueuse/core'
import { ref } from 'vue'
import FormInput from '~/components/Utils/Form/FormInput.vue'

export interface Props {
    user: UserFragment
    isValid: boolean
}

export interface Emits {
    (e: 'update:isValid', value: boolean): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const { isValid } = useVModels(props, emits)
const input = ref('')

whenever(
    () => props.user.email === input.value,
    () => {
        isValid.value = true
    },
)
</script>

<template>
    <div>
        <p class="my-4">
            Afin de confirmer la suppression de votre compte merci de tapper
            votre email : <span class="font-bold">{{ props.user.email }}</span>
        </p>
        <FormInput
            v-model="input"
            label="Votre email"
            :placeholder="props.user.email"
        />
    </div>
</template>
