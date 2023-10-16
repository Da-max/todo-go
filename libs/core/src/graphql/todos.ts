import gql from "graphql-tag";
import { todoFragment } from "./fragments/todo";

export const allTodos = gql`
    query allTodos {
        todos {
            ...Todo
        }
    }
    ${todoFragment}
`;

export const removeTodo = gql`
    mutation removeTodo($todoId: ID!) {
        removeTodo(todoId: $todoId)
    }
`;

export const updateTodo = gql`
    mutation updateTodo($input: NewTodo!, $todoId: ID!) {
        updateTodo(input: $input, todoId: $todoId) {
            ...Todo
        }
    }
    ${todoFragment}
`;

export const addTodo = gql`
    mutation addTodo($input: NewTodo!) {
        createTodo(input: $input) {
            ...Todo
        }
    }
    ${todoFragment}
`;

export const markDoneTodo = gql`
    mutation markDoneTodo($todoId: ID!) {
        markDoneTodo(todoId: $todoId) {
            ...Todo
        }
    }
    ${todoFragment}
`;

export const markUndoneTodo = gql`
    mutation markUndoneTodo($todoId: ID!) {
        markUndoneTodo(todoId: $todoId) {
            ...Todo
        }
    }
    ${todoFragment}
`;
