import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
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

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  markDoneTodo: Todo;
  removeTodo: Todo;
  updateTodo: Todo;
};

export type MutationCreateTodoArgs = {
  input: NewTodo;
};

export type MutationMarkDoneTodoArgs = {
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
};

export type Todo = {
  __typename?: 'Todo';
  done: Scalars['Boolean'];
  id: Scalars['ID'];
  text: Scalars['String'];
  user: User;
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

export type AddTodoMutationVariables = Exact<{
  input: NewTodo;
}>;

export type AddTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', id: string, text: string, done: boolean, user: { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean } } };

export type AllTodosQueryVariables = Exact<{ [key: string]: never; }>;

export type AllTodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, text: string, done: boolean, user: { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean } }> };

export type TodoFragment = { __typename?: 'Todo', id: string, text: string, done: boolean, user: { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean } };

export type UserFragment = { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean };

export type RemoveTodoMutationVariables = Exact<{
  todoId: Scalars['ID'];
}>;

export type RemoveTodoMutation = { __typename?: 'Mutation', removeTodo: { __typename?: 'Todo', id: string, text: string, done: boolean, user: { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean } } };

export type UpdateTodoMutationVariables = Exact<{
  input: NewTodo;
  todoId: Scalars['ID'];
}>;

export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', id: string, text: string, done: boolean, user: { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean } } };

export const UserFragmentDoc = { kind: 'Document', definitions: [{ kind: 'FragmentDefinition', name: { kind: 'Name', value: 'User' }, typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }, { kind: 'Field', name: { kind: 'Name', value: 'username' } }, { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } }, { kind: 'Field', name: { kind: 'Name', value: 'email' } }, { kind: 'Field', name: { kind: 'Name', value: 'isActive' } }] } }] } as unknown as DocumentNode<UserFragment, unknown>
export const TodoFragmentDoc = { kind: 'Document', definitions: [{ kind: 'FragmentDefinition', name: { kind: 'Name', value: 'Todo' }, typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Todo' } }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }, { kind: 'Field', name: { kind: 'Name', value: 'text' } }, { kind: 'Field', name: { kind: 'Name', value: 'done' } }, { kind: 'Field', name: { kind: 'Name', value: 'user' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'User' } }] } }] } }, ...UserFragmentDoc.definitions] } as unknown as DocumentNode<TodoFragment, unknown>
export const AddTodoDocument = { kind: 'Document', definitions: [{ kind: 'OperationDefinition', operation: 'mutation', name: { kind: 'Name', value: 'addTodo' }, variableDefinitions: [{ kind: 'VariableDefinition', variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }, type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'NewTodo' } } } }], selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'createTodo' }, arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }], selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Todo' } }] } }] } }, ...TodoFragmentDoc.definitions] } as unknown as DocumentNode<AddTodoMutation, AddTodoMutationVariables>
export const AllTodosDocument = { kind: 'Document', definitions: [{ kind: 'OperationDefinition', operation: 'query', name: { kind: 'Name', value: 'allTodos' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'todos' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Todo' } }] } }] } }, ...TodoFragmentDoc.definitions] } as unknown as DocumentNode<AllTodosQuery, AllTodosQueryVariables>
export const RemoveTodoDocument = { kind: 'Document', definitions: [{ kind: 'OperationDefinition', operation: 'mutation', name: { kind: 'Name', value: 'removeTodo' }, variableDefinitions: [{ kind: 'VariableDefinition', variable: { kind: 'Variable', name: { kind: 'Name', value: 'todoId' } }, type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } } }], selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'removeTodo' }, arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'todoId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'todoId' } } }], selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Todo' } }] } }] } }, ...TodoFragmentDoc.definitions] } as unknown as DocumentNode<RemoveTodoMutation, RemoveTodoMutationVariables>
export const UpdateTodoDocument = { kind: 'Document', definitions: [{ kind: 'OperationDefinition', operation: 'mutation', name: { kind: 'Name', value: 'updateTodo' }, variableDefinitions: [{ kind: 'VariableDefinition', variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }, type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'NewTodo' } } } }, { kind: 'VariableDefinition', variable: { kind: 'Variable', name: { kind: 'Name', value: 'todoId' } }, type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } } }], selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'updateTodo' }, arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } }, { kind: 'Argument', name: { kind: 'Name', value: 'todoId' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'todoId' } } }], selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Todo' } }] } }] } }, ...TodoFragmentDoc.definitions] } as unknown as DocumentNode<UpdateTodoMutation, UpdateTodoMutationVariables>
