import { useMutation } from 'villus'
import { ref } from 'vue'
import { LoginFields } from '../../types/auth'
import { LoginMutation, LoginMutationVariables } from '../../types/generated'
import { loginMutation } from '../../graphql/auth'
import { Error, ErrorTypes } from '../../types/utils'
import auth from '../../utils/auth'
import { useUserStore } from '../../stores/user'
import { useRoute, useRouter } from 'vue-router'

export function useLogin() {
    const fields = ref<LoginFields>({
        username: '',
        password: '',
    })
    const error = ref<Error | null>(null)
    const userStore = useUserStore()
    const { execute: loginExecute } = useMutation<
        LoginMutation,
        LoginMutationVariables
    >(loginMutation)

    async function login() {
        if (fields.value.password && fields.value.username) {
            try {
                error.value = null
                const { data } = await loginExecute({
                    input: fields.value,
                })
                if (data) {
                    auth.token = data.login.accessToken
                    await userStore.getCurrent()
                    if (useUserStore().isAuthenticated) {
                        useRouter().push({ name: 'home' })
                    }
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
