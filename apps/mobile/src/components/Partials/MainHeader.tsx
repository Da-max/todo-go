import { Header, Icon } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { useAuth } from "../../hooks/auth/useAuth";
import { useEffect } from "react";

export const MainHeader = () => {
    const { getCurrent } = useAuth();
    useEffect(() => {
        getCurrent().then((r) => {
            console.log(r);
        });
    }, []);

    return (
        <Header
            rightComponent={<Icon name={"user"} type={"font-awesome-5"} />}
            centerComponent={{ text: "TodoGO", style: style.heading }}
        />
    );
};

const style = StyleSheet.create({
    heading: {
        color: "white",
        fontSize: 25,
    },
});
