<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ display: boolean }>()

</script>

<template>
    <div
        v-show="display"
        class="loader"
    />
</template>

<style scoped>
.loader {
    background-image: url("/src/assets/images/loader.svg");
    background-position: 50%;
    background-repeat: no-repeat;
    filter: invert(29%) sepia(91%) saturate(7500%) hue-rotate(359deg)
        brightness(90%) contrast(127%);
}
</style>
