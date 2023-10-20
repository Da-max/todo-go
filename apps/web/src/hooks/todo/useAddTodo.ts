import { useMutation } from 'villus'
import {
    AddTodoMutation,
    AddTodoMutationVariables,
    NewTodo,
    addTodo as addTodoMutation,
} from '@todo-go/core'
import { tags } from './index'
import { useUtils } from '../utils'
import { AlertTypes } from '~/types/utils'
import { Ref } from 'vue'
import { useMessageStore } from '~/stores/message'

export const useAddTodo = () => {
    const { loading, startLoading, endLoading } = useUtils()
    const messageStore = useMessageStore()

    const { execute } = useMutation<AddTodoMutation, AddTodoMutationVariables>(
        addTodoMutation,
        {
            refetchTags: tags,
        },
    )

    const addTodo = async (newTodo: Ref<NewTodo>): Promise<boolean> => {
        startLoading()
        const { error } = await execute({
            input: newTodo.value,
        })
        if (error) {
            messageStore.add(
                `The todo could not be added : ${error.message}`,
                AlertTypes.DANGER,
            )
        } else {
            newTodo.value.text = ''
        }
        endLoading()
        return !!error?.message
    }

    return {
        loading,
        addTodo,
    }
}
