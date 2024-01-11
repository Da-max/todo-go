import { useForm } from "react-hook-form";
import {
    NewUser,
    NewUserSchema,
    signUp as signUpMutation,
    SignUpMutation,
    SignUpMutationVariables,
} from "@todo-go/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "urql";

export const useSignUp = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<NewUser>({
        resolver: zodResolver(NewUserSchema()),
    });
    const [signUpResult, signUpMutationExec] = useMutation<
        SignUpMutation,
        SignUpMutationVariables
    >(signUpMutation);
    const signUp = handleSubmit((data: NewUser) => {
        signUpMutationExec({ input: data });
    });

    return {
        control,
        signUp,
        signUpResult,
        errors,
    };
};
