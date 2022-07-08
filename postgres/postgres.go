package postgres

import (
	"os"

	"github.com/Da-max/todo-go/graphql/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func getDsn(gormForm bool) string {
	var (
		res string
	)
	if gormForm {
		res = "host=db user=" + os.Getenv("POSTGRES_USER") + " password=" + os.Getenv("POSTGRES_PASSWORD") + " dbname=" + os.Getenv("POSTGRES_DB") + " sslmode=disable"
	} else {
		res = "postgres://" + os.Getenv("POSTGRES_USER") + ":" + os.Getenv("POSTGRES_PASSWORD") + "@db:5432" + "/" + os.Getenv("POSTGRES_DB") + "?sslmode=disable"
	}
	return res
}

func New() *gorm.DB {
	if db, err := gorm.Open(postgres.Open(getDsn(true)), &gorm.Config{}); err != nil {
		panic(err)
	} else {
		return db
	}

}

func Migrate() {

	db := New()

	db.AutoMigrate(&model.User{}, &model.Todo{})

	// db, err := sql.Open("postgres", getDsn(false))
	// if err != nil {
	// 	log.Fatal(err)
	// 	// }
	//
	// driver, err := postgresDriver.WithInstance(db, &postgresDriver.Config{})
	// if err != nil {
	// 	log.Fatal(err)
	// 	// }
	//
	// m, err := migrate.NewWithDatabaseInstance("file://postgres/migrations", "postgres", driver)
	// if err := m.Up(); err != nil {
	// 	log.Println(err)
	// }
}
