package auth

import (
	"context"
	"net/http"

	"github.com/Da-max/todo-go/config"
	"github.com/go-chi/jwtauth/v5"
	"github.com/lestrrat-go/jwx/jwt"
)

var TokenAuth *jwtauth.JWTAuth

func init() {
	TokenAuth = jwtauth.New("HS256", []byte(config.GetConfig().SecretKey), nil)
}

func Authenticator(next http.Handler) http.Handler {
	hfn := func(w http.ResponseWriter, r *http.Request) {
		var (
			tokenString string
			token       jwt.Token
			claims      map[string]interface{}
			err         error
		)

		tokenString = jwtauth.TokenFromHeader(r)

		if tokenString == "" {
			next.ServeHTTP(w, r)
			return
		}

		jwtauth.Verify(TokenAuth, jwtauth.TokenFromHeader)

		token, err = TokenAuth.Decode(tokenString)

		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		claims, err = token.AsMap(r.Context())

		if err != nil || claims == nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		if claims["Username"] != nil {
			ctx := context.WithValue(r.Context(), "Username", claims["Username"])
			r = r.WithContext(ctx)
		}

		next.ServeHTTP(w, r)
	}
	return http.HandlerFunc(hfn)

}
