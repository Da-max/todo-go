import { useMutation } from 'villus'
import {
    RequestConfirmAccountMutation,
    RequestConfirmAccountMutationVariables,
} from '../../types/generated'
import { useUtils } from '../utils'
import { useToast } from 'flowbite-vue'
import { ErrorTypes } from '../../types/utils'
import { requestConfirmAccount as requestConfirmAccountMutation } from '../../graphql/auth'

export const useRequestConfirmAccount = () => {
    const { execute: requestConfirmAccountExecute } = useMutation<
        RequestConfirmAccountMutation,
        RequestConfirmAccountMutationVariables
    >(requestConfirmAccountMutation)
    const { error, setError } = useUtils()
    const { add } = useToast()

    const requestConfirmAccount = async () => {
        const { data, error: mutationError } =
            await requestConfirmAccountExecute()

        if (data && data.requestConfirmAccount.ok) {
            add({
                time: 50_000,
                text: 'Un email contenant un lien pour activer votre compte va vous être envoyé.',
                type: 'success',
            })
        } else if (mutationError) {
            setError(ErrorTypes.NETWORK, mutationError.message)
        }
    }

    return {
        error,
        requestConfirmAccount,
    }
}
