package domain

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	IsActive bool   `json:"isActive"`
	IsAdmin  bool   `json:"isAdmin"`
}

func NewUser(id string, username string, email string, password string, isActive bool, isAdmin bool) User {
	return User{
		ID:       id,
		Username: username,
		Email:    email,
		Password: password,
		IsActive: isActive,
		IsAdmin:  isAdmin,
	}
}
