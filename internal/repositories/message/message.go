package message

import (
	"crypto/tls"
	errors2 "errors"
	"github.com/Da-max/todo-go/internal/core/domain"
	"github.com/Da-max/todo-go/internal/utils/config"
	"github.com/matcornic/hermes/v2"
	"github.com/wneessen/go-mail"
	"net/smtp"
)

type Repository struct {
	h hermes.Hermes
}

type unencryptedAuth struct {
	smtp.Auth
}

func (a unencryptedAuth) Start(server *smtp.ServerInfo) (string, []byte, error) {
	s := *server
	s.TLS = true
	return a.Auth.Start(&s)
}

func NewMessageRepository(h hermes.Hermes) *Repository {
	return &Repository{
		h: h,
	}
}

func (r *Repository) SendMessage(messageType domain.MessageType, subject string, to []string, args ...interface{}) error {

	m, err := r.generateMail(messageType, args...)

	if err != nil {
		return err
	}

	var (
		conf    = config.GetConfig()
		message = mail.NewMsg()
	)
	auth, err := mail.NewClient(conf.EmailHost, mail.WithPort(conf.EmailPort))

	if err != nil {
		return err
	}

	if conf.Debug {
		if err := auth.SetTLSConfig(&tls.Config{InsecureSkipVerify: true}); err != nil {
			return err
		}
		auth.SetTLSPolicy(mail.NoTLS)
		auth.SetSSL(false)
	}

	if err := message.From(conf.EmailFrom); err != nil {
		return err
	}
	if err := message.To(to...); err != nil {
		return err
	}
	message.Subject(subject)
	message.SetBodyString("text/html", m)

	if err := auth.DialAndSend(message); err != nil {
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
			return "", errors2.New("somme params missing")
		}
		res, err = r.generateRequestResetPasswordMail(user, *token)
	case domain.ConfirmAccount:
		if *token == "" || user == nil {
			return "", errors2.New("somme params missing")
		}
		res, err = r.generateConfirmAccountMail(user, *token)
	case domain.ResetPassword:
		if user == nil {
			return "", errors2.New("somme params missing")
		}
		res, err = r.generateResetPasswordMail(user)
	case domain.DeleteAccount:
		res, err = r.generateDeleteAccountMail(user)
	}

	return res, err
}
