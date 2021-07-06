package com.tang;

import android.app.Application;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.google.gson.Gson;
import com.squareup.leakcanary.LeakCanary;
import com.squareup.leakcanary.RefWatcher;
import com.tang.blockchain.ButtToken;
import com.tang.blockchain.ContractMethod;
import com.tang.blockchain.PubComentsChain;
import com.tang.blockchain.RankingChain;
import com.tang.blockchain.TutorialToken;
import com.tang.blockchain.Wallet;
import com.tang.util.AppFilePath;

import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.Web3jFactory;
import org.web3j.protocol.core.Request;
import org.web3j.protocol.core.methods.response.EthAccounts;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.core.methods.response.Web3ClientVersion;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.Contract;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import greendao.gen.DaoMaster;
import greendao.gen.DaoSession;
import greendao.gen.GreenDaoHelper;
import okhttp3.OkHttpClient;
import io.realm.Realm;

import static android.support.constraint.Constraints.TAG;

public class AllEvaluateChainApplication extends Application{
    private static AllEvaluateChainApplication sInstance;

    private RefWatcher refWatcher;

    private DaoSession daoSession;



    //局域网调试IP
    /** HTTP rest接口服务器根地址 */
    // TODO 此项配置改为您自已的http服务器ip和端口号即可！
    public final static String HTTP_SERVER_ROOT_URL = "192.168.1.101:7080";
    /** IM服务器IP地址 */
    // TODO 此项配置改为您自已的IM服务器ip！
    public final static String IM_SERVER_IP = "192.168.1.101";

    //阿里服务器IP相关配置
//	public final static String HTTP_SERVER_ROOT_URL = "47.116.142.222:8080";
//	public final static String IM_SERVER_IP = "47.116.142.222";

    /** IM服务器端口 */
    // TODO 此项配置改为您自已的IM服务器UDP长连接监听端口（注意：不是tomcat的http端口哦）！
    public final static int IM_SERVER_PORT = 9903;


    /** HTTP rest 普通数据接口服务的统一调用地址（普通数据指的是除图片等2进制文件上传下载外的文本数据） */
    public final static String HTTP_COMMON_CONTROLLER_URL =
            "http://"+HTTP_SERVER_ROOT_URL+"/rainbowchat_pro/";


    /** 用户2进制数据下载的独立http接口地址 */
    public final static String BBONERAY_DOWNLOAD_CONTROLLER_URL_ROOT =
            "http://"+HTTP_SERVER_ROOT_URL+"/rainbowchat_pro/BinaryDownloader";



    /**
     * 获取greenDao的daoSession
     *
     * @return daoSession
     */
    public DaoSession getDaoSession() {
        if (daoSession == null) {
            GreenDaoHelper helper = new GreenDaoHelper(this);
            DaoMaster daoMaster = new DaoMaster(helper.getWritableDb()); //创建数据库，并且所有对应有实体的数据类都在该类中创建了对应的数据表
            daoSession = daoMaster.newSession(); //获取dao对象管理者
        }
        return daoSession;
    }

    private static OkHttpClient httpClient;

//    public static RepositoryFactory repositoryFactory;
//    public static SharedPreferenceRepository sp;
//
//    public DaoSession getDaoSession() {
//        return daoSession;
//    }

    public static RefWatcher getRefWatcher(Context context) {
        AllEvaluateChainApplication application = (AllEvaluateChainApplication) context.getApplicationContext();
        return application.refWatcher;
    }


    TutorialToken lqktoken;
    public TutorialToken getLqktoken(){
        return lqktoken;
    }


    RankingChain rankingChain_sol;
    RankingChain rankingChain_sol1;

    public RankingChain getRankingChain_sol() {
        return rankingChain_sol;
    }
    public RankingChain getRankingChain_sol1() {
        return rankingChain_sol1;
    }

    public  ButtToken buttToken;  //测试用部署的token合约.
    public PubComentsChain pubComentsChain;

    String user1="0x7c5fdc81096cce9144cc5f542e3a15c1da798c28";
    String user1PrivateKey="b331d320d9aaa1761a5718534572dca63b9175e0ff48eed70592e366bb7196e6";
    public Credentials credentials;

    @Override
    public void onCreate() {
        super.onCreate();
        sInstance = this;
    //    init();

        Realm.init(this);

        refWatcher = LeakCanary.install(this);

        AppFilePath.init(this);


        //**********************************************************
        //测试区块链
        //注意高版本andoroid中网络请求基本都需要放到非主线程中

//        ContractMethod contractMethod = ContractMethod.getInstance();
//
        Web3j web3j;
//        if(ContractMethod.web3j!=null){
//             web3j=ContractMethod.web3j;
//
//        }else{
            //这地方代码比较乱，需要优化一下
            String url="http://10.0.2.2:9545";
//           String url="http://127.0.0.1:9545";
            web3j= Web3jFactory.build(new HttpService(url));
//        }


        // 实例化IM相关数据模型、全局变量等管理类
        imClientManager = new IMClientManager(this);




        int chainTestNum=0;

        new Thread(new Runnable(){
            @Override
            public void run() {
                try {

                    /*
                     * 原来模拟器默认把127.0.0.1和localhost当做本身了，在模拟器上可以用10.0.2.2代替127.0.0.1和localhost，
                     * 另外如果是在局域网环境可以用 192.168.0.x或者192.168.1.x(根据具体配置)连接本机,这样应该就不会报错了。
                     *
                     * */
//                    if(web3j!=null){
//
//                    }

                    Request<?,Web3ClientVersion> request= web3j.web3ClientVersion();
                    Web3ClientVersion response=request.send();
                    String version=response.getWeb3ClientVersion();
                    Log.e(TAG,"web3j version:" +version);

                    EthAccounts ethAccounts=web3j.ethAccounts().sendAsync().get();
                    List<String> accountList=ethAccounts.getAccounts();
                    for(int i=0;i<accountList.size();i++){
                        Log.e(TAG,"web3j account:"+i+":" +accountList.get(i));
                    }

                    //这部分内容要移到钱包登录后的流程中。

                    //之所以对账户1进行转账等相关操作，是因为这里已经通过秘钥拿到了庄户1的通证。
                    credentials= Credentials.create(user1PrivateKey);
                    Log.e(TAG,"web3j credentials address:"+credentials.getAddress());
                    //智能合约部署，这里的部署只能管android APP,链上已经部署了，这里其实是加载。也可以用load函数
//                    lqktoken=TutorialToken.deploy(web3j,credentials, Contract.GAS_PRICE,Contract.GAS_LIMIT).send();
//                    Log.e(TAG,"web3j lqktoken contract address:"+lqktoken.getContractAddress());

                    //!!!!!!!!!!!!!
                    //经过验证，直接部署就可以有不同的合约地址，现在关键的是这些通过部署创建的地址该怎样进行记录，是在链上还是中心化数据库中保存

                    //注意什么时候部署，什么时候load,这里理论上第一个合约是直接load即可，因为已经部署了。

                    //通过下述验证，通过直接部署，并可以直接根据部署的合约地址加载到对应的合约。获得对应的合约后可以直接调用到对应的方法。
//                    rankingChain_sol= RankingChain.deploy(web3j,credentials, Contract.GAS_PRICE,Contract.GAS_LIMIT,/*BigInteger.valueOf(10),*/"0x7c5fdc81096cce9144cc5f542e3a15c1da798c28",BigInteger.valueOf(1000)).send();
//                    Log.e(TAG,"web3j rankingChain_sol contract address:"+rankingChain_sol.getContractAddress());
//                    BigInteger testokNum=rankingChain_sol.TestOk().send();
//                    Log.e(TAG,"web3j rankingChain_sol testokNum 1:"+testokNum);
//                    rankingChain_sol.TestOkSet(BigInteger.valueOf(111)).send();
//                    testokNum=rankingChain_sol.TestOk().send();
//                    Log.e(TAG,"web3j rankingChain_sol testokNum 2:"+testokNum);
//
//                    rankingChain_sol1= RankingChain.deploy(web3j,credentials, Contract.GAS_PRICE,Contract.GAS_LIMIT,/*BigInteger.valueOf(10),*/"0x7c5fdc81096cce9144cc5f542e3a15c1da798c28",BigInteger.valueOf(1000)).send();
//                    Log.e(TAG,"web3j rankingChain_sol1 contract address:"+rankingChain_sol1.getContractAddress());
//                    BigInteger testokNum1=rankingChain_sol1.TestOk().send();
//                    Log.e(TAG,"web3j rankingChain_sol1 testokNum1 1:"+testokNum1);
//                    rankingChain_sol1.TestOkSet(BigInteger.valueOf(222)).send();
//                    testokNum1=rankingChain_sol1.TestOk().send();
//                    Log.e(TAG,"web3j rankingChain_sol1 testokNum1 2:"+testokNum1);
//
//                    testokNum=rankingChain_sol.TestOk().send();
//                    Log.e(TAG,"web3j rankingChain_sol testokNum 2:"+testokNum);
//
//
//                    //验证加载智能合约,这里是可以获得部署地址。
//                    RankingChain rankingChain_sol2=RankingChain.load(rankingChain_sol.getContractAddress(),web3j,credentials, Contract.GAS_PRICE,Contract.GAS_LIMIT);
//                    Log.e(TAG,"web3j rankingChain_sol2 contract address:"+rankingChain_sol2.getContractAddress());
//                    RankingChain rankingChain_sol3=RankingChain.load(rankingChain_sol1.getContractAddress(),web3j,credentials, Contract.GAS_PRICE,Contract.GAS_LIMIT);
//                    Log.e(TAG,"web3j rankingChain_sol3 contract address:"+rankingChain_sol3.getContractAddress());
//
//                    //验证直接从truffle中部署的合约。从这里验证来看是OK的，可以直接加载到truffle中首次部署的合约。与上述结合来看的话deploy可以动态创建一个新的合约
//                    RankingChain rankingChain_sol4=RankingChain.load("0x85763ca7dd3b68efBd8A91C4b92532F86AF197E2",web3j,credentials, Contract.GAS_PRICE,Contract.GAS_LIMIT);
//                    Log.e(TAG,"web3j rankingChain_sol4 contract address:"+rankingChain_sol4.getContractAddress());


                    //验证智能合约转账
//                    lqktoken.transfer(rankingChain_sol.getContractAddress(),BigInteger.valueOf(3000)).send();
//                    BigInteger rankingChain_sol_balance=rankingChain_sol.balanceOf().send();
//                    Log.e(TAG,"rankingChain_sol balances:"+rankingChain_sol_balance.toString());


//                   本质是让合约也有一些转账方法，然后直接就可以转账及获得余额。
//                  这里只是验证了token的转账，以太的转账没有验证
                    //最后一个问题点，合约中的存放资金的地址到底是合约部署者的地址还是新建的地址或者是合约地址，如果是创建者的账户地址那么他能直接取走资金吗？

                    //查询余额
//                    BigInteger userBalances=lqktoken.balanceOf(user1).send();   //之所以这里账户1能够获得的所有token,是因为合约中在创建时就赋值了。
//                    Log.e(TAG,"user1 balances:"+userBalances.toString()); //Toen余额
////                    BigInteger userBalanceEth=lqktoken.gt         //以太币的转账等应该和Token的转账是没有关系的，是独立的。这个没有研究完成，放到后面继续研究，token这一块流程暂时清晰了。
//                    Log.e(TAG,"user1 balances:"+userBalances.toString());



                    //转账
                    String user2="0x1b3f6cb3ef515757c486150497a5fef44bc3a10d";
                    String user2rivateKey="00ee4a6661f90aa490fdc606d226bf1357836970d6d254b65d51b4d05dc955f5";
                    Credentials credentials2= Credentials.create(user2rivateKey);
                    String user3="0xf8f2b4e969af39b43f3eb0d93ae864161e691744";


//                    TransactionReceipt transactionReceipt=lqktoken.transfer(user2,BigInteger.valueOf(3000)).send();
//                    String status=transactionReceipt.getStatus();
//
//                    //转账结果
//                    userBalances=lqktoken.balanceOf(user1).send();
//                    Log.e(TAG,"user1 balances:"+userBalances.toString());
//                    userBalances=lqktoken.balanceOf(user2).send();
//                    Log.e(TAG,"user2 balances:"+userBalances.toString());


                    //向合约转账Token



                    //智能合约验证转账相关，目前还有ETH转账功能有为题，还没发实现。！！！！！！！！
//                    BigDecimal EthBalance = ContractMethod.getInstance().getETHBalanceWithAddress(user1);  //智能合约调用
//                    Log.e(TAG,"user1 EthBalances:"+EthBalance.toString());
//
//
//                    BigDecimal EthBalance01 = ContractMethod.getInstance().getETHBalanceWithAddress(rankingChain_sol.getContractAddress());  //智能合约调用
//                    Log.e(TAG,"rankingChain_sol EthBalances01:"+EthBalance01.toString());
//                    final Double num=40.0;
//                    ContractMethod.getInstance().sendETH(rankingChain_sol.getContractAddress(),num);
//                    BigDecimal EthBalance02 = ContractMethod.getInstance().getETHBalanceWithAddress(rankingChain_sol.getContractAddress());  //智能合约调用
//                    Log.e(TAG,"rankingChain_sol EthBalances02:"+EthBalance02.toString());
//
//
//                    //由于通证是在钱包登录后才有的，所以下面没法进行以太币发送
////                    //转发以太币
//                    BigDecimal EthBalance03 = ContractMethod.getInstance().getETHBalanceWithAddress(user2);  //智能合约调用
//                    Log.e(TAG,"user2 EthBalance03:"+EthBalance03.toString());
//                    ContractMethod.getInstance().sendETH(user2,num);    //发送有问题。
////                    ContractMethod.getInstance().rankingChain_sol.transfer    //这个方法需要在合约中实现，这样才能转账
//                    BigDecimal EthBalance04 = ContractMethod.getInstance().getETHBalanceWithAddress(user2);  //智能合约调用
//                    Log.e(TAG,"user2 EthBalance04:"+EthBalance04.toString());
//
//
//
//                    //ETH转账问题看已经加载好钱包的评定界面调试函数
//
//
//
//                    //从下面验证来看对于智能合约以太转账有点没通，但是token是可行的。
//                    TransactionReceipt transactionReceipt1=lqktoken.transfer(rankingChain_sol.getContractAddress(),BigInteger.valueOf(4000)).send();
//                    String status1=transactionReceipt1.getStatus();
//
//                    //转账结果
//                    userBalances=lqktoken.balanceOf(user1).send();
//                    Log.e(TAG,"user1 balances:"+userBalances.toString());
//                    BigInteger Balance03 =lqktoken.balanceOf(rankingChain_sol.getContractAddress()).send();  //智能合约调用
//                    Log.e(TAG,"rankingChain_sol Balances03:"+Balance03.toString());


                    //为了智能合约能转账，实际要在合约中实现转账方法，这样前端就能直接调用后转账。



                    //部署新合约
//                    PubComentsChain pubcomentschain= PubComentsChain.deploy(web3j,credentials, Contract.GAS_PRICE,Contract.GAS_LIMIT,"0x7c5fdc81096cce9144cc5f542e3a15c1da798c28").send();
//                    Log.e(TAG,"web3j PubComentsChain contract address:"+pubcomentschain.getContractAddress());

                    //这里面credentials采用的是user1的转户信息，所以所有token被转到了user1中。并且合约中的message.sender实际也是credentials中的账户。
                    //用于测试，目前token合约拥有者为user2，他可以任意分配资金给其它用户
                    //注意如果调用的话，sender总是部署的账号。目前把所有token都发给了user2，所有它可以调用分发函数。
                    buttToken=ButtToken.deploy(web3j,credentials, Contract.GAS_PRICE,Contract.GAS_LIMIT,user1).send();
                    pubComentsChain=PubComentsChain.deploy(web3j,credentials, Contract.GAS_PRICE,Contract.GAS_LIMIT,user1).send();
                    Log.e(TAG,"web3j ButtToken contract address:"+buttToken.getContractAddress());
                    Log.e(TAG,"web3j user1 address:"+user1);
                    Log.e(TAG,"web3j user3 address:"+user3);

//                  Log.e(TAG,"web3j ButtToken pubcomentschain:"+buttToken.balanceOf(pubcomentschain.getContractAddress()).send());
                    Log.e(TAG,"web3j ButtToken user1:"+buttToken.balanceOf(buttToken.getContractAddress()).send());
                    Log.e(TAG,"web3j ButtToken user1:"+buttToken.balanceOf(user1).send());
                    Log.e(TAG,"web3j ButtToken user2:"+buttToken.balanceOf(user2).send());
                    Log.e(TAG,"web3j ButtToken user3:"+buttToken.balanceOf(user3).send());
//
//
//                    //合约时无法由别人触发调用转账的，只能是它自己进行。所以下面的方法中实际是账户2想从合约中转token到账户3，这是无法成功的。buttToken已经通过通证和账户2进行了关联。

//                    buttToken.transfer(user3,BigInteger.valueOf(3000)).send();
//                    BigInteger buttToeknBalance= buttToken.balanceOf(user3).send();
//                    Log.e(TAG,"web3j buttToken user3 :"+buttToeknBalance);
//                    Log.e(TAG,"web3j ButtToken user1:"+buttToken.balanceOf(user1).send());
//                    Log.e(TAG,"web3j ButtToken user2:"+buttToken.balanceOf(user2).send());
                    //转点token给钱包
                    buttToken.distrabuteToken(user3,BigInteger.valueOf(3000)).send();
                    buttToken.distrabuteToken(user1,BigInteger.valueOf(3000)).send();
                    buttToken.distrabuteToken(user2,BigInteger.valueOf(3000)).send();
                    Log.e(TAG,"web3j buttToken user3 :"+buttToken.balanceOf(user3).send());
                    Log.e(TAG,"web3j ButtToken user1:"+buttToken.balanceOf(user1).send());
                    Log.e(TAG,"web3j ButtToken user2:"+buttToken.balanceOf(user2).send());

//                    RankingChain rankingChain_sol2=RankingChain.load(rankingChain_sol.getContractAddress(),web3j,credentials, Contract.GAS_PRICE,Contract.GAS_LIMIT);

//                    PubComentsChain pubComentsChain=PubComentsChain.load("0xbB0Ccc3d48eb160EDD287e823B9F6EDd2E624204",web3j,credentials2, Contract.GAS_PRICE,Contract.GAS_LIMIT);


//                    Log.e(TAG,"pubCommentsChain set testNum:"+pubComentsChain.setTestNum(BigInteger.valueOf(111)).send());
//                    pubComentsChain.setTestNum(BigInteger.valueOf(111)).send();
//                    Log.e(TAG,"pubCommentsChain get testNum:"+pubComentsChain.getTestNum().send());





//                    String filmName="jinggang";
//
//                    pubComentsChain.createTest(filmName).send();
//                    Log.e(TAG,"pubCommentsChain get createTest01:"+pubComentsChain.getSponor(filmName).send());
//                    Log.e(TAG,"pubCommentsChain get activityState01:"+pubComentsChain.getActivityStateTest(filmName).send());
//
//                    String filmName02="wodejie";
//                    pubComentsChain.createTest02(filmName02,BigInteger.valueOf(100)).send();
//                    Log.e(TAG,"pubCommentsChain get createTest04:"+pubComentsChain.getActivityStateTest(filmName02).send());
//                    Log.e(TAG,"pubCommentsChain get createTest05:"+pubComentsChain.getSponor(filmName02).send());
//
//
//                    Log.e(TAG,"web3j buttToken pubComentsChain01 :"+buttToken.balanceOf(pubComentsChain.getContractAddress()).send());
//                    Log.e(TAG,"web3j buttToken user1 :"+buttToken.balanceOf(user1).send());
//                    buttToken.transfer(pubComentsChain.getContractAddress(),BigInteger.valueOf(100)).send();
//                    Log.e(TAG,"web3j buttToken pubComentsChain02 :"+buttToken.balanceOf(pubComentsChain.getContractAddress()).send());
//
//
//                    buttToken.distrabuteToken(pubComentsChain.getContractAddress(),BigInteger.valueOf(3000)).send();
//                    Log.e(TAG,"web3j buttToken pubComentsChain03 :"+buttToken.balanceOf(pubComentsChain.getContractAddress()).send());
//                    //token转账有问题,主要原因是合约中必须有足够的Token,不然无法进行合约内部转账。
//                    String filmName01="wodejiejie";
//                    pubComentsChain.createTest01(filmName01,buttToken.getContractAddress(),BigInteger.valueOf(100)).send();
//                    Log.e(TAG,"pubCommentsChain get createTest02:"+pubComentsChain.getActivityStateTest(filmName01).send());
//                    Log.e(TAG,"pubCommentsChain get createTest03:"+pubComentsChain.getSponor(filmName01).send());
//
//
////                    Log.e(TAG," pubcomnetsChain balance01:"+buttToken.balanceOf(pubComentsChain.getContractAddress()).send());
//                    Log.e(TAG," pubcomnetsChain balance02:"+AllEvaluateChainApplication.getsInstance().buttToken.balanceOf(AllEvaluateChainApplication.getsInstance().pubComentsChain.getContractAddress()).send());
//
//
//                    pubComentsChain.createEvaActivityWithToken(filmName,buttToken.getContractAddress(),BigInteger.valueOf(100)).send();
////                    Log.e(TAG,"pubCommentsChain contract activity Sponnor:"+pubComentsChain.getSponor(filmName).send());
//                    Log.e(TAG,"pubCommentsChain contract activity Sponnor111:"+pubComentsChain.getSponor(filmName).send());

//                  Log.e(TAG,"web3j ButtToken pubcomentschain:"+buttToken.balanceOf(pubcomentschain.getContractAddress()).send());
//
//
//
//                  String a=pubcomentschain.techAddr().send().toString();

//                  Log.e(TAG,"web3j PubComentsChain contract techaddress:"+a);
                    int b=0;

                    //验证智能合约往账户转账相关

                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        }).start();
//***************************************************************







    }


    public static AllEvaluateChainApplication getsInstance() {
        return sInstance;
    }

//   protected void init() {
//
////        sp = SharedPreferenceRepository.init(getApplicationContext());
////
////        httpClient = new OkHttpClient.Builder()
////                .addInterceptor(new LogInterceptor())
////                .build();
////
////        Gson gson = new Gson();
////
////        repositoryFactory = RepositoryFactory.init(sp, httpClient, gson);
////
////
////        //创建数据库表
////        DaoMaster.DevOpenHelper mHelper = new DaoMaster.DevOpenHelper(this, "wallet", null);//这里是数据库名称，如果需要多个数据表，实际上只要生成不同的Entity, xxDao就行了
////        SQLiteDatabase db = mHelper.getWritableDatabase();
////        daoSession = new DaoMaster(db).newSession();
//
//
//    }


//    public static OkHttpClient okHttpClient() {
//        return httpClient;
//    }
//
//    public static RepositoryFactory repositoryFactory() {
//        return  repositoryFactory;
//    }

    public final Const _const = new Const();





    /**
     * true表示个人相册管理界面中在onResume时需要刷新界面数据，否则不需要.
     * 说明：因上相片的预览和上传是处于相机等界面之后的Activity里，它不能通过回调
     * （因为隔了系统的相机结果预览界面之后，此系统界面当然不能让它传递回调结果），
     * 但有一个方法：可以像聊天时的图片消息一样上传界面里只需把数据放到一个全局数据结构
     * 中，在ListView里getView时来异步处理之，但这需要独立的数据结构：不现实也不合适。
     * 综上：目前相片上传成功后设置此标识为true，当相片管理界面onResume时从服务端刷新
     * 1次数据从而保证紧随新相片数据能在本地看见的处理方法是当前能使用的较佳方式.
     *  */
    private boolean needRefreshPhotoListForUpdate = false;

    public boolean isNeedRefreshPhotoListForUpdate()
    {
        return needRefreshPhotoListForUpdate;
    }
    public void setNeedRefreshPhotoListForUpdate(boolean needRefreshPhotoListForUpdate)
    {
        this.needRefreshPhotoListForUpdate = needRefreshPhotoListForUpdate;
    }



    private static AllEvaluateChainApplication application=null;    //这个与原来的对象获取及创建不一致论文

    /**
     * @return
     *
     * @since 4.0, 20170223
     */
    public static AllEvaluateChainApplication getInstance2()
    {
        return getApplication();
    }


    public static AllEvaluateChainApplication getApplication() {
        return application;       //一到这就崩溃了
    }


    /** RainbowChat中的IM相关数据模型、全局变量等管理类 */
    private IMClientManager imClientManager = null;



    public IMClientManager getIMClientManager()
    {
        return imClientManager;
    }

}
