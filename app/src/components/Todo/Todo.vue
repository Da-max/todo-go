<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useTodoStore } from '../../stores/todo'
import TodoInput from './TodoInput.vue'
import Loader from '../Utils/Loader.vue'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)

const loading = ref<boolean>(true)

onMounted(() => {
    todoStore.getAll().then(() => {
        loading.value = false
    })
})
</script>

<template>
    <section class="todo">
        <TodoInput :update="false" />
        <section class="todo__list">
            <Loader class="todo__list__loader" v-show="loading" />
            <div>
                <div v-for="todo in todos" :key="todo.id">
                    <TodoItem :todo="todo" />
                </div>
            </div>
        </section>
    </section>
</template>

<style scoped>
.todo {
    @apply bg-gray-100 rounded-md p-10 text-center;
}

.todo__list {
    @apply mt-10;
}

.todo__list__loader {
    @apply w-full h-24;
}
</style>
