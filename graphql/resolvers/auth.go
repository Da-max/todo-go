package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/Da-max/todo-go/auth"
	"github.com/Da-max/todo-go/graphql/generated"
	"github.com/Da-max/todo-go/graphql/model"
)

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, input model.Identifier) (*model.Tokens, error) {
	var (
		user   *model.User   = &model.User{Username: input.Username, Password: input.Password}
		tokens *model.Tokens = &model.Tokens{}
	)

	if result := r.DB.First(user); result.Error != nil {
		return nil, result.Error
	}

	_, tokenString, err := auth.TokenAuth.Encode(map[string]interface{}{"Username": user.Username, "ID": int(user.ID)})

	if err != nil {
		return nil, err
	}

	tokens.AccessToken = tokenString
	tokens.RefreshToken = tokenString

	return tokens, nil
}

// SignUp is the resolver for the signUp field.
func (r *mutationResolver) SignUp(ctx context.Context, input model.NewUser) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	var users []*model.User
	if res := r.DB.Find(&users); res.Error != nil {
		panic("The users cannot be found.")
	}
	return users, nil
}

// CurrentUser is the resolver for the currentUser field.
func (r *queryResolver) CurrentUser(ctx context.Context) (*model.User, error) {
	var user *model.User = auth.ForContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("the user cannot be find")
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

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
