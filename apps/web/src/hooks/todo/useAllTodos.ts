import { useQuery } from 'villus'
import { AllTodosQuery, AllTodosQueryVariables } from '../../types/generated'
import { allTodos } from '../../graphql/todos'
import { tags } from './index'

export const useAllTodos = () => {
    return useQuery<AllTodosQuery, AllTodosQueryVariables>({
        query: allTodos,
        tags: tags,
    })
}
