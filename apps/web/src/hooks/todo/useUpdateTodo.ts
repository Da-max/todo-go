import { useMutation } from 'villus'
import {
    NewTodo,
    UpdateTodoMutation,
    UpdateTodoMutationVariables,
} from '~/types/generated'
import { updateTodo as updateTodoMutation } from '../../graphql/todos'
import { tags } from './index'
import { AlertTypes } from '~/types/utils'
import { Ref } from 'vue'
import { useMessageStore } from '~/stores/message'
import { useUtils } from '../utils'

export const useUpdateTodo = () => {
    const { execute } = useMutation<
        UpdateTodoMutation,
        UpdateTodoMutationVariables
    >(updateTodoMutation, { refetchTags: tags })
    const messageStore = useMessageStore()
    const { loading, startLoading, endLoading } = useUtils()

    const updateTodo = async (
        newTodo: Ref<NewTodo>,
        todoId: string,
    ): Promise<boolean> => {
        startLoading()
        const { error } = await execute({
            input: newTodo.value,
            todoId: todoId,
        })
        if (error) {
            messageStore.add(
                `The todo could not be updated : ${error.message}`,
                AlertTypes.DANGER,
            )
        }
        endLoading()
        return !error?.message
    }

    return {
        updateTodo,
        loading,
    }
}
