import { View } from "react-native";
import { Card } from "@rneui/themed";
import { LoginForm } from "./LoginForm";

export const Login = () => {
    return (
        <Card containerStyle={{ width: "95%" }}>
            <Card.Title h1={true}>Login</Card.Title>
            <Card.Divider />
            <View style={{ gap: 10 }}>
                <LoginForm />
            </View>
        </Card>
    );
};
