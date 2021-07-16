package service

import (
	"fmt"
	grpc "github.com/centrifuge/go-substrate-rpc-client/v3"
	"github.com/centrifuge/go-substrate-rpc-client/v3/signature"
	"github.com/centrifuge/go-substrate-rpc-client/v3/types"
)

func getUploadKeyringPair() signature.KeyringPair {
	return signature.KeyringPair{
		URI:       "economy defy spend birth improve weather public absorb message merge fossil lens",
		Address:   "5DniUHH4FRsdeJeDPDVXSt5Q76oPvYdyN1Pj1F9cTQuHH8Zp",
		PublicKey: types.MustHexDecodeString("0x4c469b7d9606dda6588f99285aa734c4a9db895c4cb47a74df6705ccfb33d120"),
	}
}

// CallMethod /**
//调用substrate方法 默认使用Alice进行签名
func CallMethod(method string, args ...interface{}) {
	api, err := grpc.NewSubstrateAPI("wss://www.hiwudi.com/ws")

	meta, err := api.RPC.State.GetMetadataLatest()

	//decodeString,err:= types.H(json1)
	c, err := types.NewCall(meta, method, args...)
	if err != nil {
		panic(err)
	}
	// Create the extrinsic
	ext := types.NewExtrinsic(c)

	genesisHash, err := api.RPC.Chain.GetBlockHash(0)
	if err != nil {
		panic(err)
	}

	rv, err := api.RPC.State.GetRuntimeVersionLatest()
	if err != nil {
		panic(err)
	}

	key, err := types.CreateStorageKey(meta, "System", "Account", signature.TestKeyringPairAlice.PublicKey)
	if err != nil {
		panic(err)
	}
	var accountInfo types.AccountInfo
	ok, err := api.RPC.State.GetStorageLatest(key, &accountInfo)
	if err != nil || !ok {
		panic(err)
	}

	nonce := uint32(accountInfo.Nonce)
	o := types.SignatureOptions{
		BlockHash:          genesisHash,
		Era:                types.ExtrinsicEra{IsMortalEra: false},
		GenesisHash:        genesisHash,
		Nonce:              types.NewUCompactFromUInt(uint64(nonce)),
		SpecVersion:        rv.SpecVersion,
		Tip:                types.NewUCompactFromUInt(0),
		TransactionVersion: rv.TransactionVersion,
	}

	// Sign the transaction using Alice's default account
	err = ext.Sign(signature.TestKeyringPairAlice, o)
	if err != nil {
		panic(err)
	}
	// Send the extrinsic
	_, err = api.RPC.Author.SubmitExtrinsic(ext)
	if err != nil {
		panic(err)
	}
	fmt.Printf("data info =%v", c)

}
