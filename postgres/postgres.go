package postgres

import (
	"database/sql"
	"log"
	"os"

	"github.com/golang-migrate/migrate/v4"
	postgresDriver "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

func getDsn() string {
	return "postgres://" + os.Getenv("POSTGRES_USER") + ":" + os.Getenv("POSTGRES_PASSWORD") + "@db:5432" + "/" + os.Getenv("POSTGRES_DB") + "?sslmode=disable"
}

func New() *bun.DB {

	sqldb := sql.OpenDB(pgdriver.NewConnector(
		pgdriver.WithDSN(getDsn()),
	))

	return bun.NewDB(sqldb, pgdialect.New())
}

func Migrate() {
	db, err := sql.Open("postgres", getDsn())
	if err != nil {
		log.Fatal(err)
	}

	driver, err := postgresDriver.WithInstance(db, &postgresDriver.Config{})
	if err != nil {
		log.Fatal(err)
	}

	m, err := migrate.NewWithDatabaseInstance("file://postgres/migrations", "postgres", driver)
	if err := m.Up(); err != nil {
		log.Println(err)
	}
}
