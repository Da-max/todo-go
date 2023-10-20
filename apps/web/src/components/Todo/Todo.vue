<script setup lang="ts">
import TodoInput from './TodoInput.vue'
import Loader from '../Utils/Loader.vue'
import TodoItem from './TodoItem.vue'
import { useAllTodos } from '~/hooks/todo/useAllTodos'
import { computed } from 'vue'

const { data, isFetching } = useAllTodos()

const todos = computed(() =>
    data.value?.todos
        ? [...data.value.todos].sort((a, b) => parseInt(b.id) - parseInt(a.id))
        : [],
)
</script>

<template>
    <section class="flex-1 flex justify-center rounded-md p-10">
        <div
            v-if="isFetching"
            class="fixed bottom-5 right-10 flex items-center"
        >
            <p>Chargement en cours</p>
            <Loader />
        </div>
        <div class="sm:w-2/3">
            <TodoInput :update="false" />
            <section class="mt-10">
                <div v-if="todos">
                    <div v-for="todo in todos" :key="todo.id">
                        <TodoItem :todo="todo" />
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>
