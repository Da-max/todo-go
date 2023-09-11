import {
    ChangePassword,
    ChangePasswordMutation,
    ChangePasswordMutationVariables,
} from '~/types/generated'
import { computed, ref } from 'vue'
import { useMutation } from 'villus'
import { useUtils } from '~/hooks/utils'
import { ErrorTypes } from '~/types/utils'
import { changePassword as changePasswordMutation } from '~/graphql/auth'

export const useChangePassword = (options?: {
    onData: (data: ChangePasswordMutation) => void
}) => {
    const fields = ref<ChangePassword>({
        oldPassword: '',
        password: '',
        confirmPassword: '',
    })
    const { execute } = useMutation<
        ChangePasswordMutation,
        ChangePasswordMutationVariables
    >(changePasswordMutation, {
        onData: options?.onData,
        onError: (err) => {
            setError(ErrorTypes.NETWORK, err.toString())
        },
    })
    const { error, setError } = useUtils()
    const isValidValue = ref<boolean>(true)
    const isValid = computed({
        get: () =>
            isValidValue.value &&
            !!(
                fields.value.password &&
                fields.value.confirmPassword &&
                fields.value.oldPassword
            ) &&
            fields.value.password === fields.value.confirmPassword,
        set: (newValue) => {
            isValidValue.value = newValue
        },
    })

    const changePassword = async () => {
        if (isValid.value) {
            await execute({ input: fields.value })
        } else {
            setError(
                ErrorTypes.FILL,
                'Merci de vérifier que vous avez remplis tous les champs.',
            )
        }
    }

    return {
        error,
        changePassword,
        fields,
        isValid,
    }
}
