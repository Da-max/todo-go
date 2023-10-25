import {
    ChangePassword,
    ChangePasswordMutation,
    ChangePasswordMutationVariables,
    changePassword as changePasswordMutation,
} from "@todo-go/core";
import { ref } from "vue";
import { CombinedError, useMutation } from "villus";

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

    const changePassword = async () => {
        await execute({ input: fields.value });
    };

    return {
        changePassword,
        fields,
    };
};
