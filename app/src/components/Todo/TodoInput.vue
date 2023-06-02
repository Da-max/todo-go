<script setup lang="ts">
import { useTodo } from '../../hooks/todo'
import Loader from '../Utils/Loader.vue'
import FormInput from '../Utils/Form/FormInput.vue'
import { TodoInputEmit } from '../../types/todo'

type TodoInputProps = {
    update: boolean
    todoId?: string
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
        <div :class="['inline relative', { 'todo__input--error': error }]">
            <button
                class="pl-4 left-0 absolute top-0 bottom-0 inline-flex justify-center items-center text-primary"
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
            <FormInput
                id="text"
                :value="newTodo.text"
                type="text"
                :label="false"
                :error="error"
                class-input="md:w-7/12 w-full p-2 pl-14 focus:border-opacity-100 focus:outline-none"
                @input="onInput"
                @focusout="error = false"
                @keypress.enter="saveTodo(emit)"
            />
            <Loader
                v-show="loading"
                class="w-5 h-5 bg-cover right-1 absolute top-0 bottom-0 inline-flex justify-center items-center text-primary"
            />
        </div>
    </article>
</template>
