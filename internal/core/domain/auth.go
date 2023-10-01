package domain

type Token = string

type Tokens struct {
	Token        Token  `json:"token"`
	RefreshToken string `json:"refreshToken"`
	ExpiresDate  int    `json:"expiresDate"`
}

func NewTokens(token Token, refreshToken string, expiresDate int) *Tokens {
	return &Tokens{
		Token:        token,
		RefreshToken: refreshToken,
		ExpiresDate:  expiresDate,
	}
}

func NewToken(token string) *Token {
	return &token
}
