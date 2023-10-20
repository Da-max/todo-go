import { defineStore } from 'pinia'
import { Client, getActiveClient, useQuery } from 'villus'
import { currentUser as currentUserMutation } from '@todo-go/core'
import {
    userStoreActions,
    userStoreGetters,
    userStoreState,
    USER_STORE_NAME,
} from '~/types/auth'
import { CurrentUserQuery, CurrentUserQueryVariables } from '@todo-go/core'
import auth from '~/utils/auth'
import { tags as profileTags } from '~/hooks/profile'
import { tags as todoTags } from '~/hooks/todo'
import { cachePlugin } from '~/utils/client'

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
            await useQuery<CurrentUserQuery, CurrentUserQueryVariables>({
                query: currentUserMutation,
                tags: [...profileTags, 'users'],
                onData: (data) => {
                    this.user = data.currentUser
                },
            })
        },
        async disconnect() {
            const client: Client = getActiveClient()
            this.user = undefined
            auth.token = null
            cachePlugin.clearCache()
            await client.refetchTaggedQueries(todoTags)
        },
    },
    getters: {
        isAuthenticated() {
            return !!this.user
        },
        isActive() {
            return !this.user?.isActive
        },
    },
})
