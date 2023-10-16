import gql from "graphql-tag";
import { userFragment } from "./user";

export const todoFragment = gql`
    fragment Todo on Todo {
        id
        text
        done
        userId
    }
    ${userFragment}
`;
