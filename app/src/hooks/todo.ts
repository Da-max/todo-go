import { useMutation, useQuery } from '@vue/apollo-composable'
import { AllTodosDocument, RemoveTodoDocument, TodoFragment } from '../types/graphql'

export default function () {
    const { mutate: removeMutate, onDone: onDoneMutate } = useMutation(RemoveTodoDocument)

    const getAll = function () {
        let todos: TodoFragment[] = []

        const { onResult, refetch, loading } = useQuery(AllTodosDocument)
        onResult((result) => {
            todos = result.data.todos
        })

        return {
            todos,
            loading,
            refetch,
            onResult
        }
    }

    const removeOne = function (todoId: string) {
        const result = removeMutate({
            todoId
        })

        return {
            result,
            onDoneMutate
        }
    }

    return { getAll, removeOne }
}
