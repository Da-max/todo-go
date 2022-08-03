import { useMutation } from 'villus'
import { ref } from 'vue'
import { LoginFields } from '../../types/auth'
import { LoginMutation, LoginMutationVariables } from '../../types/generated'
import { loginMutation } from '../../graphql/auth'
import { MaybeRef, useLocalStorage } from '@vueuse/core'
import { Error, ErrorTypes } from '../../types/utils'

export function useLogin() {
    const fields = ref<LoginFields>({
        username: '',
        password: '',
    })
    const error = ref<Error | null>(null)
    const { execute: loginExecute } = useMutation<
        LoginMutation,
        LoginMutationVariables
    >(loginMutation)

    function setToken(token: MaybeRef<string>) {
        useLocalStorage('token', token)
    }

    async function login() {
        if (fields.value.password && fields.value.username) {
            try {
                error.value = null
                const { data } = await loginExecute({
                    input: fields.value,
                })
                if (data) {
                    setToken(data.login.accessToken)
                } else {
                    error.value = {
                        type: ErrorTypes.VALUE,
                        text: 'Le nom d’utilisateur ou le mot de passe est incorrect.',
                    }
                }
            } catch (e) {}
        } else {
            error.value = {
                type: ErrorTypes.FILL,
                text: 'Merci de vérifier que vous avez remplis tous les champs.',
            }
        }
    }

    return {
        fields,
        login,
        error,
    }
}
