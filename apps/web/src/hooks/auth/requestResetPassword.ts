import { ref } from "vue";
import { useMutation } from "villus";
import {
    RequestPasswordResetIdentifier,
    RequestPasswordResetIdentifierSchema,
    RequestResetPasswordMutation,
    RequestResetPasswordMutationVariables,
} from "@todo-go/core";
import { useUtils } from "../utils";
import { ErrorTypes } from "~/types/utils";
import { useToast } from "flowbite-vue";
import { requestResetPassword } from "@todo-go/core";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

export const useRequestResetPassword = () => {
    const values = ref<RequestPasswordResetIdentifier>({ email: "" });
    const { error, setError } = useUtils();
    const { add } = useToast();
    const { execute } = useMutation<
        RequestResetPasswordMutation,
        RequestResetPasswordMutationVariables
    >(requestResetPassword, {
        onData(data) {
            values.value.email = "";
            add({
                time: 50000,
                type: "success",
                text: "Si vous avez un compte, un mail va vous être envoyé afin de réinitialiser votre mot de passe.",
            });
        },
        onError(err) {
            setError(ErrorTypes.OTHER, err.message);
        },
    });
    const { handleSubmit, errors } = useForm({
        validationSchema: toTypedSchema(RequestPasswordResetIdentifierSchema()),
    });

    const sendRequestEmail = handleSubmit(async () => {
        await execute({
            input: {
                email: values.value.email,
            },
        });
    });

    return {
        values,
        sendRequestEmail,
        error,
        errors,
    };
};
