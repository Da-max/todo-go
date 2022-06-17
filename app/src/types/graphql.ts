import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
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
  isActive?: Scalars['Boolean'];
  isAdmin?: Scalars['Boolean'];
  password?: Scalars['String'];
  username: Scalars['String'];
};

export type AddTodoMutationVariables = Exact<{
  input: NewTodo;
}>;


export type AddTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', id: string, text: string, done: boolean } };

export type AllTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', text: string, id: string, done: boolean, user: { __typename?: 'User', username: string, id: string, email: string } }> };

export type TodoFragmentFragment = { __typename?: 'Todo', id: string, text: string, done: boolean };

export type UserFragmentFragment = { __typename?: 'User', id: string, username: string, isAdmin: boolean, email: string, isActive: boolean };

export const TodoFragmentFragmentDoc = gql`
    fragment TodoFragment on Todo {
  id
  text
  done
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  isAdmin
  email
  isActive
}
    `;
export const AddTodoDocument = gql`
    mutation addTodo($input: NewTodo!) {
  createTodo(input: $input) {
    ...TodoFragment
  }
}
    ${TodoFragmentFragmentDoc}`;

/**
 * __useAddTodoMutation__
 *
 * To run a mutation, you first call `useAddTodoMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddTodoMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddTodoMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useAddTodoMutation(options: VueApolloComposable.UseMutationOptions<AddTodoMutation, AddTodoMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<AddTodoMutation, AddTodoMutationVariables>>) {
  return VueApolloComposable.useMutation<AddTodoMutation, AddTodoMutationVariables>(AddTodoDocument, options);
}
export type AddTodoMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<AddTodoMutation, AddTodoMutationVariables>;
export const AllTodosDocument = gql`
    query allTodos {
  todos {
    text
    id
    done
    user {
      username
      id
      email
    }
  }
}
    `;

/**
 * __useAllTodosQuery__
 *
 * To run a query within a Vue component, call `useAllTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTodosQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAllTodosQuery();
 */
export function useAllTodosQuery(options: VueApolloComposable.UseQueryOptions<AllTodosQuery, AllTodosQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AllTodosQuery, AllTodosQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AllTodosQuery, AllTodosQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<AllTodosQuery, AllTodosQueryVariables>(AllTodosDocument, {}, options);
}
export type AllTodosQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<AllTodosQuery, AllTodosQueryVariables>;