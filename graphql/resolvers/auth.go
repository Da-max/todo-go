package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"bytes"
	"context"
	"fmt"
	"strconv"

	"github.com/Da-max/todo-go/graphql/generated"
	"github.com/Da-max/todo-go/graphql/model"
	"github.com/Da-max/todo-go/utils/auth"
	"github.com/Da-max/todo-go/utils/mail"
)

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, input model.Identifier) (*model.Tokens, error) {
	var (
		user   *model.User   = &model.User{Username: input.Username}
		tokens *model.Tokens = &model.Tokens{}
	)

	if result := r.DB.First(user); result.Error != nil {
		return nil, result.Error
	}

	if err := auth.ComparePassword(user.Password, input.Password); err != nil {
		return nil, err
	}

	_, tokenString, err := auth.GenerateAuthorizationToken(user)

	if err != nil {
		return nil, err
	}

	tokens.AccessToken = tokenString
	tokens.RefreshToken = tokenString

	return tokens, nil
}

// SignUp is the resolver for the signUp field.
func (r *mutationResolver) SignUp(ctx context.Context, input model.NewUser) (*model.User, error) {
	var (
		user *model.User = &model.User{
			Username: input.Username,
			Email:    input.Email,
		}
		message   bytes.Buffer
		mailError chan error = make(chan error, 1)
	)

	if hashPassword, err := auth.HashPassword(input.Password); err != nil {
		return nil, fmt.Errorf("the password cannot be hash")
	} else {
		user.Password = hashPassword
	}

	if result := r.DB.Create(user); result.Error != nil {
		return nil, fmt.Errorf("the user cannot be saved")
	}

	_, token, err := auth.TokenAuth.Encode(map[string]interface{}{"ID": int(user.ID)})

	if err != nil {
		return nil, err
	}

	message.WriteString("Merci de cliquer sur ce lien afin de confirmer votre compte : ")
	message.WriteString(r.Config.Host)
	message.WriteString(strconv.Itoa(r.Config.FrontendPort))
	message.WriteString("/#/confirm-account?token=")
	message.WriteString(token)
	go func() {
		mailError <- mail.SendMail([]string{user.Email}, "Confirmer votre compte", message.String())

		if err := <-mailError; err != nil {
			fmt.Println("The mail cannot be send.")
		}
	}()

	return user, nil
}

// ConfirmAccount is the resolver for the confirmAccount field.
func (r *mutationResolver) ConfirmAccount(ctx context.Context, input *model.ConfirmIdentifier) (*model.Confirm, error) {
	var user *model.User = &model.User{}
	claims, err := auth.TokenAuth.Decode(input.Token)

	if err != nil {
		return nil, fmt.Errorf("the token cannot be decode")
	}

	id, found := claims.Get("ID")

	if !found {
		return nil, fmt.Errorf("the token is not valid")
	}

	if res := r.DB.First(user, id); res.Error != nil || user.IsActive == true {
		return nil, fmt.Errorf("the user cannot be found")
	}

	user.IsActive = true
	if res := r.DB.Save(user); res.Error != nil {
		return nil, fmt.Errorf("the user cannot be update")
	}

	_, tokenString, err := auth.GenerateAuthorizationToken(user)

	if err != nil {
		return nil, err
	}

	return &model.Confirm{Token: tokenString, Ok: user.IsActive}, nil

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
