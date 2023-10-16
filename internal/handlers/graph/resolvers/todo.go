package resolvers

import (
	"context"
	"github.com/Da-max/todo-go/internal/core/domain"
	"github.com/Da-max/todo-go/internal/handlers/graph/model"
	"github.com/Da-max/todo-go/internal/utils/auth"
	myErrors "github.com/Da-max/todo-go/internal/utils/errors"
	"github.com/go-chi/jwtauth/v5"
)

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.31

// CreateTodo is the resolver for the createTodo field.
func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	var (
		token            = ctx.Value(auth.TokenCtxKey).(*domain.Token)
		currentUser, err = r.AuthService.GetCurrentUser(token)
	)

	if err != nil {
		return nil, myErrors.Unauthorized
	}

	var todo, errCreate = r.TodoService.Create(input.Text, false, *currentUser, token)

	return &model.Todo{Text: todo.Text}, errCreate
}

// RemoveTodo is the resolver for the removeTodo field.
func (r *mutationResolver) RemoveTodo(ctx context.Context, todoID string) (string, error) {
	var token = ctx.Value(jwtauth.TokenCtxKey).(*domain.Token)

	if _, err := r.TodoService.Remove(todoID, token); err != nil {
		return "", myErrors.Unauthorized
	}

	return todoID, nil
}

// UpdateTodo is the resolver for the updateTodo field.
func (r *mutationResolver) UpdateTodo(ctx context.Context, input model.NewTodo, todoID string) (*model.Todo, error) {
	var (
		token     = ctx.Value(auth.TokenCtxKey).(*domain.Token)
		todo, err = r.TodoService.Update(todoID, input.Text, token)
	)

	if err != nil {
		return nil, err
	}

	return model.ToTodoModel(todo), nil
}

// MarkDoneTodo is the resolver for the markDoneTodo field.
func (r *mutationResolver) MarkDoneTodo(ctx context.Context, todoID string) (*model.Todo, error) {

	var (
		token     = ctx.Value(auth.TokenCtxKey).(*domain.Token)
		todo, err = r.TodoService.MarkDone(todoID, token)
	)

	if err != nil {
		return nil, err
	}

	return model.ToTodoModel(todo), nil

}

// MarkUndoneTodo is the resolver for the markUndoneTodo field.
func (r *mutationResolver) MarkUndoneTodo(ctx context.Context, todoID string) (*model.Todo, error) {
	var (
		token     = ctx.Value(auth.TokenCtxKey).(*domain.Token)
		todo, err = r.TodoService.MarkUndone(todoID, token)
	)

	if err != nil {
		return nil, err
	}

	return model.ToTodoModel(todo), nil
}

// Todos is the resolver for the todos field.
func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	var (
		token          = ctx.Value(auth.TokenCtxKey).(*domain.Token)
		user, err      = r.AuthService.GetCurrentUser(token)
		formattedTodos []*model.Todo
	)

	if err != nil {
		return nil, err
	}

	var todos, todoErr = r.TodoService.GetByUserId(user.ID, token)

	if todoErr != nil {
		return nil, todoErr
	}

	for i, todo := range todos {
		formattedTodos[i] = model.ToTodoModel(todo)
	}

	return formattedTodos, nil
}
