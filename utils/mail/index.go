package mail

import (
	"github.com/matcornic/hermes/v2"
	"net/smtp"
	"strconv"

	"github.com/Da-max/todo-go/utils/config"
)

func SendMail(to []string, subject string, message string) error {
	var (
		conf       config.Config = config.GetConfig()
		mime       string        = "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
		bMessage   []byte        = []byte("Subject: " + subject + "\n" + mime + message)
		auth       smtp.Auth     = smtp.PlainAuth("", conf.EmailFrom, conf.EmailPassword, conf.EmailHost)
		portString string        = strconv.Itoa(conf.EmailPort)
	)

	if err := smtp.SendMail(conf.EmailHost+":"+portString, auth, conf.EmailFrom, to, bMessage); err != nil {
		return err
	}

	return nil
}

func SendMailFromModel(h hermes.Hermes, mailType Type, to []string, subject string, args ...interface{}) error {
	return SendMail(to, subject, GenerateMail(h, mailType, args...))
}

func New() hermes.Hermes {
	conf := config.GetConfig()
	return hermes.Hermes{
		Product: hermes.Product{Name: "Todo-go", Link: conf.GetAppUrl()},
	}
}
