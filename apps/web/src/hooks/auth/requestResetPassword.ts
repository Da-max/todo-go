import { ref } from 'vue'
import { useMutation } from 'villus'
import {
    RequestResetPasswordMutation,
    RequestResetPasswordMutationVariables,
} from '@todo-go/core'
import { useUtils } from '../utils'
import { ErrorTypes } from '../../types/utils'
import { useToast } from 'flowbite-vue'
import { requestResetPassword } from '@todo-go/core'

export const useRequestResetPassword = () => {
    const email = ref<string>('')
    const { error, setError } = useUtils()
    const { add } = useToast()

    const sendRequestEmail = async () => {
        if (email.value) {
            error.value = null
            const { data, error: mutationError } = await execute({
                input: {
                    email: email.value,
                },
            })

            if (data && data.requestResetPassword.ok) {
                email.value = ''
                add({
                    time: 50000,
                    type: 'success',
                    text: 'Si vous avez un compte, un mail va vous être envoyé afin de réinitialiser votre mot de passe.',
                })
                return data.requestResetPassword.ok
            } else if (mutationError) {
                setError(ErrorTypes.OTHER, mutationError.message)
            }
        } else {
            setError(
                ErrorTypes.FILL,
                'Merci de vérifier que le champs est bien rempli.',
            )
        }
    }

    const { execute } = useMutation<
        RequestResetPasswordMutation,
        RequestResetPasswordMutationVariables
    >(requestResetPassword)

    return {
        email,
        sendRequestEmail,
        error,
    }
}
