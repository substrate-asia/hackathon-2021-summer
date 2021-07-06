package cmd

import (
	"io/ioutil"
	"os"
	"path/filepath"

	"github.com/gobuffalo/packd"
	"github.com/gobuffalo/packr"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"

	"github.com/Expandergraph/crypto-crawler/config"
)

const (
	configPath = "../config/default/"
)

func DoInit() error {
	rootPath, err := config.PathRoot()
	if err != nil {
		return err
	}

	log.WithFields(log.Fields{"dir": rootPath}).Info("root path")
	if err := copyDefaultConfig(rootPath); err != nil {
		return errors.Wrap(err, "failed on copy default config to local")
	}

	if err := config.WriteDefaultConfig(rootPath); err != nil {
		return errors.Wrap(err, "failed on write default config")
	}

	return nil
}

func copyDefaultConfig(destDir string) error {
	box := packr.NewBox(configPath)
	if err := box.Walk(func(s string, file packd.File) error {
		p := filepath.Join(destDir, s)
		dir := filepath.Dir(p)
		if _, err := os.Stat(dir); os.IsNotExist(err) {
			err := os.MkdirAll(dir, 0755)
			if err != nil {
				return err
			}
		}

		return ioutil.WriteFile(p, []byte(file.String()), 0644)
	}); err != nil {
		return err
	}

	return nil
}
