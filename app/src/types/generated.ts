export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Identifier = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  login: Tokens;
  markDoneTodo: Todo;
  markUndoneTodo: Todo;
  removeTodo: Scalars['ID'];
  updateTodo: Todo;
};


export type MutationCreateTodoArgs = {
  input: NewTodo;
};


export type MutationLoginArgs = {
  input: Identifier;
};


export type MutationMarkDoneTodoArgs = {
  todoId: Scalars['ID'];
};


export type MutationMarkUndoneTodoArgs = {
  todoId: Scalars['ID'];
};


export type MutationRemoveTodoArgs = {
  todoId: Scalars['ID'];
};


export type MutationUpdateTodoArgs = {
  input: NewTodo;
  todoId: Scalars['ID'];
};

export type NewTodo = {
  text: Scalars['String'];
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  todos: Array<Todo>;
  users: Array<User>;
};

export type Todo = {
  __typename?: 'Todo';
  done: Scalars['Boolean'];
  id: Scalars['ID'];
  text: Scalars['String'];
  user: User;
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  input: Identifier;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Tokens', accessToken: string, refreshToken: string } };

export type TodoFragment = { __typename?: 'Todo', id: string, text: string, done: boolean, user: { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean } };

export type UserFragment = { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean };

export type AllTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, text: string, done: boolean, user: { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean } }> };

export type RemoveTodoMutationVariables = Exact<{
  todoId: Scalars['ID'];
}>;


export type RemoveTodoMutation = { __typename?: 'Mutation', removeTodo: string };

export type UpdateTodoMutationVariables = Exact<{
  input: NewTodo;
  todoId: Scalars['ID'];
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', id: string, text: string, done: boolean, user: { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean } } };

export type AddTodoMutationVariables = Exact<{
  input: NewTodo;
}>;


export type AddTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', id: string, text: string, done: boolean, user: { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean } } };

export type MarkDoneTodoMutationVariables = Exact<{
  todoId: Scalars['ID'];
}>;


export type MarkDoneTodoMutation = { __typename?: 'Mutation', markDoneTodo: { __typename?: 'Todo', id: string, text: string, done: boolean, user: { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean } } };

export type MarkUndoneTodoMutationVariables = Exact<{
  todoId: Scalars['ID'];
}>;


export type MarkUndoneTodoMutation = { __typename?: 'Mutation', markUndoneTodo: { __typename?: 'Todo', id: string, text: string, done: boolean, user: { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean } } };
