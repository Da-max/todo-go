<script lang="ts" setup>
import { reactive, watch } from 'vue'

type Props = {
    id: string
    value: string
    type: 'text' | 'password'
    label?: boolean
    error?: boolean
    classInput: string | undefined
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
    },
)

const emit = defineEmits<{ (e: 'input', id: string, value: Event): void }>()
</script>
<template>
    <div v-if="props.label">
        <label for="username"><slot></slot></label>
        <input
            :id="props.id"
            :type="props.type"
            :value="props.value"
            :class="[
                props.classInput,
                { 'border-error': state.error },
                'rounded border-2 border-opacity-0 border-primary bg-secondary transition duration-500 focus:border-opacity-100 focus:outline-none',
            ]"
            @input="(e: Event) => emit('input', props.id, e)"
            @focusout="state.error = false"
        />
    </div>
    <input
        v-else
        :id="props.id"
        :type="props.type"
        :value="props.value"
        :class="[
            props.classInput,
            'rounded border-2 border-opacity-0 border-primary bg-secondary transition duration-500 focus:border-opacity-100 focus:outline-none',
            { 'border-error': state.error },
        ]"
        @input="(e: Event) => emit('input', props.id, e)"
        @focusout="state.error = false"
    />
</template>
