package com.tang.activity;

import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;

import com.tang.AllEvaluateChainApplication;
import com.tang.AssetFragment;
import com.tang.EvaluattingRecycleViewAdapter;
import com.tang.R;
import com.tang.blockchain.ContractMethod;
import com.tang.blockchain.Wallet;
import com.tang.data_entity.FilmDataPatInForUIEntity;

import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.tuples.generated.Tuple10;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.Callable;

import static android.support.constraint.Constraints.TAG;

//评定界面
public class EvaluatingActivity extends ActivityRoot {

    public  List<FilmDataPatInForUIEntity> mFilmDataPatInFromServerEntities =new ArrayList<FilmDataPatInForUIEntity>();  //先不用全局变量的方法。
    private Context mContext;
    private View view;
    private RecyclerView mFilmRecycleView;
    public EvaluattingRecycleViewAdapter mRecyclerAdapt;

    ImageButton createContractButton;
    ImageButton EvaluateBangButton;
    ImageButton MyEvaluatedButton;

//  String accountId="hfohfoifhoaihoooew23244h";//这个是账户Id,直接获得本用户的钱包Id

    public static EvaluatingActivity evaluatingActivityInstance=null;   //这个是最简单的两个Activity进行交互方法，但是也容易造成内存泄漏，这个后面可以优化一下。


    //布局相关




//    static int itemLastPosition;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //如果有数据加载需要先加载数据
     //   getFilmInfromDB();
        initViews();
        evaluatingActivityInstance=this;
//        evaluatingActivityInstance=this;

        //实现没有参评时的显示，有参评时的显示。
        //每一个参评的日期计算，然后截止日期触发活动截止
        //实现创建功能。
            //对于发起功能：时间的确定由
        //对于创建评定后要在界面上显示对应的Item。







    }


//    @Nullable
//    @Override
//    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {//2
//        super.onCreateView(inflater, container, savedInstanceState);
//        if (assetFragmentView == null) {
//            assetFragmentView = inflater.inflate(R.layout.chain_asset_fragment, container, false);
//            mRvAssetInfo = assetFragmentView.findViewById(R.id.rv_asset_info);
//
//        }
//        //初始的时候不要刷新数据
//        //??????????????主要问题是数据没有刷新的问题，把顺序优化一下。
//        return assetFragmentView;
//    }
//


    private void initViews() {

        setContentView(R.layout.chain_evaluatting_activity);
        initeRecyclerView();

        createContractButton=(ImageButton)findViewById(R.id.create_contract_button);
        EvaluateBangButton=(ImageButton)findViewById(R.id.bang_button);
        MyEvaluatedButton=(ImageButton)findViewById(R.id.finish_button);
        createContractButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(mFilmRecycleView!=null){
                    Intent i= createContractActivityIntent(EvaluatingActivity.this);
                    startActivity(i);

                }


                //测试用
//                try{
//
//                    //测试
//                    //转发以太币
//                    String user2="0x1b3f6cb3ef515757c486150497a5fef44bc3a10d";
//                    final Double num=40.0;
//                    ContractMethod contractMethod=ContractMethod.getInstance();
//                    BigDecimal EthBalance05 = contractMethod.getETHBalanceWithAddress(user2);  //智能合约调用
//                    Log.e(TAG,"user2 EthBalance05:"+EthBalance05.toString());
//                    contractMethod.sendETH(user2,num);    //发送有问题。
////                    ContractMethod.getInstance().rankingChain_sol.transfer    //这个方法需要在合约中实现，这样才能转账
//                    BigDecimal EthBalance06 = contractMethod.getETHBalanceWithAddress(user2);  //智能合约调用
//                    Log.e(TAG,"user2 EthBalance06:"+EthBalance06.toString());
//
//
//                    //通过验证发现本钱包账户的ETH和Token都是0，所以没法进行相关转账。
//                    //下面两个方法是一样的，但是下面的却会出现空引用，研究一下。
//                    BigDecimal EthBalance07 = ContractMethod.getInstance().getETHBalanceWithAddress(Wallet.getInstance().getCurrentAddress());  //智能合约调用
//                    Log.e(TAG,"my weallet ETH01:"+EthBalance07.toString());
//                    //这是直接获得本钱包账户ETH的方法
////                    String balance = ContractMethod.getInstance().getETHBalance().toString();
////                    Log.e(TAG,"my weallet Eth02:"+balance);
//
//
//
//
//
//
//
//
//
//                }catch (Exception e) {
//                    e.printStackTrace();
//                }
//
//
//                new Thread(new Runnable(){
//                    @Override
//                    public void run() {
//                        try {
//
//                            //通过钱包获得该账户下的token,     //智能合约调用
//                            BigInteger balancetoken=AllEvaluateChainApplication.getsInstance().getLqktoken().balanceOf(Wallet.getInstance().getCurrentAddress()).send();
//                            Log.e(TAG,"my weallet token:"+balancetoken.toString());
//
//
//                        } catch (Exception e) {
//                            e.printStackTrace();
//                        }
//
//                    }
//                }).start();

            }
        });

        EvaluateBangButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i= createEvaluatedBangActivityIntent(EvaluatingActivity.this,Wallet.getInstance().getCurrentAddress());
                startActivity(i);


            }
        });
        MyEvaluatedButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent i= MyEvaluatedActivityIntent(EvaluatingActivity.this,Wallet.getInstance().getCurrentAddress());
                startActivity(i);

            }
        });

//
////      loadDataFromDBUtil=new LoadDataFromDBUtil();
//        CardView FilmCardView=(CardView)findViewById(R.id.Evaluate_Film_RecycleView);
//        FilmCardView.setRadius(18);//设置card图片圆角的半径。
//        FilmCardView.setCardElevation(18);//设置阴影部分的大小。
//        FilmCardView.setContentPadding(5,5,5,5);//设置图片距离阴影的大小

//        initeRecyclerView(LayoutInflater.from(EvaluatingActivity.this)
//                .inflate(R.layout.layout_teamplan_popupwindow);//设置好卡片布局的类型

        //每一次打开时统计一下当前时间，获得系统时间，如果
        //实现方式先获得当前时间，然后获得数据库存取数据，如果数据库中获得的最新日期与当前一致 。对于日期，只需要记录赛事其实时间即可
//        Dates=LoadMemberTimeInfo(); //获取日期数据
//        getMembersInfo(); //获取每个成员对应的时间数据。
//
//        refreshButtonsVisible(); //是否显示团队管理按钮。


    }

    public void initeRecyclerView( ){
        mFilmRecycleView = findViewById(R.id.Evaluate_Film_RecycleView);

        //动态网里面添加Item,通过右上角的添加按钮添加Item
        //动态添加表项是从这个类来实现的。
//      mContext=getBaseContext();
        mFilmRecycleView.setLayoutManager(new GridLayoutManager(EvaluatingActivity.this,2));
        mRecyclerAdapt = new EvaluattingRecycleViewAdapter(EvaluatingActivity.this, mFilmDataPatInFromServerEntities);
        //mRecyclerAdapt.getTeamInfActivity(this);
        mRecyclerAdapt.setRecyclerView(mFilmRecycleView);
        mFilmRecycleView.setAdapter(mRecyclerAdapt);

    }



    //参与提交界面
    public static Intent createContractActivityIntent(Context thisActivity
            /*, String accountId*/)   //图片只能通过读取得方式获得
    {
        Intent intent = new Intent(thisActivity, CreateContractActivity.class);
//      intent.putExtra("__accountId__", accountId);
        return intent;
    }


    //评定榜界面
    public static Intent createEvaluatedBangActivityIntent(Context thisActivity
            , String accountId)   //图片只能通过读取得方式获得
    {
        Intent intent = new Intent(thisActivity, EvaluatedBoardActivity.class);
//      intent.putExtra("__accountId__", accountId);
        return intent;
    }


    //我参与评定过的界面
    public static Intent MyEvaluatedActivityIntent(Context thisActivity
            , String accountId)   //图片只能通过读取得方式获得
    {
        Intent intent = new Intent(thisActivity, MyPartInActivity.class);
//      intent.putExtra("__accountId__", accountId);
        return intent;
    }


//    public   void addNewFilmDataItem(FilmDataPatInForUIEntity nwFilmData){  //直接用最简单的静态方法来处理
//        .AddItem(itemLastPosition,nwFilmData);
//
//    }


    @Override
    public void onDestroy(){////把定时器删除
        super.onDestroy();
        mRecyclerAdapt.timer.cancel();

    }



    public void getFilmInfromDB(){

        //定义一个测试数据

//        List<FilmDataPatInForUIEntity> testFilms=new  ArrayList<>();

        FilmDataPatInForUIEntity filmDataPatInForUIEntity =new FilmDataPatInForUIEntity();
        filmDataPatInForUIEntity.setFilmPic(BitmapFactory.decodeResource(getResources(), R.drawable.cat));
        filmDataPatInForUIEntity.setPartInNum("20000");
        filmDataPatInForUIEntity.setHotNum("5");
        filmDataPatInForUIEntity.setFilmName("加菲猫");
        filmDataPatInForUIEntity.setStartTime("2021-03-29");
        filmDataPatInForUIEntity.setEndTime("2021-04-03");
        filmDataPatInForUIEntity.setBonus("50000");

        FilmDataPatInForUIEntity filmDataPatInForUIEntity1 =new FilmDataPatInForUIEntity();
        filmDataPatInForUIEntity1.setFilmPic(BitmapFactory.decodeResource(getResources(), R.drawable.jtz));
        filmDataPatInForUIEntity1.setPartInNum("20000");
        filmDataPatInForUIEntity1.setHotNum("5");
        filmDataPatInForUIEntity1.setFilmName("金刚大战哥斯拉");
        filmDataPatInForUIEntity1.setStartTime("2021-03-29");
        filmDataPatInForUIEntity1.setEndTime("2021-04-03");
        filmDataPatInForUIEntity1.setBonus("50000");

        mFilmDataPatInFromServerEntities.add(filmDataPatInForUIEntity);
        mFilmDataPatInFromServerEntities.add(filmDataPatInForUIEntity);
        mFilmDataPatInFromServerEntities.add(filmDataPatInForUIEntity1);
        mFilmDataPatInFromServerEntities.add(filmDataPatInForUIEntity1);
        mFilmDataPatInFromServerEntities.add(filmDataPatInForUIEntity);
        mFilmDataPatInFromServerEntities.add(filmDataPatInForUIEntity);
        mFilmDataPatInFromServerEntities.add(filmDataPatInForUIEntity1);
        mFilmDataPatInFromServerEntities.add(filmDataPatInForUIEntity1);

        //实际上这里需要从数据库读取数据！！！！！



    }



}
