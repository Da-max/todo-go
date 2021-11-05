package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/Da-max/todo-go/graph"
	"github.com/Da-max/todo-go/graph/generated"
	"github.com/Da-max/todo-go/postgres"
	"github.com/uptrace/bun"
)

const defaultPort = "8080"

func main() {
	var db *bun.DB = postgres.New()

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	c := generated.Config{Resolvers: &graph.Resolver{
		DB: db,
	}}

	postgres.Migrate()

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(c))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
