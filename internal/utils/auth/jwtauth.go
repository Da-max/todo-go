package auth

import (
	"context"
	"github.com/Da-max/todo-go/internal/core/domain"
	"github.com/Da-max/todo-go/internal/utils/errors"
	"net/http"

	"github.com/Da-max/todo-go/internal/utils/config"
	"github.com/go-chi/jwtauth/v5"
)

var TokenAuth *jwtauth.JWTAuth
var TokenCtxKey = "token"

func init() {
	TokenAuth = jwtauth.New("HS256", []byte(config.GetConfig().SecretKey), nil)
}

func AuthenticatorMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		tokenString := jwtauth.TokenFromHeader(r)

		if tokenString == "" {
			next.ServeHTTP(w, r)
			return
		}

		ctx := context.WithValue(r.Context(), TokenCtxKey, &tokenString)

		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func GetTokenCtx(ctx context.Context) (*domain.Token, error) {
	var token = ctx.Value(TokenCtxKey)

	switch token.(type) {
	case *string:
		return domain.NewToken(*token.(*string)), nil
	default:
		return nil, errors.Unauthorized
	}
}
