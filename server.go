package main

import (
	"context"
	"fmt"
	"github.com/99designs/gqlgen/graphql"
	"github.com/Da-max/todo-go/internal/core/domain"
	"github.com/Da-max/todo-go/internal/core/services"
	"github.com/Da-max/todo-go/internal/handlers/graph/generated"
	"github.com/Da-max/todo-go/internal/handlers/graph/resolvers"
	auth2 "github.com/Da-max/todo-go/internal/repositories/auth"
	"github.com/Da-max/todo-go/internal/repositories/todo"
	"github.com/Da-max/todo-go/internal/repositories/user"
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/Da-max/todo-go/utils/auth"
	"github.com/Da-max/todo-go/utils/config"
	"github.com/Da-max/todo-go/utils/postgres"
	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
)

func Router(config config.Config) *chi.Mux {

	var (
		r              = chi.NewRouter()
		db             = postgres.New()
		todoRepository = todo.NewTodoRepository(db)
		authRepository = auth2.NewAuthRepository(auth.TokenAuth, db)
		userRepository = user.NewUserRepository(db)
		todoService    = services.NewTodoService(todoRepository, authRepository)
		authService    = services.NewAuthService(authRepository, userRepository)
		userService    = services.NewUserService(authRepository, userRepository)
		resolver       = &resolvers.Resolver{
			Config:      config,
			TodoService: todoService,
			AuthService: authService,
			UserService: userService,
		}
	)

	r.Use(auth.AuthenticatorMiddleware())

	c := generated.Config{Resolvers: resolver, Directives: generated.DirectiveRoot{
		IsLogged: func(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
			var (
				token = ctx.Value(auth.TokenCtxKey).(*domain.Token)
			)

			if _, err := resolver.AuthService.GetCurrentUser(token); err != nil {
				return nil, err
			}

			return next(ctx)
		},
		IsActive: func(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
			var (
				token        = ctx.Value(auth.TokenCtxKey).(*domain.Token)
				userObj, err = resolver.AuthService.GetCurrentUser(token)
			)

			if err != nil {
				return nil, err
			}

			if !userObj.IsActive {
				return nil, fmt.Errorf("access denied")
			}

			return next(ctx)
		},
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
		// r.Use(cors.New(cors.Options{
		// 	AllowedOrigins:   []string{"http://localhost:" + fmt.Sprint(config.FrontendPort), "http://localhost:5500"},
		// 	AllowCredentials: true,
		// 	Debug:            true,
		// 	AllowedHeaders:   []string{"Authorization", "Content-Type"},
		// 	AllowedMethods:   []string{"POST"},
		// 	All
		// }).Handler)
		r.Use(cors.AllowAll().Handler)
	}
	r.Handle("/query", srv)
	r.Handle("/", playground.Handler("GraphQL playground", "/query"))

	return r
}

func main() {
	conf := config.GetConfig()

	router := Router(conf)

	postgres.Migrate()

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", fmt.Sprint(conf.Port))
	log.Fatal(http.ListenAndServe(":"+fmt.Sprint(conf.Port), router))
}
