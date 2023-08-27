<script lang="ts" setup>
import { useAttrs } from 'vue'
import { Input } from 'flowbite-vue'
import { useVModel } from '@vueuse/core'

type Props = {
    error?: boolean
}

type Emits = {
    (e: 'update:error', value: boolean): void
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {})
const attrs = useAttrs()

const error = useVModel(props, 'error', emit)
</script>
<template>
    <Input
        v-bind="{ ...attrs }"
        :class="{ '!border-error': error }"
        @focusout="error = false"
        @input="error = false"
    >
        <template v-for="(_, slot) in $slots" #[slot]>
            <slot :name="slot"></slot>
        </template>
    </Input>
</template>
