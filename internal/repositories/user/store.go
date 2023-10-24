package user

import (
	"fmt"
	"github.com/Da-max/todo-go/internal/core/domain"
	"gorm.io/gorm"
)

type Repository struct {
	DB *gorm.DB
}

func NewUserRepository(db *gorm.DB) *Repository {
	return &Repository{
		DB: db,
	}
}

func (r *Repository) GetAll() ([]*domain.User, error) {
	var (
		users []User
		res   []*domain.User
	)

	if res := r.DB.Find(users); res.Error != nil {
		return nil, res.Error
	}

	for _, user := range users {
		res = append(res, ToDomainModel(&user))
	}

	return res, nil
}

func (r *Repository) Get(id string) (*domain.User, error) {
	var user = &User{ID: id}
	if res := r.DB.First(user); res.Error != nil {
		fmt.Println(res.Error)
		return nil, res.Error
	}

	return ToDomainModel(user), nil
}

func (r *Repository) GetByUsername(username string) (*domain.User, error) {
	var user = &User{}

	if res := r.DB.Where(User{Username: username}).First(user); res.Error != nil {
		return nil, res.Error
	}

	return ToDomainModel(user), nil
}

func (r *Repository) GetByEmail(email string) (*domain.User, error) {
	var user = &User{Email: email}

	if res := r.DB.First(user); res.Error != nil {
		return nil, res.Error
	}

	return ToDomainModel(user), nil
}

func (r *Repository) Save(user *domain.User) error {
	var modelUser = toDBModel(user)

	if res := r.DB.Save(modelUser); res.Error != nil {
		return res.Error
	}

	return nil
}

func (r *Repository) Remove(user *domain.User) error {
	var modelUser = toDBModel(user)

	if res := r.DB.Delete(modelUser); res.Error != nil {
		return res.Error
	}

	return nil
}
