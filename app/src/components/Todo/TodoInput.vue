<script setup lang="ts">
import { reactive, defineProps, withDefaults, defineEmits } from 'vue'

import useTodoStore from '../../stores/todos'

import { NewTodo } from '../../types/graphql'
import useNotification from '../../hooks/notification'
import useLoading from '../../hooks/loading'
import useTodo from '../../hooks/todo'

import Loader from './Utils/Loader.vue'

type TodoInputProps = {
    update?: boolean,
    todoId?: string
}

type TodoInputEmit = {
    (e: 'save', done: boolean): void
}

const todoStore = useTodoStore()
let findedTodo

const props = withDefaults(defineProps<TodoInputProps>(), {
    update: false,
    todoId: undefined
})

const emits = defineEmits<TodoInputEmit>()

if (props.todoId) {
    findedTodo = todoStore.todoById(props.todoId)
}

const state = reactive({
    newTodo: props.todoId && findedTodo
        ? {
            text: findedTodo.text,
            userId: findedTodo.user.id
        }
        : {
            text: '',
            userId: '1'
        }as NewTodo,
    error: false
})

const { updateOne, addOne, onDoneSaveTodo, onDoneUpdateMutate } = useTodo()
const { pushNotification } = useNotification()
const { loading, startLoading, endLoading } = useLoading()

const addTodo = function () {
    if (state.newTodo.text === '') {
        state.error = true
        pushNotification('La todo que vous souhaitez ajouter semble vide.')
    } else {
        startLoading()

        if (props.update && props.todoId) {
            updateOne(state.newTodo, props.todoId)
        } else {
            addOne(state.newTodo)
        }
    }
}

onDoneUpdateMutate((res) => {
    state.newTodo.text = ''
    pushNotification('Une todo est été mise à jour !')
    todoStore.$patch((state) => {
        if (res.data) {
            state.todos = [res.data.updateTodo, ...state.todos.filter(t => t.id !== res.data?.updateTodo.id)]
            emits('save', true)
        }
    })
})

onDoneSaveTodo((res) => {
    state.newTodo.text = ''
    pushNotification('Une todo a été ajouté !')
    todoStore.$patch((state) => {
        if (res.data) {
            state.todos = [...state.todos, res.data.createTodo]
            emits('save', true)
        }
    })

    endLoading()
})
</script>

<template>
    <div :class="['todo__input', { 'todo__input--error': state.error }]">
        <button
            class="todo__input__icon"
            @click.prevent="addTodo"
        >
            <FontAwesomeIcon
                v-show="!props.update"
                :icon="['fas', 'plus']"
            />
            <FontAwesomeIcon
                v-show="props.update"
                :icon="['fas', 'pencil']"
            />
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
        <Loader
            class="todo__input__loader"
            :display="loading"
        />
    </div>
</template>

<style scoped>

.todo__input {
    @apply inline relative;
}

.todo__input>input {
    @apply w-7/12 p-2 rounded border-2 border-opacity-0 border-blue-400 transition duration-500 pl-9;
}

.todo__input .todo__input__icon, .todo__input .todo__input__loader {
    @apply absolute top-0 bottom-0 inline-flex justify-center items-center;
}

.todo__input .todo__input__icon {
    @apply pl-2 left-0;
}
.todo__input .todo__input__loader {
    @apply right-1;
}

.todo__input>input:focus {
    @apply border-opacity-100 outline-none;
}

.todo__input__loader {
    @apply w-5 h-5 bg-cover
}

.todo__input--error > input {
    @apply border-red-400 border-opacity-100 outline-none;
}
</style>
