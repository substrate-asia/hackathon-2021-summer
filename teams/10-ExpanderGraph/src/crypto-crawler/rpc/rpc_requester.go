package rpc

import (
	"errors"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/rpc"

	"github.com/Expandergraph/crypto-crawler/model"
)

type ETHRPCRequester struct {
	client *ETHRPCClient
}

func NewETHRPCRequester(nodeUrl string) *ETHRPCRequester {
	requester := &ETHRPCRequester{}
	requester.client = NewETHRPCClient(nodeUrl)
	return requester
}

func (r *ETHRPCRequester) GetTransactionByHash(txHash string) (model.Transaction, error) {
	methodName := "eth_getTransactionByHash"
	result := model.Transaction{}
	err := r.client.GetRpc().Call(&result, methodName, txHash)
	return result, err
}

// 根据交易 hash 字符串数组批量获取对应的交易信息
func (r *ETHRPCRequester) GetTransactions(txHashs []string) ([]*model.Transaction, error) {
	name := "eth_getTransactionByHash"
	rets := []*model.Transaction{}
	size := len(txHashs)

	reqs := []rpc.BatchElem{}
	for i := 0; i < size; i++ {
		ret := model.Transaction{}
		req := rpc.BatchElem{
			Method: name,
			Args:   []interface{}{txHashs[i]},
			Result: &ret,
		}
		reqs = append(reqs, req)  // 将每个 BatchElem 添加到 BatchElem 数组
		rets = append(rets, &ret) // 每个请求的结果引用添加到结果数组中
	}
	err := r.client.GetRpc().BatchCall(reqs) // 传入 BatchElem 数组，发起批量请求
	return rets, err
}

func (r *ETHRPCRequester) GetETHBalance(address string) (string, error) {
	name := "eth_getBalance"
	result := ""
	err := r.client.GetRpc().Call(&result, name, address, "latest")
	if err != nil {
		return "", err
	}
	if result == "" {
		return "", errors.New("eth balance is null")
	}
	ten, _ := new(big.Int).SetString(result[2:], 16)
	return ten.String(), nil
}

// 批量查询：根据以太坊地址数组，查询以太坊 eth 的余额
func (r *ETHRPCRequester) GetETHBalances(addresss []string) ([]string, error) {
	name := "eth_getBalance"
	rets := []*string{}
	size := len(addresss)
	reqs := []rpc.BatchElem{}
	for i := 0; i < size; i++ {
		ret := ""
		req := rpc.BatchElem{
			Method: name,
			Args:   []interface{}{addresss[i], "latest"},
			Result: &ret,
		}
		reqs = append(reqs, req)  // 将每个 BatchElem 添加到 BatchElem 数组
		rets = append(rets, &ret) // 每个请求的结果引用添加到结果数组中
	}
	err := r.client.GetRpc().BatchCall(reqs) // 传入 BatchElem 数组，发起批量请求
	if err != nil {
		return nil, err
	}
	for _, req := range reqs {
		if req.Error != nil {
			return nil, req.Error
		}
	}
	finalRet := []string{}
	for _, item := range rets {
		ten, _ := new(big.Int).SetString((*item)[2:], 16)
		finalRet = append(finalRet, ten.String())
	}
	return finalRet, err
}

type ERC20BalanceRpcReq struct {
	ContractAddress string
	UserAddress     string
	ContractDecimal int
}

func (r *ETHRPCRequester) GetERC20Balances(paramArr []ERC20BalanceRpcReq) ([]string, error) {
	name := "eth_call"
	methodId := "0x70a08231"
	rets := []*string{}
	size := len(paramArr)
	reqs := []rpc.BatchElem{}

	for i := 0; i < size; i++ {
		ret := ""
		arg := &model.CallArg{}
		userAddress := paramArr[i].UserAddress
		arg.Gas = hexutil.EncodeUint64(300000)
		arg.To = common.HexToAddress(paramArr[i].ContractAddress)
		arg.Data = methodId + "000000000000000000000000" + userAddress[2:]
		req := rpc.BatchElem{
			Method: name,
			Args:   []interface{}{arg, "latest"},
			Result: &ret,
		}
		reqs = append(reqs, req)
		rets = append(rets, &ret)
	}
	err := r.client.GetRpc().BatchCall(reqs)
	if err != nil {
		return nil, err
	}
	for _, req := range reqs {
		if req.Error != nil {
			return nil, req.Error // 返回错误
		}
	}
	finalRet := []string{}
	for _, item := range rets {
		if *item == "" {
			continue
		}
		ten, _ := new(big.Int).SetString((*item)[2:], 16)
		finalRet = append(finalRet, ten.String())
	}
	return finalRet, err
}

func (r *ETHRPCRequester) GetLatestBlockNumber() (*big.Int, error) {
	methodName := "eth_blockNumber"
	number := ""

	err := r.client.client.Call(&number, methodName)
	if err != nil {
		return nil, fmt.Errorf("failed on get latest block number! %s", err.Error())
	}
	ten, _ := new(big.Int).SetString(number[2:], 16)
	return ten, nil
}

func (r *ETHRPCRequester) GetBlockInfoByNumber(blockNumber *big.Int) (*model.FullBlock, error) {
	number := fmt.Sprintf("%#x", blockNumber)
	methodName := "eth_getBlockByNumber"
	fullBlock := model.FullBlock{}
	err := r.client.client.Call(&fullBlock, methodName, number, true)
	if err != nil {
		return nil, fmt.Errorf("get block info failed! %s", err.Error())
	}
	if fullBlock.Number == "" {
		return nil, fmt.Errorf("block info is empty %s", blockNumber.String())
	}
	return &fullBlock, nil
}

func (r *ETHRPCRequester) GetBlockInfoByHash(blockHash string) (*model.FullBlock, error) {
	methodName := "eth_getBlockByHash"
	fullBlock := model.FullBlock{}
	err := r.client.client.Call(&fullBlock, methodName, blockHash, true)
	if err != nil {
		return nil, fmt.Errorf("get block info failed! %s", err.Error())
	}
	if fullBlock.Number == "" {
		return nil, fmt.Errorf("block info is empty %s", blockHash)
	}
	return &fullBlock, nil
}

// EthGetLogs returns an array of all logs matching a given filter object.
func (r *ETHRPCRequester) EthGetLogs(params model.FilterParams) ([]model.Log, error) {
	methodName := "eth_getLogs"

	var logs []model.Log
	err := r.client.GetRpc().Call(&logs, methodName, params)
	return logs, err
}
