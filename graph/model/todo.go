package model

import "gorm.io/gorm"

type Todo struct {
	gorm.Model
	Text   string `json:"text"`
	Done   bool   `json:"done"`
	UserID int
	User   User
}
