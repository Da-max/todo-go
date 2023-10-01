<script lang="ts" setup>
type Props = {
    type?: 'primary' | 'secondary'
    size?: 'sm' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
    type: 'primary',
    size: 'xl',
})
</script>

<template>
    <button
        :class="[
            { 'button--secondary': props.type === 'secondary' },
            `button--${props.size}`,
        ]"
    >
        <slot></slot>
    </button>
</template>

<style scoped>
.button--secondary {
    @apply bg-secondary text-primary border-secondary;
}

.button--secondary:hover {
    @apply border-primary text-primary;
}

.button--sm {
    @apply text-sm p-2;
}

.button--lg {
    @apply text-lg;
}

button {
    @apply text-xl bg-primary text-gray-50 rounded-md p-4 border-primary border-2 transition-all duration-300;
}

button:hover {
    @apply border-secondary text-secondary;
}
</style>
