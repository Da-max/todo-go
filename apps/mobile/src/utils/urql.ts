import { Client, cacheExchange, fetchExchange } from "urql";
import { authExchange } from "@urql/exchange-auth";
import { authExchanceFunc } from "./auth";

export const client = new Client({
    url:
        process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT ??
        ("http://localhost:5000/query" as string),
    exchanges: [cacheExchange, fetchExchange, authExchange(authExchanceFunc)],
});
