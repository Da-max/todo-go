import { useAuth } from "./useAuth";

export const useUser = () => {
    const { user } = useAuth();

    if (!user) {
        throw new Error("The user must be logged");
    }

    return {
        user,
    };
};
