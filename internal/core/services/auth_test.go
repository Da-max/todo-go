package services

import (
	"errors"
	"github.com/Da-max/todo-go/internal/core/domain"
	mock_ports "github.com/Da-max/todo-go/internal/core/ports/mock"
	myErrors "github.com/Da-max/todo-go/utils/errors"
	"go.uber.org/mock/gomock"
	"testing"
	"time"
)

func TestAuthService_GetCurrentUser(t *testing.T) {
	ctrl := gomock.NewController(t)
	token := "token"

	m := mock_ports.NewMockAuthRepository(ctrl)

	m.EXPECT().GetCurrentUser(gomock.Any()).Return(&domain.User{}, nil)

	service := NewAuthService(m, mock_ports.NewMockUserRepository(ctrl))

	user, err := service.GetCurrentUser(&token)

	if err != nil || user == nil {
		t.Fatalf("The error must be nil and the user isn’t be nil")
	}
}

func TestAuthService_GetCurrentUser2(t *testing.T) {
	ctrl := gomock.NewController(t)
	token := "token"

	m := mock_ports.NewMockAuthRepository(ctrl)

	m.EXPECT().GetCurrentUser(&token).Return(nil, errors.New("ERROR"))

	service := NewAuthService(m, mock_ports.NewMockUserRepository(ctrl))

	user, err := service.GetCurrentUser(&token)

	if err != myErrors.NotFound || user != nil {
		t.Fatalf("The error must be contains and the user must be nil")
	}
}

func TestAuthService_Login(t *testing.T) {
	ctrl := gomock.NewController(t)
	authRepo := mock_ports.NewMockAuthRepository(ctrl)
	userRepo := mock_ports.NewMockUserRepository(ctrl)
	expires, _ := time.ParseDuration("48h")
	user := &domain.User{}
	token := &domain.Tokens{}

	userRepo.EXPECT().GetByUsername(gomock.Eq("test")).Return(user, nil)

	authRepo.EXPECT().CheckPassword(gomock.Any(), gomock.Any()).Return(true, nil)
	authRepo.EXPECT().GenerateTokens(gomock.Eq(user), gomock.Eq(expires)).Return(token, nil)

	service := NewAuthService(authRepo, userRepo)

	generateToken, err := service.Login("test", "password")

	if generateToken != token || err != nil {
		t.Fatalf("The token must not be empty and the error must be empty.")
	}
}
