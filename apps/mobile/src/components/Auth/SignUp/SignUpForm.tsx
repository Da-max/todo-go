import { Button, Input, Text } from "@rneui/themed";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { NewUser } from "@todo-go/core";

export type SignUpProps = {
    control: Control<NewUser>;
    onSubmit: () => void;
    errors: FieldErrors<NewUser>;
};

export const SignUpForm = ({ control, onSubmit, errors }: SignUpProps) => {
    return (
        <>
            <Text style={{ marginHorizontal: 10 }}>
                Vous pouvez créer un compte avec le formulaire ci-dessous.
            </Text>
            <Controller
                control={control}
                render={({ field: { onChange } }) => (
                    <Input
                        placeholder={"Nom d’utilisateur"}
                        label={"Nom d’utilisateur"}
                        onChangeText={onChange}
                        errorMessage={errors.username?.message}
                    />
                )}
                name={"username"}
            />
            <Controller
                control={control}
                render={({ field: { onChange } }) => (
                    <Input
                        placeholder={"Email"}
                        label={"Email"}
                        autoComplete={"email"}
                        inputMode={"email"}
                        onChangeText={onChange}
                        errorMessage={errors.email?.message}
                    />
                )}
                name={"email"}
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
            <Controller
                control={control}
                render={({ field: { onChange } }) => (
                    <Input
                        placeholder={"Confirmer le mot de passe"}
                        secureTextEntry={true}
                        label={"Confirmer le mot de passe"}
                        onChangeText={onChange}
                    />
                )}
                name={"confirmPassword"}
            />
            <Button onPress={onSubmit} title={"Créer le compte"} />
        </>
    );
};
