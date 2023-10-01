import { useMutation } from 'villus'
import {
    RemoveTodoMutation,
    RemoveTodoMutationVariables,
} from '../../types/generated'
import { removeTodo as removeTodoMutatation } from '../../graphql/todos'
import { tags } from './index'
import { AlertTypes } from '../../types/utils'
import { useMessageStore } from '../../stores/message'
import { useUtils } from '../utils'

export const useRemoveTodo = () => {
    const { execute } = useMutation<
        RemoveTodoMutation,
        RemoveTodoMutationVariables
    >(removeTodoMutatation, { refetchTags: tags })

    const messageStore = useMessageStore()
    const { loading, startLoading, endLoading } = useUtils()

    const removeTodo = async (todoId: string) => {
        if (todoId) {
            startLoading()
            const { error } = await execute({
                todoId,
            })
            if (error) {
                messageStore.add(
                    `The todo could not be removed : ${error.message}`,
                    AlertTypes.DANGER,
                )
            }
            endLoading()
        }
    }

    return { removeTodo, loading }
}
