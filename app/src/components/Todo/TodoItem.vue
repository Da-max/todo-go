<script setup lang="ts">
import { defineProps, reactive } from 'vue'
import { TodoFragment } from '../../types/graphql'
import useTodoStore from '../../stores/todos'
import useTodo from '../../hooks/todo'
import useLoading from '../../hooks/loading'
import Loader from './Utils/Loader.vue'
import TodoInput from './TodoInput.vue'

const props = defineProps<{ todo: TodoFragment }>()
const state = reactive({
    edit: false
})

const todoStore = useTodoStore()
const { loading, startLoading, endLoading } = useLoading()
const { removeOne, onDoneRemoveMutate } = useTodo()

const toggleEdit = function () {
    state.edit = !state.edit
}

const remove = async function () {
    startLoading()
    removeOne(props.todo.id)
    onDoneRemoveMutate((res) => {
        todoStore.$patch((state) => {
            if (res.data) {
                state.todos = [...state.todos.filter((todo) => todo.id !== res.data?.removeTodo)]
            } else if (res.errors) {
                console.log(res.errors)
            }
            endLoading()
        })
    })
}

</script>

<template>
    <article
        v-if="!state.edit"
        class="todo__item"
    >
        <h2
            class="todo__item__title"
            @dblclick="toggleEdit"
        >
            {{ todo.text }}
        </h2>
        <Loader
            class="todo__item__loader"
            :display="loading"
        />
        <button
            v-show="!loading"
            class="todo__item__remove"
            @click.prevent="remove"
        >
            <FontAwesomeIcon :icon="['fas', 'close']" />
        </button>
        <button
            v-show="!loading"
            class="todo__item__update"
            @click.prevent="toggleEdit"
        >
            <FontAwesomeIcon
                :icon="['fas', 'pencil']"
                class="fa-xs"
            />
        </button>
    </article>
    <TodoInput
        v-else
        :update="true"
        :todo-id="props.todo.id.toString()"
        @keyup.escape="toggleEdit"
        @save="toggleEdit"
    />
</template>

<style scoped>
.todo__item {
    @apply flex justify-center;
}

.todo__item:hover .todo__item__remove,
.todo__item:hover .todo__item__update {
    @apply opacity-100 text-gray-600;
}

.todo__item__remove,
.todo__item__update,
.todo__item__loader {
    @apply ml-5;
}

.todo__item__remove,
.todo__item__update {
    @apply opacity-0 transition-all duration-500;
}

.todo__item__loader {
    @apply h-4 w-4 bg-cover;
}
</style>
