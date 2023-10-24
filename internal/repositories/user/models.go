package user

import "gorm.io/gorm"

type User struct {
	gorm.Model

	ID       string `gorm:"primaryKey"`
	Username string `gorm:"unique"`
	Email    string `gorm:"unique"`
	Password string
	IsActive bool
	IsAdmin  bool
}
