package domain

type Todo struct {
	ID     string `json:"id"`
	Text   string `json:"text"`
	Done   bool   `json:"done"`
	UserID string `json:"userID"`
}

func NewTodo(id string, text string, done bool, userID string) Todo {
	return Todo{
		ID:     id,
		Text:   text,
		Done:   done,
		UserID: userID,
	}
}

func (todo Todo) MarkDoneTodo() {
	todo.Done = true
}

func (todo Todo) MarkUndoneTodo() {
	todo.Done = false
}
