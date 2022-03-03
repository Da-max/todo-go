package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/Da-max/todo-go/graphql"
	"github.com/Da-max/todo-go/graphql/generated"
	"github.com/Da-max/todo-go/postgres"
)

const defaultPort = "8080"

func main() {

	port := os.Getenv("PORT")

	if port == "" {
		port = defaultPort
	}

	c := generated.Config{Resolvers: &graphql.Resolver{
		DB: postgres.New(),
	}}

	postgres.Migrate()

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(c))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
