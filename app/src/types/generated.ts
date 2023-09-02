export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
}

export type Confirm = {
    __typename?: 'Confirm'
    ok: Scalars['Boolean']
    token: Scalars['String']
}

export type ConfirmIdentifier = {
    token: Scalars['String']
}

export type Identifier = {
    password: Scalars['String']
    username: Scalars['String']
}

export type Mutation = {
    __typename?: 'Mutation'
    confirmAccount: Confirm
    createTodo: Todo
    login: Tokens
    markDoneTodo: Todo
    markUndoneTodo: Todo
    removeTodo: Scalars['ID']
    requestConfirmAccount: RequestConfirmAccount
    requestResetPassword: RequestResetPassword
    resetPassword: Confirm
    signUp: User
    updateTodo: Todo
}

export type MutationConfirmAccountArgs = {
    input?: InputMaybe<ConfirmIdentifier>
}

export type MutationCreateTodoArgs = {
    input: NewTodo
}

export type MutationLoginArgs = {
    input: Identifier
}

export type MutationMarkDoneTodoArgs = {
    todoId: Scalars['ID']
}

export type MutationMarkUndoneTodoArgs = {
    todoId: Scalars['ID']
}

export type MutationRemoveTodoArgs = {
    todoId: Scalars['ID']
}

export type MutationRequestResetPasswordArgs = {
    input: RequestPasswordResetIdentifier
}

export type MutationResetPasswordArgs = {
    input: ResetPasswordIdentifier
}

export type MutationSignUpArgs = {
    input: NewUser
}

export type MutationUpdateTodoArgs = {
    input: NewTodo
    todoId: Scalars['ID']
}

export type NewTodo = {
    text: Scalars['String']
}

export type NewUser = {
    email: Scalars['String']
    password: Scalars['String']
    username: Scalars['String']
}

export type Query = {
    __typename?: 'Query'
    currentUser: User
    todos: Array<Todo>
    users: Array<User>
}

export type RequestConfirmAccount = {
    __typename?: 'RequestConfirmAccount'
    ok: Scalars['Boolean']
}

export type RequestPasswordResetIdentifier = {
    email: Scalars['String']
}

export type RequestResetPassword = {
    __typename?: 'RequestResetPassword'
    ok: Scalars['Boolean']
}

export type ResetPasswordIdentifier = {
    password: Scalars['String']
    token: Scalars['String']
}

export type Todo = {
    __typename?: 'Todo'
    done: Scalars['Boolean']
    id: Scalars['ID']
    text: Scalars['String']
    user: User
}

export type Tokens = {
    __typename?: 'Tokens'
    accessToken: Scalars['String']
    refreshToken: Scalars['String']
}

export type User = {
    __typename?: 'User'
    email: Scalars['String']
    id: Scalars['ID']
    isActive: Scalars['Boolean']
    isAdmin: Scalars['Boolean']
    password: Scalars['String']
    username: Scalars['String']
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
    __typename?: 'Query'
    currentUser: {
        __typename?: 'User'
        id: string
        username: string
        isAdmin: boolean
        email: string
        isActive: boolean
    }
}

export type LoginMutationVariables = Exact<{
    input: Identifier
}>

export type LoginMutation = {
    __typename?: 'Mutation'
    login: { __typename?: 'Tokens'; accessToken: string; refreshToken: string }
}

export type SignUpMutationVariables = Exact<{
    input: NewUser
}>

export type SignUpMutation = {
    __typename?: 'Mutation'
    signUp: {
        __typename?: 'User'
        id: string
        username: string
        isAdmin: boolean
        email: string
        isActive: boolean
    }
}

export type ConfirmAccountMutationVariables = Exact<{
    input: ConfirmIdentifier
}>

export type ConfirmAccountMutation = {
    __typename?: 'Mutation'
    confirmAccount: { __typename?: 'Confirm'; ok: boolean; token: string }
}

export type RequestResetPasswordMutationVariables = Exact<{
    input: RequestPasswordResetIdentifier
}>

export type RequestResetPasswordMutation = {
    __typename?: 'Mutation'
    requestResetPassword: { __typename?: 'RequestResetPassword'; ok: boolean }
}

export type RequestConfirmAccountMutationVariables = Exact<{
    [key: string]: never
}>

export type RequestConfirmAccountMutation = {
    __typename?: 'Mutation'
    requestConfirmAccount: { __typename?: 'RequestConfirmAccount'; ok: boolean }
}

export type ResetPasswordMutationVariables = Exact<{
    input: ResetPasswordIdentifier
}>

export type ResetPasswordMutation = {
    __typename?: 'Mutation'
    resetPassword: { __typename?: 'Confirm'; ok: boolean; token: string }
}

export type TodoFragment = {
    __typename?: 'Todo'
    id: string
    text: string
    done: boolean
    user: {
        __typename?: 'User'
        id: string
        username: string
        isAdmin: boolean
        email: string
        isActive: boolean
    }
}

export type UserFragment = {
    __typename?: 'User'
    id: string
    username: string
    isAdmin: boolean
    email: string
    isActive: boolean
}

export type AllTodosQueryVariables = Exact<{ [key: string]: never }>

export type AllTodosQuery = {
    __typename?: 'Query'
    todos: Array<{
        __typename?: 'Todo'
        id: string
        text: string
        done: boolean
        user: {
            __typename?: 'User'
            id: string
            username: string
            isAdmin: boolean
            email: string
            isActive: boolean
        }
    }>
}

export type RemoveTodoMutationVariables = Exact<{
    todoId: Scalars['ID']
}>

export type RemoveTodoMutation = { __typename?: 'Mutation'; removeTodo: string }

export type UpdateTodoMutationVariables = Exact<{
    input: NewTodo
    todoId: Scalars['ID']
}>

export type UpdateTodoMutation = {
    __typename?: 'Mutation'
    updateTodo: {
        __typename?: 'Todo'
        id: string
        text: string
        done: boolean
        user: {
            __typename?: 'User'
            id: string
            username: string
            isAdmin: boolean
            email: string
            isActive: boolean
        }
    }
}

export type AddTodoMutationVariables = Exact<{
    input: NewTodo
}>

export type AddTodoMutation = {
    __typename?: 'Mutation'
    createTodo: {
        __typename?: 'Todo'
        id: string
        text: string
        done: boolean
        user: {
            __typename?: 'User'
            id: string
            username: string
            isAdmin: boolean
            email: string
            isActive: boolean
        }
    }
}

export type MarkDoneTodoMutationVariables = Exact<{
    todoId: Scalars['ID']
}>

export type MarkDoneTodoMutation = {
    __typename?: 'Mutation'
    markDoneTodo: {
        __typename?: 'Todo'
        id: string
        text: string
        done: boolean
        user: {
            __typename?: 'User'
            id: string
            username: string
            isAdmin: boolean
            email: string
            isActive: boolean
        }
    }
}

export type MarkUndoneTodoMutationVariables = Exact<{
    todoId: Scalars['ID']
}>

export type MarkUndoneTodoMutation = {
    __typename?: 'Mutation'
    markUndoneTodo: {
        __typename?: 'Todo'
        id: string
        text: string
        done: boolean
        user: {
            __typename?: 'User'
            id: string
            username: string
            isAdmin: boolean
            email: string
            isActive: boolean
        }
    }
}
