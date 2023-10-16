package services

import (
	"github.com/Da-max/todo-go/internal/core/domain"
	"github.com/Da-max/todo-go/internal/core/ports"
	"github.com/Da-max/todo-go/internal/utils/errors"
	"github.com/google/uuid"
)

type TodoService struct {
	todoRepository ports.TodoRepository
	authRepository ports.AuthRepository
}

func NewTodoService(todoRepository ports.TodoRepository, authRepository ports.AuthRepository) *TodoService {
	return &TodoService{
		todoRepository: todoRepository,
		authRepository: authRepository,
	}
}

func (srv *TodoService) checkUserTodo(userId string, token *domain.Token) (bool, error) {
	user, err := srv.authRepository.GetCurrentUser(token)

	if err != nil {
		return false, errors.Internal
	}

	if (user.ID != userId || !user.IsActive) && !user.IsAdmin {
		return false, errors.Unauthorized
	}

	return true, nil
}

func (srv *TodoService) GetByUserId(userId string, token *domain.Token) ([]*domain.Todo, error) {
	if res, err := srv.checkUserTodo(userId, token); !res || err != nil {
		return nil, errors.Unauthorized
	}

	return srv.todoRepository.GetByUserId(userId)
}

func (srv *TodoService) Create(text string, done bool, user domain.User, token *domain.Token) (*domain.Todo, error) {
	if res, err := srv.checkUserTodo(user.ID, token); !res || err != nil {
		return nil, errors.Unauthorized
	}

	todo := domain.NewTodo(uuid.New().String(), text, done, user.ID)

	if err := srv.todoRepository.Save(&todo); err != nil {
		return nil, errors.Internal
	}

	return &todo, nil
}

func (srv *TodoService) Update(todoId string, text string, token *domain.Token) (*domain.Todo, error) {

	todo, err := srv.todoRepository.Get(todoId)

	if err != nil {
		return nil, errors.NotFound
	}

	if res, err := srv.checkUserTodo(todo.UserID, token); !res || err != nil {
		return nil, errors.Unauthorized
	}

	todo.Text = text

	if err := srv.todoRepository.Save(todo); err != nil {
		return nil, errors.Internal
	}

	return todo, nil
}

func (srv *TodoService) MarkDone(id string, token *domain.Token) (*domain.Todo, error) {
	todo, err := srv.todoRepository.Get(id)

	if err != nil {
		return nil, errors.NotFound
	}

	if res, err := srv.checkUserTodo(todo.UserID, token); !res || err != nil {
		return nil, errors.Unauthorized
	}

	todo.MarkDoneTodo()

	if err := srv.todoRepository.Save(todo); err != nil {
		return nil, errors.Internal
	}

	return todo, nil
}

func (srv *TodoService) MarkUndone(id string, token *domain.Token) (*domain.Todo, error) {

	todo, err := srv.todoRepository.Get(id)

	if err != nil {
		return nil, errors.NotFound
	}

	if res, err := srv.checkUserTodo(todo.UserID, token); !res || err != nil {
		return nil, errors.Unauthorized
	}

	todo.MarkUndoneTodo()

	if err := srv.todoRepository.Save(todo); err != nil {
		return nil, errors.Internal
	}

	return todo, err
}

func (srv *TodoService) Remove(id string, token *domain.Token) (*domain.Todo, error) {
	todo, err := srv.todoRepository.Get(id)

	if err != nil {
		return nil, errors.NotFound
	}

	if res, err := srv.checkUserTodo(todo.UserID, token); !res || err != nil {
		return nil, errors.Unauthorized
	}

	if err := srv.todoRepository.Remove(todo); err != nil {
		return nil, errors.Unauthorized
	}

	return todo, nil
}
