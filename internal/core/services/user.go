package services

import (
	"fmt"
	"github.com/Da-max/todo-go/internal/core/domain"
	"github.com/Da-max/todo-go/internal/core/ports"
	"github.com/Da-max/todo-go/internal/utils/errors"
	"github.com/google/uuid"
)

type UserService struct {
	authRepository    ports.AuthRepository
	userRepository    ports.UserRepository
	messageRepository ports.MessageRepository
}

func NewUserService(authRepository ports.AuthRepository, userRepository ports.UserRepository, messageRepository ports.MessageRepository) *UserService {
	return &UserService{
		authRepository:    authRepository,
		userRepository:    userRepository,
		messageRepository: messageRepository,
	}
}

func (service *UserService) checkUser(token *domain.Token) (bool, error) {
	if _, err := service.authRepository.GetCurrentUser(token); err != nil {
		return false, errors.Unauthorized
	}

	return true, nil
}

func (service *UserService) checkUserUser(userId string, token *domain.Token) (bool, error) {
	if user, err := service.authRepository.GetCurrentUser(token); err != nil || !user.IsAdmin && (user.ID != userId || !user.IsActive) {
		if err != nil {
			return false, err
		}
		return false, errors.Unauthorized
	}

	return true, nil
}

func (service *UserService) checkAdmin(token *domain.Token) (bool, error) {
	user, err := service.authRepository.GetCurrentUser(token)

	if err != nil {
		return false, errors.Unauthorized
	}

	return user.IsAdmin, nil
}

func (service *UserService) GetAll(token *domain.Token) ([]*domain.User, error) {
	if res, err := service.checkAdmin(token); !res || err != nil {
		if err != nil {
			return nil, errors.Unauthorized
		}
		return nil, errors.Unauthorized
	}

	return service.userRepository.GetAll()

}

func (service *UserService) Create(username string, email string, password string, isAdmin bool, isActive bool) (*domain.User, error) {
	cryptPassword, err := service.authRepository.GeneratePassword(password)

	if err != nil {
		return nil, errors.Internal
	}

	userId := uuid.New().String()

	if userId == "" {
		return nil, errors.Internal
	}

	user := domain.NewUser(userId, username, email, cryptPassword, isActive, isAdmin)
	token, tokenErr := service.authRepository.GenerateToken(user.ID)

	if tokenErr != nil {
		return nil, errors.Internal
	}

	if err = service.userRepository.Save(&user); err != nil {
		return nil, errors.Internal
	}

	go func() {
		var mailError chan error = make(chan error, 1)
		if mailError <- service.messageRepository.SendMessage(domain.ConfirmAccount, "Confirmer votre compte", []string{email}, &user, token); mailError != nil {
			fmt.Print("A mail error occurred", mailError)
		}
	}()

	return &user, nil
}

func (service *UserService) Update(id string, username string, email string, password string, isAdmin bool, isActive bool, token *domain.Token) (*domain.User, error) {
	user, err := service.userRepository.Get(id)

	if err != nil {
		return nil, errors.NotFound
	}

	if res, err := service.checkUserUser(user.ID, token); !res || err != nil {
		return nil, errors.Unauthorized
	}

	if user.Password != password {
		cryptPassword, err := service.authRepository.GeneratePassword(password)

		if err != nil {
			return nil, errors.Internal
		}
		user.Password = cryptPassword
	}

	user.Username = username
	user.IsAdmin = isAdmin
	user.IsActive = isActive

	if user.Email != email {
		user.Email = email
		user.IsActive = false
	}

	return user, service.userRepository.Save(user)
}

func (service *UserService) Remove(id string, token *domain.Token) error {
	user, err := service.userRepository.Get(id)

	if err != nil {
		return errors.NotFound
	}

	if res, err := service.checkUserUser(user.ID, token); !res || err != nil {
		return errors.Unauthorized
	}

	return service.userRepository.Remove(user)
}

func (service *UserService) RequestConfirmAccount(id string, token *domain.Token) (bool, error) {
	var currentUser, err = service.authRepository.GetCurrentUser(token)
	if err != nil {
		return false, errors.Internal
	}

	if !currentUser.IsAdmin && currentUser.ID != id {
		return false, errors.Unauthorized
	}

	if currentUser.ID != id {
		currentUser, err = service.userRepository.Get(id)
		if err != nil {
			return false, errors.Internal
		}
	}

	var confirmToken, tokenErr = service.authRepository.GenerateToken(id)

	if tokenErr != nil {
		return false, errors.Internal
	}

	go func() {
		var mailError = make(chan error, 1)

		if mailError <- service.messageRepository.SendMessage(domain.ConfirmAccount, "Confirm your account", []string{currentUser.Email}, currentUser, confirmToken); mailError != nil {
			fmt.Print("An message error occurred", mailError)
		}
	}()

	return true, nil
}

func (service *UserService) ConfirmAccount(confirmToken *domain.Token, authToken *domain.Token) (*domain.User, error) {
	var userId, err = service.authRepository.DecodeToken(confirmToken)

	if err != nil {
		return nil, errors.Unauthorized
	}

	askUser, err := service.authRepository.GetCurrentUser(authToken)

	if err != nil {
		return nil, err
	}

	if userId != askUser.ID && !askUser.IsAdmin {
		return nil, errors.Unauthorized
	}

	user, err := service.userRepository.Get(userId)

	if err != nil {
		return nil, errors.NotFound
	}

	user.IsActive = true

	if err := service.userRepository.Save(user); err != nil {
		return nil, errors.Internal
	}

	return user, nil
}
