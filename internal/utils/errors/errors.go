package errors

type Error struct {
	code string
}

func (e Error) Error() string {
	return e.code
}

func Define(code string) Error {
	return Error{
		code: code,
	}
}

var (
	NotFound     = Define("NOT FOUND")
	Internal     = Define("INTERNAL")
	Unauthorized = Define("Unauthorized")
)
