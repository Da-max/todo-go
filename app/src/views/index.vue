<script lang="ts" setup>
import Navbar from '../components/Partials/Navbar.vue'
import Todo from '../components/Todo/Todo.vue'
</script>

<template>
    <div class="root">
        <Navbar />
        <Todo />
        <RouterView />
    </div>
</template>
