<script setup lang="ts">
import { useTodo } from '../../hooks/todo'
import Loader from '../Utils/Loader.vue'
import FormInput from '../Utils/Form/FormInput.vue'

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
            <FormInput
                :value="newTodo.text"
                id="text"
                type="text"
                :label="false"
                @input="onInput"
                @focusout="error = false"
                @keypress.enter="saveTodo(emit)"
            />
            <Loader class="todo__input__loader" v-show="loading" />
        </div>
    </article>
</template>

<style scoped>
.todo__input {
    @apply inline relative;
}

.todo__input input {
    @apply md:w-7/12 w-full p-2 pl-14;
}

.todo__input .todo__input__icon,
.todo__input .todo__input__loader {
    @apply absolute top-0 bottom-0 inline-flex justify-center items-center text-primary;
}

.todo__input .todo__input__icon {
    @apply pl-4 left-0;
}

.todo__input .todo__input__loader {
    @apply right-1;
}

.todo__input input:focus {
    @apply border-opacity-100 outline-none;
}

.todo__input__loader {
    @apply w-5 h-5 bg-cover;
}

.todo__input--error input {
    @apply border-red-400 border-opacity-100 outline-none;
}
</style>
