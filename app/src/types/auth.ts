import { NewUser, UserFragment } from './generated'

export const USER_STORE_NAME = 'user' as const

export type userStoreState = {
    user: UserFragment | undefined
}

export type userStoreActions = {
    getCurrent: () => Promise<void>
    disconnect: () => void
}

export type userStoreGetters = {
    isAuthenticated: () => boolean
    isActive: () => boolean
}

export type LoginFields = {
    username: string
    password: string
}

export type SignUpFields = {
    confirmPassword: string
} & NewUser

export type ResetPasswordFields = {
    password: string
    confirmPassword: string
}
