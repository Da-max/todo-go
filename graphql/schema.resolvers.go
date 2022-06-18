package graphql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/Da-max/todo-go/graphql/generated"
	"github.com/Da-max/todo-go/graphql/model"
)

func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	var (
		user model.User
		todo *model.Todo = &model.Todo{
			Text: input.Text,
			Done: false,
		}
	)

	if res := r.DB.Find(&user).Where("id = ?", input.UserID); res.Error != nil {
		panic("The user with id " + string(input.UserID) + "is not found.")
	}

	todo.User = user
	todo.UserID = int(user.ID)

	if res := r.DB.Create(todo); res.Error != nil {
		panic("The todo " + todo.Text + " cannot be add.")
	}
	return todo, nil
}

func (r *mutationResolver) RemoveTodo(ctx context.Context, todoID int) (*model.Todo, error) {
	var (
		todo *model.Todo = &model.Todo{}
	)

	if res := r.DB.Find(todo).Where("id = ?", todoID); res.Error != nil {
		panic("The todo with id" + string(todoID) + " is not found")
	}

	if res := r.DB.Delete(todo); res.Error != nil {
		panic("The todo cannot be delete")
	}

	return todo, nil

}

func (r *mutationResolver) UpdateTodo(ctx context.Context, input model.NewTodo, todoID int) (*model.Todo, error) {
	var (
		user model.User
		todo *model.Todo = &model.Todo{}
	)

	if res := r.DB.Find(todo).Where("id = ?", todoID); res.Error != nil {
		panic("The todo with id " + string(todoID) + " is not found")
	}

	todo.Text = input.Text

	if res := r.DB.Find(&user).Where("id = ?", input.UserID); res.Error != nil {
		panic("The user with id " + string(input.UserID) + " is not found")
	}

	todo.UserID = int(user.ID)

	if res := r.DB.Save(todo); res.Error != nil {
		panic("The todo with id " + string(todo.ID) + "cannot be update")
	}

	return todo, nil
}

func (r *mutationResolver) MarkDoneTodo(ctx context.Context, todoID int) (*model.Todo, error) {
	var (
		todo *model.Todo = &model.Todo{}
	)

	if res := r.DB.Find(todo).Where("id = ?", todoID); res.Error != nil {
		panic("The todo with id " + string(todoID) + " cannot be found.")
	}

	todo.Done = true

	if res := r.DB.Save(todo); res.Error != nil {
		panic("The todo with id " + string(todo.ID) + " cannot be update")
	}

	return todo, nil
}

func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	var (
		todos []*model.Todo
	)

	result := r.DB.Find(&todos)

	return todos, result.Error
}

func (r *todoResolver) ID(ctx context.Context, obj *model.Todo) (int, error) {
	if result := r.DB.Find(&model.Todo{}).Where("id = ?", obj.ID); result.Error != nil {
		return -1, result.Error
	} else {
		return int(obj.ID), result.Error
	}
}

func (r *userResolver) ID(ctx context.Context, obj *model.User) (int, error) {
	if result := r.DB.Find(&model.User{}).Where("id = ?", obj.ID); result.Error != nil {
		return -1, result.Error
	} else {
		return int(obj.ID), result.Error
	}
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Todo returns generated.TodoResolver implementation.
func (r *Resolver) Todo() generated.TodoResolver { return &todoResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type todoResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
