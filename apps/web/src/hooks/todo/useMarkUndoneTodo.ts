import { useMutation } from 'villus'
import {
    MarkUndoneTodoMutation,
    MarkUndoneTodoMutationVariables,
} from '@todo-go/core'
import { markUndoneTodo as markUndoneTodoMutation } from '@todo-go/core'
import { tags } from './index'
import { useUtils } from '../utils'
import { useMessageStore } from '../../stores/message'
import { AlertTypes } from '../../types/utils'

export const useMarkUndoneTodo = () => {
    const { execute } = useMutation<
        MarkUndoneTodoMutation,
        MarkUndoneTodoMutationVariables
    >(markUndoneTodoMutation, { refetchTags: tags })
    const { loading, startLoading, endLoading } = useUtils()
    const messageStore = useMessageStore()

    const markUndoneTodo = async (todoId: string) => {
        startLoading()
        const { error } = await execute({ todoId })
        if (error) {
            messageStore.add(
                `The todo could not be marked undone : ${error.message}`,
                AlertTypes.DANGER,
            )
        }
        endLoading()
    }

    return {
        markUndoneTodo,
        loading,
    }
}
