package user

import (
	"github.com/Da-max/todo-go/internal/core/domain"
)

func toDBModel(entity *domain.User) *User {
	return &User{
		ID:       entity.ID,
		Username: entity.Username,
		Email:    entity.Email,
		Password: entity.Password,
		IsActive: entity.IsActive,
		IsAdmin:  entity.IsAdmin,
	}
}

func ToDomainModel(model *User) *domain.User {
	var user = domain.NewUser(model.ID, model.Username, model.Email, model.Password, model.IsActive, model.IsAdmin)
	return &user
}
