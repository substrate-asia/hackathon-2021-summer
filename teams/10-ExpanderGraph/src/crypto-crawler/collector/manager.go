package collector

import (
	"context"
	"fmt"
	"time"

	"github.com/Expandergraph/crypto-crawler/database"

	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"

	"github.com/Expandergraph/crypto-crawler/model"
	"github.com/Expandergraph/crypto-crawler/rpc"
)

const (
	DefaultPollingInterval = 10 * time.Second
	module                 = "collector"
)

type Manager struct {
	ctx context.Context

	requester    *rpc.ETHRPCRequester
	db           *database.DB
	currentBlock uint64
}

func New(ctx context.Context, db *database.DB, url string) *Manager {
	requester := rpc.NewETHRPCRequester(url)

	return &Manager{
		ctx:       ctx,
		db:        db,
		requester: requester,
	}
}

func (m *Manager) Run() error {
	ticker := time.NewTicker(DefaultPollingInterval)
	for {
		select {
		case <-m.ctx.Done():
			ticker.Stop()
			return nil
		case <-ticker.C:
			if err := m.SyncToLatestBlock(); err != nil {
				log.WithFields(log.Fields{"module": module, "err": err}).Error("failed on sync to latest block")
			}
		}
	}
}

func (m *Manager) SyncToLatestBlock() error {
	number, err := m.requester.GetLatestBlockNumber()
	if err != nil {
		return errors.Wrap(err, "failed on get latest block number")
	}

	syncedBlock, err := m.db.QuerySyncedBlock()
	if err != nil {
		return errors.Wrap(err, "failed on get synced block number")
	}

	for i := syncedBlock; i <= number.Uint64(); i++ {
		err := m.GetFullBlockByNumber()
		if err != nil {
			return errors.Wrap(err, "failed on get block by number")
		}
	}

	//write to db
	return nil
}

func (m *Manager) GetFullBlockByNumber() error {
	number, err := m.requester.GetLatestBlockNumber()
	if err != nil {
		return errors.Wrap(err, "failed on get latest block number")
	}

	fullBlock, err := m.requester.GetBlockInfoByNumber(number)
	if err != nil {
		return errors.Wrap(err, "failed on get full block info")
	}

	logs, err := m.requester.EthGetLogs(model.FilterParams{
		FromBlock: fullBlock.Number,
		ToBlock:   fullBlock.Number,
	})
	if err != nil {
		return errors.Wrap(err, "failed on get logs")
	}
	fmt.Println(len(logs))
	return nil
}
