package auth

import (
	"errors"
	"github.com/Da-max/todo-go/internal/core/domain"
	"github.com/Da-max/todo-go/internal/repositories/user"
	"github.com/go-chi/jwtauth/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"time"
)

type Repository struct {
	TokenAuth *jwtauth.JWTAuth
	DB        *gorm.DB
}

func NewAuthRepository(tokenAuth *jwtauth.JWTAuth, db *gorm.DB) *Repository {
	return &Repository{
		TokenAuth: tokenAuth,
		DB:        db,
	}
}

func (r *Repository) GeneratePassword(password string) (string, error) {
	pw := []byte(password)
	result, err := bcrypt.GenerateFromPassword(pw, bcrypt.DefaultCost)
	return string(result), err
}

func (r *Repository) GetCurrentUser(token *domain.Token) (*domain.User, error) {
	var (
		t, err  = jwtauth.VerifyToken(r.TokenAuth, *token)
		userObj = &user.User{}
	)

	if err != nil {
		return nil, err
	}

	var (
		id, find               = t.Get("ID")
		username, findUsername = t.Get("Username")
	)

	if !find || !findUsername {
		return nil, errors.New("context not found")
	}

	if res := r.DB.Where("username = ?", username).Where("id = ?", id).First(userObj); res.Error != nil {
		return nil, err
	}

	return user.ToDomainModel(userObj), err
}

func (r *Repository) CheckPassword(user *domain.User, password string) (bool, error) {
	pw := []byte(password)
	hw := []byte(user.Password)
	if err := bcrypt.CompareHashAndPassword(hw, pw); err != nil {
		return false, err
	}
	return true, nil
}

func (r *Repository) GenerateTokens(user *domain.User, expiresIn time.Duration) (*domain.Tokens, error) {
	var (
		claims   = map[string]interface{}{"Username": user.Username, "ID": user.ID}
		rtClaims = map[string]interface{}{"Username": user.Username, "ID": user.ID, "Sub": 1}
	)

	jwtauth.SetExpiryIn(claims, expiresIn)
	jwtauth.SetExpiryIn(rtClaims, expiresIn*2)

	var _, tokenString, err = r.TokenAuth.Encode(claims)
	var _, rtTokenString, rtErr = r.TokenAuth.Encode(rtClaims)

	if err != nil || rtErr != nil {
		return nil, err
	}

	return domain.NewTokens(tokenString, rtTokenString, int(expiresIn)), nil
}

func (r *Repository) GenerateToken(id string) (*domain.Token, error) {
	var claims = map[string]interface{}{"ID": id}

	var _, tokenString, err = r.TokenAuth.Encode(claims)

	if err != nil {
		return nil, err
	}

	return domain.NewToken(tokenString), nil
}

func (r *Repository) DecodeToken(token *domain.Token) (string, error) {
	var t, err = jwtauth.VerifyToken(r.TokenAuth, *token)

	if err != nil {
		return "", err
	}

	var id, find = t.Get("ID")

	if !find {
		return "", errors.New("content not found")
	}

	return id.(string), nil
}
