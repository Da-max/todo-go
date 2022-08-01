<script lang="ts" setup>
import NavbarUser from './NavbarUser.vue';

</script>

<template>
    <nav class="navbar">
        <div>
            <h1 class="navbar__title">📄 Todo App</h1>
        </div>
        <NavbarUser />
    </nav>
</template>

<style scoped>
.navbar {
    @apply p-5 bg-primary drop-shadow-lg flex justify-between align-middle;
}

.navbar__title {
    @apply text-3xl text-white;
}
</style>