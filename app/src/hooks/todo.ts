import { useMutation } from 'villus'
import {
    AddTodoMutation,
    AddTodoMutationVariables,
    NewTodo,
    UpdateTodoMutation,
    UpdateTodoMutationVariables,
} from '../types/generated'
import {
    addTodo as addTodoMutation,
    updateTodo as updateTodoMutation,
} from '../graphql/todos'
import { useUtils } from './utils'
import { useTodoStore } from '../stores/todo'
import { onMounted, ref } from 'vue'

export function useTodo(todoId?: string) {
    const todoStore = useTodoStore()
    const { execute: addTodoExecute } = useMutation<
        AddTodoMutation,
        AddTodoMutationVariables
    >(addTodoMutation)
    const { execute: updateTodoExecute } = useMutation<
        UpdateTodoMutation,
        UpdateTodoMutationVariables
    >(updateTodoMutation)
    const { loading, startLoading, endLoading } = useUtils()

    const newTodo = ref({
        text: '',
        userId: '1',
    } as NewTodo)
    const error = ref<boolean>(false)

    if (todoId) {
        onMounted(() => {
            const findedTodo = todoStore.findById(todoId)

            if (findedTodo) {
                newTodo.value = {
                    text: findedTodo.text,
                    userId: findedTodo.user.id,
                }
            }
        })
    }

    function onInput(e: Event) {
        newTodo.value.text = (e.target as HTMLInputElement).value
        if ((e.target as HTMLInputElement).value === '') {
            error.value = true
        } else {
            error.value = false
        }
    }

    async function addTodo() {
        if (!error.value) {
            startLoading()
            try {
                const { data } = await addTodoExecute({ input: newTodo.value })
                todoStore.$patch((state) =>
                    state.todos.push({ ...data.createTodo })
                )
                newTodo.value.text = ''
            } catch (error) {
                console.log('error', error)
            } finally {
                endLoading()
            }
        }
    }

    async function updateTodo() {
        if (!error.value && todoId) {
            const { data } = await updateTodoExecute({
                input: newTodo.value,
                todoId: todoId,
            })
            todoStore.$patch((state) => {
                state.todos = [
                    ...state.todos.filter(
                        (t) => t.id.toString() !== data.updateTodo.id.toString()
                    ),
                    data.updateTodo,
                ]
            })
        }
    }

    const saveTodo = async (emit: any) => {
        startLoading()
        try {
            if (todoId) {
                await updateTodo()
            } else {
                await addTodo()
            }
            emit('save', true)
        } catch (error) {
            console.log('error', error)
            emit('save', false)
        } finally {
            endLoading()
        }
    }

    return {
        loading,
        addTodo,
        onInput,
        newTodo,
        error,
        updateTodo,
        saveTodo,
    }
}
