import { defineStore } from 'pinia'
import { useQuery } from 'villus'
import { currentUser as currentUserMutation } from '../graphql/auth'
import {
    userStoreActions,
    userStoreGetters,
    userStoreState,
    USER_STORE_NAME,
} from '../types/auth'
import { CurrentUserQuery } from '../types/generated'

export const useUserStore = defineStore<
    typeof USER_STORE_NAME,
    userStoreState,
    userStoreGetters,
    userStoreActions
>(USER_STORE_NAME, {
    state: () => ({
        user: undefined,
    }),
    actions: {
        async getCurrent() {
            try {
                const { data } = await useQuery<CurrentUserQuery, {}>({
                    query: currentUserMutation,
                })
                if (data.value) {
                    this.user = data.value.currentUser
                }
            } catch (error) {
                console.log(error)
            }
        },
    },
    getters: {
        isAuthenticated() {
            return !!this.user
        },
    },
})
