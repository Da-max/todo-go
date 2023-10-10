import { Card } from "@rneui/themed";
import { View } from "react-native";
import { SignUpForm } from "./SignUpForm";

export const SignUp = () => {
    return (
        <Card>
            <Card.Title h1={true}>SignUp</Card.Title>
            <Card.Divider />
            <View style={{ gap: 10 }}>
                <SignUpForm />
            </View>
        </Card>
    );
};
