import { useMutation } from "villus";
import { ref } from "vue";
import { LoginFields } from "~/types/auth";
import {
    IdentifierSchema,
    LoginMutation,
    LoginMutationVariables,
} from "@todo-go/core";
import { loginMutation } from "@todo-go/core";
import { ErrorTypes } from "~/types/utils";
import auth from "../../utils/auth";
import { useUserStore } from "~/stores/user";
import { useRouter } from "vue-router";
import { useUtils } from "../utils";
import { tags as profileTags } from "../profile";
import { tags as todoTags } from "../todo";
import { whenever } from "@vueuse/core";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

export function useLogin() {
    const fields = ref<LoginFields>({
        username: "",
        password: "",
    });
    const { error, setError } = useUtils();
    const userStore = useUserStore();
    const router = useRouter();
    const { handleSubmit, errors } = useForm({
        validationSchema: toTypedSchema(IdentifierSchema()),
    });

    whenever(
        () => userStore.isAuthenticated,
        async () => {
            await router.push({ name: "home" });
        },
    );

    const { execute: loginExecute } = useMutation<
        LoginMutation,
        LoginMutationVariables
    >(loginMutation, {
        onData: async (data) => {
            auth.token = data.login.accessToken;
        },
        onError: (error) => {
            setError(ErrorTypes.VALUE, error.message);
        },
        refetchTags: [...todoTags, ...profileTags],
    });

    const login = handleSubmit(async () => {
        await loginExecute({
            input: fields.value,
        });
    });

    return {
        fields,
        login,
        error,
        errors,
    };
}
