package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/Da-max/todo-go/auth"
	"github.com/Da-max/todo-go/config"
	"github.com/Da-max/todo-go/graphql"
	"github.com/Da-max/todo-go/graphql/generated"
	"github.com/Da-max/todo-go/postgres"
	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
)

func router(config config.Config) *chi.Mux {

	r := chi.NewRouter()
	c := generated.Config{Resolvers: &graphql.Resolver{
		DB:     postgres.New(),
		Config: config,
	}}
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(c))
	srv.AddTransport(&transport.Websocket{
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return r.Host == "localhost:"+fmt.Sprint(config.Port)
			},
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		},
	})

	if config.Debug {
		r.Use(cors.New(cors.Options{
			AllowedOrigins:   []string{"http://localhost:" + fmt.Sprint(config.FrontendPort)},
			AllowCredentials: true,
			Debug:            true,
		}).Handler)
	}
	r.Use(auth.Authenticator)

	r.Handle("/query", srv)
	r.Handle("/", playground.Handler("GraphQL playground", "/query"))

	return r
}

func main() {
	conf := config.GetConfig()

	var (
		router = router(conf)
	)

	postgres.Migrate()

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", fmt.Sprint(conf.Port))
	log.Fatal(http.ListenAndServe(":"+fmt.Sprint(conf.Port), router))
}
