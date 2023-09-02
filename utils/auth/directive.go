package auth

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
)

func IsLogged(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {

	if user := ForContext(ctx); user == nil {
		return nil, fmt.Errorf("access denied")
	}

	return next(ctx)
}

func IsActive(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {
	if user := ForContext(ctx); user == nil || !user.IsActive {
		return nil, fmt.Errorf("access denied")
	}

	return next(ctx)
}
