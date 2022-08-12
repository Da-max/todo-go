<script lang="ts" setup>
import { reactive, watch } from 'vue'

type Props = {
    id: string
    value: string
    type: 'text' | 'password'
    label?: boolean
    error?: boolean
}

type State = {
    error: boolean
}

const props = withDefaults(defineProps<Props>(), { label: true })

const state = reactive<State>({
    error: props.error ?? false,
})

watch(
    () => props.error,
    () => {
        state.error = props.error ?? false
    }
)

const emit = defineEmits<{ (e: 'input', id: string, value: Event): void }>()
</script>
<template>
    <div v-if="props.label">
        <label for="username"><slot></slot></label>
        <input
            :type="props.type"
            :id="props.id"
            :value="props.value"
            @input="(e: Event) => emit('input', props.id, e)"
            @focusout="state.error = false"
            :class="{ 'input--error': state.error }"
        />
    </div>
    <input
        v-else
        :type="props.type"
        :id="props.id"
        :value="props.value"
        @input="(e: Event) => emit('input', props.id, e)"
        @focusout="state.error = false"
        :class="{ 'input--error': state.error }"
    />
</template>

<style scoped>
input {
    @apply rounded border-2 border-opacity-0 border-primary bg-secondary transition duration-500;
}

.input--error {
    @apply border-error;
}

input:focus {
    @apply border-opacity-100 outline-none;
}
</style>
