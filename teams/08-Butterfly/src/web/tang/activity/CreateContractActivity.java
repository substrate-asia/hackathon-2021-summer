package com.tang.activity;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.PopupWindow;
import android.widget.Spinner;
import android.widget.TextView;

import com.eva.android.widget.WidgetUtils;
import com.tang.EvaluattingRecycleViewAdapter;
import com.tang.MySpinnerAdapter;
import com.tang.R;
import com.tang.blockchain.Wallet;
import com.tang.data_entity.FilmDataPatInForUIEntity;
import com.tang.data_entity.SelectFilmItemEntity;
import com.tang.util.CreateContractConfirmPopupWindow;



import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static com.eva.android.BitmapHelper.drawableToBitmap;

//发起者创建智能合约界面
public class CreateContractActivity extends ActivityRoot implements AdapterView.OnItemSelectedListener,DatePicker.OnDateChangedListener{


    Button uploadPicButton;
    Button submitButton; //提交按钮
//    String accountIdIntent;//钱包账户Id
    CreateContractConfirmPopupWindow mconfirmPopupWindowCreateContract;//合约确认按钮。


    ImageView filmImageIV;
    Spinner selectFilmNameSP;
    String partInNum;//参与人数，这个数据要统计获得，不是直接界面获得。
    String hotNum;//热度，计算获得。
    EditText startBonuseEV;
    TextView endTineTV;

    Context mcontext;

    /*电影选择下拉框相关*/
    //判断是否为刚进去时触发onItemSelected的标志
    private boolean spinner_selected = false;
    private BaseAdapter mySPAdadpter = null;
    private ArrayList<SelectFilmItemEntity> filmNameDatas = null;
    private int spinnerPosition;


    //日期选择数据
    private int year, month, day, hour, minute;

    private StringBuffer date;

    //先用最简单的方式更新Iteam数据
//    private ArrayListObservable<FilmDataPatInForUIEntity> staticListData = null;
//
//    private Observer addFilimDataObserver = new Observer(){
//        @Override
//        public void update(Observable observable, Object data)
//        {
//            rosterListAdapter.notifyDataSetChanged();
//        }
//    };
//
//    /** 数据模型变动观察者实现block */
//    private Observer listDatasObserver = null;



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initDataFromIntent();

        setContentView(R.layout.chain_create_contract_activity);
        //这里要先把上一个Activity中的数据接收一下。

        mcontext=getParent();  //这里获得的值为NULL
        filmNameDatas = new ArrayList<SelectFilmItemEntity>();


        initDate();

        initViews();
    }


    protected void initDataFromIntent() //先从上一个Acitivity中获得相关数据
    {
        //解析从intent中传过来的数据
//        ArrayList intentDatas = parseCreatContractIntent(getIntent());
////        accountIdIntent = (String)intentDatas.get(0);
//        accountIdIntent= Wallet.getInstance().getCurrentAddress();

        int a=0;

    }

    /**
     * 获取当前的日期和时间
     */
    private void initDateTime() {
        Calendar calendar = Calendar.getInstance();
        year = calendar.get(Calendar.YEAR);
        month = calendar.get(Calendar.MONTH) + 1;
        day = calendar.get(Calendar.DAY_OF_MONTH);
        hour = calendar.get(Calendar.HOUR);
        minute = calendar.get(Calendar.MINUTE);

        date=new StringBuffer();

    }


    private void initViews() {

        filmImageIV=(ImageView)findViewById(R.id.film_pic);
        selectFilmNameSP=(Spinner)findViewById(R.id.select_film_name);
        startBonuseEV=(EditText) findViewById(R.id.create_contract_bonus);
        endTineTV=(TextView) findViewById(R.id.endTime);
//      uploadPicButton=(Button)findViewById(R.id.uploadPicButton);

//      mUpdateFilmData=(EvaluatingActivity)mcontext.mRecyclerAdapt;


        //selectFilmNameSP需要进行适配。
        mySPAdadpter=new MySpinnerAdapter<SelectFilmItemEntity>(filmNameDatas,R.layout.chain_spin_select_film_item) {
            @Override
            public void bindView(ViewHolder holder, SelectFilmItemEntity obj) {
                holder.setImageResource(R.id.img_icon,obj.getFilmPic());
                holder.setText(R.id.txt_name, obj.getFilmName());
            }
        };
        selectFilmNameSP.setAdapter(mySPAdadpter);
        selectFilmNameSP.setOnItemSelectedListener(this);


//        uploadPicButton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//
//                Intent intent = new Intent();
//                /* 开启Pictures画面Type设定为image */
//                intent.setType("image/*");
//                /* 使用Intent.ACTION_GET_CONTENT这个Action */
//                intent.setAction(Intent.ACTION_GET_CONTENT);
//                /* 取得相片后返回本画面 */
//                startActivityForResult(intent, 1);
//
//            }
//        });





        //获得当前时间。
        initDateTime();

        endTineTV.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                AlertDialog.Builder builder = new AlertDialog.Builder(CreateContractActivity.this);
                builder.setPositiveButton("设置", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        if (date.length() > 0) { //清除上次记录的日期
                            date.delete(0, date.length());
                        }
                        //转化输入格式
                        if((month<10)&&(day>=10)){
                            endTineTV.setText(date.append(String.valueOf(year)).append("-0").append(String.valueOf(month)).append("-").append(day));
                        }else if(month>=10&&day<10){
                            endTineTV.setText(date.append(String.valueOf(year)).append("-").append(String.valueOf(month)).append("-0").append(day));
                        }else if((month<10)&&(day<10)){
                            endTineTV.setText(date.append(String.valueOf(year)).append("-0").append(String.valueOf(month)).append("-0").append(day));
                        }
                        else {
                            endTineTV.setText(date.append(String.valueOf(year)).append("-").append(String.valueOf(month)).append("-").append(day));
                        }

                        dialog.dismiss();
                    }
                });
                builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
                final AlertDialog dialog = builder.create();
                View dialogView = View.inflate(CreateContractActivity.this, R.layout.chain_dialog_date, null);
                final DatePicker datePicker = (DatePicker) dialogView.findViewById(R.id.datePicker);

                dialog.setTitle("设置日期");
                dialog.setView(dialogView);
                dialog.show();
                //初始化日期监听事件
                datePicker.init(year, month - 1, day, CreateContractActivity.this);


            }
        });


        submitButton=(Button)findViewById(R.id.submit_button);
        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


//                String[] endStrs=endDeadLine.getText().toString().split("-");
                String endString=endTineTV.getText().toString().trim();  //注意这个时间并没有传入到ConfirmActivity中
                if(isDateStringValid(endString)){

                    if(endString.length()==10){//日期格式必须为10位 例：2014-02-24
                        //触发确认弹窗。
                        PopPlanWindow(v);
                    } else {
                        WidgetUtils.showToast(CreateContractActivity.this, "请出入正确的日期格式！", WidgetUtils.ToastType.WARN);
                    }
                } else {
                    WidgetUtils.showToast(CreateContractActivity.this, "请出入正确的日期格式！", WidgetUtils.ToastType.WARN);
                }


                //上面的日期改为日期选择控件。





              ///  if((endStrs[0].equals()l)&&(endStrs[1]!=null)&&(endStrs[2]!=null)){ //年月日数据不能为空

//                    int endYear=Integer.parseInt(endStrs[0]);
//                    int endMonth=Integer.parseInt(endStrs[1]);
//                    int endDay=Integer.parseInt(endStrs[2]);
//
//
//                    //这里要检验一下输入框中的数据是否正确。
//                if(endDeadLine.getText()!=null){   //直接解析输入框中的数据看是否满足要求
//







//                WidgetUtils.areYouSure(CreateContractActivity.this
//                        , "确认要创建评定合约吗？"
////						, "Discover the new version already exists on the SD card, if not by downloading directly from the local installation?"
//                        , parentActivity.getResources().getString(R.string.general_prompt)
//                        , new Action() //确认时要执行的动作——直接安装该存在的APK文件
//                        {
//                            @Override
//                            public void actionPerformed(Object dialog){
////								FileSystemHelper.viewFile(doawnLoadedFile, parentActivity);
//                                OpenFileUtil.openFile(parentActivity, doawnLoadedFile.getAbsolutePath());
//                            }
//                        }
//                        , new Action() //取消时要执行的动作——忽略已存的apk文件重新下载新版程序
//                        {
//                            @Override
//                            public void actionPerformed(Object dialog)
//                            {
//                                downloadTheFile(newVersionDowloadURL);
//                                showDownWaitDialog();
//                            }
//                        }
//                );


            }
        });


    }




    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        switch (parent.getId()){
            case R.id.select_film_name:
                if(spinner_selected){

                    spinnerPosition=position; //获得选定的下拉框数据位置

//                    Toast.makeText(this,"您的分段是~：" + parent.getItemAtPosition(position).toString(),
//                            Toast.LENGTH_SHORT).show();

                    filmImageIV.setImageBitmap(filmNameDatas.get(position).getFilmPic());
                }else spinner_selected = true;
                break;
//            case R.id.spin_two:
//                if(two_selected){
//                    TextView txt_name = (TextView) view.findViewById(R.id.txt_name);
//                    Toast.makeText(mContext,"您选择的英雄是~：" + txt_name.getText().toString(),
//                            Toast.LENGTH_SHORT).show();
//                }else two_selected = true;
//                break;
        }
    }
    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }



    public void initDate(){


        downloaddData();

        //根据filmId下载图片,每个客户端都会有下载操作，只是如果让合约创建者上传图片。先按照上传图片来实现

        //这里同样把对应的新上映的电影图片从服务其中传入进来，通过异步的方式下载。



        //这个数据是需要从数据库中获得的新上映影视名称。图片暂时直接设置，实际上这是要从服务器中下载的。
        filmNameDatas.add(new SelectFilmItemEntity("20210430GDZJ", BitmapFactory.decodeResource(getResources(),R.drawable.jtz),"金刚大战哥斯拉"));
        filmNameDatas.add(new SelectFilmItemEntity("20210501WDJJ",BitmapFactory.decodeResource(getResources(),R.drawable.cat),"我的姐姐"));
        filmNameDatas.add(new SelectFilmItemEntity("0001",null,"无极剑圣：易（Yi）"));
        filmNameDatas.add(new SelectFilmItemEntity("0001",null,"德莱厄斯：德莱文（Draven）"));
        filmNameDatas.add(new SelectFilmItemEntity("0001",null,"德邦总管：赵信（XinZhao）"));
        filmNameDatas.add(new SelectFilmItemEntity("0001",null,"狂战士：奥拉夫（Olaf）"));

    }

    //从服务器中获得电影名称和电影Id数据。
    private List<SelectFilmItemEntity> downloaddData(){
        List<SelectFilmItemEntity> filmNameDatas=new ArrayList<>();



        return filmNameDatas;


    }

    void uploadLocalFilmPic(){


    }


    //上传数据到服务器
    void uploadDaata(FilmDataPatInForUIEntity filmDataPatInForUIEntity){



    }


    /*
    * 整个Item的添加流程。从 CreateContractConfirmPopupWindow->CreateContractActivity->
    * EvaluattingRecycleViewAdapter.
    * 且不同Activity中直接采用静态方法调用
    * */

    public void addNewFileData(){ //添加一个新的影评合约数据。
        FilmDataPatInForUIEntity newFileData=new FilmDataPatInForUIEntity();  //创建新的合约电影数据
        newFileData.setFilmPic(filmNameDatas.get(spinnerPosition).getFilmPic());
        newFileData.setFilmName(filmNameDatas.get(spinnerPosition).getFilmName());
        newFileData.setFilmId(filmNameDatas.get(spinnerPosition).getFilmId()); //这个Id可以是和服务器
        newFileData.setBonus(startBonuseEV.getText().toString());
//      newFileData.setStartTime(StartDeadLine.getText().toString());
        String date=endTineTV.getText().toString();
        newFileData.setEndTime(endTineTV.getText().toString());
        newFileData.setSponsorAccountId(Wallet.getInstance().getCurrentAddress());
        //日期格式没有问题，只是要自己输入


        EvaluattingRecycleViewAdapter.recycleViewInstance.AddfilmDataItem(newFileData);


        //这里触发新建合约到后台服务器中。
        uploadDaata(newFileData);


//      return  newFileData;

    }



    /**
     * 解析intent传过来给团队/世界频道的数据。
     *
     * @param intent
     * @return
     */
    public static ArrayList parseCreatContractIntent(Intent intent)
    {
        ArrayList datas = new ArrayList();
        datas.add(intent.getSerializableExtra("__accountId__"));
        return datas;
    }


    ArrayList<String>infoDatas=new ArrayList<>();
    private void PopPlanWindow(View parent){
        infoDatas.add(filmNameDatas.get(spinnerPosition).getFilmId());
        infoDatas.add(Wallet.getInstance().getCurrentAddress());
        infoDatas.add(startBonuseEV.getText().toString());
        mconfirmPopupWindowCreateContract =new CreateContractConfirmPopupWindow(this,infoDatas,CreateContractActivity.this);
        mconfirmPopupWindowCreateContract.setOutsideTouchable(false);
        mconfirmPopupWindowCreateContract.setFocusable(false);
        mconfirmPopupWindowCreateContract.update();
        mconfirmPopupWindowCreateContract.showAtLocation(parent, Gravity.BOTTOM,0,0);
    }


    //判断日期输入框中输入的日期格式

    /**
     * 判断字符串是否为日期格式
     * @param date
     * @return
     */
    public boolean isDateStringValid(String date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-DD");
        // 输入对象不为空
        try {
            sdf.parse(date);
            return true;
        } catch (java.text.ParseException e) {
            return false;
        }
    }




    /**
     * 日期改变的监听事件
     *
     * @param view
     * @param year
     * @param monthOfYear
     * @param dayOfMonth
     */
    @Override
    public void onDateChanged(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
        this.year = year;
        this.month = monthOfYear;
        this.day = dayOfMonth;
    }











//    private static final int  RESULT_LOAD_IMAGE= 1;
//    private void showPopueWindow(){
//
//        View popView = View.inflate(this,R.layout.chain_upload_film_pic_popupwindow,null);
//        Button bt_album = (Button) popView.findViewById(R.id.btn_pop_album);
////        Button bt_camera = (Button) popView.findViewById(R.id.btn_pop_camera);
//        Button bt_cancle = (Button) popView.findViewById(R.id.btn_pop_cancel);
//        //获取屏幕宽高
//        int weight = getResources().getDisplayMetrics().widthPixels;
//        int height = getResources().getDisplayMetrics().heightPixels*1/3;
//
//        final PopupWindow popupWindow = new PopupWindow(popView,weight,height);
////        popupWindow.setAnimationStyle(R.style.anim_popup_dir);
//        popupWindow.setFocusable(true);
//        //点击外部popueWindow消失
//        popupWindow.setOutsideTouchable(true);
//
//        bt_album.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Intent i = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
//                startActivityForResult(i, RESULT_LOAD_IMAGE);
//                popupWindow.dismiss();
//
//            }
//        });
////        bt_camera.setOnClickListener(new View.OnClickListener() {
////            @Override
////            public void onClick(View v) {
////                takeCamera(RESULT_CAMERA_IMAGE);
////                popupWindow.dismiss();
////
////            }
////        });
//        bt_cancle.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                popupWindow.dismiss();
//
//            }
//        });
//        //popupWindow消失屏幕变为不透明
//        popupWindow.setOnDismissListener(new PopupWindow.OnDismissListener() {
//            @Override
//            public void onDismiss() {
//                WindowManager.LayoutParams lp = getWindow().getAttributes();
//                lp.alpha = 1.0f;
//                getWindow().setAttributes(lp);
//            }
//        });
//        //popupWindow出现屏幕变为半透明
//        WindowManager.LayoutParams lp = getWindow().getAttributes();
//        lp.alpha = 0.5f;
//        getWindow().setAttributes(lp);
//        popupWindow.showAtLocation(popView, Gravity.BOTTOM,0,50);
//
//    }
//
//    @Override
//    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//        super.onActivityResult(requestCode, resultCode, data);
//
//        if (resultCode == RESULT_OK ) {
//            if (requestCode == RESULT_LOAD_IMAGE && null != data) {
//                Uri selectedImage = data.getData();
//                String[] filePathColumn = {MediaStore.Images.Media.DATA};
//
//                Cursor cursor = getContentResolver().query(selectedImage,
//                        filePathColumn, null, null, null);
//                cursor.moveToFirst();
//
//                int columnIndex = cursor.getColumnIndex(filePathColumn[0]);
//                final String picturePath = cursor.getString(columnIndex);
//                upload(picturePath);
//                cursor.close();
//            }
////            else if (requestCode == RESULT_CAMERA_IMAGE){
////
////                SimpleTarget target = new SimpleTarget<Bitmap>() {
////
////                    @Override
////                    public void onResourceReady(Bitmap resource, GlideAnimation<? super Bitmap> glideAnimation) {
////                        upload(saveMyBitmap(resource).getAbsolutePath());
////                    }
////
////                    @Override
////                    public void onLoadStarted(Drawable placeholder) {
////                        super.onLoadStarted(placeholder);
////
////                    }
////
////                    @Override
////                    public void onLoadFailed(Exception e, Drawable errorDrawable) {
////                        super.onLoadFailed(e, errorDrawable);
////
////                    }
////                };
////
////                Glide.with(RegisterUIActivity.this).load(mCurrentPhotoPath)
////                        .asBitmap()
////                        .diskCacheStrategy(DiskCacheStrategy.SOURCE)
////                        .override(1080, 1920)//图片压缩
////                        .centerCrop()
////                        .dontAnimate()
////                        .into(target);
////
////
////            }
//        }
//    }
//
//
//
//    private void upload(String picturePath) {
//        final ProgressDialog pb= new ProgressDialog(this);
//
//        pb.setMessage("正在上传");
//        pb.setCancelable(false);
//        pb.show();
//
//        imageUpLoad(picturePath, new Response<FileUpload>() {
//
//            @Override
//            public void onSuccess(FileUpload response) {
//                super.onSuccess(response);
//                if (response.success) {
//                    myFileId = response.fileID;
//                    runOnUiThread(new Runnable() {
//                        @Override
//                        public void run() {
//                            ToastUtils.showShortToast("上传成功");
//                            pb.dismiss();
//                        }
//                    });
//                }
//            }
//
//            @Override
//            public void onFaile(String e) {
//                super.onFaile(e);
//                runOnUiThread(new Runnable() {
//                    @Override
//                    public void run() {
//                        pb.dismiss();
//                        ToastUtils.showShortToast("上传失败");
//                    }
//                });
//            }
//        });
//    }
//
//    public static void imageUpLoad(String localPath, final Response<FileUpload> callBack) {
//        MediaType MEDIA_TYPE_PNG = MediaType.parse("image/png");
//        OkHttpClient client = new OkHttpClient();
//
//
//        MultipartBody.Builder builder = new MultipartBody.Builder().setType(MultipartBody.FORM);
//
//        File f = new File(localPath);
//        builder.addFormDataPart("file", f.getName(), RequestBody.create(MEDIA_TYPE_PNG, f));
//
//        final MultipartBody requestBody = builder.build();
//        //构建请求
//        final Request request = new Request.Builder()
//                .url("http://  ")//地址
//                .post(requestBody)//添加请求体
//                .build();
//
//        client.newCall(request).enqueue(new okhttp3.Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//
//                callBack.onFaile(e.getMessage());
//                System.out.println("上传失败:e.getLocalizedMessage() = " + e.getLocalizedMessage());
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//
//                FileUpload resultBean = new Gson().fromJson(response.body().string(), FileUpload.class);
//                callBack.onSuccess(resultBean);
//            }
//        });
//
//    }


    }