import gql from "graphql-tag";

export const todoFragment = gql`
    fragment Todo on Todo {
        id
        text
        done
        userId
    }
`;
