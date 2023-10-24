import { CombinedError, useMutation } from "villus";
import { ref } from "vue";
import {
    signUp as signUpMutation,
    SignUpMutation,
    SignUpMutationVariables,
} from "@todo-go/core";
import { SignUpFields } from "~/types/auth";
import { ErrorTypes } from "~/types/utils";
import { useForm } from "../form";
import { useUtils } from "../utils";

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

    async function signUp() {
        if (
            fields.value.email &&
            fields.value.username &&
            fields.value.password &&
            fields.value.password === fields.value.confirmPassword
        ) {
            error.value = null;
            const { data } = await signupMutation({
                input: {
                    username: fields.value.username,
                    email: fields.value.email,
                    password: fields.value.password,
                },
            });
        } else {
            setError(
                ErrorTypes.FILL,
                `Merci de vérifier que vous avez remplis tout les champs 
                        et que les deux mots de passe sont identiques.`,
            );
        }
    }

    return {
        error,
        fields,
        signUp,
    };
}
