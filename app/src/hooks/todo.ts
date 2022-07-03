import { ref, Ref } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { AddTodoDocument, AllTodosDocument, NewTodo, RemoveTodoDocument, TodoFragment, UpdateTodoDocument } from '../types/graphql'

export default function () {
    const { mutate: removeMutate, onDone: onDoneRemoveMutate, loading: removeLoading } = useMutation(RemoveTodoDocument)
    const { mutate: updateMutate, onDone: onDoneUpdateMutate, loading: updateLoading } = useMutation(UpdateTodoDocument)
    const { mutate: saveTodo, onDone: onDoneSaveTodo } = useMutation(AddTodoDocument)

    const getAll = function () {
        const todos: Ref<TodoFragment[]> = ref([])

        const { onResult, refetch, loading } = useQuery(AllTodosDocument)
        onResult((result) => {
            todos.value = result.data.todos
        })

        return {
            todos,
            loading,
            refetch,
            onResult
        }
    }

    const addOne = function (todo: NewTodo) {
        const result = saveTodo({ input: todo })
        return result
    }

    const removeOne = function (todoId: string) {
        const result = removeMutate({
            todoId
        })

        return result
    }

    const updateOne = function (todo: NewTodo, todoId: string) {
        const result = updateMutate({
            input: todo,
            todoId
        })

        return result
    }

    return {
        getAll,
        addOne,
        removeOne,
        updateOne,
        onDoneRemoveMutate,
        onDoneUpdateMutate,
        onDoneSaveTodo,
        removeLoading,
        updateLoading
    }
}
