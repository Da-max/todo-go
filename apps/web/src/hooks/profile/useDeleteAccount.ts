import { useMutation } from 'villus'
import { deleteAccount } from '~/graphql/auth'
import {
    DeleteAccountMutation,
    DeleteAccountMutationVariables,
} from '~/types/generated'
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
