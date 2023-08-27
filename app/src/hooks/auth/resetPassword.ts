import { computed, MaybeRef, ref, toValue } from 'vue'
import { ResetPasswordFields } from '../../types/auth'
import { useUtils } from '../utils'
import { useToast } from 'flowbite-vue'
import { useMutation } from 'villus'
import {
    ResetPasswordMutation,
    ResetPasswordMutationVariables,
} from '../../types/generated'
import { resetPassword } from '../../graphql/auth'
import { ErrorTypes } from '../../types/utils'

export const useResetPassword = () => {
    const fields = ref<ResetPasswordFields>({
        password: '',
        confirmPassword: '',
    })
    const { execute } = useMutation<
        ResetPasswordMutation,
        ResetPasswordMutationVariables
    >(resetPassword)

    const { error, setError } = useUtils()
    const { add } = useToast()
    const isValidValue = ref<boolean>(false)
    const isValid = computed<boolean>({
        get: () =>
            isValidValue.value &&
            !!(fields.value.password && fields.value.confirmPassword),
        set: (newValue) => {
            isValidValue.value = newValue
        },
    })

    const sendResetPassword = async (token: MaybeRef<string>) => {
        const t = toValue(token)
        if (isValid.value && t) {
            const { data, error: mutationError } = await execute({
                input: {
                    password: fields.value.password,
                    token: t,
                },
            })
            if (data?.resetPassword.ok) {
                add({
                    time: 50_000,
                    type: 'success',
                    text: 'Votre mot de passe a bien été mis à jour.',
                })
            } else if (mutationError) {
                setError(ErrorTypes.NETWORK, mutationError.message)
            }
        } else {
            setError(
                ErrorTypes.FILL,
                'Merci de vérifier que les deux mots de passe sont bien égaux.',
            )
        }
    }

    return {
        sendResetPassword,
        isValid,
        error,
        fields,
    }
}
