import { MaybeRef, ref, toValue } from "vue";
import { ResetPasswordFields } from "~/types/auth";
import { useUtils } from "../utils";
import { useToast } from "flowbite-vue";
import { useMutation } from "villus";
import {
    ResetPasswordIdentifierSchema,
    ResetPasswordMutation,
    ResetPasswordMutationVariables,
} from "@todo-go/core";
import { resetPassword } from "@todo-go/core";
import { ErrorTypes } from "~/types/utils";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

export const useResetPassword = (token: MaybeRef<string>) => {
    const fields = ref<ResetPasswordFields>({
        password: "",
        confirmPassword: "",
    });
    const { execute } = useMutation<
        ResetPasswordMutation,
        ResetPasswordMutationVariables
    >(resetPassword, {
        onData(data) {
            add({
                time: 50_000,
                type: "success",
                text: "Votre mot de passe a bien été mis à jour.",
            });
        },
        onError(err) {
            setError(ErrorTypes.NETWORK, err.message);
        },
    });
    const { handleSubmit, errors } = useForm({
        validationSchema: toTypedSchema(ResetPasswordIdentifierSchema()),
    });

    const { error, setError } = useUtils();
    const { add } = useToast();

    const sendResetPassword = handleSubmit(async () => {
        await execute({
            input: {
                password: fields.value.password,
                token: toValue(token),
            },
        });
    });

    return {
        sendResetPassword,
        errors,
        error,
        fields,
    };
};
