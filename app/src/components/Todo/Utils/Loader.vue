<script setup lang="ts">

defineProps<{ display: boolean }>()

</script>

<template>
    <div class="loader" v-show="display"></div>
</template>

<style scoped>
.loader {
    background-image: url("/src/assets/images/loader.svg");
    background-position: 50%;
    background-size: 100px;
    background-repeat: no-repeat;
    height: 100px;
    filter: invert(29%) sepia(91%) saturate(7500%) hue-rotate(359deg)
        brightness(90%) contrast(127%);
}
</style>