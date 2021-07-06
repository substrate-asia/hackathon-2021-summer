package com.tang.blockchain.wallet;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple3;
import org.web3j.tuples.generated.Tuple5;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 3.3.1.
 */
public class RankingChain extends Contract {
    private static final String BINARY = "0x60806040526000600255600160035560006005556040516115f73803806115f78339818101604052604081101561003557600080fd5b81019080805190602001909291908051906020019092919050505033600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060028190555060008060006101000a81548160ff021916908360028111156100f757fe5b021790555050506114ea8061010d6000396000f3fe6080604052600436106100f35760003560e01c80638a843fee1161008a578063d2a14d7811610059578063d2a14d78146103d4578063da249db1146103ff578063df72cdbf14610480578063ee305fc8146104ab576100f3565b80638a843fee146103195780639a0e7d6614610330578063a445fd6a1461035b578063c7d0767e146103a9576100f3565b80635ae9a549116100c65780635ae9a5491461023957806366ca626a146102645780636b1f69a51461028f57806385a3863514610302576100f3565b80630d6a1da1146100f85780632ef796af1461010f57806333ebb1d71461013a57806357529251146101ca575b600080fd5b34801561010457600080fd5b5061010d6104d6565b005b34801561011b57600080fd5b50610124610697565b6040518082815260200191505060405180910390f35b34801561014657600080fd5b5061014f61069e565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561018f578082015181840152602081019050610174565b50505050905090810190601f1680156101bc5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101d657600080fd5b50610237600480360360808110156101ed57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803590602001909291905050506106db565b005b34801561024557600080fd5b5061024e610864565b6040518082815260200191505060405180910390f35b34801561027057600080fd5b50610279610907565b6040518082815260200191505060405180910390f35b34801561029b57600080fd5b506102c8600480360360208110156102b257600080fd5b8101908080359060200190929190505050610911565b604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390f35b34801561030e57600080fd5b5061031761096c565b005b34801561032557600080fd5b5061032e610a32565b005b34801561033c57600080fd5b50610345610af0565b6040518082815260200191505060405180910390f35b6103a76004803603604081101561037157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610b93565b005b3480156103b557600080fd5b506103be610cee565b6040518082815260200191505060405180910390f35b3480156103e057600080fd5b506103e9610d90565b6040518082815260200191505060405180910390f35b34801561040b57600080fd5b506104386004803603602081101561042257600080fd5b8101908080359060200190929190505050610d97565b604051808673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018481526020018381526020018281526020019550505050505060405180910390f35b34801561048c57600080fd5b50610495610dfd565b6040518082815260200191505060405180910390f35b3480156104b757600080fd5b506104c0610e9f565b6040518082815260200191505060405180910390f35b6002808111156104e257fe5b60008054906101000a900460ff1660028111156104fb57fe5b1461056e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f7374617465206572726f7200000000000000000000000000000000000000000081525060200191505060405180910390fd5b610576610f45565b61057e611180565b60005b6103f480549050811015610694576103f3546103f482815481106105a157fe5b90600052602060002090600302016001015460055402816105be57fe5b046103f482815481106105cd57fe5b9060005260206000209060030201600201819055506103f481815481106105f057fe5b906000526020600020906003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6103f4838154811061064957fe5b9060005260206000209060030201600201549081150290604051600060405180830381858888f19350505050158015610686573d6000803e3d6000fd5b508080600101915050610581565b50565b6103f25481565b60606040518060400160405280601281526020017f636f6e7472616374206973207269676874210000000000000000000000000000815250905090565b600160028111156106e857fe5b60008054906101000a900460ff16600281111561070157fe5b14610774576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f7374617465206572726f7200000000000000000000000000000000000000000081525060200191505060405180910390fd5b60046040518060a001604052808673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018481526020018381526020016000815250908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020155606082015181600301556080820151816004015550508260056000828254019250508190555050505050565b600060028081111561087257fe5b60008054906101000a900460ff16600281111561088b57fe5b146108fe576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f7374617465206572726f7200000000000000000000000000000000000000000081525060200191505060405180910390fd5b6103f254905090565b6000600354905090565b6103f4818154811061092257600080fd5b90600052602060002090600302016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154905083565b6001600281111561097957fe5b60008054906101000a900460ff16600281111561099257fe5b14610a05576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f7374617465206572726f7200000000000000000000000000000000000000000081525060200191505060405180910390fd5b60026000806101000a81548160ff02191690836002811115610a2357fe5b0217905550610a3061141f565b565b60006002811115610a3f57fe5b60008054906101000a900460ff166002811115610a5857fe5b14610acb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f7374617465206572726f7200000000000000000000000000000000000000000081525060200191505060405180910390fd5b60016000806101000a81548160ff02191690836002811115610ae957fe5b0217905550565b600060016002811115610aff57fe5b60008054906101000a900460ff166002811115610b1857fe5b14610b8b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f7374617465206572726f7200000000000000000000000000000000000000000081525060200191505060405180910390fd5b600554905090565b60006002811115610ba057fe5b60008054906101000a900460ff166002811115610bb957fe5b14610c2c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f7374617465206572726f7200000000000000000000000000000000000000000081525060200191505060405180910390fd5b600060025414610ca257600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6002549081150290604051600060405180830381858888f19350505050158015610ca0573d6000803e3d6000fd5b505b81600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806002819055505050565b6000600280811115610cfc57fe5b60008054906101000a900460ff166002811115610d1557fe5b14610d88576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f7374617465206572726f7200000000000000000000000000000000000000000081525060200191505060405180910390fd5b600754905090565b6103f15481565b60048181548110610da757600080fd5b90600052602060002090600502016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154908060040154905085565b6000600280811115610e0b57fe5b60008054906101000a900460ff166002811115610e2457fe5b14610e97576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f7374617465206572726f7200000000000000000000000000000000000000000081525060200191505060405180910390fd5b600654905090565b600060016002811115610eae57fe5b60008054906101000a900460ff166002811115610ec757fe5b14610f3a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f7374617465206572726f7200000000000000000000000000000000000000000081525060200191505060405180910390fd5b600480549050905090565b600280811115610f5157fe5b60008054906101000a900460ff166002811115610f6a57fe5b14610fdd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f7374617465206572726f7200000000000000000000000000000000000000000081525060200191505060405180910390fd5b60008060005b60048054905081101561117b576006546004828154811061100057fe5b906000526020600020906005020160020154101561104d576006546004828154811061102857fe5b9060005260206000209060050201600201546101f4028161104557fe5b04925061107e565b6004818154811061105a57fe5b9060005260206000209060050201600201546006546101f4028161107a57fe5b0492505b6007546004828154811061108e57fe5b90600052602060002090600502016003015410156110db57600754600482815481106110b657fe5b9060005260206000209060050201600301546101f402816110d357fe5b04915061110c565b600481815481106110e857fe5b9060005260206000209060050201600301546007546101f4028161110857fe5b0491505b8183016004828154811061111c57fe5b90600052602060002090600502016004018190555060086004828154811061114057fe5b9060005260206000209060050201600401546103e9811061115d57fe5b01600081548092919060010191905055508080600101915050610fe3565b505050565b60028081111561118c57fe5b60008054906101000a900460ff1660028111156111a557fe5b14611218576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f7374617465206572726f7200000000000000000000000000000000000000000081525060200191505060405180910390fd5b600a6003600480549050028161122a57fe5b046103f2819055506000806103e890505b600081111561127d576008816103e9811061125257fe5b0154820191506103f254821061126f57806103f18190555061127d565b80806001900391505061123b565b50600080600090505b60048054905081101561141a576103f154600482815481106112a457fe5b90600052602060002090600502016004015410156112c15761140d565b600481815481106112ce57fe5b906000526020600020906005020160010154600482815481106112ed57fe5b9060005260206000209060050201600401540291506103f460405180606001604052806004848154811061131d57fe5b906000526020600020906005020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020016000815250908060018154018082558091505060019003906000526020600020906003020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155604082015181600201555050816103f3600082825401925050819055505b8080600101915050611286565b505050565b60008060005b600480549050811015611485576004818154811061143f57fe5b906000526020600020906005020160020154830192506004818154811061146257fe5b906000526020600020906005020160030154820191508080600101915050611425565b50600480549050828161149457fe5b0460068190555060048054905081816114a957fe5b04600781905550505056fea264697066735822122095c5e0fb9d3bc3af3916dbdcea383d395264694f70144336bc66db84f331e67764736f6c63430007050033";

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<>();
        _addresses.put("5777", "0x85763ca7dd3b68efBd8A91C4b92532F86AF197E2");
    }

    protected RankingChain(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected RankingChain(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static RemoteCall<RankingChain> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit, BigInteger initialWeiValue, String _sponsorAccount, BigInteger _Bonus) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new Address(_sponsorAccount),
                new Uint256(_Bonus)));
        return deployRemoteCall(RankingChain.class, web3j, credentials, gasPrice, gasLimit, BINARY, encodedConstructor, initialWeiValue);
    }

    public static RemoteCall<RankingChain> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit, BigInteger initialWeiValue, String _sponsorAccount, BigInteger _Bonus) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new Address(_sponsorAccount),
                new Uint256(_Bonus)));
        return deployRemoteCall(RankingChain.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, encodedConstructor, initialWeiValue);
    }

    public RemoteCall<Tuple3<String, BigInteger, BigInteger>> bonusInfo(BigInteger param0) {
        final Function function = new Function("bonusInfo", 
                Arrays.<Type>asList(new Uint256(param0)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
        return new RemoteCall<Tuple3<String, BigInteger, BigInteger>>(
                new Callable<Tuple3<String, BigInteger, BigInteger>>() {
                    @Override
                    public Tuple3<String, BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple3<String, BigInteger, BigInteger>(
                                (String) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue());
                    }
                });
    }

    public RemoteCall<Tuple5<String, BigInteger, BigInteger, BigInteger, BigInteger>> participantInfo(BigInteger param0) {
        final Function function = new Function("participantInfo", 
                Arrays.<Type>asList(new Uint256(param0)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
        return new RemoteCall<Tuple5<String, BigInteger, BigInteger, BigInteger, BigInteger>>(
                new Callable<Tuple5<String, BigInteger, BigInteger, BigInteger, BigInteger>>() {
                    @Override
                    public Tuple5<String, BigInteger, BigInteger, BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple5<String, BigInteger, BigInteger, BigInteger, BigInteger>(
                                (String) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue(), 
                                (BigInteger) results.get(4).getValue());
                    }
                });
    }

    public RemoteCall<BigInteger> rewardNum() {
        final Function function = new Function("rewardNum", 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteCall<BigInteger> rewardRank() {
        final Function function = new Function("rewardRank", 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteCall<TransactionReceipt> updateSponsorInfo(String userAccount, BigInteger newBons, BigInteger weiValue) {
        final Function function = new Function(
                "updateSponsorInfo", 
                Arrays.<Type>asList(new Address(userAccount),
                new Uint256(newBons)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function, weiValue);
    }

    public RemoteCall<TransactionReceipt> InitiationEnd() {
        final Function function = new Function(
                "InitiationEnd", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> updateVotingInfo(String account, BigInteger voting, BigInteger score, BigInteger boxOffice) {
        final Function function = new Function(
                "updateVotingInfo", 
                Arrays.<Type>asList(new Address(account),
                new Uint256(voting),
                new Uint256(score),
                new Uint256(boxOffice)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<BigInteger> getTotalVotes() {
        final Function function = new Function("getTotalVotes", 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteCall<BigInteger> getParticipantNum() {
        final Function function = new Function("getParticipantNum", 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteCall<TransactionReceipt> votingEnd() {
        final Function function = new Function(
                "votingEnd", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<BigInteger> getAverageScore() {
        final Function function = new Function("getAverageScore", 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteCall<BigInteger> getAverageBoxOffice() {
        final Function function = new Function("getAverageBoxOffice", 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteCall<BigInteger> getRewardNum() {
        final Function function = new Function("getRewardNum", 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteCall<TransactionReceipt> assignBonus() {
        final Function function = new Function(
                "assignBonus", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<BigInteger> TestOk() {
        final Function function = new Function("TestOk", 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteCall<TransactionReceipt> TestInfo() {
        final Function function = new Function(
                "TestInfo", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public static RankingChain load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new RankingChain(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    public static RankingChain load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new RankingChain(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected String getStaticDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static String getPreviouslyDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }
}
