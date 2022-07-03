<script setup lang="ts">
import { storeToRefs } from 'pinia'

import useStore from '../../stores/index'
import useTodoStore from '../../stores/todos'

import Loader from './Utils/Loader.vue'
import TodoItem from './TodoItem.vue'
import TodoInput from './TodoInput.vue'

const mainStore = useStore()
const todoStore = useTodoStore()

const { loading } = storeToRefs(mainStore)
const { todos } = storeToRefs(todoStore)

todoStore.getAll()
</script>

<template>
    <section class="todo">
        <TodoInput />
        <section class="todo__list">
            <Loader
                :display="loading"
                class="todo__list__loader"
            />
            <div v-show="todos && !loading">
                <todo-item
                    v-for="todo in todos"
                    :key="todo.id"
                    :todo="todo"
                />
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
