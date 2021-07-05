package main

import (
	"os"
	"time"

	log "github.com/sirupsen/logrus"
	"github.com/urfave/cli"

	"github.com/Expandergraph/crypto-crawler/cmd"
)

const module = "crawler"

func main() {
	app := cli.NewApp()
	app.Name = "crypto crawler"
	app.HideVersion = true
	app.Description = "Run crawler COMMAND --help for more information on a command"
	app.Compiled = time.Now()
	app.Commands = []cli.Command{
		{
			Name:   "daemon",
			Usage:  "Start a basic daemon process",
			Action: cmd.Daemon,
		},
		{
			Name:  "init",
			Usage: "Init daemon process",
			Action: func(ctx *cli.Context) error {
				return cmd.DoInit()
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.WithFields(log.Fields{"module": module, "err": err}).Error("failed on run app")
	}
}
