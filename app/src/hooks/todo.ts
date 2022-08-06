import { useMutation } from 'villus'
import {
    AddTodoMutation,
    AddTodoMutationVariables,
    MarkDoneTodoMutation,
    MarkDoneTodoMutationVariables,
    MarkUndoneTodoMutation,
    MarkUndoneTodoMutationVariables,
    NewTodo,
    RemoveTodoMutation,
    RemoveTodoMutationVariables,
    TodoFragment,
    UpdateTodoMutation,
    UpdateTodoMutationVariables,
} from '../types/generated'
import {
    addTodo as addTodoMutation,
    updateTodo as updateTodoMutation,
    removeTodo as removeTodoMutatation,
    markDoneTodo as markDoneTodoMutation,
    markUndoneTodo as markUndoneTodoMutation,
} from '../graphql/todos'
import { useUtils } from './utils'
import { useTodoStore } from '../stores/todo'
import { onMounted, ref } from 'vue'
import { todoStoreState } from '../types/todo'

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
    const { execute: removeTodoExecute } = useMutation<
        RemoveTodoMutation,
        RemoveTodoMutationVariables
    >(removeTodoMutatation)
    const { execute: markDoneTodoExecute } = useMutation<
        MarkDoneTodoMutation,
        MarkDoneTodoMutationVariables
    >(markDoneTodoMutation)
    const { execute: markUndoneTodoExecute } = useMutation<
        MarkUndoneTodoMutation,
        MarkUndoneTodoMutationVariables
    >(markUndoneTodoMutation)
    const { loading, startLoading, endLoading } = useUtils()

    const newTodo = ref<NewTodo>({
        text: '',
    })
    const error = ref<boolean>(false)

    if (todoId) {
        onMounted(() => {
            const findedTodo: TodoFragment | undefined =
                todoStore.findById(todoId)

            if (findedTodo) {
                newTodo.value = {
                    text: findedTodo.text,
                }
            }
        })
    }

    function checkTodo() {
        if (!newTodo.value.text) {
            error.value = true
        } else {
            error.value = false
        }
    }

    function onInput(e: Event) {
        newTodo.value.text = (e.target as HTMLInputElement).value
        checkTodo()
    }

    async function addTodo() {
        if (!error.value) {
            startLoading()
            try {
                const { data } = await addTodoExecute({ input: newTodo.value })
                todoStore.$patch((state) =>
                    state.todos.unshift({ ...data.createTodo })
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
            try {
                const { data } = await updateTodoExecute({
                    input: newTodo.value,
                    todoId: todoId,
                })
                todoStore.$patch((state) => {
                    state.todos = [
                        data.updateTodo,
                        ...state.todos.filter(
                            (t) => t.id !== data.updateTodo.id
                        ),
                    ]
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    async function saveTodo(emit: any) {
        checkTodo()
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

    async function removeTodo() {
        if (todoId) {
            startLoading()
            try {
                const { data } = await removeTodoExecute({
                    todoId,
                })
                todoStore.$patch((state: todoStoreState) => {
                    state.todos = state.todos.filter(
                        (todo: TodoFragment) => todo.id !== data.removeTodo
                    )
                })
            } catch (error) {
                console.log(error)
            } finally {
                endLoading()
            }
        }
    }

    async function markDoneTodo() {
        if (todoId) {
            startLoading()
            try {
                const { data } = await markDoneTodoExecute({ todoId })
                todoStore.$patch((state: todoStoreState) => {
                    state.todos = [
                        ...state.todos.filter(
                            (todo: TodoFragment) =>
                                todo.id !== data.markDoneTodo.id && !todo.done
                        ),
                        data.markDoneTodo,
                        ...state.todos.filter(
                            (todo: TodoFragment) => todo.done
                        ),
                    ]
                })
            } catch (error) {
                console.log(error)
            } finally {
                endLoading()
            }
        }
    }

    async function markUndoneTodo() {
        if (todoId) {
            startLoading()
            try {
                const { data } = await markUndoneTodoExecute({
                    todoId,
                })
                todoStore.$patch((state: todoStoreState) => {
                    state.todos = [
                        data.markUndoneTodo,
                        ...state.todos.filter(
                            (todo: TodoFragment) =>
                                todo.id !== data.markUndoneTodo.id
                        ),
                    ]
                })
            } catch (error) {
                console.log(error)
            } finally {
                endLoading()
            }
        }
    }

    return {
        loading,
        markDoneTodo,
        markUndoneTodo,
        addTodo,
        onInput,
        newTodo,
        error,
        updateTodo,
        saveTodo,
        removeTodo,
    }
}
