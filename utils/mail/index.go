package mail

import (
	"net/smtp"
	"strconv"

	"github.com/Da-max/todo-go/utils/config"
)

func SendMail(to []string, subject string, message string) error {
	var (
		config     config.Config = config.GetConfig()
		bMessage   []byte        = []byte("Subject: " + subject + "\r\n\r\n" + message)
		auth       smtp.Auth     = smtp.PlainAuth("", config.EmailFrom, config.EmailPassword, config.EmailHost)
		portString string        = strconv.Itoa(config.EmailPort)
	)

	if err := smtp.SendMail(config.EmailHost+":"+portString, auth, config.EmailFrom, to, bMessage); err != nil {
		return err
	}

	return nil
}
