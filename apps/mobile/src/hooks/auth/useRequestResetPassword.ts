import { useForm } from "react-hook-form";
import {
    RequestPasswordResetIdentifier,
    RequestPasswordResetIdentifierSchema,
    requestResetPassword,
    RequestResetPasswordMutation,
    RequestResetPasswordMutationVariables,
} from "@todo-go/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "urql";

export const useRequestResetPassword = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<RequestPasswordResetIdentifier>({
        resolver: zodResolver(RequestPasswordResetIdentifierSchema()),
    });
    const [requestResetResult, requestResetMutation] = useMutation<
        RequestResetPasswordMutation,
        RequestResetPasswordMutationVariables
    >(requestResetPassword);
    const resetPassword = handleSubmit(
        (data: RequestPasswordResetIdentifier) => {
            requestResetMutation({ input: data });
        },
    );

    return {
        requestResetResult,
        errors,
        control,
        resetPassword,
    };
};
