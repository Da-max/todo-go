package graphql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/Da-max/todo-go/auth"
	"github.com/Da-max/todo-go/graphql/generated"
	"github.com/Da-max/todo-go/graphql/model"
)

// CreateTodo is the resolver for the createTodo field.
func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	var (
		user *model.User = &model.User{}
		todo *model.Todo = &model.Todo{
			Text: input.Text,
			Done: false,
		}
	)
	if res := r.DB.First(user, input.UserID); res.Error != nil {
		panic("The user with id " + fmt.Sprint(input.UserID) + " is not found.")
	}

	todo.UserID = input.UserID
	todo.User = *user

	if res := r.DB.Create(todo); res.Error != nil {
		panic("The todo " + todo.Text + " cannot be add.")
	}
	return todo, nil
}

// RemoveTodo is the resolver for the removeTodo field.
func (r *mutationResolver) RemoveTodo(ctx context.Context, todoID int) (int, error) {
	var (
		todo *model.Todo = &model.Todo{}
	)

	if res := r.DB.First(todo, todoID); res.Error != nil {
		panic("The todo with id " + fmt.Sprint(todoID) + " is not found")
	}

	if res := r.DB.Delete(todo); res.Error != nil {
		panic("The todo cannot be delete")
	}

	return todoID, nil
}

// UpdateTodo is the resolver for the updateTodo field.
func (r *mutationResolver) UpdateTodo(ctx context.Context, input model.NewTodo, todoID int) (*model.Todo, error) {
	var (
		user *model.User = &model.User{}
		todo *model.Todo = &model.Todo{}
	)

	if res := r.DB.Find(user).Where("id = ?", input.UserID); res.Error != nil {
		panic("The user with id " + fmt.Sprint(input.UserID) + " is not found")
	}

	if res := r.DB.First(todo, todoID); res.Error != nil {
		panic("The todo with id " + fmt.Sprint(todoID) + " is not found")
	}

	todo.Text = input.Text
	todo.UserID = input.UserID

	if res := r.DB.Save(todo); res.Error != nil {
		fmt.Println(res.Error)
		panic("The todo with id " + fmt.Sprint(todoID) + " cannot be saved")
	}

	return todo, nil
}

// MarkDoneTodo is the resolver for the markDoneTodo field.
func (r *mutationResolver) MarkDoneTodo(ctx context.Context, todoID int) (*model.Todo, error) {
	var todo *model.Todo = &model.Todo{}

	if res := r.DB.First(todo, todoID); res.Error != nil {
		panic("The todo with id " + fmt.Sprint(todoID) + " cannot be found.")
	}

	todo.Done = true

	if res := r.DB.Save(todo); res.Error != nil {
		panic("The todo with id " + fmt.Sprint(todo.ID) + " cannot be update")
	}

	return todo, nil
}

// SignUp is the resolver for the signUp field.
func (r *mutationResolver) SignUp(ctx context.Context, input model.Identifier) (*model.Tokens, error) {
	var (
		user   *model.User   = &model.User{}
		tokens *model.Tokens = &model.Tokens{}
	)

	if result := r.DB.Where(&model.User{Username: input.Username, Password: input.Password}).First(user); result.Error != nil {
		panic("Cannot find user with " + input.Username)
	}

	_, tokenString, err := auth.TokenAuth.Encode(map[string]interface{}{"Username": user.Username})

	if err != nil {
		panic("Cannot create token")
	}

	tokens.AccessToken = tokenString
	tokens.RefreshToken = tokenString

	return tokens, nil

}

// Todos is the resolver for the todos field.
func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	var (
		todos []*model.Todo = []*model.Todo{}
		// user  *model.User   = &model.User{}
	)

	// if res := r.DB.Where(&model.User{Username: ctx.Value("Username").(string)}).First(user); res.Error != nil || res.RowsAffected == 0 {
	// 	panic("The username cannot be found.")
	// }

	if result := r.DB/*.Where(&model.Todo{UserID: int(user.ID)})*/.Find(&todos); result.Error != nil {
		panic("The todos cannot be query.")
	}

	return todos, nil
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	var users []*model.User
	if res := r.DB.Find(&users); res.Error != nil {
		panic("The users cannot be found.")
	}
	return users, nil
}

// ID is the resolver for the id field.
func (r *todoResolver) ID(ctx context.Context, obj *model.Todo) (int, error) {
	if result := r.DB.First(&model.Todo{}, obj.ID); result.Error != nil {
		fmt.Println(result.Error)
		panic("The todo with id " + fmt.Sprint(obj.ID) + " cannot be found.")
	}

	return int(obj.ID), nil
}

// User is the resolver for the user field.
func (r *todoResolver) User(ctx context.Context, obj *model.Todo) (*model.User, error) {
	var user *model.User = &model.User{}
	if res := r.DB.First(user, obj.UserID); res.Error != nil {
		panic("The user cannot be found.")
	}
	return user, nil
}

// ID is the resolver for the id field.
func (r *userResolver) ID(ctx context.Context, obj *model.User) (int, error) {
	if result := r.DB.First(&model.User{}, obj.ID); result.Error != nil {
		return -1, result.Error
	}
	return int(obj.ID), nil
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
