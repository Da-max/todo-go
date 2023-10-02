package domain

type MessageType byte

const (
	ConfirmAccount       = 0
	RequestResetPassword = 1
	ResetPassword        = 2
	DeleteAccount        = 3
)
