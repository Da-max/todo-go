import { AuthConfig, AuthUtilities } from "@urql/exchange-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tokenKey = "token";

const initAuthState = async () => {
    const token = AsyncStorage.getItem(tokenKey);
    return {
        token,
    };
};

export const authExchanceFunc = async (
    utils: AuthUtilities,
): Promise<AuthConfig> => {
    const { token } = await initAuthState();
    return {
        addAuthToOperation(operation) {
            if (!token) {
                return operation;
            }

            return utils.appendHeaders(operation, {
                Authorization: `BEARER ${token}`,
            });
        },
        didAuthError(error) {
            return error.response.status === 401;
        },
        async refreshAuth() {
            console.log("refresh…");
        },
    };
};
