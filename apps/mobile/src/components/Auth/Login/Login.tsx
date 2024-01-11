import { View } from "react-native";
import { Card, Text, Button, useTheme } from "@rneui/themed";
import { LoginForm } from "./LoginForm";
import { useLogin } from "../../../hooks/auth/useLogin";

export const Login = () => {
    const { control, login, loginResult, errors } = useLogin();
    const { theme } = useTheme();
    return (
        <Card containerStyle={{ width: "95%" }}>
            <Card.Title h1={true}>Se connecter</Card.Title>
            <Card.Divider />
            <View style={{ gap: 10 }}>
                {loginResult.error?.message ? (
                    <Text style={{ color: theme.colors.error }}>
                        {loginResult.error.message}
                    </Text>
                ) : (
                    ""
                )}
                {loginResult.data?.login?.accessToken ? (
                    <Text style={{ color: theme.colors.error }}>
                        {loginResult.data?.login.accessToken}
                    </Text>
                ) : (
                    ""
                )}
                <LoginForm control={control} onSubmit={login} errors={errors} />
                <Button type={"outline"}>Réinitialiser le mot de passe</Button>
            </View>
        </Card>
    );
};
