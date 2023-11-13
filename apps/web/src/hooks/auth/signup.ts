import { CombinedError, useMutation } from "villus";
import { ref } from "vue";
import {
    signUp as signUpMutation,
    SignUpMutation,
    SignUpMutationVariables,
} from "@todo-go/core";
import { SignUpFields } from "~/types/auth";
import { ErrorTypes } from "~/types/utils";
import { useUtils } from "../utils";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { NewUserSchema } from "@todo-go/core/src";

export function useSignUp(
    options?: Partial<{
        onData: (data: SignUpMutation) => void;
        onError: (err: CombinedError) => void;
    }>,
) {
    const fields = ref<SignUpFields>({
        email: "",
        password: "",
        username: "",
        confirmPassword: "",
    });
    const { error, setError } = useUtils();
    const { execute: signupMutation } = useMutation<
        SignUpMutation,
        SignUpMutationVariables
    >(signUpMutation, {
        ...options,
        onError: (err) => {
            setError(
                ErrorTypes.VALUE,
                "Une erreur est survenue, merci de réessayer.",
            );
            options?.onError ? options.onError(err) : "";
        },
    });
    const { handleSubmit, errors } = useForm({
        validationSchema: toTypedSchema(NewUserSchema()),
    });

    const signUp = handleSubmit(async () => {
        const { data } = await signupMutation({
            input: {
                username: fields.value.username,
                email: fields.value.email,
                password: fields.value.password,
            },
        });
    });

    return {
        error,
        errors,
        fields,
        signUp,
    };
}
