import { Control, Controller, FieldErrors } from "react-hook-form";
import { RequestPasswordResetIdentifier } from "@todo-go/core";
import { Input } from "@rneui/themed";

export type ResetPasswordFormProps = {
    control: Control<RequestPasswordResetIdentifier>;
    errors: FieldErrors<RequestPasswordResetIdentifier>;
};

export const RequestResetPasswordForm = ({
    control,
    errors,
}: ResetPasswordFormProps) => {
    return (
        <>
            <Controller
                control={control}
                render={({ field: { onChange } }) => (
                    <Input
                        placeholder={"Votre email"}
                        label={"Votre email"}
                        onChangeText={onChange}
                        errorMessage={errors.email?.message}
                    />
                )}
                name={"email"}
            />
        </>
    );
};
