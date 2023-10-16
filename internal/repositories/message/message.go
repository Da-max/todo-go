package message

import (
	"github.com/Da-max/todo-go/internal/core/domain"
	"github.com/Da-max/todo-go/internal/handlers/graph/model"
	"github.com/Da-max/todo-go/internal/utils/config"
	"github.com/matcornic/hermes/v2"
	"net/smtp"
	"strconv"
)

type Repository struct {
	h hermes.Hermes
}

func NewMessageRepository(h hermes.Hermes) *Repository {
	return &Repository{
		h: h,
	}
}

func (r *Repository) SendMessage(messageType domain.MessageType, subject string, to []string, args ...interface{}) (bool, error) {

	mail, err := r.generateMail(messageType, args)

	if err != nil {
		return false, err
	}

	var (
		conf       = config.GetConfig()
		mime       = "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
		bMessage   = []byte("Subject: " + subject + "\n" + mime + mail)
		auth       = smtp.PlainAuth("", conf.EmailFrom, conf.EmailPassword, conf.EmailHost)
		portString = strconv.Itoa(conf.EmailPort)
	)

	if err := smtp.SendMail(conf.EmailHost+":"+portString, auth, conf.EmailFrom, to, bMessage); err != nil {
		return false, err
	}

	return true, nil

}

func (r *Repository) generateMail(mailType domain.MessageType, args ...interface{}) (string, error) {
	var (
		user  *domain.User
		token string
		res   string
		err   error
	)

	for _, v := range args {
		switch v.(type) {
		case *model.User:
			user = v.(*domain.User)
		case string:
			token = v.(string)
		}
	}

	switch mailType {
	case domain.RequestResetPassword:
		if token == "" || user == nil {
			panic("Some params are missing")
		}
		res, err = r.generateRequestResetPasswordMail(user, token)
	case domain.ConfirmAccount:
		if token == "" || user == nil {
			panic("Some params are missing")
		}
		res, err = r.generateConfirmAccountMail(user, token)
	case domain.ResetPassword:
		if user == nil {
			panic("Some params are missing")
		}
		res, err = r.generateResetPasswordMail(user)
	case domain.DeleteAccount:
		res, err = r.generateDeleteAccountMail(user)
	}

	return res, err
}
