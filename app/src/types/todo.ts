import { TodoFragment } from './generated'

export const TODO_STORE_NAME: 'todo' = 'todo'

export type todoStoreState = {
    todos: TodoFragment[]
    edit: boolean
}

export type todoStoreGetters = {
    findById: (
        state: todoStoreState
    ) => (todoId: string) => undefined | TodoFragment
}

export type todoStoreActions = {
    getAll: () => Promise<void>
    startEdit: () => void
    endEdit: () => void
}
