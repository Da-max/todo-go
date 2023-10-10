import { Button, Input, Text } from "@rneui/themed";

export const LoginForm = () => {
    return (
        <>
            <Text style={{ marginHorizontal: 10 }}>
                To get access to the TodoGO you must be logged
            </Text>
            <Input placeholder={"Username"} />
            <Input placeholder={"Password"} secureTextEntry={true} />
            <Button>Login</Button>
            <Button type={"outline"}>Reset Password</Button>
        </>
    );
};
