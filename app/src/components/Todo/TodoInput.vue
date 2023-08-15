<script setup lang="ts">
import Loader from '../Utils/Loader.vue'
import FormInput from '../Utils/Form/FormInput.vue'
import { logicOr } from '@vueuse/math'
import { ref } from 'vue'
import { NewTodo } from '../../types/generated'
import { useForm } from '../../hooks/form'
import { useAddTodo } from '../../hooks/todo/useAddTodo'
import { useUpdateTodo } from '../../hooks/todo/useUpdateTodo'
import { useFindTodoById } from '../../hooks/todo/useFindTodoById'
import { TodoInputEmit } from '../../types/todo'
import { whenever } from '@vueuse/core'

type TodoInputProps = {
    update: boolean
    todoId?: string
}

const emit = defineEmits<TodoInputEmit>()

const props = withDefaults(defineProps<TodoInputProps>(), {
    update: false,
    todoId: undefined,
})

const newTodo = ref<NewTodo>({
    text: '',
})

const currentTodo = useFindTodoById(props.todoId)

whenever(currentTodo, () => {
    if (props.todoId && currentTodo.value?.text) {
        newTodo.value.text = currentTodo.value.text
    }
})

const { addTodo, loading: addTodoLoading } = useAddTodo()
const { updateTodo, loading: updateTodoLoading } = useUpdateTodo()
const loading = logicOr(addTodoLoading, updateTodoLoading)

const { onInput: onInputForm } = useForm<NewTodo>(newTodo)
const error = ref<boolean>(false)

const checkTodo = () => {
    error.value = !newTodo.value.text
}

const onInput = (name: keyof NewTodo, e: Event) => {
    onInputForm(name, e)
    checkTodo()
}

const saveTodo = async () => {
    checkTodo()
    if (!error.value) {
        if (props.todoId) {
            emit('save', await updateTodo(newTodo, props.todoId))
        } else {
            emit('save', await addTodo(newTodo))
        }
    }
}
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
                @keydown.enter="saveTodo"
            />
            <Loader
                v-show="loading"
                class="w-5 h-5 bg-cover right-1 absolute top-0 bottom-0 inline-flex justify-center items-center text-primary"
            />
        </div>
    </article>
</template>
