package postgres

import (
	"database/sql"
	"os"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

func New() *bun.DB {

	dns := "postgres://" + os.Getenv("POSTGRES_USER") + ":" + os.Getenv("POSTGRES_PASSWORD") + "@db:5432" + "/" + os.Getenv("POSTGRES_DB") + "?sslmode=disable"

	sqldb := sql.OpenDB(pgdriver.NewConnector(
		pgdriver.WithDSN(dns),
	))

	return bun.NewDB(sqldb, pgdialect.New())
}
