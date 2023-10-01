import { useAllTodos } from './useAllTodos'
import { computed } from 'vue'

export const useFindTodoById = (todoId?: string) => {
    const { data } = useAllTodos()
    return computed(
        () => data.value?.todos.find((t) => t.id.toString() === todoId),
    )
}
