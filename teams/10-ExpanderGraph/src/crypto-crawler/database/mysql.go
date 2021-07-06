package database

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/pkg/errors"

	"github.com/Expandergraph/crypto-crawler/config"
	"github.com/Expandergraph/crypto-crawler/dao"
)

const (
	defaultTimeout = 5
)

type DB struct {
	db *sql.DB
}

func New(conf config.DBInfo) (*DB, error) {
	db, err := open(conf.IP, conf.Port, conf.Name, conf.User, conf.Password)
	if err != nil {
		return nil, errors.Wrap(err, "failed on open db")
	}

	return &DB{
		db: db,
	}, nil
}

// returns a database driver of mysql
func open(ip, port, dbName, userName, password string) (*sql.DB, error) {
	url := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4,utf8&timeout=%ds", userName, password, ip, port, dbName, defaultTimeout)
	db, err := sql.Open("mysql", url)
	if err != nil {
		return nil, err
	}
	return db, nil
}

func (d *DB) QuerySyncedBlock() (uint64, error) {
	rows := d.db.QueryRow("select block_num from sync_info ORDER BY block_num LIMIT 1")
	var info dao.SyncInfo
	err := rows.Scan(&info.BlockNum)
	if err != nil {
		return 0, errors.Wrap(err, "failed on get ")
	}

	return info.BlockNum, nil
}
