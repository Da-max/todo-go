import { useMutation } from 'villus'
import {
    MarkDoneTodoMutation,
    MarkDoneTodoMutationVariables,
} from '../../types/generated'
import { markDoneTodo as markDoneTodoMutation } from '../../graphql/todos'
import { tags } from './index'
import { AlertTypes } from '../../types/utils'
import { useUtils } from '../utils'
import { useMessageStore } from '../../stores/message'

export const useMarkDoneTodo = () => {
    const { execute } = useMutation<
        MarkDoneTodoMutation,
        MarkDoneTodoMutationVariables
    >(markDoneTodoMutation, { refetchTags: tags })
    const { loading, startLoading, endLoading } = useUtils()
    const messageStore = useMessageStore()

    const markDoneTodo = async (todoId: string) => {
        startLoading()
        const { error } = await execute({ todoId })
        if (error) {
            messageStore.add(
                `The todo could not be marked done : ${error.message}`,
                AlertTypes.DANGER,
            )
        }
        endLoading()
    }

    return {
        loading,
        markDoneTodo,
    }
}
