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
    <section class="flex-1 flex justify-center bg-gray-100 rounded-md p-10">
        <div class="sm:w-2/3">
            <TodoInput :update="false" />
            <section class="mt-10">
                <Loader v-show="loading" class="w-full h-24" />
                <div>
                    <div v-for="todo in todos" :key="todo.id">
                        <TodoItem :todo="todo" />
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>
