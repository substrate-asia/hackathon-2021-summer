package com.tang.blockchain;


import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.TextView;

import com.tang.AllEvaluateChainApplication;
import com.tang.AssetFragment;
import com.tang.blockchain.config.Configuration;
import com.tang.blockchain.config.Web3jUtil;
import com.tang.data_entity.FilmDataPatInForUIEntity;
import com.tang.util.LogUtils;

import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.RawTransaction;
import org.web3j.crypto.TransactionEncoder;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.Web3jFactory;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tuples.generated.Tuple10;
import org.web3j.tuples.generated.Tuple11;
import org.web3j.tx.Contract;
import org.web3j.tx.ManagedTransaction;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;
import org.web3j.utils.Numeric;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

import io.reactivex.Single;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.schedulers.Schedulers;

import static android.support.constraint.Constraints.TAG;

//封装操作智能合约的方法
public class ContractMethod {
    public static Web3j web3j;

//  private static FishContracts_sol_FishCore fishCore;

    //连评合约



    public static ButtToken buttToken;   //这个暂时在客户端部署，用于测试。正式环境是需要单独部署的。
    public static PubComentsChain pubComensChain;


    public static Credentials getCredentials() {
        return credentials;
    }

    //资产界面数据更新
    private static AssetFragment assetFragment;


    private static Credentials credentials;

    private static final ContractMethod INSTANCE = new ContractMethod();

    public static ContractMethod getInstance(){     //这里把初始创建的地方确定，要确保所有需要调用合约地方都是在该实例化之后。

        if (web3j == null){
            initialize();
        }

        return INSTANCE;
    }

    private ContractMethod(){}

    static void initialize(){
        connect();
        initCredentials();
    }




    private static void connect(){  //这里与远程进行了连接。可以添加一个本地连接，这样就能
//        web3j = Web3jUtil.buildHttpClient(); //这是远程连接

        //本地连接
        String url="http://10.0.2.2:9545";
//        String url="http://192.168.1.102:9545";
//        String url="http://127.0.0.1:9545";
        web3j= Web3jFactory.build(new HttpService(url));

    }

    static void initCredentials(){
        Wallet wallet = Wallet.getInstance();
        credentials = wallet.getCredentials();

        //这里调试时，如果没有调用，是因为在AllEvaluateChainApplication中已经
//        rankingChain_sol=RankingChain.load(Configuration.contractAddress,web3j,credentials, ManagedTransaction.GAS_PRICE, Contract.GAS_LIMIT);

        //注意这里的影评地址在重新部署时可能会变.查看指令networks
       // pubComensChain=PubComentsChain.load("0xDC35D82e732F694C106F3F18528cF2aB06f5e34b",web3j,credentials, ManagedTransaction.GAS_PRICE,Contract.GAS_LIMIT);
        pubComensChain=AllEvaluateChainApplication.getsInstance().pubComentsChain;

        //token也是需要放到这里的，因为这样获得的toen实例才是和本钱包相关的实例，才可以进行相关转账等高权限操作。
        buttToken=ButtToken.load(AllEvaluateChainApplication.getsInstance().buttToken.getContractAddress(),web3j,credentials, ManagedTransaction.GAS_PRICE, Contract.GAS_LIMIT);


        //获得自己的智能合约。把调用智能合约的业务放到下面
//      fishCore = FishContracts_sol_FishCore.load(Configuration.contractAddress,web3j,credentials, ManagedTransaction.GAS_PRICE, Contract.GAS_LIMIT);

//        new Thread(new Runnable(){
//            @Override
//            public void run() {
//                try{
//                    //先转账给本钱包，使其有代币进行操作。当前用于测试。
//                    AllEvaluateChainApplication.getsInstance().buttToken.distrabuteToken(Wallet.getInstance().getCurrentAddress(),BigInteger.valueOf(2000)).send();
//                    Log.e(TAG,"web3j weallet token:"+AllEvaluateChainApplication.getsInstance().buttToken.balanceOf(Wallet.getInstance().getCurrentAddress()).send());
//
//                    Log.e(TAG,"web3j pubComents token01:"+AllEvaluateChainApplication.getsInstance().buttToken.balanceOf(pubComensChain.getContractAddress()).send());
//                    AllEvaluateChainApplication.getsInstance().buttToken.distrabuteToken(pubComensChain.getContractAddress(),BigInteger.valueOf(2000)).send();
//                    Log.e(TAG,"web3j pubComents token02:"+AllEvaluateChainApplication.getsInstance().buttToken.balanceOf(pubComensChain.getContractAddress()).send());
//
//                    //转点以太给钱包.只要拿到通证Credentials，那么就可以对任何账户进行操作。
//                   boolean sucess=ContractMethod.getInstance().sendETHWithCredentials(Wallet.getInstance().getCurrentAddress(),50.0,AllEvaluateChainApplication.getsInstance().credentials);
//
//                   Log.e(TAG,"web3j weallet ETH:"+ContractMethod.getInstance().getETHBalance(Wallet.getInstance().getCredentials()).toString());
//
//                    assetFragment.refreshAssetInfo();
//
//
//
////                    //通过消息来通知主线程中UI修改
////                    Message msg = mHandler.obtainMessage();
////                    msg.what = 0;
////                    //msg.obj = "ok";//可以是基本类型，可以是对象，可以是List、map等；
////                    mHandler.sendMessage(msg);
//
//
//                    //
//        //            rankingChain_sol= RankingChain.deploy(web3j,credentials, Contract.GAS_PRICE,Contract.GAS_LIMIT,BigInteger.valueOf(10),"0x7c5fdc81096cce9144cc5f542e3a15c1da798c28",BigInteger.valueOf(1000)).send();
//        //            Log.e(TAG,"web3j rankingChain_sol contract address:"+rankingChain_sol.getContractAddress());
//
//        //            RankingChain rankingChain_sol1= RankingChain.deploy(web3j,credentials, Contract.GAS_PRICE,Contract.GAS_LIMIT,BigInteger.valueOf(10),"0x7c5fdc81096cce9144cc5f542e3a15c1da798c28",BigInteger.valueOf(1000)).send();
//        //            Log.e(TAG,"web3j rankingChain_sol1 contract address:"+rankingChain_sol1.getContractAddress());
//                    //注意在合约编译及转换为android类时，函数返回值类型可能对不上，多转换几次也许能够解决
////                    BigInteger testok=AllEvaluateChainApplication.getsInstance().getRankingChain_sol().TestOk().sendAsync().get();
//
//                    //注意代码生成的智能合约调用方法可以直接在生成的代码中修改，但是要注意数据类型一定要一致！！！！！！
//
//                //    String testInfo=AllEvaluateChainApplication.getsInstance().getRankingChain_sol().TestInfo().sendAsync().get();
//
//
//
//
//                    int b=0;
//                }catch (InterruptedException e) {
//                    e.printStackTrace();
//               }catch (Exception e) {
//                    e.printStackTrace();
//                }
//            }
//        }).start();

    }

//    public void setAssetFragment(AssetFragment assetFragment) {
//        this.assetFragment = assetFragment;
//    }


//   static Handler mHandler = new Handler() {
//
//        @Override
//        public void handleMessage(Message msg) {
//            super.handleMessage(msg);
//            switch (msg.what) {
//                case 0:
//                    //把对应的修改的转态Item加入到评定界面。
//
//                    //触发资产进行更新一下。
//                    assetFragment.refreshAssetInfo();
//                    break;
//
//            }
//        }
//
//    };

    //签名方法

    //***********转账交易。注意Single<String>的方法都是参考经过封装的钱包方法。

    //1.通过建立Transaction进行交易
    // transfer ether
    public Single<String> createEthTransaction(String from, String to, BigInteger amount, BigInteger gasPrice, BigInteger gasLimit, String password) {

        return getLastTransactionNonce(web3j, from)
                .flatMap(nonce -> Single.fromCallable( () -> {

//                    Credentials credentials = WalletUtils.loadCredentials(password,  from.getKeystorePath());
                    Credentials credentials=ContractMethod.credentials;
                    RawTransaction rawTransaction = RawTransaction.createEtherTransaction(nonce, gasPrice, gasLimit, to, amount);
                    byte[] signedMessage = TransactionEncoder.signMessage(rawTransaction, credentials);

                    String hexValue = Numeric.toHexString(signedMessage);
                    EthSendTransaction ethSendTransaction = web3j.ethSendRawTransaction(hexValue).send();

                    return ethSendTransaction.getTransactionHash();

                } ).subscribeOn(Schedulers.computation())
                        .observeOn(AndroidSchedulers.mainThread()));
    }

    // transfer ERC20
    public Single<String>  createERC20Transfer(String from,  String to, String contractAddress, BigInteger amount, BigInteger gasPrice, BigInteger gasLimit, String password) {

        String callFuncData = createTokenTransferData(to, amount);
        return getLastTransactionNonce(web3j, from)
                .flatMap(nonce -> Single.fromCallable( () -> {

//                    Credentials credentials = WalletUtils.loadCredentials(password,  from.getKeystorePath());

                    Credentials credentials=ContractMethod.credentials;//直接获取数据
                    RawTransaction rawTransaction = RawTransaction.createTransaction(
                            nonce, gasPrice, gasLimit, contractAddress, callFuncData);

                    LogUtils.d("rawTransaction:" + rawTransaction);

                    byte[] signedMessage = TransactionEncoder.signMessage(rawTransaction, credentials);

                    String hexValue = Numeric.toHexString(signedMessage);
                    EthSendTransaction ethSendTransaction = web3j.ethSendRawTransaction(hexValue).send();

                    return ethSendTransaction.getTransactionHash();

                } ).subscribeOn(Schedulers.computation())
                        .observeOn(AndroidSchedulers.mainThread()));
    }

    public static String createTokenTransferData(String to, BigInteger tokenAmount) {
        List<Type> params = Arrays.<Type>asList(new Address(to), new Uint256(tokenAmount));

        List<TypeReference<?>> returnTypes = Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {
        });

        Function function = new Function("transfer", params, returnTypes);
        return FunctionEncoder.encode(function);
    }



    public Single<String> createContract(String from, BigInteger gasPrice, BigInteger gasLimit, String data, String pwd) {
        return createTransaction(from, gasPrice, gasLimit, data, pwd)
                .subscribeOn(Schedulers.computation())
                .observeOn(AndroidSchedulers.mainThread());
    }

    // for DApp create contract transaction
    public Single<String> createTransaction(String from, BigInteger gasPrice, BigInteger gasLimit, String data, String password) {

        return getLastTransactionNonce(web3j, from)
                .flatMap(nonce -> getRawTransaction(nonce, gasPrice, gasLimit, BigInteger.ZERO, data))
                .flatMap(rawTx -> signEncodeRawTransaction(rawTx, password, from  /*, networkRepository.getDefaultNetwork().chainId*/ ))
                .flatMap(signedMessage -> Single.fromCallable( () -> {
                    EthSendTransaction raw = web3j
                            .ethSendRawTransaction(Numeric.toHexString(signedMessage))
                            .send();
                    if (raw.hasError()) {
                        throw new Exception(raw.getError().getMessage());
                    }
                    return raw.getTransactionHash();
                })).subscribeOn(Schedulers.io());

    }


    // for DApp  create contract  transaction
    private Single<RawTransaction> getRawTransaction(BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, BigInteger value, String data)
    {
        return Single.fromCallable(() ->
                RawTransaction.createContractTransaction(
                        nonce,
                        gasPrice,
                        gasLimit,
                        value,
                        data));
    }

    private Single<RawTransaction> getRawTransaction(BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String to , BigInteger value, String data)
    {
        return Single.fromCallable(() ->
                RawTransaction.createTransaction(
                        nonce,
                        gasPrice,
                        gasLimit,
                        to,
                        value,
                        data));
    }

    private  Single<byte[]> signEncodeRawTransaction(RawTransaction rtx, String password, String from  /*, int chainId*/) {

        return Single.fromCallable(() -> {
//          Credentials credentials = WalletUtils.loadCredentials(password, wallet.getKeystorePath());
            Credentials credentials=ContractMethod.credentials;
            byte[] signedMessage = TransactionEncoder.signMessage(rtx, credentials);
            return signedMessage;
        });
    }

    //**相关辅助方法
    //获得最新的的交易次数
    public Single<BigInteger> getLastTransactionNonce(Web3j web3j, String walletAddress)
    {
        return Single.fromCallable(() -> {
            EthGetTransactionCount ethGetTransactionCount = web3j
                    .ethGetTransactionCount(walletAddress, DefaultBlockParameterName.PENDING)   // or DefaultBlockParameterName.LATEST
                    .send();
            return ethGetTransactionCount.getTransactionCount();
        });
    }


    //******获得钱包账户的token余额
    public BigDecimal getBalance(String walletAddress, TokenInfo tokenInfo) throws Exception {
        org.web3j.abi.datatypes.Function function = balanceOf(walletAddress);     //**构造了一个虚高调用的智能合约函数
        String responseValue = callSmartContractFunction(function, tokenInfo.address, walletAddress);

        List<Type> response = FunctionReturnDecoder.decode(
                responseValue, function.getOutputParameters());
        if (response.size() == 1) {
            return new BigDecimal(((Uint256) response.get(0)).getValue());
        } else {
            return null;
        }
    }
    private static org.web3j.abi.datatypes.Function balanceOf(String owner) {
        return new org.web3j.abi.datatypes.Function(
                "balanceOf",
                Collections.singletonList(new Address(owner)),
                Collections.singletonList(new TypeReference<Uint256>() {}));
    }

    //调用智能合约中的函数。
    private String callSmartContractFunction(org.web3j.abi.datatypes.Function function, String contractAddress, String walletAddress) throws Exception {
        String encodedFunction = FunctionEncoder.encode(function);

        org.web3j.protocol.core.methods.response.EthCall response = web3j.ethCall(
                Transaction.createEthCallTransaction(walletAddress, contractAddress, encodedFunction),
                DefaultBlockParameterName.LATEST)
                .sendAsync().get();

        return response.getValue();
    }
    //****************


//
//    public Single<String> create(String from, String to, BigInteger subunitAmount, BigInteger gasPrice, BigInteger gasLimit,  String data, String pwd)
//    {
//        return createTransaction(from, to, subunitAmount, gasPrice, gasLimit, data, pwd)
//                .subscribeOn(Schedulers.computation())
//                .observeOn(AndroidSchedulers.mainThread());
//    }
//    public Single<String> createTransaction(String from, String toAddress, BigInteger subunitAmount, BigInteger gasPrice, BigInteger gasLimit, String data, String password) {
//
//
//        return getLastTransactionNonce(web3j, from)
//                .flatMap(nonce -> getRawTransaction(nonce, gasPrice, gasLimit,toAddress, subunitAmount,  data))
//                .flatMap(rawTx -> signEncodeRawTransaction(rawTx, password, from  /*, networkRepository.getDefaultNetwork().chainId*/ ))
//                .flatMap(signedMessage -> Single.fromCallable( () -> {
//                    EthSendTransaction raw = web3j
//                            .ethSendRawTransaction(Numeric.toHexString(signedMessage))
//                            .send();
//                    if (raw.hasError()) {
//                        throw new Exception(raw.getError().getMessage());
//                    }
//                    return raw.getTransactionHash();
//                })).subscribeOn(Schedulers.io());
//    };
//




    //下面是与上面不一致的另一套方法。智能合约的调用不需要像上面那样这么麻烦，直接调用就可以了，网页版基本都是直接通过ABI直接调用相关函数。

    /////////////////////////////////下述对以太币的直接转账
    /**
     *
     * @param to       String     receiver address
     * @param ETHValue Double     ETH!!!  not wei!!!
     */

    public boolean sendETH(String to, Double ETHValue) {

        try {
            TransactionReceipt transactionReceipt = Transfer.sendFunds(       //这个之所以不能转账，是因为这里获得的只是钱包中的通证，而本钱包没有相关的token和ETH.
                    web3j, credentials, to,
                    BigDecimal.valueOf(ETHValue), Convert.Unit.ETHER)
                    .send();
            // get tx hash and tx fees
            String txHash = transactionReceipt.getTransactionHash();
            BigInteger txFees = transactionReceipt
                    .getCumulativeGasUsed()
                    .multiply(Configuration.GAS_PRICE);

            System.out.println("hash: " + txHash);
            System.out.println("fees: " + Web3jUtil.weiToEther(txFees));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean sendETHWithCredentials(String to, Double ETHValue,final Credentials credentials) {

        try {
            TransactionReceipt transactionReceipt = Transfer.sendFunds(       //这个之所以不能转账，是因为这里获得的只是钱包中的通证，而本钱包没有相关的token和ETH.
                    web3j, credentials, to,
                    BigDecimal.valueOf(ETHValue), Convert.Unit.ETHER)
                    .send();
            // get tx hash and tx fees
            String txHash = transactionReceipt.getTransactionHash();
            BigInteger txFees = transactionReceipt
                    .getCumulativeGasUsed()
                    .multiply(Configuration.GAS_PRICE);

            System.out.println("hash: " + txHash);
            System.out.println("fees: " + Web3jUtil.weiToEther(txFees));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    //注意下面的方法可以直接通过地址获得账户的以太坊余额，智能合约能否获得需要试试才知道。并且下面都是直接与钱包有关，所以这个方法无法用在其它账户中

    /**
     *
     * @return your wallet's eth balance
     */

    public  BigDecimal getETHBalance(Credentials credentials){

        try {
//            return Web3jUtil.getBalanceEther(web3j,credentials.getAddress());
            int a=0;
            String address=credentials.getAddress();
            BigDecimal balance=Web3jUtil.getBalanceEther(web3j,address);

            return balance;
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return new BigDecimal("0");

    }


    //下面的方法在应用中基本是不需要的，因为应用中基本不会包含获得其它账户的情况，只有区款链浏览器才会需要这种方法
    public  BigDecimal getETHBalanceWithAddress(String to){  //从可以看出只要不是转账，而是获得ETH余额，只需要一个地址即可。

        try {
            return Web3jUtil.getBalanceEther(web3j,to);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return new BigDecimal("0");

    }

    //自身Token的转账实现

//////////////////////////////////////////////////////////////////////////////


//下述实现业务智能合约的相关调用。


//对于获得值：整型、字符串型等都是通用的，如果是数组可以用List，参数如果是多个不同的比如结构体可以用obj来解析。


 //注意涉及到转账相关的还是要在客户端先进行一次费用检测，以免转账失败，虽然很多应用中没有进行检测。
//发起人发起一个评定合约
    public boolean createEvaActivityWithToken(String filmId,String tokenAddr,BigInteger token){
        TransactionReceipt txReceipt = null;

        try {
            txReceipt = pubComensChain.createEvaActivityWithToken(filmId ,tokenAddr,token).sendAsync().get();

            // get tx hash and tx fees
            String txHash = txReceipt.getTransactionHash();
            BigInteger txFees = txReceipt
                    .getCumulativeGasUsed()
                    .multiply(Configuration.GAS_PRICE);

            System.out.println("hash: " + txHash);
            System.out.println("fees: " + Web3jUtil.weiToEther(txFees));
            return true;
        }catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return false;

    }

    public boolean createEvaActivityBonusEth(String filmId,BigInteger weiValue){ //以太的值，单位为wei
        TransactionReceipt txReceipt = null;

        try {

            //如果生成的payable函数的合约中没有msg.value值，则找到有有设置值的异构函数即可。
            txReceipt = pubComensChain.createEvaActivityBonusEth(filmId ,weiValue).sendAsync().get();

            // get tx hash and tx fees
            String txHash = txReceipt.getTransactionHash();
            BigInteger txFees = txReceipt
                    .getCumulativeGasUsed()
                    .multiply(Configuration.GAS_PRICE);

            System.out.println("hash: " + txHash);
            System.out.println("fees: " + Web3jUtil.weiToEther(txFees));
            return true;
        }catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return false;

    }



    //第一次参与影视评定,数据需要加密
    public boolean participateActivityWithBlind(String filmId, String _tokenAddr, byte[] _hashScore, byte[] _hashBoxOffice, BigInteger feeValue){
        TransactionReceipt txReceipt = null;

        try {
            txReceipt = pubComensChain.participateActivityWithBlind(filmId,_tokenAddr,_hashScore,_hashBoxOffice,feeValue).sendAsync().get();

            // get tx hash and tx fees
            String txHash = txReceipt.getTransactionHash();
            BigInteger txFees = txReceipt
                    .getCumulativeGasUsed()
                    .multiply(Configuration.GAS_PRICE);

            System.out.println("hash: " + txHash);
            System.out.println("fees: " + Web3jUtil.weiToEther(txFees));
            return true;
        }catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return false;

    }


    public boolean participateActivityWithReveal(String filmId, BigInteger score, BigInteger forecastBoxOffice){
        TransactionReceipt txReceipt = null;

        try {
            txReceipt = pubComensChain.participateActivityWithReveal(filmId,score,forecastBoxOffice).sendAsync().get();

            // get tx hash and tx fees
            String txHash = txReceipt.getTransactionHash();
            BigInteger txFees = txReceipt
                    .getCumulativeGasUsed()
                    .multiply(Configuration.GAS_PRICE);

            System.out.println("hash: " + txHash);
            System.out.println("fees: " + Web3jUtil.weiToEther(txFees));
            return true;
        }catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return false;

    }

    //切换状态应该不能直接由客户端触发。


    //结束活动


    //*****读取相关数据


    //活动发起者
//    public String getSponnor(String filmId){
//        try {
//            String temp=pubComensChain.getSponor(filmId).send();
//            return temp;
//
//        }
//        catch (Exception e){
//
//            System.err.println(" error in getParticipantNum");
//            e.printStackTrace();
//            return  null;
//
//        }
//
//    }



    //获得参与人数
    public BigInteger getParticipantNum(String filmId){
        try {
            return pubComensChain.getParticipantNum(filmId).send();
        }
        catch (Exception e){

            System.err.println(" error in getParticipantNum");
            e.printStackTrace();
            return  null;

        }

    }





    public List<Object> getEvaActivityData(String filmId){

        try{
            List<Object> details = new ArrayList<>();
            Tuple11 tuple11 = pubComensChain.getEvaActivityData(filmId).sendAsync().get();
            details.add(tuple11.getValue1());
            details.add(tuple11.getValue2());
            details.add(tuple11.getValue3());
            details.add(tuple11.getValue4());
            details.add(tuple11.getValue5());
            details.add(tuple11.getValue6());
            details.add(tuple11.getValue7());
            details.add(tuple11.getValue8());
            details.add(tuple11.getValue9());
            details.add(tuple11.getValue10());
            details.add(tuple11.getValue11());
            return details;



        } catch (Exception e){

            System.err.println(" error in getEvaActivityData");
            e.printStackTrace();
            return  null;

        }


    }



    //对于转账时到底转的是token还是以太币，是不需要检验的，因为在客户端直接已经区分了，分别会触发调用不同币类的接口。


    //进一步完善智能合约。这个有问题




}
