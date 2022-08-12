package config

import (
	"os"
	"strconv"
)

const (
	defaultPort         = 5000
	defaultFrontendPort = 3000
)

type Config struct {
	Host          string
	FrontendPort  int
	Port          int
	Debug         bool
	SecretKey     string
	EmailFrom     string
	EmailPassword string
	EmailHost     string
	EmailPort     int
}

func getEnv[T string | int | bool](key string, def T) T {
	var (
		value   T
		initial interface{} = os.Getenv(key)
	)

	_, isString := any(value).(string)
	_, isBool := any(value).(bool)
	_, isInt := any(value).(int)

	if initial == "" || initial == nil {
		value = def
	} else if isString {
		value = initial.(T)
	} else if isBool {
		val, _ := strconv.ParseBool(initial.(string))
		value = any(val).(T)
	} else if isInt {
		val, _ := strconv.Atoi(initial.(string))
		value = any(val).(T)
	}

	return value
}

func GetConfig() Config {
	c := Config{}

	c.FrontendPort = getEnv("VITE_PORT", defaultFrontendPort)
	c.Port = getEnv("SERVER_PORT", defaultPort)
	c.Debug = getEnv("SERVER_DEBUG", false)
	c.SecretKey = getEnv("SERVER_SECRET_KEY", "87621ee5accedadb3d9c0f6a00e1f27c52f53814589c2aeb3033dc813e6231fcc80ddd205263afdae5413edac938c4b3a1212c14deb32cf96134a1be428f9f5d")
	c.EmailFrom = getEnv("EMAIL_FROM", "")
	c.EmailHost = getEnv("EMAIL_HOST", "")
	c.EmailPassword = getEnv("EMAIL_PASSWORD", "")
	c.EmailPort = getEnv("EMAIL_PORT", 587)
	c.Host = "http://localhost:"

	return c

}
