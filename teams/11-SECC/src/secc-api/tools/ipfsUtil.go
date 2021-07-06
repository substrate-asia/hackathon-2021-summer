package tools

import (
	"bytes"
	"fmt"
	beego "github.com/beego/beego/v2/server/web"
	shell "github.com/ipfs/go-ipfs-api"
)

func getUri() string {
	ipfsHost, _ := beego.AppConfig.String("ipfs.host")
	ipfsPort, _ := beego.AppConfig.String("ipfs.port")
	if ipfsPort == "" {
		ipfsPort = "5001"
	}
	return ipfsHost + ":" + ipfsPort
}

func UploadToIpfs(buffer []byte) (string, string, error) {
	sh := shell.NewShell(getUri())
	ipfsHash, err := sh.Add(bytes.NewReader(buffer))
	if err != nil && len(ipfsHash) == 0 {
		fmt.Println("上传到ipfs失败", err)
		return "", "", err
	}
	ipfsVisitUrl, _ := beego.AppConfig.String("ipfs.visitUrl")
	ipfsUrl := ipfsVisitUrl + ipfsHash
	return ipfsHash, ipfsUrl, err
}
