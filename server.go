package main

import (
	"context"
	"fmt"
	"github.com/99designs/gqlgen/graphql"
	"github.com/Da-max/todo-go/internal/core/services"
	"github.com/Da-max/todo-go/internal/handlers/graph/generated"
	"github.com/Da-max/todo-go/internal/handlers/graph/resolvers"
	auth2 "github.com/Da-max/todo-go/internal/repositories/auth"
	"github.com/Da-max/todo-go/internal/repositories/message"
	"github.com/Da-max/todo-go/internal/repositories/todo"
	"github.com/Da-max/todo-go/internal/repositories/user"
	"github.com/Da-max/todo-go/internal/utils/auth"
	"github.com/Da-max/todo-go/internal/utils/config"
	"github.com/Da-max/todo-go/internal/utils/postgres"
	"github.com/matcornic/hermes/v2"
	"github.com/rs/cors"
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
)

func Router(config config.Config) *chi.Mux {

	var (
		r                 = chi.NewRouter()
		db                = postgres.New()
		todoRepository    = todo.NewTodoRepository(db)
		authRepository    = auth2.NewAuthRepository(auth.TokenAuth, db)
		userRepository    = user.NewUserRepository(db)
		messageRepository = message.NewMessageRepository(hermes.Hermes{
			// Optional Theme
			// Theme: new(Default)
			Product: hermes.Product{
				// Appears in header & footer of e-mails
				Name: "Todo-g",
				Link: "https://example-hermes.com/",
				// Optional product logo
				Logo: "http://www.duchess-france.org/wp-content/uploads/2016/01/gopher.png",
			},
		})
		todoService = services.NewTodoService(todoRepository, authRepository)
		authService = services.NewAuthService(authRepository, userRepository, messageRepository)
		userService = services.NewUserService(authRepository, userRepository, messageRepository)
		resolver    = &resolvers.Resolver{
			Config:      config,
			TodoService: todoService,
			AuthService: authService,
			UserService: userService,
		}
	)

	if config.Debug {
		r.Use(cors.AllowAll().Handler)
	}

	r.Use(auth.AuthenticatorMiddleware)

	c := generated.Config{Resolvers: resolver, Directives: generated.DirectiveRoot{
		IsLogged: func(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
			var token, err = auth.GetTokenCtx(ctx)

			if err != nil {
				return nil, err
			}

			if _, err := resolver.AuthService.GetCurrentUser(token); err != nil {
				return nil, err
			}

			return next(ctx)
		},
		IsActive: func(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
			var (
				token, err = auth.GetTokenCtx(ctx)
			)

			if err != nil {
				return nil, err
			}

			userObj, err := resolver.AuthService.GetCurrentUser(token)

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
