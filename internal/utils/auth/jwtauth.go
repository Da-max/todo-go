package auth

import (
	"context"
	"net/http"

	"github.com/Da-max/todo-go/internal/utils/config"
	"github.com/go-chi/jwtauth/v5"
)

var TokenAuth *jwtauth.JWTAuth
var TokenCtxKey = "token"

func init() {
	TokenAuth = jwtauth.New("HS256", []byte(config.GetConfig().SecretKey), nil)
}

func AuthenticatorMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		hfn := func(w http.ResponseWriter, r *http.Request) {
			var (
				tokenString string
			)

			tokenString = jwtauth.TokenFromHeader(r)

			if tokenString == "" {
				next.ServeHTTP(w, r)
				return
			}

			ctx := context.WithValue(r.Context(), TokenCtxKey, &tokenString)

			r = r.WithContext(ctx)

			next.ServeHTTP(w, r)
		}
		return http.HandlerFunc(hfn)
	}

}
