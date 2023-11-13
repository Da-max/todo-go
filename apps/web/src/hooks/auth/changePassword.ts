import {
    ChangePassword,
    ChangePasswordMutation,
    ChangePasswordMutationVariables,
    changePassword as changePasswordMutation,
    ChangePasswordSchema,
} from "@todo-go/core";
import { ref } from "vue";
import { CombinedError, useMutation } from "villus";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

export const useChangePassword = (
    options?: Partial<{
        onData: (data: ChangePasswordMutation) => void;
        onError: (error: CombinedError) => void;
    }>,
) => {
    const fields = ref<ChangePassword>({
        oldPassword: "",
        password: "",
        confirmPassword: "",
    });
    const { execute } = useMutation<
        ChangePasswordMutation,
        ChangePasswordMutationVariables
    >(changePasswordMutation, {
        onData: options?.onData,
        onError: options?.onError,
    });
    const { handleSubmit, errors } = useForm({
        validationSchema: toTypedSchema(ChangePasswordSchema()),
    });

    const changePassword = handleSubmit(async () => {
        await execute({ input: fields.value });
    });

    return {
        changePassword,
        fields,
        errors,
    };
};
