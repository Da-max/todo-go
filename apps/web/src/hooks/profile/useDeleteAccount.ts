import { useMutation } from 'villus'
import { deleteAccount } from '@todo-go/core'
import {
    DeleteAccountMutation,
    DeleteAccountMutationVariables,
} from '@todo-go/core'
import { useUtils } from '~/hooks/utils'
import { ErrorTypes } from '~/types/utils'

export const useDeleteAccount = (options?: {
    onData: (data: DeleteAccountMutation) => void
}) => {
    const { error, setError } = useUtils()
    const { execute } = useMutation<
        DeleteAccountMutation,
        DeleteAccountMutationVariables
    >(deleteAccount, {
        onData: options?.onData,
        onError: (err) => {
            setError(ErrorTypes.NETWORK, err.toString())
        },
    })

    return {
        error,
        execute,
    }
}
