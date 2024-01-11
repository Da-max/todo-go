import {
    Identifier,
    IdentifierSchema,
    LoginMutation,
    LoginMutationVariables,
} from "@todo-go/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "urql";
import { loginMutation } from "@todo-go/core/src";

export const useLogin = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<Identifier>({
        resolver: zodResolver(IdentifierSchema()),
    });

    const [loginResult, loginMutationExec] = useMutation<
        LoginMutation,
        LoginMutationVariables
    >(loginMutation);
    const login = handleSubmit((data: Identifier) => {
        loginMutationExec({ input: data });
    });

    return {
        login,
        errors,
        loginResult,
        control,
    };
};
