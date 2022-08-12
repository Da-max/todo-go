package auth

import (
	"context"
	"net/http"

	"github.com/Da-max/todo-go/graphql/model"
	"github.com/Da-max/todo-go/utils/config"
	"github.com/go-chi/jwtauth/v5"
	"github.com/lestrrat-go/jwx/jwt"
	"gorm.io/gorm"
)

var TokenAuth *jwtauth.JWTAuth

type contextKey struct {
	name string
}

var userCtxKey = &contextKey{"user"}

func init() {
	TokenAuth = jwtauth.New("HS256", []byte(config.GetConfig().SecretKey), nil)
}

func AuthenticatorMiddleware(db *gorm.DB) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
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
			id, idOk := claims["ID"]

			if claims["ID"] != nil && idOk {
				var user = &model.User{}
				if res := db.First(user, id); res.Error != nil {
					http.Error(w, error.Error(res.Error), http.StatusUnauthorized)
				}

				ctx := context.WithValue(r.Context(), userCtxKey, user)

				r = r.WithContext(ctx)
			}

			next.ServeHTTP(w, r)
		}
		return http.HandlerFunc(hfn)
	}

}

func GenerateAuthorizationToken(user *model.User) (jwt.Token, string, error) {
	return TokenAuth.Encode(map[string]interface{}{"Username": user.Username, "ID": int(user.ID)})
}

func ForContext(ctx context.Context) *model.User {
	user := ctx.Value(userCtxKey)
	if user != nil {
		return user.(*model.User)
	}
	return nil
}
