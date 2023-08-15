import { useQuery } from 'villus'
import { AllTodosQuery } from '../../types/generated'
import { allTodos } from '../../graphql/todos'
import { tags } from './index'

export const useAllTodos = () => {
    return useQuery<AllTodosQuery>({
        query: allTodos,
        tags: tags,
    })
}
