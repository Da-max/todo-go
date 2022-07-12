import { defineStore } from 'pinia'
import { useQuery } from 'villus'
import { AllTodosQuery, Todo, TodoFragment } from '../types/generated'
import { allTodos } from '../graphql/todos'

export const useTodoStore = defineStore('todo', {
    state: () =>
        ({
            todos: [],
        } as { todos: TodoFragment[] }),
    actions: {
        async getAll() {
            try {
                const res = await useQuery<AllTodosQuery>({ query: allTodos })
                if (res.data.value) {
                    this.todos = res.data.value.todos
                }
            } catch (error) {
                console.log('error', error)
            }
        },
    },
    getters: {
        findById(state) {
            return (todoId: string) =>
                state.todos.find(
                    (todo) => todo.id.toString() === todoId.toString()
                )
        },
    },
})
