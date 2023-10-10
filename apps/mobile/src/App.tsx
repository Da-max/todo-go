import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NativeRouter } from "react-router-native";
import { Auth } from "./Components/Auth/Auth";

export default function App() {
    return (
        <NativeRouter>
            <View style={styles.container}>
                <Auth />
                <StatusBar style="auto" />
            </View>
        </NativeRouter>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
