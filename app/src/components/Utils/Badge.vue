<script setup lang="ts">
type Props = {
    type: 'primary' | 'secondary'
}

defineProps<Props>()
</script>

<template>
    <span :class="[`bg-${type}`, 'rounded px-4 py-2']"><slot></slot></span>
</template>
