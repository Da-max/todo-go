import { Button, Input, Text } from "@rneui/themed";
import { useState } from "react";

export const SignUpForm = () => {
    const [state, setSate] = useState({
        username: "",
        password: "",
        email: "",
        confirmPassword: "",
    });

    const onChangeHandler = (name: keyof typeof state, value: string) => {
        setSate((form) => ({
            ...form,
            [name]: value,
        }));
    };
    return (
        <>
            <Text style={{ marginHorizontal: 10 }}>
                You can create an account with the form downside.
            </Text>
            <Input
                placeholder={"Username"}
                label={"Username"}
                value={state.username}
                onChangeText={(e) => onChangeHandler("username", e)}
            />
            <Input
                placeholder={"Email"}
                label={"Email"}
                value={state.email}
                onChangeText={(e) => onChangeHandler("email", e)}
            />

            <Input
                placeholder={"Password"}
                secureTextEntry={true}
                label={"Password"}
                value={state.password}
                onChangeText={(e) => onChangeHandler("password", e)}
            />
            <Input
                placeholder={"Confirm password"}
                secureTextEntry={true}
                label={"Confirm password"}
                value={state.confirmPassword}
            />
            <Button>SignUp</Button>
        </>
    );
};
