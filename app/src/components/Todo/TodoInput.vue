<script setup lang="ts">
import { reactive } from 'vue'
import { useMutation } from '@vue/apollo-composable'

import useTodoStore from '../../stores/todos'

import { NewTodo, AddTodoDocument } from '../../types/graphql'
import useNotification from '../../hooks/notification'

const todoStore = useTodoStore()

const state = reactive({
    newTodo: {
        text: '',
        userId: '1'
    }as NewTodo,
    error: false
})

const { mutate: saveTodo, onDone: onDoneSaveTodo } = useMutation(AddTodoDocument)
const { pushNotification } = useNotification()

const addTodo = function () {
    if (state.newTodo.text === '') {
        state.error = true
        pushNotification('La todo que vous souhaitez ajouter semble vide.')
    } else {
        saveTodo({ input: state.newTodo })
        pushNotification('Une todo a été ajouté !')
    }
}

onDoneSaveTodo(() => {
    state.newTodo.text = ''
    todoStore.getAll()
})
</script>

<template>
    <div :class="['todo__input', { 'todo__input--error': state.error }]">
        <button
            class="todo__input__icon"
            @click.prevent="addTodo"
        >
            <FontAwesomeIcon :icon="['fas', 'plus']" />
        </button>
        <input
            id="todo"
            v-model="state.newTodo.text"
            type="text"
            name="todo"
            placeholder="Your futur todo"
            @keypress.enter="addTodo"
            @input="state.error = false"
        >
    </div>
</template>

<style scoped>

.todo__input {
    @apply inline relative;
}

.todo__input>input {
    @apply w-7/12 p-2 rounded border-2 border-opacity-0 border-blue-400 transition duration-500 pl-9;
}

.todo__input .todo__input__icon {
    @apply absolute top-0 left-0 bottom-0 pl-2 inline-flex justify-center items-center;
}

.todo__input>input:focus {
    @apply border-opacity-100 outline-none;
}

.todo__input--error > input {
    @apply border-red-400 border-opacity-100 outline-none;
}
</style>
