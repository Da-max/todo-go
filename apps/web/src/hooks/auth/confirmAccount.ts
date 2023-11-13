import { useMutation } from "villus";
import { useUserStore } from "~/stores/user";
import {
    ConfirmAccountMutation,
    ConfirmAccountMutationVariables,
    confirmAccount as confirmAccountMutation,
} from "@todo-go/core";
import { AlertTypes, ErrorTypes } from "~/types/utils";
import { useUtils } from "../utils";
import { tags as todoTags } from "../todo";
import { tags as authTags } from "./index";

export function useConfirmAccount() {
    const { execute: confirmAccountExecute } = useMutation<
        ConfirmAccountMutation,
        ConfirmAccountMutationVariables
    >(confirmAccountMutation, {
        refetchTags: [...todoTags, ...authTags],
        onData: async () => {
            await userStore.getCurrent();
            setAlert(AlertTypes.SUCCESS, "Votre compte a bien été activé.");
        },
        onError: () => {
            setError(ErrorTypes.VALUE, "Votre compte n’a pas pu être activé.");
        },
    });
    const userStore = useUserStore();
    const { alert, setAlert, error, setError } = useUtils();

    const confirmAccount = async (token: string) => {
        await confirmAccountExecute({ input: { token } });
    };

    return {
        confirmAccount,
        alert,
        error,
    };
}
