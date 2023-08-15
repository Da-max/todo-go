<script lang="ts" setup>
import { IMessage, Position, AlertTypes, ErrorTypes } from '../../types/utils'
import {} from 'tailwindcss'
type Props = {
    message: IMessage
    pos?: Position
}

const props = defineProps<Props>()

function getBgColor(): string {
    let color = ''
    switch (props.message.type) {
        case AlertTypes.SUCCESS:
            color = 'bg-success'
            break
        case AlertTypes.INFO:
            color = 'bg-primary'
            break
        case ErrorTypes.FILL:
            color = 'bg-error'
            break
        case ErrorTypes.VALUE:
            color = 'bg-error'
            break
        default:
            color = 'bg-secondary'
            break
    }

    return color
}
</script>

<template>
    <aside
        :class="[
            'hover:shadow-2xl absolute left-4 bottom-4 p-4 rounded-lg shadow-md transition-shadow z-20',
            getBgColor(),
        ]"
    >
        {{ message.text }}
    </aside>
</template>
