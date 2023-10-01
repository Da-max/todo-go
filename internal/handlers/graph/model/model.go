package model

import "github.com/Da-max/todo-go/internal/core/domain"

func ToUserModel(user *domain.User) *User {
	return &User{Username: user.Username, ID: user.ID, IsAdmin: user.IsAdmin, IsActive: user.IsActive}
}

func ToTodoModel(todo *domain.Todo) *Todo {
	return &Todo{Text: todo.Text, ID: todo.ID, UserID: todo.UserID, Done: todo.Done}
}

func ToTokensModel(token *domain.Tokens) *Tokens {
	return &Tokens{
		RefreshToken: token.RefreshToken,
		AccessToken:  token.Token,
	}
}
