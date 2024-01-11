import { useQuery } from "urql";
import { currentUser, CurrentUserQuery } from "@todo-go/core";
import { useUserStore } from "../../stores/user";

export const useAuth = () => {
    const userStore = useUserStore();
    const [currentUserResult, currentUserExec] = useQuery<CurrentUserQuery>({
        query: currentUser,
        pause: true,
    });
    const getCurrent = async () => {
        currentUserExec();
        userStore.setUser(currentUserResult.data?.currentUser ?? null);
        return currentUserResult;
    };

    return {
        getCurrent,
        user: userStore.user,
    };
};
