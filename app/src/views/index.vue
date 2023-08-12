<script lang="ts" setup>
import Todo from '../components/Todo/Todo.vue'
</script>

<template>
    <div class="flex flex-col">
        <Todo />
        <RouterView />
    </div>
</template>
