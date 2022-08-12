import { useMutation } from 'villus'
import { ref } from 'vue'
import { LoginFields } from '../../types/auth'
import { LoginMutation, LoginMutationVariables } from '../../types/generated'
import { loginMutation } from '../../graphql/auth'
import { ErrorTypes } from '../../types/utils'
import auth from '../../utils/auth'
import { useUserStore } from '../../stores/user'
import { useRouter } from 'vue-router'
import { useUtils } from '../utils'
import { useForm } from '../form'

export function useLogin() {
    const fields = ref<LoginFields>({
        username: '',
        password: '',
    })
    const { error, setError } = useUtils()
    const userStore = useUserStore()
    const { execute: loginExecute } = useMutation<
        LoginMutation,
        LoginMutationVariables
    >(loginMutation)
    const { onInput } = useForm<LoginFields>(fields)

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
                    setError(
                        ErrorTypes.VALUE,
                        'Le nom d’utilisateur ou le mot de passe est incorrect.'
                    )
                }
            } catch (e) {}
        } else {
            setError(
                ErrorTypes.FILL,
                'Merci de vérifier que vous avez remplis tous les champs.'
            )
        }
    }

    return {
        fields,
        login,
        error,
        onInput,
    }
}
