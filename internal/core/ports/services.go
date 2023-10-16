package ports

import "github.com/Da-max/todo-go/internal/core/domain"

type TodoService interface {
	GetByUserId(userId string, token *domain.Token) ([]*domain.Todo, error)
	Create(text string, done bool, user domain.User, token *domain.Token) (*domain.Todo, error)
	Update(todoId string, text string, token *domain.Token) (*domain.Todo, error)
	MarkDone(id string, token *domain.Token) (*domain.Todo, error)
	MarkUndone(id string, token *domain.Token) (*domain.Todo, error)
	Remove(id string, token *domain.Token) (*domain.Todo, error)
}

type AuthService interface {
	GetCurrentUser(token *domain.Token) (*domain.User, error)
	Login(username string, password string) (*domain.Tokens, error)
	ChangePassword(id string, oldPassword string, newPassword string, token *domain.Token) (*domain.User, error)
	RequestResetPassword(id string) (bool, error)
	ResetPassword(password string, token *domain.Token) (*domain.User, error)
}

type UserService interface {
	GetAll(token *domain.Token) ([]*domain.User, error)
	Create(username string, email string, password string, isAdmin bool, isActive bool) (*domain.User, error)
	Update(id string, username string, email string, password string, isActive bool, isAdmin bool, token *domain.Token) (*domain.User, error)
	Remove(id string, token *domain.Token) error
	RequestConfirmAccount(id string, token *domain.Token) (bool, error)
	ConfirmAccount(id string, token *domain.Token) (*domain.User, error)
}
