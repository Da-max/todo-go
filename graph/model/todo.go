package model

import "github.com/uptrace/bun"

type Todo struct {
	bun.BaseModel
	ID     int    `json:"id"`
	Text   string `json:"text"`
	Done   bool   `json:"done"`
	UserId *int   `json:"userId"`
}
