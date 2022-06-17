<script setup lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable';
import { reactive, ref } from 'vue';

import { NewTodo, Todo, useAddTodoMutation, useAllTodosQuery } from '../../types/graphql';

import Loader from "./Utils/Loader.vue"
import TodoItem from './TodoItem.vue';
import useNotification from '../../hooks/notification'

const { result, loading, refetch } = useAllTodosQuery()
const { pushNotification } = useNotification()

const todos = useResult(result, [])

const newTodo = reactive({
    text: "",
    userId: "1"
}) as NewTodo

const { mutate: saveTodo, onDone: onDoneSaveTodo } = useAddTodoMutation({})

const addTodo = function () {
    if (newTodo.text === "") {
        pushNotification("La todo que vous souhaitez ajouter semble vide !")
    } else {
        saveTodo({ input: newTodo })
        pushNotification("Une todo a été ajouté !")
    }
}

onDoneSaveTodo(result => {
    newTodo.text = ''
    refetch()
})
</script>

<template>
    <section class="todo">
        <div class="todo__input">
            <button class="todo__input__icon" @click.prevent="addTodo">
                <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
            <input
                type="text"
                name="todo"
                id="todo"
                v-model="newTodo.text"
                @keypress.enter="addTodo"
                placeholder="Your futur todo"
            />
        </div>
        <section class="todo__list">
            <Loader v-if="loading" :display="loading" />
            <div v-else-if="result?.todos">
                <todo-item :todo="todo" v-for="todo in todos" :key="todo.id" />
            </div>
        </section>
    </section>
</template>

<style scoped>
.todo {
    @apply bg-gray-100 w-4/12 m-auto rounded-md p-10 text-center;
}

.todo__input {
    @apply inline relative;
}

.todo__list {
    @apply mt-10;
}

.todo__input > input {
    @apply w-7/12 p-2 rounded border-2 border-opacity-0 border-blue-400 transition duration-500 pl-9;
}

.todo__input .todo__input__icon {
    @apply absolute top-0 left-0 bottom-0 pl-2 inline-flex justify-center items-center;
}

.todo__input > input:focus {
    @apply border-opacity-100 outline-none;
}
</style>