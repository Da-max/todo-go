<script setup lang="ts">
import Todo from "./components/Todo/Todo.vue"

</script>

<template>
  <h1 class="app__title">Todo List</h1>
  <Todo />
</template>

<style>
.app__title {
  @apply text-5xl text-center m-10;
}
</style>
