<script setup lang="ts">
import Loader from '../Utils/Loader.vue'
import { Button } from 'flowbite-vue'
import { logicOr } from '@vueuse/math'
import { ref } from 'vue'
import { useAddTodo } from '../../hooks/todo/useAddTodo'
import { useUpdateTodo } from '../../hooks/todo/useUpdateTodo'
import { useFindTodoById } from '../../hooks/todo/useFindTodoById'
import { TodoInputEmit } from '../../types/todo'
import { whenever } from '@vueuse/core'
import FormInput from '../Utils/Form/FormInput.vue'
import { NewTodo } from '@todo-go/core'

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

const error = ref<boolean>(false)

const checkTodo = () => {
    error.value = !newTodo.value.text
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
        <div @keyup.enter="saveTodo">
            <FormInput
                v-model="newTodo.text"
                v-model:error="error"
                size="lg"
                placeholder="Votre future todo"
            >
                <template #suffix>
                    <Button
                        square
                        outline
                        :color="error ? 'red' : 'blue'"
                        @click.prevent="saveTodo"
                    >
                        <FontAwesomeIcon
                            v-show="!props.update"
                            :icon="['fas', 'plus']"
                        />
                        <FontAwesomeIcon
                            v-show="props.update"
                            :icon="['fas', 'pencil']"
                        />
                    </Button>
                </template>
            </FormInput>
            <Loader
                v-show="loading"
                class="w-5 h-5 bg-cover right-1 absolute top-0 bottom-0 inline-flex justify-center items-center text-primary"
            />
        </div>
    </article>
</template>
