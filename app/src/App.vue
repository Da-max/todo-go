<script setup lang="ts">
import Todo from './components/Todo/Todo.vue'
import Navbar from './components/Partials/Navbar.vue'
</script>

<template>
    <div class="root">
        <Navbar />
        <Todo />
        <RouterView />
    </div>
</template>

<style>
.root {
    @apply flex flex-col;
}
</style>
