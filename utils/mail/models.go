package mail

import (
	"fmt"
	"github.com/Da-max/todo-go/graphql/model"
	"github.com/Da-max/todo-go/utils/config"
	"github.com/matcornic/hermes/v2"
)

type Type byte

const (
	ConfirmAccount       = 0
	RequestResetPassword = 1
	ResetPassword        = 2
)

func generateRequestResetPasswordMail(h hermes.Hermes, user *model.User, token string) string {
	var conf = config.GetConfig()
	res, err := h.GenerateHTML(hermes.Email{
		Body: hermes.Body{
			Name: user.Username,
			Intros: []string{
				"Vous recevez ce mail car une demande de réinitialisation de mot de passe a été effectué sur l’application Todo-go.",
			},
			Actions: []hermes.Action{
				{
					Instructions: "Cliquer sur le bouton ci-dessous afin de réinitialiser votre mot de passe :",
					Button: hermes.Button{
						Color: "#DC4D2F",
						Text:  "Réinitialiser votre mot de passe",
						Link:  conf.GetAppUrl() + "/#/auth/reset-password?token=" + token,
					},
				},
			},
			Outros: []string{
				"Si vous n’avez pas demandé de réinitialisation de mot de passe, aucune action n’est requise de votre part..",
			},
			Signature: "Merci",
		},
	})

	if err != nil {
		panic(err)
	}
	return res
}

func generateConfirmAccountMail(h hermes.Hermes, user *model.User, token string) string {
	var conf = config.GetConfig()
	res, err := h.GenerateHTML(hermes.Email{
		Body: hermes.Body{
			Name: user.Username,
			Intros: []string{
				"Welcome to TodoGO! We're very excited to have you on board.",
			},
			Actions: []hermes.Action{
				{
					Instructions: "To get started with TodoG0, please click here:",
					Button: hermes.Button{
						Text: "Confirm your account",
						Link: conf.GetAppUrl() + "/confirm?token=" + token,
					},
				},
			},
			Outros: []string{
				"Need help, or have questions? Just reply to this email, we'd love to help.",
			},
		},
	})

	if err != nil {
		panic(err)
	}
	return res
}

func generateResetPasswordMail(h hermes.Hermes, user *model.User) string {
	res, err := h.GenerateHTML(hermes.Email{
		Body: hermes.Body{
			Name: user.Username,
			Intros: []string{
				"Your password has just been changed. If you did not initiate this action, please contact us as soon as possible.",
			},
			Outros: []string{
				"Need help, or have questions? Just reply to this email, we'd love to help.",
			},
		},
	})

	if err != nil {
		panic(err)
	}

	return res
}

func GenerateMail(h hermes.Hermes, mailType Type, args ...interface{}) string {
	var (
		user  *model.User
		token string
		res   string
	)

	for _, v := range args {
		fmt.Print(v, "\n")
		switch v.(type) {
		case *model.User:
			user = v.(*model.User)
		case string:
			token = v.(string)
		}
	}

	if token == "" {
		fmt.Print(token + "\n")
	}

	switch mailType {
	case RequestResetPassword:
		if token == "" || user == nil {
			panic("Some params are missing")
		}
		res = generateRequestResetPasswordMail(h, user, token)
	case ConfirmAccount:
		if token == "" || user == nil {
			panic("Some params are missing")
		}
		res = generateConfirmAccountMail(h, user, token)
	case ResetPassword:
		if user == nil {
			panic("Some params are missing")
		}
		res = generateResetPasswordMail(h, user)
	}

	return res
}
