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

func NewUserService(authRepository ports.AuthRepository, userRepository ports.UserRepository) *UserService {
	return &UserService{
		authRepository: authRepository,
		userRepository: userRepository,
	}
}

func (service *UserService) checkUser(token *domain.Token) (bool, error) {
	if _, err := service.authRepository.GetCurrentUser(token); err != nil {
		return false, errors.Internal
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
		return false, errors.Internal
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
	user := domain.NewUser(uuid.New().String(), username, email, cryptPassword, isActive, isAdmin)

	go func() {
		if val, err := service.messageRepository.SendMessage(domain.ConfirmAccount, "Confirmer votre compte", []string{user.Email}, user); !val || err != nil {
			fmt.Print("A mail error occured", err)
		}
	}()

	return &user, service.userRepository.Save(&user)
}

func (service *UserService) Update(id string, username string, email string, password string, isAdmin bool, isActive bool, token *domain.Token) (*domain.User, error) {
	user, err := service.userRepository.Get(id)

	if err != nil {
		return nil, errors.NotFound
	}

	if res, err := service.checkUserUser(user.ID, token); !res || err != nil {
		return nil, errors.Unauthorized
	}

	cryptPassword, err := service.authRepository.GeneratePassword(password)

	if err != nil {
		return nil, errors.Internal
	}

	user.Username = username
	user.Email = email
	user.Password = cryptPassword
	user.IsAdmin = isAdmin
	user.IsActive = isActive

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
		if val, err := service.messageRepository.SendMessage(domain.ConfirmAccount, "Confirm your account", []string{currentUser.Email}, currentUser, confirmToken); !val || err != nil {
			fmt.Print("An message error occurred", err)
		}
	}()

	return true, nil
}

func (service *UserService) ConfirmAccount(id string, token *domain.Token) (*domain.User, error) {
	if res, err := service.checkUserUser(id, token); !res || err != nil {
		return nil, errors.Unauthorized
	}

	var user, err = service.userRepository.Get(id)

	if err != nil {
		return nil, errors.NotFound
	}

	user.IsActive = true

	if err := service.userRepository.Save(user); err != nil {
		return nil, errors.Internal
	}

	return user, nil
}
