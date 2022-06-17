<script setup lang="ts">
import Todo from './components/Todo/Todo.vue'

</script>

<template>
    <h1 class="app__title">
        Todo List
    </h1>
    <main class="app__container">
        <Todo />
    </main>
</template>

<style>

.app__container {
  @apply flex justify-center;
}

.app__container > * {
  @apply min-w-[33%];
}

.app__title {
  @apply text-5xl text-center m-10;
}
</style>
