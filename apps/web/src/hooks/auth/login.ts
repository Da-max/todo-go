import { useMutation } from 'villus'
import { ref } from 'vue'
import { LoginFields } from '~/types/auth'
import { LoginMutation, LoginMutationVariables } from '~/types/generated'
import { loginMutation } from '~/graphql/auth'
import { ErrorTypes } from '~/types/utils'
import auth from '../../utils/auth'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'
import { useUtils } from '../utils'
import { useForm } from '../form'
import { tags as profileTags } from '../profile'
import { tags as todoTags } from '../todo'
import { whenever } from '@vueuse/core'

export function useLogin() {
    const fields = ref<LoginFields>({
        username: '',
        password: '',
    })
    const { error, setError } = useUtils()
    const userStore = useUserStore()
    const router = useRouter()

    whenever(
        () => userStore.isAuthenticated,
        async () => {
            await router.push({ name: 'home' })
        },
    )

    const { execute: loginExecute } = useMutation<
        LoginMutation,
        LoginMutationVariables
    >(loginMutation, {
        onData: async (data) => {
            auth.token = data.login.accessToken
        },
        onError: (error) => {
            setError(ErrorTypes.VALUE, error.message)
        },
        refetchTags: [...todoTags, ...profileTags],
    })
    const { onInput } = useForm<LoginFields>(fields)

    async function login() {
        if (fields.value.password && fields.value.username) {
            error.value = null
            await loginExecute({
                input: fields.value,
            })
        } else {
            setError(
                ErrorTypes.FILL,
                'Merci de vérifier que vous avez remplis tous les champs.',
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
