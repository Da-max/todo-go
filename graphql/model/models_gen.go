// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Confirm struct {
	Ok    bool   `json:"ok"`
	Token string `json:"token"`
}

type ConfirmIdentifier struct {
	Token string `json:"token"`
}

type DeleteAccount struct {
	Ok bool `json:"ok"`
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

type RequestConfirmAccount struct {
	Ok bool `json:"ok"`
}

type RequestPasswordResetIdentifier struct {
	Email string `json:"email"`
}

type RequestResetPassword struct {
	Ok bool `json:"ok"`
}

type ResetPasswordIdentifier struct {
	Password string `json:"password"`
	Token    string `json:"token"`
}

type Tokens struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

type UpdateUser struct {
	Username *string `json:"username,omitempty"`
	Email    *string `json:"email,omitempty"`
}
