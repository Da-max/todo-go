import { TodoFragment } from '@todo-go/core'

export const TODO_STORE_NAME = 'todo' as const

export type todoStoreState = {
    todos: TodoFragment[]
    edit: boolean
}

export type TodoInputEmit = {
    (e: 'save', done: boolean): void
}

export type todoStoreGetters = {
    findById: (
        state: todoStoreState,
    ) => (todoId: string) => undefined | TodoFragment
}

export type todoStoreActions = {
    getAll: () => Promise<void>
    startEdit: () => void
    endEdit: () => void
}
