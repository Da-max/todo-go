import { ref } from 'vue'
import {
    UpdateAccountMutation,
    UpdateAccountMutationVariables,
    UpdateUser,
} from '@todo-go/core'
import { useUtils } from '~/hooks/utils'
import { useMutation } from 'villus'
import { updateAccount as updateAccountMutation } from '@todo-go/core'
import { tags } from '~/hooks/profile'
import { ErrorTypes } from '~/types/utils'
import { useToast } from 'flowbite-vue'

export const useUpdateAccount = (opts?: {
    onData?: (data: UpdateAccountMutation) => void
}) => {
    const input = ref<UpdateUser>({})
    const { add } = useToast()

    const { loading, startLoading, endLoading, error, setError } = useUtils()
    const { execute } = useMutation<
        UpdateAccountMutation,
        UpdateAccountMutationVariables
    >(updateAccountMutation, {
        refetchTags: tags,
        onError: (error) => {
            setError(ErrorTypes.NETWORK, error.toString())
        },
        onData: (data: UpdateAccountMutation) => {
            if (opts?.onData) {
                opts.onData(data)
            }
            add({
                time: 5_000,
                type: 'success',
                text: 'Votre compte a bien été mis à jour !',
            })
        },
    })

    const updateAccount = async () => {
        startLoading()
        await execute({ input: input.value })
        endLoading()
    }

    return {
        loading,
        error,
        updateAccount,
        input,
    }
}
