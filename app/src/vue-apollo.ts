import {
    createHttpLink,
    InMemoryCache,
    ApolloClient,
    ApolloLink,
    NormalizedCacheObject
} from '@apollo/client/core'

const GRAPHQL_ENDPOINT = (import.meta.env.VITE_GRAPHQL_ENDPOINT) as string

const httpLink: ApolloLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT || '/query'
})

const cache: InMemoryCache = new InMemoryCache()

const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: httpLink,
    cache
})

export { apolloClient }
