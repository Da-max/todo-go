<template>
    <div class="min-h-screen flex flex-col">
        <Navbar />
        <RouterView class="flex-1" />
    </div>
</template>
<script setup lang="ts">
import Navbar from './components/Partials/Navbar.vue'
</script>
