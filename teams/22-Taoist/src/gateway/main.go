package main

import (
	"flag"
	"fmt"
	"github.com/anacrolix/torrent"
	"github.com/anacrolix/torrent/bencode"
	"github.com/anacrolix/torrent/metainfo"
	"github.com/anacrolix/torrent/storage"
	"log"
	"os"
	"path"
	"path/filepath"
	"time"
)

func newClient(config *Config) (*torrent.Client, error) {
	clientConfig := torrent.NewDefaultClientConfig()
	clientConfig.DisableTrackers = false
	clientConfig.DisableTCP = false
	clientConfig.DisablePEX = true
	clientConfig.DisableUTP = false
	clientConfig.DisableIPv4 = false
	clientConfig.DisableIPv6 = true
	clientConfig.DisableAcceptRateLimiting = true
	clientConfig.NoDHT = true
	clientConfig.Debug = true
	clientConfig.Seed = true
	clientConfig.NoUpload = false
	clientConfig.DisableWebtorrent = false
	clientConfig.DisableWebseeds = false

	clientConfig.DefaultStorage = storage.NewFile(path.Base(config.Filepath))

	client, err := torrent.NewClient(clientConfig)

	return client, err
}

func GenerateMagnetLinkAndSeeding(config *Config) {
	mi := metainfo.MetaInfo{
		Announce: config.TrackerAddr,
	}
	baseFilename := filepath.Base(config.Filepath)

	mi.SetDefaults()
	info := metainfo.Info{
		PieceLength: 256 * 1024,
	}
	err := info.BuildFromFilePath(config.Filepath)
	if err != nil {
		panic(err)
	}

	mi.InfoBytes, err = bencode.Marshal(info)
	if err != nil {
		panic(err)
	}

	torrentFilename := fmt.Sprintf("%s.torrent", config.Filepath)
	torrentFile, err := os.Create(torrentFilename)
	if err != nil {
		panic(err)
	}
	defer torrentFile.Close()
	mi.Write(torrentFile)

	m := mi.Magnet(nil, &info)
	m.DisplayName = baseFilename
	log.Println("Magnet link:", m.String())

	cl, err := newClient(config)
	if err != nil {
		panic(err)
	}

	t, err := cl.AddTorrent(&mi)
	if err != nil {
		log.Fatalln(err)
	}

	// t.DownloadAll()

	log.Println("seed:", t.Seeding())
	log.Println("Bytes left:", t.BytesMissing())
	log.Println("Bytes completed:", t.BytesCompleted())

	tt := time.NewTicker(10 * time.Second)

	for {
		<-tt.C
		log.Println(t.Seeding(), t.BytesCompleted())
		// cl.WriteStatus(os.Stdout)
	}
}

type Config struct {
	TrackerAddr string
	Filepath    string
}

func main() {
	config := new(Config)
	flag.StringVar(&config.TrackerAddr, "tracker-addr", "http://127.0.0.1:123", "Tracker host for the torrent")
	flag.StringVar(&config.Filepath, "file-path", "", "File to be seeded, use absolute path")
	flag.Parse()

	GenerateMagnetLinkAndSeeding(config)
}
