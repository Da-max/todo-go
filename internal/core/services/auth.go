package services

import (
	"fmt"
	"github.com/Da-max/todo-go/internal/core/domain"
	"github.com/Da-max/todo-go/internal/core/ports"
	"github.com/Da-max/todo-go/internal/repositories/message"
	"github.com/Da-max/todo-go/utils/errors"
	"time"
)

type AuthService struct {
	authRepository    ports.AuthRepository
	userRepository    ports.UserRepository
	messageRepository message.Repository
}

func NewAuthService(authRepository ports.AuthRepository, userRepository ports.UserRepository) *AuthService {
	return &AuthService{authRepository: authRepository, userRepository: userRepository}
}

func (service *AuthService) GetCurrentUser(token *domain.Token) (*domain.User, error) {
	res, err := service.authRepository.GetCurrentUser(token)
	if err != nil {
		return nil, errors.NotFound
	}

	return res, nil
}

func (service *AuthService) Login(username string, password string) (*domain.Tokens, error) {
	var (
		user, err          = service.userRepository.GetByUsername(username)
		expiresIn, timeErr = time.ParseDuration("48h")
	)

	if timeErr != nil {
		return nil, errors.Internal
	}

	if err != nil {
		return nil, errors.NotFound
	}

	if res, err := service.authRepository.CheckPassword(user, password); !res || err != nil {
		return nil, errors.NotFound
	}

	return service.authRepository.GenerateTokens(user, expiresIn)

}

func (service *AuthService) ChangePassword(id string, oldPassword string, newPassword string, token *domain.Token) (*domain.User, error) {
	var (
		err        error
		user       *domain.User
		updateUser *domain.User
	)

	user, err = service.authRepository.GetCurrentUser(token)

	if err != nil {
		return nil, errors.Unauthorized
	}

	if !user.IsAdmin && (user.ID != id || !user.IsActive) {
		return nil, errors.Unauthorized
	}

	updateUser, err = service.userRepository.Get(id)

	if err != nil {
		return nil, errors.NotFound
	}

	if res, resErr := service.authRepository.CheckPassword(updateUser, oldPassword); !res || resErr != nil {
		return nil, errors.Unauthorized
	}

	updateUser.Password, err = service.authRepository.GeneratePassword(newPassword)

	if err != nil {
		return nil, errors.Internal
	}

	if err = service.userRepository.Save(updateUser); err != nil {
		return nil, errors.Internal
	}

	go func() {
		val, err := service.messageRepository.SendMessage(domain.ResetPassword, "Mise à jour de votre mot de passe", []string{updateUser.Email}, updateUser)
		if !val || err != nil {
			fmt.Print("An mail error occured", err)
		}
	}()

	return updateUser, nil
}
