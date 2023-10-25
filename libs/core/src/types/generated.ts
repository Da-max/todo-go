export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends " $fragmentName" | "__typename"
              ? T[P]
              : never;
      };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    Email: { input: any; output: any };
};

export type ChangePassword = {
    confirmPassword: Scalars["String"]["input"];
    oldPassword: Scalars["String"]["input"];
    password: Scalars["String"]["input"];
};

export type ChangePasswordConfirm = {
    __typename?: "ChangePasswordConfirm";
    ok: Scalars["Boolean"]["output"];
};

export type Confirm = {
    __typename?: "Confirm";
    ok: Scalars["Boolean"]["output"];
};

export type ConfirmIdentifier = {
    token: Scalars["String"]["input"];
};

export type DeleteAccount = {
    __typename?: "DeleteAccount";
    ok: Scalars["Boolean"]["output"];
};

export type Identifier = {
    password: Scalars["String"]["input"];
    username: Scalars["String"]["input"];
};

export type Mutation = {
    __typename?: "Mutation";
    changePassword: ChangePasswordConfirm;
    confirmAccount: Confirm;
    createTodo: Todo;
    deleteAccount: DeleteAccount;
    login: Tokens;
    markDoneTodo: Todo;
    markUndoneTodo: Todo;
    removeTodo: Scalars["ID"]["output"];
    requestConfirmAccount: RequestConfirmAccount;
    requestResetPassword: RequestResetPassword;
    resetPassword: Confirm;
    signUp: User;
    updateAccount: User;
    updateTodo: Todo;
};

export type MutationChangePasswordArgs = {
    input?: InputMaybe<ChangePassword>;
};

export type MutationConfirmAccountArgs = {
    input?: InputMaybe<ConfirmIdentifier>;
};

export type MutationCreateTodoArgs = {
    input: NewTodo;
};

export type MutationLoginArgs = {
    input: Identifier;
};

export type MutationMarkDoneTodoArgs = {
    todoId: Scalars["ID"]["input"];
};

export type MutationMarkUndoneTodoArgs = {
    todoId: Scalars["ID"]["input"];
};

export type MutationRemoveTodoArgs = {
    todoId: Scalars["ID"]["input"];
};

export type MutationRequestResetPasswordArgs = {
    input: RequestPasswordResetIdentifier;
};

export type MutationResetPasswordArgs = {
    input: ResetPasswordIdentifier;
};

export type MutationSignUpArgs = {
    input: NewUser;
};

export type MutationUpdateAccountArgs = {
    input: UpdateUser;
};

export type MutationUpdateTodoArgs = {
    input: NewTodo;
    todoId: Scalars["ID"]["input"];
};

export type NewTodo = {
    text: Scalars["String"]["input"];
};

export type NewUser = {
    email: Scalars["Email"]["input"];
    password: Scalars["String"]["input"];
    username: Scalars["String"]["input"];
};

export type Query = {
    __typename?: "Query";
    currentUser: User;
    todos: Array<Todo>;
    users: Array<User>;
};

export type RequestConfirmAccount = {
    __typename?: "RequestConfirmAccount";
    ok: Scalars["Boolean"]["output"];
};

export type RequestPasswordResetIdentifier = {
    email: Scalars["Email"]["input"];
};

export type RequestResetPassword = {
    __typename?: "RequestResetPassword";
    ok: Scalars["Boolean"]["output"];
};

export type ResetPasswordIdentifier = {
    password: Scalars["String"]["input"];
    token: Scalars["String"]["input"];
};

export type Todo = {
    __typename?: "Todo";
    done: Scalars["Boolean"]["output"];
    id: Scalars["ID"]["output"];
    text: Scalars["String"]["output"];
    userId: Scalars["ID"]["output"];
};

export type Tokens = {
    __typename?: "Tokens";
    accessToken: Scalars["String"]["output"];
    refreshToken: Scalars["String"]["output"];
};

export type UpdateUser = {
    email?: InputMaybe<Scalars["Email"]["input"]>;
    username?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
    __typename?: "User";
    email: Scalars["Email"]["output"];
    id: Scalars["ID"]["output"];
    isActive: Scalars["Boolean"]["output"];
    isAdmin: Scalars["Boolean"]["output"];
    username: Scalars["String"]["output"];
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
    __typename?: "Query";
    currentUser: {
        __typename?: "User";
        id: string;
        username: string;
        isAdmin: boolean;
        email: any;
        isActive: boolean;
    };
};

export type LoginMutationVariables = Exact<{
    input: Identifier;
}>;

export type LoginMutation = {
    __typename?: "Mutation";
    login: { __typename?: "Tokens"; accessToken: string; refreshToken: string };
};

export type SignUpMutationVariables = Exact<{
    input: NewUser;
}>;

export type SignUpMutation = {
    __typename?: "Mutation";
    signUp: {
        __typename?: "User";
        id: string;
        username: string;
        isAdmin: boolean;
        email: any;
        isActive: boolean;
    };
};

export type ConfirmAccountMutationVariables = Exact<{
    input: ConfirmIdentifier;
}>;

export type ConfirmAccountMutation = {
    __typename?: "Mutation";
    confirmAccount: { __typename?: "Confirm"; ok: boolean };
};

export type RequestResetPasswordMutationVariables = Exact<{
    input: RequestPasswordResetIdentifier;
}>;

export type RequestResetPasswordMutation = {
    __typename?: "Mutation";
    requestResetPassword: { __typename?: "RequestResetPassword"; ok: boolean };
};

export type RequestConfirmAccountMutationVariables = Exact<{
    [key: string]: never;
}>;

export type RequestConfirmAccountMutation = {
    __typename?: "Mutation";
    requestConfirmAccount: {
        __typename?: "RequestConfirmAccount";
        ok: boolean;
    };
};

export type ResetPasswordMutationVariables = Exact<{
    input: ResetPasswordIdentifier;
}>;

export type ResetPasswordMutation = {
    __typename?: "Mutation";
    resetPassword: { __typename?: "Confirm"; ok: boolean };
};

export type UpdateAccountMutationVariables = Exact<{
    input: UpdateUser;
}>;

export type UpdateAccountMutation = {
    __typename?: "Mutation";
    updateAccount: {
        __typename?: "User";
        id: string;
        username: string;
        isAdmin: boolean;
        email: any;
        isActive: boolean;
    };
};

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never }>;

export type DeleteAccountMutation = {
    __typename?: "Mutation";
    deleteAccount: { __typename?: "DeleteAccount"; ok: boolean };
};

export type ChangePasswordMutationVariables = Exact<{
    input: ChangePassword;
}>;

export type ChangePasswordMutation = {
    __typename?: "Mutation";
    changePassword: { __typename?: "ChangePasswordConfirm"; ok: boolean };
};

export type TodoFragment = {
    __typename?: "Todo";
    id: string;
    text: string;
    done: boolean;
    userId: string;
};

export type UserFragment = {
    __typename?: "User";
    id: string;
    username: string;
    isAdmin: boolean;
    email: any;
    isActive: boolean;
};

export type AllTodosQueryVariables = Exact<{ [key: string]: never }>;

export type AllTodosQuery = {
    __typename?: "Query";
    todos: Array<{
        __typename?: "Todo";
        id: string;
        text: string;
        done: boolean;
        userId: string;
    }>;
};

export type RemoveTodoMutationVariables = Exact<{
    todoId: Scalars["ID"]["input"];
}>;

export type RemoveTodoMutation = {
    __typename?: "Mutation";
    removeTodo: string;
};

export type UpdateTodoMutationVariables = Exact<{
    input: NewTodo;
    todoId: Scalars["ID"]["input"];
}>;

export type UpdateTodoMutation = {
    __typename?: "Mutation";
    updateTodo: {
        __typename?: "Todo";
        id: string;
        text: string;
        done: boolean;
        userId: string;
    };
};

export type AddTodoMutationVariables = Exact<{
    input: NewTodo;
}>;

export type AddTodoMutation = {
    __typename?: "Mutation";
    createTodo: {
        __typename?: "Todo";
        id: string;
        text: string;
        done: boolean;
        userId: string;
    };
};

export type MarkDoneTodoMutationVariables = Exact<{
    todoId: Scalars["ID"]["input"];
}>;

export type MarkDoneTodoMutation = {
    __typename?: "Mutation";
    markDoneTodo: {
        __typename?: "Todo";
        id: string;
        text: string;
        done: boolean;
        userId: string;
    };
};

export type MarkUndoneTodoMutationVariables = Exact<{
    todoId: Scalars["ID"]["input"];
}>;

export type MarkUndoneTodoMutation = {
    __typename?: "Mutation";
    markUndoneTodo: {
        __typename?: "Todo";
        id: string;
        text: string;
        done: boolean;
        userId: string;
    };
};
