import { ApolloQueryResult } from '@apollo/client'
import { UseQueryReturn, useResult } from '@vue/apollo-composable'
import { Ref } from 'vue-demi'
import { AllTodosQuery, Todo, useAllTodosQuery } from '../types/graphql'

export default function () {

    const allTodo = function () {

        const res = useAllTodosQuery()
        const todos = useResult(res.result, [])

        return {
            todos,
            loading: res.loading,
            refetch: res.refetch
        }
    }


    return { allTodo }


}