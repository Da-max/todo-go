// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Confirm struct {
	Ok    bool   `json:"ok"`
	Token string `json:"token"`
}

type ConfirmIdentifier struct {
	Token string `json:"token"`
}

type Identifier struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type NewTodo struct {
	Text string `json:"text"`
}

type NewUser struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Tokens struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}
