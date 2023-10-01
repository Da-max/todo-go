package ports

import (
	"github.com/Da-max/todo-go/internal/core/domain"
	"time"
)

type MessageType byte

const (
	ConfirmAccount       = 0
	RequestResetPassword = 1
	ResetPassword        = 2
	DeleteAccount        = 3
)

type TodoRepository interface {
	GetByUserId(userId string) ([]*domain.Todo, error)
	GetAll() ([]*domain.Todo, error)
	Get(id string) (*domain.Todo, error)
	Save(todo *domain.Todo) error
	Remove(todo *domain.Todo) error
}

type AuthRepository interface {
	GeneratePassword(password string) (string, error)
	GetCurrentUser(token *domain.Token) (*domain.User, error)
	CheckPassword(user *domain.User, password string) (bool, error)
	GenerateTokens(user *domain.User, expiresIn time.Duration) (*domain.Tokens, error)
}

type UserRepository interface {
	GetAll() ([]*domain.User, error)
	Get(id string) (*domain.User, error)
	GetByUsername(username string) (*domain.User, error)
	Save(user *domain.User) error
	Remove(user *domain.User) error
}

type MessageRepository interface {
	SendMessage(messageType MessageType, args ...interface{}) (bool, error)
}
