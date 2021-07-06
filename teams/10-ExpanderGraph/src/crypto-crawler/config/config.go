package config

import (
	"os"
	"path/filepath"

	"github.com/mitchellh/go-homedir"
	"github.com/pkg/errors"
	"github.com/spf13/viper"
)

const (
	// DefaultPathName is the default config dir name
	DefaultPathName = ".crawler"

	// ConfigName is the default config name
	ConfigName = "crawler.toml"

	// DefaultPathRoot is the path to the default config dir location.
	DefaultPathRoot = "~/" + DefaultPathName

	// EnvDir is the environment variable used to change the path root.
	EnvDir = "CRAWLER_PATH"
)

// PathRoot obtain the software root path.
func PathRoot() (string, error) {
	dir := os.Getenv(EnvDir)
	var err error
	if len(dir) == 0 {
		dir, err = homedir.Expand(DefaultPathRoot)
	}
	return dir, err
}

func LoadConfig(cfgFile string) (*Config, error) {
	var cfg Config
	if "" == cfgFile {
		return nil, errors.New("config file path can't null")
	}

	v := viper.New()
	v.SetConfigFile(cfgFile)
	if err := v.ReadInConfig(); err != nil {
		return nil, errors.Wrap(err, "failed on read config file")
	}

	if err := v.Unmarshal(&cfg); err != nil {
		return nil, errors.Wrap(err, "failed on unmarshal config")
	}

	return &cfg, nil
}

func WriteDefaultConfig(rootPath string) error {
	cfgFile := filepath.Join(rootPath, ConfigName)
	if "" == cfgFile {
		return errors.New("config file path can't null")
	}

	v := viper.New()
	v.SetConfigFile(cfgFile)
	if err := v.ReadInConfig(); err != nil {
		return errors.Wrap(err, "failed on read config file")
	}

	var cfg Config
	if err := v.Unmarshal(&cfg); err != nil {
		return errors.Wrap(err, "failed on unmarshal config")
	}

	// write identity and datastore
	return v.WriteConfig()
}
