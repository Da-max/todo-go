package auth

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string, error) {
	pw := []byte(password)
	result, err := bcrypt.GenerateFromPassword(pw, bcrypt.DefaultCost)
	return string(result), err
}

func ComparePassword(hashPassword string, password string) error {
	pw := []byte(password)
	hw := []byte(hashPassword)
	return bcrypt.CompareHashAndPassword(hw, pw)
}
