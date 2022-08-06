import gql from 'graphql-tag'
import { userFragment } from './fragments/user'

export const currentUser = gql`
    query currentUser {
        currentUser {
            ...User
        }
    }
    ${userFragment}
`

export const loginMutation = gql`
    mutation login($input: Identifier!) {
        login(input: $input) {
            accessToken
            refreshToken
        }
    }
`
