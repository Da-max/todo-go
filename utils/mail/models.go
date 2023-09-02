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
				"Bienvenue sur TodoGO! Merci beaucoup pour vous être inscrit à notre service.",
			},
			Actions: []hermes.Action{
				{
					Instructions: "Pour commencer à utiliser TodoG0, merci de cliquer ici :",
					Button: hermes.Button{
						Text: "Confirmer votre compte",
						Link: conf.GetAppUrl() + "/#/auth/confirm-account?token=" + token,
					},
				},
			},
			Outros: []string{
				"Si vous avez besoin d’aide ou si vous avez des questions n’hésitez pas à répondre à ce mail, nous serons ravis de vous répondre.",
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
				"Votre mot de passe vient d’être changer. Si vous n’êtes pas à l’origine de cette action, merci de prendre contact avec nous le plus rapidement possible.",
			},
			Outros: []string{
				"Si vous avez besoin d’aide ou si vous avez des questions n’hésitez pas à répondre à ce mail, nous serons ravis de vous répondre.",
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
