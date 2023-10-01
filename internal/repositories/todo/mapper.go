package todo

import (
	"github.com/Da-max/todo-go/internal/core/domain"
)

func toDBModel(entity *domain.Todo) *Todo {
	return &Todo{
		ID:     entity.ID,
		Text:   entity.Text,
		Done:   entity.Done,
		UserID: entity.UserID,
	}
}

func toDomainModel(entity *Todo) *domain.Todo {
	return &domain.Todo{
		ID:     entity.ID,
		Text:   entity.Text,
		Done:   entity.Done,
		UserID: entity.UserID,
	}
}
