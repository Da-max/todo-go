import { defineStore } from 'pinia'
import { useQuery } from 'villus'
import { AllTodosQuery } from '../types/generated'
import { allTodos } from '../graphql/todos'
import {
    todoStoreActions,
    todoStoreGetters,
    todoStoreState,
    TODO_STORE_NAME,
} from '../types/todo'

export const useTodoStore = defineStore<
    typeof TODO_STORE_NAME,
    todoStoreState,
    todoStoreGetters,
    todoStoreActions
>(TODO_STORE_NAME, {
    state: () => ({
        todos: [],
        edit: false,
    }),
    actions: {
        async getAll() {
            try {
                const res = await useQuery<AllTodosQuery>({
                    query: allTodos,
                })
                if (res.data.value) {
                    this.todos = res.data.value.todos
                }
            } catch (error) {
                console.log('error', error)
            }
        },

        startEdit() {
            if (this.edit) {
                this.endEdit()
            }
            this.edit = true
        },

        endEdit() {
            this.edit = false
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
