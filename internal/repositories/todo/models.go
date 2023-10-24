package todo

import (
	"github.com/Da-max/todo-go/internal/repositories/user"
	"gorm.io/gorm"
)

type Todo struct {
	gorm.Model

	ID     string `gorm:"primaryKey"`
	Text   string
	Done   bool
	UserID string
	User   user.User
}
