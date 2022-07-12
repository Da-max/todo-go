<script setup lang="ts">
import { useTodo } from '../../hooks/todo'
import Loader from '../Utils/Loader.vue'

type TodoInputProps = {
    update: boolean
    todoId?: string
}

type TodoInputEmit = {
    (e: 'save', done: boolean): void
}

const props = withDefaults(defineProps<TodoInputProps>(), {
    update: false,
    todoId: undefined,
})
const emit = defineEmits<TodoInputEmit>()

const { onInput, newTodo, error, loading, saveTodo } = useTodo(props.todoId)
</script>

<template>
    <article>
        <div :class="['todo__input', { 'todo__input--error': error }]">
            <button class="todo__input__icon">
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
                :value="newTodo.text"
                type="text"
                name="todo"
                id="todo"
                @keypress.enter="saveTodo(emit)"
                @input="onInput"
                @focusout="error = false"
            />
            <Loader class="todo__input__loader" v-show="loading" />
        </div>
    </article>
</template>

<style scoped>
.todo__input {
    @apply inline relative;
}

.todo__input > input {
    @apply w-7/12 p-2 rounded border-2 border-opacity-0 border-blue-400 transition duration-500 pl-9;
}

.todo__input .todo__input__icon,
.todo__input .todo__input__loader {
    @apply absolute top-0 bottom-0 inline-flex justify-center items-center;
}

.todo__input .todo__input__icon {
    @apply pl-2 left-0;
}
.todo__input .todo__input__loader {
    @apply right-1;
}

.todo__input > input:focus {
    @apply border-opacity-100 outline-none;
}

.todo__input__loader {
    @apply w-5 h-5 bg-cover;
}

.todo__input--error > input {
    @apply border-red-400 border-opacity-100 outline-none;
}
</style>
