import { useMutation } from "villus";
import {
    RequestConfirmAccountMutation,
    RequestConfirmAccountMutationVariables,
} from "@todo-go/core";
import { useUtils } from "../utils";
import { useToast } from "flowbite-vue";
import { ErrorTypes } from "~/types/utils";
import { requestConfirmAccount as requestConfirmAccountMutation } from "@todo-go/core";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

export const useRequestConfirmAccount = () => {
    const { execute: requestConfirmAccountExecute } = useMutation<
        RequestConfirmAccountMutation,
        RequestConfirmAccountMutationVariables
    >(requestConfirmAccountMutation, {
        onData: () => {
            add({
                time: 50_000,
                text: "Un email contenant un lien pour activer votre compte va vous être envoyé.",
                type: "success",
            });
        },
        onError(err) {
            setError(ErrorTypes.NETWORK, err.message);
        },
    });
    const { error, setError } = useUtils();
    const { add } = useToast();

    const requestConfirmAccount = async () => {
        await requestConfirmAccountExecute();
    };

    return {
        error,
        requestConfirmAccount,
    };
};
