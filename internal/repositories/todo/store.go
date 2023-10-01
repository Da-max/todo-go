package todo

import (
	"github.com/Da-max/todo-go/internal/core/domain"
	"gorm.io/gorm"
)

type Repository struct {
	DB *gorm.DB
}

func NewTodoRepository(db *gorm.DB) *Repository {
	return &Repository{
		DB: db,
	}
}

func (r *Repository) GetByUserId(userId string) ([]*domain.Todo, error) {

	var (
		todos []Todo
		res   []*domain.Todo
	)

	if res := r.DB.Where("user_id = ?", userId).Find(todos); res.Error != nil {
		return nil, res.Error
	}

	for _, todo := range todos {
		res = append(res, toDomainModel(&todo))
	}

	return res, nil
}

func (r *Repository) GetAll() ([]*domain.Todo, error) {
	var (
		todos []Todo
		res   []*domain.Todo
	)

	if res := r.DB.Find(todos); res.Error != nil {
		return nil, res.Error
	}

	for _, todo := range todos {
		res = append(res, toDomainModel(&todo))
	}

	return res, nil
}

func (r *Repository) Get(id string) (*domain.Todo, error) {
	var (
		todo Todo
	)

	if res := r.DB.First(&todo, id); res.Error != nil {
		return nil, res.Error
	}

	return toDomainModel(&todo), nil
}

func (r *Repository) Save(todo *domain.Todo) error {
	var todoTable = toDBModel(todo)

	if res := r.DB.Where(Todo{ID: todo.ID}).Assign(todoTable).FirstOrCreate(todoTable); res.Error != nil {
		return res.Error
	}

	return nil
}

func (r *Repository) Remove(todo *domain.Todo) error {
	var todoFormatted = toDBModel(todo)

	if res := r.DB.Delete(todoFormatted); res.Error != nil {
		return res.Error
	}

	return nil
}
