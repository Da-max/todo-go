package resolvers

import (
	"github.com/Da-max/todo-go/internal/core/ports"
	"github.com/Da-max/todo-go/internal/utils/config"
)

type Resolver struct {
	Config      config.Config
	TodoService ports.TodoService
	AuthService ports.AuthService
	UserService ports.UserService
}
