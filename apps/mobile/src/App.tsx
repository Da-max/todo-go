import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "urql";
import { client } from "./utils/urql";
import { createTheme, ThemeProvider } from "@rneui/themed";
import colors from "@todo-go/colors";
import { Home } from "./views/Home";
import { Index as Auth } from "./views/auth/index";
import { MainHeader } from "./components/Partials/MainHeader";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const theme = createTheme({
    lightColors: {
        primary: colors.primary,
        secondary: colors.secondary,
        error: colors.error,
        success: colors.success,
    },
});

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <ThemeProvider theme={theme}>
                <Provider value={client}>
                    <NavigationContainer>
                        <MainHeader />
                        <Stack.Navigator>
                            <Stack.Screen name={"Home"} component={Home} />
                            <Stack.Screen name={"Auth"} component={Auth} />
                        </Stack.Navigator>
                    </NavigationContainer>
                    <StatusBar />
                </Provider>
            </ThemeProvider>
        </SafeAreaProvider>
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
