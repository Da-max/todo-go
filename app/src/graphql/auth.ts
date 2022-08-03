import gql from 'graphql-tag'

export const loginMutation = gql`
    mutation login($input: Identifier!) {
        login(input: $input) {
            accessToken
            refreshToken
        }
    }
`
