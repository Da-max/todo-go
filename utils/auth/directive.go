package auth

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
)

func IsLoged(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {

	fmt.Println(ForContext(ctx))

	if user := ForContext(ctx); user == nil {
		return nil, fmt.Errorf("access denied")
	}

	return next(ctx)
}
