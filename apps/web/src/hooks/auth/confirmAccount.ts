import { useMutation } from 'villus'
import { useUserStore } from '~/stores/user'
import {
    ConfirmAccountMutation,
    ConfirmAccountMutationVariables,
    confirmAccount as confirmAccountMutation,
} from '@todo-go/core'
import { AlertTypes, ErrorTypes } from '~/types/utils'
import { useUtils } from '../utils'
import { tags as todoTags } from '../todo'
import { tags as authTags } from './index'

export function useConfirmAccount() {
    const { execute: confirmAccountExecute } = useMutation<
        ConfirmAccountMutation,
        ConfirmAccountMutationVariables
    >(confirmAccountMutation, {
        refetchTags: [...todoTags, ...authTags],
    })
    const userStore = useUserStore()
    const { alert, setAlert, error, setError } = useUtils()

    async function confirmAccount(token: string) {
        const { data } = await confirmAccountExecute({ input: { token } })

        if (data && data.confirmAccount.ok) {
            await userStore.getCurrent()
            setAlert(AlertTypes.SUCCESS, 'Votre compte a bien été activé.')
        } else {
            setError(ErrorTypes.VALUE, 'Votre compte n’a pas pu être activé.')
        }
    }

    return {
        confirmAccount,
        alert,
        error,
    }
}
