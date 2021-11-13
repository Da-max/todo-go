package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"log"

	"github.com/Da-max/todo-go/graph/generated"
	"github.com/Da-max/todo-go/graph/model"
)

func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	var (
		user *model.User = new(model.User)
		todo *model.Todo = &model.Todo{
			Text: input.Text,
		}
	)

	if err := r.DB.NewSelect().Model(user).Where("id = ?", input.UserID).Scan(ctx); err != nil {
		panic("The user with id " + input.UserID + "is not found.")
	}

	todo.UserId = &user.ID
	todo.Done = false // By default a todo is not done.

	if _, err := r.DB.NewInsert().Model(todo).Exec(ctx); err != nil {
		panic("The todo " + todo.Text + " cannot be add.")
	}

	return todo, nil
}

func (r *mutationResolver) RemoveTodo(ctx context.Context, todoID int) (*model.Todo, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateTodo(ctx context.Context, input model.NewTodo, todoID int) (*model.Todo, error) {
	var (
		todo *model.Todo = new(model.Todo)
		// user *model.User = new(model.User)
	)

	if _, err := r.DB.NewSelect().Model(todo).Where("id = ?", todoID).Exec(ctx); err != nil {
		log.Println(err)
		panic("The todo is not found")
	}

	// todo.Text = input.Text

	log.Println(todo.UserId)

	if _, err := r.DB.NewUpdate().Model(todo).Where("id = ?", todoID).Exec(ctx); err != nil {
		panic("The todo cannot be update.")
	}

	return todo, nil

}

func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	todos := make([]*model.Todo, 0)
	err := r.DB.NewSelect().Model(&todos).Scan(ctx)
	return todos, err
}

func (r *todoResolver) User(ctx context.Context, obj *model.Todo) (*model.User, error) {
	user := new(model.User)
	err := r.DB.NewSelect().Model(user).Where("id = ?", *obj.UserId).Scan(ctx)
	return user, err
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Todo returns generated.TodoResolver implementation.
func (r *Resolver) Todo() generated.TodoResolver { return &todoResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type todoResolver struct{ *Resolver }
