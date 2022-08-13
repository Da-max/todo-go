package resolvers

import (
	"fmt"
	"net/http"
	"testing"

	"github.com/99designs/gqlgen/client"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/Da-max/todo-go/graphql/generated"
	"github.com/Da-max/todo-go/graphql/model"
	"github.com/Da-max/todo-go/utils/auth"
	"github.com/Da-max/todo-go/utils/config"
	"github.com/Da-max/todo-go/utils/postgres"
	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
	"github.com/stretchr/testify/require"
	"gorm.io/gorm"
)

func createTestUser(db *gorm.DB) *model.User {
	password, err := auth.HashPassword("password")
	if err != nil {
		panic("the password cannot be hash")
	}

	user := &model.User{
		Username: "Test",
		Password: password,
		Email:    "test@test.com",
		IsActive: true,
	}

	if res := db.Create(user); res.Error != nil {
		panic("The user cannot be create.")
	}

	return user
}

func getAuthorizationOption(user *model.User) client.Option {
	_, tokenString, err := auth.GenerateAuthorizationToken(user)
	if err != nil {
		panic("the token cannot be generate")
	}

	return client.AddHeader("Authorization", "BEARER "+tokenString)
}

func getClient() *client.Client {
	db := postgres.New()
	user := createTestUser(db)
	config := config.GetConfig()

	r := chi.NewRouter()
	resolver := &Resolver{
		DB:     postgres.New(),
		Config: config,
	}
	r.Use(auth.AuthenticatorMiddleware(resolver.DB))

	c := generated.Config{Resolvers: resolver, Directives: generated.DirectiveRoot{
		IsLoged: auth.IsLoged,
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

	r.Handle("/", srv)

	client := client.New(r, getAuthorizationOption(user))

	return client
}

func TestTodo(t *testing.T) {
	c := getClient()

	t.Run("Create todo", func(t *testing.T) {
		var resp struct {
			CreateTodo model.Todo
		}
		c.MustPost(`mutation { createTodo(input: { text: "Best Todo" }) { 
				text
				done
			}
		}`, &resp)

		require.Equal(t, "Best Todo", resp.CreateTodo.Text)
	})
}
