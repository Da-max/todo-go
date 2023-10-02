package message

import (
	"github.com/Da-max/todo-go/internal/core/domain"
	"github.com/Da-max/todo-go/utils/config"
	"github.com/matcornic/hermes/v2"
)

func (r *Repository) generateRequestResetPasswordMail(user *domain.User, token string) (string, error) {
	var conf = config.GetConfig()
	return r.h.GenerateHTML(hermes.Email{
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
}

func (r *Repository) generateConfirmAccountMail(user *domain.User, token string) (string, error) {
	var conf = config.GetConfig()
	return r.h.GenerateHTML(hermes.Email{
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

}

func (r *Repository) generateDeleteAccountMail(user *domain.User) (string, error) {
	return r.h.GenerateHTML(hermes.Email{
		Body: hermes.Body{
			Name: user.Username,
			Intros: []string{
				"Votre compte TodoGO a bien été supprimé. Merci beaucoup pour vous être inscrit et avoir utilisé nos services.",
			},
			Outros: []string{
				"Nous espérons vous revoir prochainement si le cœur vous en dit.",
			},
		},
	})

}

func (r *Repository) generateResetPasswordMail(user *domain.User) (string, error) {
	return r.h.GenerateHTML(hermes.Email{
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

}
