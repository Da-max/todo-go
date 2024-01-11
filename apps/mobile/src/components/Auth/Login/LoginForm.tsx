import { Button, Input, Text } from "@rneui/themed";
import { Identifier } from "@todo-go/core";
import { Controller, FieldErrors, Control } from "react-hook-form";

export type LoginFormProps = {
    onSubmit: (data: Identifier) => void;
    errors: FieldErrors<Identifier>;
    control: Control<Identifier>;
};

export const LoginForm = ({ control, onSubmit, errors }: LoginFormProps) => {
    return (
        <>
            <Text style={{ marginHorizontal: 10 }}>
                Pour avoir accès au service TodoGo vous devez d’abord vous
                connecter.
            </Text>
            <Controller
                control={control}
                render={({ field: { onChange } }) => (
                    <Input
                        placeholder={"Nom d’utilisateur"}
                        label={"Nom d’utilisateur"}
                        errorMessage={errors.username?.message}
                        onChangeText={onChange}
                    />
                )}
                name={"username"}
            />
            <Controller
                control={control}
                render={({ field: { onChange } }) => (
                    <Input
                        placeholder={"Mot de passe"}
                        secureTextEntry={true}
                        label={"Mot de passe"}
                        errorMessage={errors.password?.message}
                        onChangeText={onChange}
                    />
                )}
                name={"password"}
            />
            <Button onPress={onSubmit} title={"Se connecter"} />
        </>
    );
};
