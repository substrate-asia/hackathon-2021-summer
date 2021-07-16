package com.tang.util;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.PopupWindow;
import android.widget.TextView;

import com.tang.AllEvaluateChainApplication;
import com.tang.activity.CreateContractActivity;
import com.tang.R;
import com.tang.blockchain.ContractMethod;

import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import static android.support.constraint.Constraints.TAG;

//确认弹窗
public class CreateContractConfirmPopupWindow extends PopupWindow {


    private Context mContext;
    private View view;



    private ImageView BackButton;

    CreateContractActivity mCreateContractActivity;

    ArrayList<String> confirmInfoDtas=new ArrayList<>();

    //发起者数据
    String filmId;
    String sponsorAccountId; //从传过来的列表数据中获得发起者账户。
    String sponsorBouns;  //发起者赞助金。
    String contactDuringTime;
    final int sponsor_fee=10;  //发起者手续费，这个可以是固定值。



    TextView sponsorAccountTV;
    TextView sponsorBonusTV;
    TextView sponsorFeeTV;
    TextView contractDuringTimeTV;




    Button confirmButton;
    Button cancellButton;


    @SuppressLint("InflateParams")
    public CreateContractConfirmPopupWindow(Context context, ArrayList<String>infoDatas,CreateContractActivity createContractActivity){
        this(context, LayoutInflater.from(context)
                .inflate(R.layout.chain_create_contract_confirm_popupwindow,null),infoDatas,createContractActivity);//这里的后面3个参数无用

    }
    private CreateContractConfirmPopupWindow(Context context, View contextView, ArrayList<String>infoDatas,CreateContractActivity createContractActivity){
        super(contextView,1500,1800);
        mContext=context;
        confirmInfoDtas=infoDatas;
        mCreateContractActivity=createContractActivity;

        if((confirmInfoDtas!=null)&&(confirmInfoDtas.size()>0)){
            filmId=confirmInfoDtas.get(0);
            sponsorAccountId=confirmInfoDtas.get(1);
            sponsorBouns=confirmInfoDtas.get(2);
            //把时间也获的一下
        }


        initRecycleView(contextView);

    }

//    @Override
//    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
//        int maxWidth = meathureWidthByChilds() ;
//        super.onMeasure(View.MeasureSpec.makeMeasureSpec(maxWidth, View.MeasureSpec.EXACTLY),heightMeasureSpec);
//    }
//    public int meathureWidthByChilds() {
//        int maxWidth = 0;
//        View view = null;
//        for (int i = 0; i < getAdapter().getCount(); i++) {
//            view = getAdapter().getView(i, view, this);
//            view.measure(View.MeasureSpec.UNSPECIFIED, View.MeasureSpec.UNSPECIFIED);
//            if (view.getMeasuredWidth() > maxWidth){
//                maxWidth = view.getMeasuredWidth();
//            }
//        }
//        return maxWidth;
//    }


    @Override
    public void showAtLocation(View parent,int gravity,int x,int y){
        //这里可能要初始化一些相关的数据。
        super.showAtLocation(parent,gravity,x,y);

    }

    private void initRecycleView(View view) {
        sponsorAccountTV=(TextView)view.findViewById(R.id.sponsor_account_id);
        sponsorBonusTV=(TextView)view.findViewById(R.id.sponsor_bonus);
        sponsorFeeTV=(TextView)view.findViewById(R.id.sponsor_fee);
        contractDuringTimeTV=(TextView)view.findViewById(R.id.contract_time);

        sponsorAccountTV.setText(sponsorAccountId);
        sponsorBonusTV.setText(sponsorBouns);
        //把时间也加上。



        confirmButton=(Button)view.findViewById(R.id.confirm_button);
        cancellButton=(Button)view.findViewById(R.id.cancell_button);

        confirmButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //触发调用创建智能合约
                //这个是网络所以需要用不同的线程

                if(ContractMethod.pubComensChain!=null){

                    //这里最好先判断一下本钱包账户中是否有对应币种的余额。这里合约调用有问题
                    //这里先让pubcomentsChain中分配了token，所以可以执行下面的函数，但是实际过程应该是从用户钱包中进行转账的，并且这个过程总是免不了两个函数
                    //调用过程。一个是钱包转户转账到pubcomentsChain中，然后该合约的方法转账到合约（这里出现重复了）。这种方式感觉不合，应该有更好的方法。

                   ContractMethod.getInstance().createEvaActivityWithToken(filmId,ContractMethod.buttToken.getContractAddress(),BigInteger.valueOf(Integer.parseInt(sponsorBonusTV.getText().toString())));


                    //测试一下合约调用结果，打印一些相关信息
//                    String sponnor= ContractMethod.getInstance().getSponnor(filmId);

                    //合约调用有问题。
                    new Thread(new Runnable(){
                        @Override
                        public void run() {
                            try {

//                                ContractMethod.pubComensChain.createEvaActivityWithToken(filmId,ContractMethod.buttToken.getContractAddress(),BigInteger.valueOf(100)).send();
                                Log.e(TAG,"createEvaActivityWithToken  contract activity welleat Sponnor:"+ContractMethod.pubComensChain.getSponor(filmId).send());
                                int b=1;

                                List<Object> temp_value =  ContractMethod.getInstance().getEvaActivityData(filmId);
                                String sponsor=temp_value.get(0).toString();
                                String participantNum=temp_value.get(4).toString();
                                String activityState=temp_value.get(5).toString();
                                String totalScore=temp_value.get(8).toString();
                                String totalForecastBoxOffice=temp_value.get(9).toString();
                                Log.e(TAG,"pubCommentsChain contract activity data:"+" sponsor "+sponsor+" participantNum "+participantNum+ " activityState "+activityState+ " totalScore "+totalScore+ " totalForecastBoxOffice "+totalForecastBoxOffice);


                            }catch  (Exception e) {
                                e.printStackTrace();
                            }
                        }
                    }).start();


                    //把对应的新评定Item加入到评定界面。直接调用方法。并且把这个合约数据存储到数据库中（这部分可以后面再做）
                    mCreateContractActivity.addNewFileData();

                    //
                    closeWindow(CreateContractConfirmPopupWindow.this);

                    //合约创建成功
                    ToastUtils.showMsg(mContext,"合约创建成功！");


                }
                else{
                    ToastUtils.showMsg(mContext,"合约创建失败！");

                }

            }
        });

        cancellButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                closeWindow(CreateContractConfirmPopupWindow.this);
            }
        });


//        mTeamPanRecycleView=view.findViewById(R.id.TeamPlan_RecycleView);
//        //动态网里面添加Item,通过右上角的添加按钮添加Item
//        //动态添加表项是从这个类来实现的。
//
//        mTeamPanRecycleView.setLayoutManager(new GridLayoutManager(mContext,2));
//        mAdapter = new TeamPlanRecycleViewAdapter(mContext, mTeamPlanDatas,TeamPlanPopupWindow.this);
//        mAdapter.setRecyclerView(mTeamPanRecycleView);
//        mTeamPanRecycleView.setAdapter(mAdapter);




    }

    private void AddItemInRacycleView(){



    }


    private void closeWindow(CreateContractConfirmPopupWindow window){
        if(window!=null){
            window.dismiss();
        }
    }


}
