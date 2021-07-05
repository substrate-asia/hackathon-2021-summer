package com.tang.util;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.PopupWindow;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.tang.AllEvaluateChainApplication;
import com.tang.R;
import com.tang.activity.LoginActivity;
import com.tang.activity.PartInEvaluatttingFilmActivity;
import com.tang.activity.StartActivity;
import com.tang.blockchain.ContractMethod;
import com.tang.blockchain.Wallet;
import com.tang.data_entity.FilmDataPatInForUIEntity;
import com.tang.data_entity.FilmEvaluateDataToSave;
import com.tang.data_entity.PartInFilmEvaluateData;

import net.openmob.mobileimsdk.server.protocal.ProtocalType;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import static android.support.constraint.Constraints.TAG;
//import fr.cryptohash.Keccak256;

public class PartInEvaluateConfirmPopupWindow extends PopupWindow {

    private Context mContext;
    private View view;

//    Bitmap filmImage;
//    String partInNumTV;
//    TextView hotNumTV;
//    TextView filmNameTV;
    TextView subjectivityScoreTV;//主观评分。
    TextView boxOfficeNumTV;//票房。
    TextView partInTickNumTV; //投票数
    TextView partInMemberAccountTV; //参评者账户。

    TextView fightSponsorTV;//争夺发起方

    PartInFilmEvaluateData mpartInFilmEvaluateData;
    private ImageView BackButton;

    //参与者数据

     int partInMember_fee;


    Button confirmButton;
    Button cancellButton;

    PartInEvaluatttingFilmActivity mPartInEvaluatttingFilmActivity;


    @SuppressLint("InflateParams")
    public PartInEvaluateConfirmPopupWindow(Context context, PartInFilmEvaluateData partInFilmEvaluateData){
        this(context, LayoutInflater.from(context)
                .inflate(R.layout.chain_partin_contract_confirm_popupwindow,null),partInFilmEvaluateData);//这里的后面3个参数无用

    }
    private PartInEvaluateConfirmPopupWindow(Context context, View contextView,PartInFilmEvaluateData partInFilmEvaluateData){
        super(contextView,1500,1800);
        mContext=context;
        mpartInFilmEvaluateData=partInFilmEvaluateData;
        mPartInEvaluatttingFilmActivity=(PartInEvaluatttingFilmActivity)context;
        initRecycleView(contextView);



    }

    @Override
    public void showAtLocation(View parent,int gravity,int x,int y){
        //这里可能要初始化一些相关的数据。
        super.showAtLocation(parent,gravity,x,y);

    }

    private void initRecycleView(View view) {
        subjectivityScoreTV=(TextView)view.findViewById(R.id.subjectivity_score);
        boxOfficeNumTV=(TextView)view.findViewById(R.id.box_office);
        partInTickNumTV=(TextView)view.findViewById(R.id.tick_num);
        partInMemberAccountTV=(TextView)view.findViewById(R.id.sponsor_account_id);


        subjectivityScoreTV.setText(String.valueOf(mpartInFilmEvaluateData.getEvaScore()));
        boxOfficeNumTV.setText(String.valueOf(mpartInFilmEvaluateData.getForcastBoxOffice()));
        partInTickNumTV.setText(mpartInFilmEvaluateData.getPartInTickNum());
        partInMemberAccountTV.setText(Wallet.getInstance().getCurrentAddress());
//        partInMemberAccount.setText(mpartInFilmEvaluateData.get);



        confirmButton=(Button)view.findViewById(R.id.confirm_button);
        cancellButton=(Button)view.findViewById(R.id.cancell_button);

        confirmButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //触发调用参加智能合约
                //注意这里需要两次提交。

                int a=0;
                if(ContractMethod.pubComensChain!=null) {
//                   if(mpartInFilmEvaluateData.getEvaCommitNum()!=1){ //首次加密进行提交
//
//
//                        byte[] _hashScore={'0', '1', '2', '3', '4', '5',
//                                '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};  //暂时随便设置一个值
//                        byte[] _hashBoxOffice={'0', '1', '2', '3', '4', '5',
//                                '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
//
//
//                        ContractMethod.getInstance().participateActivityWithBlind(mpartInFilmEvaluateData.getFilmId(),
//                                ContractMethod.buttToken.getContractAddress(),
//                                _hashScore,
//                                _hashBoxOffice,
//                                BigInteger.valueOf(partInMember_fee));
//                        mpartInFilmEvaluateData.setEvaCommitNum(1);
//
//
//                    } else {
                        //第二次明文提交评定


                            //合约调用有问题。
                            new Thread(new Runnable(){
                                @Override
                                public void run() {
                                    try {
                                        Log.e(TAG,"pubCommentsChain filmname 01:"+ mpartInFilmEvaluateData.getFilmId());
                                        //需要修改一下转态才能调用函数
                                        ContractMethod.pubComensChain.setActivityState(mpartInFilmEvaluateData.getFilmId(),BigInteger.valueOf(2)).send();

                                        ContractMethod.getInstance().participateActivityWithReveal(mpartInFilmEvaluateData.getFilmId(),
                                                BigInteger.valueOf(mpartInFilmEvaluateData.getEvaScore()),
                                                BigInteger.valueOf(mpartInFilmEvaluateData.getForcastBoxOffice()));


                                        //打印信息中主观评分与票房预测没有对应上
                                        List<Object> temp_value =  ContractMethod.getInstance().getEvaActivityData(mpartInFilmEvaluateData.getFilmId());
                                        String sponsor=temp_value.get(0).toString();
                                        String participantNum=temp_value.get(4).toString();
                                        String activityState=temp_value.get(5).toString();
                                        String totalScore=temp_value.get(8).toString();
                                        String totalForecastBoxOffice=temp_value.get(9).toString();
                                        Log.e(TAG,"pubCommentsChain contract activity data 01:"+" sponsor "+sponsor+" participantNum "+participantNum+ " activityState "+activityState+ " totalScore "+totalScore+ " totalForecastBoxOffice "+totalForecastBoxOffice);


                                        mpartInFilmEvaluateData.setPartInTickNum(participantNum);
                                        mpartInFilmEvaluateData.setEvaCommitNum(Integer.valueOf(participantNum));

                                        //通过消息来通知主线程中UI修改
                                        Message msg = mHandler.obtainMessage();
                                        msg.what = 0;
                                        //msg.obj = "ok";//可以是基本类型，可以是对象，可以是List、map等；
                                        mHandler.sendMessage(msg);

                                    }catch  (Exception e) {
                                        e.printStackTrace();
                                    }
                                }
                            }).start();

//                    }


                    if (mpartInFilmEvaluateData != null) {
                        //先获得对应影评的数据
                        //把提交的影评和票房数据保存起来，用于后续自动明码提交这些数据。
                        Log.e("test", "save the evaluate in local");
                        PreferencesListDataSave preferencesListDataSave = new PreferencesListDataSave(mContext, "my_evaluate");
                        ArrayList<FilmEvaluateDataToSave> listString = new ArrayList<FilmEvaluateDataToSave>();
                        FilmEvaluateDataToSave filmEvaluateDataToSave = new FilmEvaluateDataToSave(mpartInFilmEvaluateData.getEvaScore(), mpartInFilmEvaluateData.getForcastBoxOffice());
                        listString.add(filmEvaluateDataToSave);
                        preferencesListDataSave.setDataList(mpartInFilmEvaluateData.getFilmName(), listString); //第一个是key值。最好不用名字，而是用电影Id

                    }



                    //参评过的记录是否要放到后台服务器中，还是本地记录就可以了（如果本地数据被清除了就无法显示）。最终决定放入服务器。

                    //合约调用有问题。
//                    new Thread(new Runnable(){
//                        @Override
//                        public void run() {
//                            try {
//                                Log.e(TAG,"pubCommentsChain filmname 02:"+ mpartInFilmEvaluateData.getFilmId());
//
//                                List<Object> temp_value =  ContractMethod.getInstance().getEvaActivityData(mpartInFilmEvaluateData.getFilmId());
//                                String sponsor=temp_value.get(0).toString();
//                                String participantNum=temp_value.get(4).toString();
//                                String activityState=temp_value.get(5).toString();
//                                String totalScore=temp_value.get(8).toString();
//                                String totalForecastBoxOffice=temp_value.get(9).toString();
//                                Log.e(TAG,"pubCommentsChain contract activity data 02:"+" sponsor "+sponsor+" participantNum "+participantNum+ " activityState "+activityState+ " totalScore "+totalScore+ " totalForecastBoxOffice "+totalForecastBoxOffice);
//
//
//                            }catch  (Exception e) {
//                                e.printStackTrace();
//                            }
//                        }
//                    }).start();


                    //关闭确认弹窗
                    closeWindow(PartInEvaluateConfirmPopupWindow.this);
                    ToastUtils.showMsg(mContext,"参评成功！");


                    //测试一下合约调用结果，打印一些相关信息

//                    BigInteger partNum=ContractMethod.getInstance().getParticipantNum(mpartInFilmEvaluateData.getFilmId());
//                    Log.e(TAG,"pubCommentsChain contract activity participantNum:"+partNum);

                }
                else{


                    ToastUtils.showMsg(mContext,"参评失败！");
                }
            }
        });

        cancellButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                closeWindow(PartInEvaluateConfirmPopupWindow.this);
            }
        });

    }



    Handler mHandler = new Handler() {

        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            switch (msg.what) {
                case 0:
                    //把对应的修改的转态Item加入到评定界面。

                    FilmDataPatInForUIEntity filmDataPatInForUIEntity = new FilmDataPatInForUIEntity();
                    //只需要下面这两个值就可以在目的界面找到对应的数据
                    filmDataPatInForUIEntity.setFilmName(mpartInFilmEvaluateData.getFilmName());
                    filmDataPatInForUIEntity.setFilmId(mpartInFilmEvaluateData.getFilmId());

                    //从合约中获得对应活动变动信息。这个要在主线程中
                    mPartInEvaluatttingFilmActivity.upDatefilmItem(filmDataPatInForUIEntity,mpartInFilmEvaluateData);

                    break;

            }
        }

    };



    private void AddItemInRacycleView(){



    }


    private void closeWindow(PartInEvaluateConfirmPopupWindow window){
        if(window!=null){
            window.dismiss();
        }
    }



}
