package cmd

import (
	"context"
	"fmt"
	"io"
	"os"
	"os/signal"
	"path/filepath"
	"sync"
	"syscall"

	"github.com/Expandergraph/crypto-crawler/collector"
	"github.com/Expandergraph/crypto-crawler/database"

	"github.com/pkg/errors"

	"github.com/Expandergraph/crypto-crawler/config"

	log "github.com/sirupsen/logrus"
	"github.com/urfave/cli"
)

const module = "cmd"

// Daemon run daemon if there is not daemon running
func Daemon(ctx *cli.Context) error {
	if err := runDaemon(ctx); err != nil {
		log.WithFields(log.Fields{"module": module, "err": err}).Error("failed on run daemon")
	}
	return nil
}

func runDaemon(cc *cli.Context) error {
	bgctx, cancelFunc := context.WithCancel(context.Background())
	defer cancelFunc()
	intrh, ctx := setupInterruptHandler(bgctx)
	defer intrh.Close()

	log.Info("start crawler daemon ...")
	rootPath, err := config.PathRoot()
	if err != nil {
		return errors.Wrap(err, "failed on get root path")
	}

	log.WithFields(log.Fields{"dir": rootPath}).Info("root path")
	cfg, err := config.LoadConfig(filepath.Join(rootPath, config.ConfigName))
	if err != nil {
		return errors.Wrap(err, "failed on load config info")
	}

	db, err := database.New(cfg.DBInfo)
	if err != nil {
		return errors.Wrap(err, "failed on create db")
	}

	mgr := collector.New(ctx, db, cfg.Infura.Token)
	mgr.Run()

	ch := make(chan string)
	go func() {
		<-ctx.Done()
		ch <- "done"
		fmt.Println("Received interrupt signal, shutting down...")
		fmt.Println("(Hit ctrl-c again to force-shutdown the daemon.)")
	}()

	defer func() {
		// We wait for the ipfsStorage to close first.

		select {
		case <-ctx.Done():
			fmt.Println("Gracefully shut down daemon")
		default:
		}
	}()

	log.Info("crawler daemon is ready")

	for range ch {
	}

	return nil
}

func setupInterruptHandler(ctx context.Context) (io.Closer, context.Context) {
	intrh := newIntrHandler()
	ctx, cancelFunc := context.WithCancel(ctx)

	handlerFunc := func(count int, ih *IntrHandler) {
		switch count {
		case 1:
			fmt.Println() // Prevent un-terminated ^C character in terminal

			ih.wg.Add(1)
			go func() {
				defer ih.wg.Done()
				cancelFunc()
			}()

		default:
			fmt.Println("\nReceived another interrupt beforeInit graceful shutdown, terminating...")
			os.Exit(-1)
		}
	}

	intrh.Handle(handlerFunc, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM)

	return intrh, ctx
}

// IntrHandler helps set up an interrupt handler that can
// be cleanly shut down through the io.Closer interface.
type IntrHandler struct {
	sig chan os.Signal
	wg  sync.WaitGroup
}

// NewIntrHandler return a new ptr of IntrHandler
func newIntrHandler() *IntrHandler {
	ih := &IntrHandler{}
	ih.sig = make(chan os.Signal, 1)
	return ih
}

// Close close it
func (ih *IntrHandler) Close() error {
	close(ih.sig)
	ih.wg.Wait()
	return nil
}

func (ih *IntrHandler) Handle(handler func(count int, ih *IntrHandler), sigs ...os.Signal) {
	signal.Notify(ih.sig, sigs...)
	ih.wg.Add(1)
	go func() {
		defer ih.wg.Done()
		count := 0
		for v := range ih.sig {
			fmt.Printf("\nreceive signal: %s\n", v.String())

			// if signal is hangup, then ignore
			if v == syscall.SIGHUP {
				continue
			}

			count++
			handler(count, ih)
		}
		signal.Stop(ih.sig)
	}()
}
