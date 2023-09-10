package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.31

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
	"github.com/Da-max/todo-go/graphql/generated"
	"github.com/Da-max/todo-go/graphql/model"
	"github.com/Da-max/todo-go/utils/auth"
	"github.com/Da-max/todo-go/utils/mail"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, input model.Identifier) (*model.Tokens, error) {
	var (
		user   *model.User   = &model.User{Username: input.Username}
		tokens *model.Tokens = &model.Tokens{}
	)

	if result := r.DB.First(user); result.Error != nil {
		graphql.AddError(ctx, gqlerror.Errorf("user or password are wrong"))
		return nil, nil
	}

	if err := auth.ComparePassword(user.Password, input.Password); err != nil {
		graphql.AddError(ctx, gqlerror.Errorf("user or password are wrong"))
		return nil, nil
	}

	_, tokenString, err := auth.GenerateAuthorizationToken(user)

	if err != nil {
		graphql.AddError(ctx, gqlerror.Errorf("fail to create token"))
		return nil, nil
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
		mailError chan error = make(chan error, 1)
	)

	if hashPassword, err := auth.HashPassword(input.Password); err != nil {
		return nil, fmt.Errorf("the password cannot be saved")
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

	go func() {
		mailError <- mail.SendMailFromModel(r.Hermes, mail.ConfirmAccount, []string{user.Email}, "Confirmer votre compte", user, token)

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
		return nil, fmt.Errorf("the token cannot be decoded")
	}

	id, found := claims.Get("ID")

	if !found {
		return nil, fmt.Errorf("the token isn’t valide")
	}

	if res := r.DB.First(user, id); res.Error != nil || user.IsActive == true {
		return nil, fmt.Errorf("the user isn’t found")
	}

	user.IsActive = true
	if res := r.DB.Save(user); res.Error != nil {
		return nil, fmt.Errorf("the user cannot be saved")
	}

	_, tokenString, err := auth.GenerateAuthorizationToken(user)

	if err != nil {
		return nil, err
	}

	return &model.Confirm{Token: tokenString, Ok: user.IsActive}, nil
}

// UpdateAccount is the resolver for the updateAccount field.
func (r *mutationResolver) UpdateAccount(ctx context.Context, input model.UpdateUser) (*model.User, error) {
	var (
		user         *model.User = auth.ForContext(ctx)
		emailChanged bool        = false
		mailError    chan error  = make(chan error)
	)

	if input.Email != nil && *input.Email != user.Email {
		user.Email = *input.Email
		emailChanged = true
	}

	if input.Username != nil {
		user.Username = *input.Username
	}

	if res := r.DB.Save(user); res.Error != nil {
		return nil, fmt.Errorf("the user cannot be updated")
	}

	if emailChanged {
		_, token, err := auth.TokenAuth.Encode(map[string]interface{}{"ID": int(user.ID)})

		if err != nil {
			return nil, err
		}

		go func() {
			mailError <- mail.SendMailFromModel(r.Hermes, mail.ConfirmAccount, []string{user.Email}, "Changement de votre email", user, token)

			if err := <-mailError; err != nil {
				fmt.Println("The mail cannot be send.")
			}
		}()
	}

	return user, nil
}

// DeleteAccount is the resolver for the deleteAccount field.
func (r *mutationResolver) DeleteAccount(ctx context.Context) (*model.DeleteAccount, error) {
	panic(fmt.Errorf("not implemented: DeleteAccount - deleteAccount"))
}

// RequestConfirmAccount is the resolver for the requestConfirmAccount field.
func (r *mutationResolver) RequestConfirmAccount(ctx context.Context) (*model.RequestConfirmAccount, error) {
	var (
		mailError chan error
		user      *model.User = auth.ForContext(ctx)
	)

	_, token, err := auth.TokenAuth.Encode(map[string]interface{}{"ID": int(user.ID)})

	if err != nil {
		return nil, err
	}

	go func() {
		mailError <- mail.SendMailFromModel(r.Hermes, mail.ConfirmAccount, []string{user.Email}, "Confirmer votre compte", user, token)

		if err := <-mailError; err != nil {
			fmt.Println("the mail cannot be send")
		}
	}()

	return &model.RequestConfirmAccount{Ok: true}, nil
}

// RequestResetPassword is the resolver for the requestResetPassword field.
func (r *mutationResolver) RequestResetPassword(ctx context.Context, input model.RequestPasswordResetIdentifier) (*model.RequestResetPassword, error) {
	var (
		user      *model.User                 = &model.User{Email: input.Email}
		mailError chan error                  = make(chan error, 1)
		result    *model.RequestResetPassword = &model.RequestResetPassword{Ok: true}
	)

	if res := r.DB.First(user); res.Error != nil {
		return result, nil
	}

	_, token, err := auth.TokenAuth.Encode(map[string]interface{}{"ID": int(user.ID)})

	if err != nil {
		return result, nil
	}

	go func() {
		mailError <- mail.SendMailFromModel(r.Hermes, mail.RequestResetPassword, []string{user.Email}, "Réinitialiser votre mot de passe", user, token)

		if err := <-mailError; err != nil {
			fmt.Println("The mail cannot be send.")
		}
	}()

	return result, nil
}

// ResetPassword is the resolver for the resetPassword field.
func (r *mutationResolver) ResetPassword(ctx context.Context, input model.ResetPasswordIdentifier) (*model.Confirm, error) {
	var (
		user      *model.User = &model.User{}
		mailError chan error  = make(chan error, 1)
	)
	claims, err := auth.TokenAuth.Decode(input.Token)

	if err != nil {
		graphql.AddError(ctx, gqlerror.Errorf("The token cannot be decoded."))
		return nil, nil
	}

	id, found := claims.Get("ID")

	if !found {
		return nil, gqlerror.Errorf("The token isn’t valid.")
	}

	if res := r.DB.First(user, id); res.Error != nil {
		return nil, gqlerror.Errorf("The user isn’t found")
	}

	if hashPassword, err := auth.HashPassword(input.Password); err != nil {
		return nil, gqlerror.Errorf("The password cannot be hash.")
	} else {
		user.Password = hashPassword
	}

	if res := r.DB.Save(user); res.Error != nil {
		return nil, gqlerror.Errorf("The user cannot be update")
	}

	_, tokenString, err := auth.GenerateAuthorizationToken(user)

	if err != nil {
		return nil, err
	}

	go func() {
		mailError <- mail.SendMailFromModel(r.Hermes, mail.ResetPassword, []string{user.Email}, "Your password changed", user)

		if err := <-mailError; err != nil {
			fmt.Println("The mail cannot be send.")
		}
	}()

	return &model.Confirm{Token: tokenString, Ok: true}, nil
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
