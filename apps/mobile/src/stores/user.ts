import { create } from "zustand";
import { UserFragment } from "@todo-go/core";

type UserState = {
    user: UserFragment | undefined | null;
};

type UserAction = {
    setUser: (user: UserFragment | null) => void;
};

export const useUserStore = create<UserState & UserAction>((set) => ({
    user: undefined,
    setUser: (user: UserFragment | null) => {
        set(() => ({ user }));
    },
}));
