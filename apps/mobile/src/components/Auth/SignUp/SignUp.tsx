import { Card, Text } from "@rneui/themed";
import { View } from "react-native";
import { SignUpForm } from "./SignUpForm";
import { useSignUp } from "../../../hooks/auth/useSignUp";

export const SignUp = () => {
    const { control, signUp, errors } = useSignUp();
    return (
        <Card>
            <Card.Title h1={true}>Créer un compte</Card.Title>
            <Card.Divider />
            <View style={{ gap: 10 }}>
                {errors.root?.message ? (
                    <Text>{errors.root.message} yoyoyoy</Text>
                ) : (
                    ""
                )}
                <SignUpForm
                    control={control}
                    onSubmit={signUp}
                    errors={errors}
                />
            </View>
        </Card>
    );
};
