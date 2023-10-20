package message

import (
	"github.com/Da-max/todo-go/internal/core/domain"
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

func (r *Repository) SendMessage(messageType domain.MessageType, subject string, to []string, args ...interface{}) error {

	mail, err := r.generateMail(messageType, args...)

	if err != nil {
		return err
	}

	var (
		conf       = config.GetConfig()
		mime       = "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
		bMessage   = []byte("Subject: " + subject + "\n" + mime + mail)
		auth       = smtp.PlainAuth("", conf.EmailFrom, conf.EmailPassword, conf.EmailHost)
		portString = strconv.Itoa(conf.EmailPort)
	)

	if err := smtp.SendMail(conf.EmailHost+":"+portString, auth, conf.EmailFrom, to, bMessage); err != nil {
		return err
	}

	return nil

}

func (r *Repository) generateMail(mailType domain.MessageType, args ...interface{}) (string, error) {
	var (
		user  *domain.User
		token *domain.Token
		res   string
		err   error
	)

	for _, v := range args {
		switch v.(type) {
		case *domain.User:
			user = v.(*domain.User)
		case *domain.Token:
			token = v.(*domain.Token)
		}
	}

	switch mailType {
	case domain.RequestResetPassword:
		if *token == "" || user == nil {
			panic("Some params are missing")
		}
		res, err = r.generateRequestResetPasswordMail(user, *token)
	case domain.ConfirmAccount:
		if *token == "" || user == nil {
			panic("Some params are missing")
		}
		res, err = r.generateConfirmAccountMail(user, *token)
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
