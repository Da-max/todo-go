import { useMutation } from 'villus'
import { confirmAccount as confirmAccountMutation } from '../../graphql/auth'
import { useUserStore } from '../../stores/user'
import {
    ConfirmAccountMutation,
    ConfirmAccountMutationVariables,
} from '../../types/generated'
import { AlertTypes, ErrorTypes } from '../../types/utils'
import auth from '../../utils/auth'
import { useUtils } from '../utils'

export function useConfirmAccount() {
    const { execute: confirmAccountExecute } = useMutation<
        ConfirmAccountMutation,
        ConfirmAccountMutationVariables
    >(confirmAccountMutation)
    const userStore = useUserStore()
    const { alert, setAlert, error, setError } = useUtils()

    async function confirmAccount(token: string) {
        try {
            const { data } = await confirmAccountExecute({ input: { token } })

            if (data && data.confirmAccount.ok) {
                auth.token = data.confirmAccount.token
                await userStore.getCurrent()
                setAlert(AlertTypes.SUCCESS, 'Votre compte a bien été activé.')
            } else {
                setError(
                    ErrorTypes.VALUE,
                    'Votre compte n’a pas pu être activé.'
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        confirmAccount,
        alert,
        error,
    }
}
