import { UserFragment } from './generated'

export const USER_STORE_NAME: 'user' = 'user'

export type userStoreState = {
    user?: UserFragment
}

export type userStoreActions = {
    getCurrent: () => Promise<void>
}

export type userStoreGetters = {
    isAuthenticated: () => boolean
}

export type LoginFields = {
    username: string
    password: string
}
