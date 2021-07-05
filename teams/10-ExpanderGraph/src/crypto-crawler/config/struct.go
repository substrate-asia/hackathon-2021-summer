package config

type DBInfo struct {
	Type     string `toml:"type"`
	User     string `toml:"user"`
	Password string `toml:"password"`
	IP       string `toml:"ip"`
	Port     string `toml:"port"`
	Name     string `toml:"name"`
}

type Infura struct {
	Token string `toml:"token"`
}

type Config struct {
	Infura Infura `toml:"infura"`
	DBInfo DBInfo `toml:"dbinfo"`
}
