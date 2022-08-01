<script setup lang="ts">
import Todo from './components/Todo/Todo.vue'
import Navbar from './components/Partials/Navbar.vue';
</script>

<template>
    <div>
        <Navbar />
        <Todo />
        <RouterView />
    </div>
</template>
