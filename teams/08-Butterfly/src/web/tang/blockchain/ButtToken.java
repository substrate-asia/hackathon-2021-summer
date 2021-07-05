package com.tang.blockchain;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import rx.Observable;
import rx.functions.Func1;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 * <p>Generated with web3j version 3.3.1.
 */
public class ButtToken extends Contract {
    private static final String BINARY = "0x60806040526305f5e1006005553480156200001957600080fd5b5060405162001cab38038062001cab83398181016040528101906200003f919062000375565b6040518060400160405280600e81526020017f427574746572666c79546f6b656e0000000000000000000000000000000000008152506040518060400160405280600481526020017f42545445000000000000000000000000000000000000000000000000000000008152508160039080519060200190620000c3929190620002ae565b508060049080519060200190620000dc929190620002ae565b505050620000f3816005546200014460201b60201c565b60055460078190555080600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506200058d565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415620001b7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001ae90620003f4565b60405180910390fd5b620001cb60008383620002a960201b60201c565b8060026000828254620001df919062000444565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825462000236919062000444565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516200029d919062000416565b60405180910390a35050565b505050565b828054620002bc90620004df565b90600052602060002090601f016020900481019282620002e057600085556200032c565b82601f10620002fb57805160ff19168380011785556200032c565b828001600101855582156200032c579182015b828111156200032b5782518255916020019190600101906200030e565b5b5090506200033b91906200033f565b5090565b5b808211156200035a57600081600090555060010162000340565b5090565b6000815190506200036f8162000573565b92915050565b6000602082840312156200038857600080fd5b600062000398848285016200035e565b91505092915050565b6000620003b0601f8362000433565b91507f45524332303a206d696e7420746f20746865207a65726f2061646472657373006000830152602082019050919050565b620003ee81620004d5565b82525050565b600060208201905081810360008301526200040f81620003a1565b9050919050565b60006020820190506200042d6000830184620003e3565b92915050565b600082825260208201905092915050565b60006200045182620004d5565b91506200045e83620004d5565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111562000496576200049562000515565b5b828201905092915050565b6000620004ae82620004b5565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006002820490506001821680620004f857607f821691505b602082108114156200050f576200050e62000544565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6200057e81620004a1565b81146200058a57600080fd5b50565b61170e806200059d6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806370a082311161008c57806395d89b411161006657806395d89b4114610275578063a457c2d714610293578063a9059cbb146102c3578063dd62ed3e146102f3576100ea565b806370a08231146101f757806386c3539e146102275780638da5cb5b14610257576100ea565b806323b872dd116100c857806323b872dd1461015b5780632ff2e9dc1461018b578063313ce567146101a957806339509351146101c7576100ea565b806306fdde03146100ef578063095ea7b31461010d57806318160ddd1461013d575b600080fd5b6100f7610323565b6040516101049190611343565b60405180910390f35b61012760048036038101906101229190610eac565b6103b5565b6040516101349190611328565b60405180910390f35b6101456103d3565b60405161015291906114a5565b60405180910390f35b61017560048036038101906101709190610e5d565b6103dd565b6040516101829190611328565b60405180910390f35b6101936104de565b6040516101a091906114a5565b60405180910390f35b6101b16104e4565b6040516101be91906114c0565b60405180910390f35b6101e160048036038101906101dc9190610eac565b6104ed565b6040516101ee9190611328565b60405180910390f35b610211600480360381019061020c9190610df8565b610599565b60405161021e91906114a5565b60405180910390f35b610241600480360381019061023c9190610eac565b6105e1565b60405161024e91906114a5565b60405180910390f35b61025f610726565b60405161026c919061130d565b60405180910390f35b61027d61074c565b60405161028a9190611343565b60405180910390f35b6102ad60048036038101906102a89190610eac565b6107de565b6040516102ba9190611328565b60405180910390f35b6102dd60048036038101906102d89190610eac565b6108d2565b6040516102ea9190611328565b60405180910390f35b61030d60048036038101906103089190610e21565b6108f0565b60405161031a91906114a5565b60405180910390f35b60606003805461033290611609565b80601f016020809104026020016040519081016040528092919081815260200182805461035e90611609565b80156103ab5780601f10610380576101008083540402835291602001916103ab565b820191906000526020600020905b81548152906001019060200180831161038e57829003601f168201915b5050505050905090565b60006103c96103c2610977565b848461097f565b6001905092915050565b6000600254905090565b60006103ea848484610b4a565b6000600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000610435610977565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050828110156104b5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ac90611405565b60405180910390fd5b6104d2856104c1610977565b85846104cd919061154d565b61097f565b60019150509392505050565b60055481565b60006012905090565b600061058f6104fa610977565b848460016000610508610977565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461058a91906114f7565b61097f565b6001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610673576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066a906113c5565b60405180910390fd5b6000600754116106b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106af90611465565b60405180910390fd5b6007548211156106fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106f4906113e5565b60405180910390fd5b8160075461070b919061154d565b60078190555061071b83836108d2565b506001905092915050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60606004805461075b90611609565b80601f016020809104026020016040519081016040528092919081815260200182805461078790611609565b80156107d45780601f106107a9576101008083540402835291602001916107d4565b820191906000526020600020905b8154815290600101906020018083116107b757829003601f168201915b5050505050905090565b600080600160006107ed610977565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050828110156108aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108a190611485565b60405180910390fd5b6108c76108b5610977565b8585846108c2919061154d565b61097f565b600191505092915050565b60006108e66108df610977565b8484610b4a565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156109ef576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e690611445565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610a5f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a5690611385565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610b3d91906114a5565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610bba576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bb190611425565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c2a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c2190611365565b60405180910390fd5b610c35838383610dc9565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610cbb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cb2906113a5565b60405180910390fd5b8181610cc7919061154d565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610d5791906114f7565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610dbb91906114a5565b60405180910390a350505050565b505050565b600081359050610ddd816116aa565b92915050565b600081359050610df2816116c1565b92915050565b600060208284031215610e0a57600080fd5b6000610e1884828501610dce565b91505092915050565b60008060408385031215610e3457600080fd5b6000610e4285828601610dce565b9250506020610e5385828601610dce565b9150509250929050565b600080600060608486031215610e7257600080fd5b6000610e8086828701610dce565b9350506020610e9186828701610dce565b9250506040610ea286828701610de3565b9150509250925092565b60008060408385031215610ebf57600080fd5b6000610ecd85828601610dce565b9250506020610ede85828601610de3565b9150509250929050565b610ef181611581565b82525050565b610f0081611593565b82525050565b6000610f11826114db565b610f1b81856114e6565b9350610f2b8185602086016115d6565b610f3481611699565b840191505092915050565b6000610f4c6023836114e6565b91507f45524332303a207472616e7366657220746f20746865207a65726f206164647260008301527f65737300000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000610fb26022836114e6565b91507f45524332303a20617070726f766520746f20746865207a65726f20616464726560008301527f73730000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006110186026836114e6565b91507f45524332303a207472616e7366657220616d6f756e742065786365656473206260008301527f616c616e636500000000000000000000000000000000000000000000000000006020830152604082019050919050565b600061107e6018836114e6565b91507f496e73756666696369656e74207065726d697373696f6e7300000000000000006000830152602082019050919050565b60006110be6033836114e6565b91507f726571756972652072656d61696e696e6720737570706c7920617265206c617260008301527f676572207468616e2074686520746f6b656e73000000000000000000000000006020830152604082019050919050565b60006111246028836114e6565b91507f45524332303a207472616e7366657220616d6f756e742065786365656473206160008301527f6c6c6f77616e63650000000000000000000000000000000000000000000000006020830152604082019050919050565b600061118a6025836114e6565b91507f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008301527f64726573730000000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006111f06024836114e6565b91507f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008301527f72657373000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006112566015836114e6565b91507f74686520747261737572652069732075736520757000000000000000000000006000830152602082019050919050565b60006112966025836114e6565b91507f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008301527f207a65726f0000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6112f8816115bf565b82525050565b611307816115c9565b82525050565b60006020820190506113226000830184610ee8565b92915050565b600060208201905061133d6000830184610ef7565b92915050565b6000602082019050818103600083015261135d8184610f06565b905092915050565b6000602082019050818103600083015261137e81610f3f565b9050919050565b6000602082019050818103600083015261139e81610fa5565b9050919050565b600060208201905081810360008301526113be8161100b565b9050919050565b600060208201905081810360008301526113de81611071565b9050919050565b600060208201905081810360008301526113fe816110b1565b9050919050565b6000602082019050818103600083015261141e81611117565b9050919050565b6000602082019050818103600083015261143e8161117d565b9050919050565b6000602082019050818103600083015261145e816111e3565b9050919050565b6000602082019050818103600083015261147e81611249565b9050919050565b6000602082019050818103600083015261149e81611289565b9050919050565b60006020820190506114ba60008301846112ef565b92915050565b60006020820190506114d560008301846112fe565b92915050565b600081519050919050565b600082825260208201905092915050565b6000611502826115bf565b915061150d836115bf565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156115425761154161163b565b5b828201905092915050565b6000611558826115bf565b9150611563836115bf565b9250828210156115765761157561163b565b5b828203905092915050565b600061158c8261159f565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b838110156115f45780820151818401526020810190506115d9565b83811115611603576000848401525b50505050565b6000600282049050600182168061162157607f821691505b602082108114156116355761163461166a565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b6116b381611581565b81146116be57600080fd5b50565b6116ca816115bf565b81146116d557600080fd5b5056fea2646970667358221220aa50e75e8574f2ecfd0d7574a6487d65ae80e8f23ee77342cb94defe5bcf3c3e64736f6c63430008000033";

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<>();
    }

    protected ButtToken(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected ButtToken(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public List<ApprovalEventResponse> getApprovalEvents(TransactionReceipt transactionReceipt) {
        final Event event = new Event("Approval", 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Address>() {}),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        List<Contract.EventValuesWithLog> valueList = extractEventParametersWithLog(event, transactionReceipt);
        ArrayList<ApprovalEventResponse> responses = new ArrayList<ApprovalEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ApprovalEventResponse typedResponse = new ApprovalEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.spender = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Observable<ApprovalEventResponse> approvalEventObservable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        final Event event = new Event("Approval", 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Address>() {}),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(event));
        return web3j.ethLogObservable(filter).map(new Func1<Log, ApprovalEventResponse>() {
            @Override
            public ApprovalEventResponse call(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(event, log);
                ApprovalEventResponse typedResponse = new ApprovalEventResponse();
                typedResponse.log = log;
                typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.spender = (String) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public List<TransferEventResponse> getTransferEvents(TransactionReceipt transactionReceipt) {
        final Event event = new Event("Transfer", 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Address>() {}),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        List<Contract.EventValuesWithLog> valueList = extractEventParametersWithLog(event, transactionReceipt);
        ArrayList<TransferEventResponse> responses = new ArrayList<TransferEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            TransferEventResponse typedResponse = new TransferEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.from = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.to = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Observable<TransferEventResponse> transferEventObservable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        final Event event = new Event("Transfer", 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Address>() {}),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(event));
        return web3j.ethLogObservable(filter).map(new Func1<Log, TransferEventResponse>() {
            @Override
            public TransferEventResponse call(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(event, log);
                TransferEventResponse typedResponse = new TransferEventResponse();
                typedResponse.log = log;
                typedResponse.from = (String) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.to = (String) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public static RemoteCall<ButtToken> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit, String account) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(account)));
        return deployRemoteCall(ButtToken.class, web3j, credentials, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    public static RemoteCall<ButtToken> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit, String account) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(account)));
        return deployRemoteCall(ButtToken.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    public RemoteCall<TransactionReceipt> INITIAL_SUPPLY() {
        final Function function = new Function(
                "INITIAL_SUPPLY", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> allowance(String owner, String spender) {
        final Function function = new Function(
                "allowance", 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(owner), 
                new org.web3j.abi.datatypes.Address(spender)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> approve(String spender, BigInteger amount) {
        final Function function = new Function(
                "approve", 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(spender), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<BigInteger> balanceOf(String account) {
        final Function function = new Function("balanceOf",
                Arrays.<Type>asList(new Address(account)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteCall<TransactionReceipt> decimals() {
        final Function function = new Function(
                "decimals", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> decreaseAllowance(String spender, BigInteger subtractedValue) {
        final Function function = new Function(
                "decreaseAllowance", 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(spender), 
                new org.web3j.abi.datatypes.generated.Uint256(subtractedValue)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> increaseAllowance(String spender, BigInteger addedValue) {
        final Function function = new Function(
                "increaseAllowance", 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(spender), 
                new org.web3j.abi.datatypes.generated.Uint256(addedValue)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> name() {
        final Function function = new Function(
                "name", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> owner() {
        final Function function = new Function(
                "owner", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> symbol() {
        final Function function = new Function(
                "symbol", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> totalSupply() {
        final Function function = new Function(
                "totalSupply", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> transfer(String recipient, BigInteger amount) {
        final Function function = new Function(
                "transfer", 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(recipient), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> transferFrom(String sender, String recipient, BigInteger amount) {
        final Function function = new Function(
                "transferFrom", 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(sender), 
                new org.web3j.abi.datatypes.Address(recipient), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> distrabuteToken(String to, BigInteger value) {
        final Function function = new Function(
                "distrabuteToken", 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(to), 
                new org.web3j.abi.datatypes.generated.Uint256(value)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public static ButtToken load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new ButtToken(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    public static ButtToken load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new ButtToken(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected String getStaticDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static String getPreviouslyDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static class ApprovalEventResponse {
        public Log log;

        public String owner;

        public String spender;

        public BigInteger value;
    }

    public static class TransferEventResponse {
        public Log log;

        public String from;

        public String to;

        public BigInteger value;
    }
}
