import { useMutation } from 'villus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
    SignUpMutation,
    SignUpMutationVariables,
    signUp as signUpMutation,
} from '@todo-go/core'
import { SignUpFields } from '~/types/auth'
import { ErrorTypes } from '~/types/utils'
import { useForm } from '../form'
import { useUtils } from '../utils'

export function useSignUp() {
    const fields = ref<SignUpFields>({
        email: '',
        password: '',
        username: '',
        confirmPassword: '',
    })
    const { error, setError } = useUtils()
    const { execute: signupMutation } = useMutation<
        SignUpMutation,
        SignUpMutationVariables
    >(signUpMutation)
    const { onInput } = useForm<SignUpFields>(fields)

    async function signUp() {
        if (
            fields.value.email &&
            fields.value.username &&
            fields.value.password &&
            fields.value.password === fields.value.confirmPassword
        ) {
            try {
                error.value = null
                const { data } = await signupMutation({
                    input: {
                        username: fields.value.username,
                        email: fields.value.email,
                        password: fields.value.password,
                    },
                })
                if (data) {
                    useRouter().push({ name: 'login' })
                } else {
                    setError(
                        ErrorTypes.VALUE,
                        'Une erreur est survenue, merci de réessayer.',
                    )
                }
            } catch (error) {}
        } else {
            setError(
                ErrorTypes.FILL,
                `Merci de vérifier que vous avez remplis tout les champs 
                        et que les deux mots de passe sont identiques.`,
            )
        }
    }

    return {
        error,
        fields,
        signUp,
        onInput,
    }
}
