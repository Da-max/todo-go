import { useQuery } from 'villus'
import { tags } from './index'
import { allTodos, AllTodosQuery, AllTodosQueryVariables } from '@todo-go/core'

export const useAllTodos = () => {
    return useQuery<AllTodosQuery, AllTodosQueryVariables>({
        query: allTodos,
        tags: tags,
    })
}
