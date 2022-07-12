<template>
    <div class="loader" />
</template>

<style scoped>
.loader {
    @apply bg-no-repeat;
    background-image: url('/src/assets/images/loader.svg');
    background-position: 50%;
    filter: invert(29%) sepia(91%) saturate(7500%) hue-rotate(359deg)
        brightness(90%) contrast(127%);
}
</style>
