//package com.tang.profile.photo;
//
//import android.content.DialogInterface;
//import android.os.Bundle;
//import android.view.View;
//
//import com.eva.android.widget.DataLoadingAsyncTask;
//import com.eva.android.widget.ImageViewActivity;
//import com.eva.android.widget.alert.AlertDialog;
//import com.eva.framework.dto.DataFromServer;
//import com.x52im.rainbowchat.MyApplication;
//import com.x52im.rainbowchat.R;
//import com.x52im.rainbowchat.network.http.HttpRestHelper;
//
///**
// * 查看“我的相册”中的某一张照片的Activity实现类.
// *
// * @author Jack Jiang(http://www.52im.net/space-uid-1.html)
// * @since 2.5
// */
//public class ViewPhotoActivity extends ImageViewActivity
//{
//	private final static String TAG = ViewPhotoActivity.class.getSimpleName();
//
//	/** 功能应用场景：0 表示仅用于查看、1 表示可查看且可以删除之（通常由相片所有者使用） */
//	private String usedFor = null;
//	/** 该id对应于服务端db表"用户2进制资源"的主键“resource_id” */
//	private String photoId = null;
//	private String fileName = null;
//
//	/**
//	 * {@inheritDoc}
//	 */
//	@Override
//	protected void initDataFromIntent()
//	{
//		super.initDataFromIntent();
//
//		// 根据start时的Intent传的参数
//		usedFor = mExData2;
//		photoId = mExData3;
//		fileName = mExData4;
//	}
//
//	/**
//	 * 本方法由父类的onCreate()调用，子类可在此方法中实现自已的UI显示逻辑。
//	 */
//	@Override
//	protected void initViews(Bundle savedInstanceState)
//	{
//		super.initViews(savedInstanceState);
//
//		this.setTitle($$(R.string.main_more_profile_photo_viewphoto_title));
//
//		// 1 表示可查看且可以删除之（通常由相片所有者使用）
//		if("1".equals(usedFor))
//		{
//			// 设置操作条可见
//			this.getFunctionBarLayout().setVisibility(View.VISIBLE);
//			this.getFunctionButton1().setVisibility(View.VISIBLE);
//			this.mBtnSavePicToGalery.setVisibility(View.GONE);
//			this.getFunctionButton1().setText($$(R.string.main_more_profile_photo_viewphoto_deletebtn));
//			this.getFunctionButton1().setBackgroundResource(R.drawable.common_btn_lightred_2019);
//		}
////		else
////		{
////			// 设置操作条不可见
////			this.getFunctionBarLayout().setVisibility(View.GONE);
////			this.getFunctionButton1().setVisibility(View.GONE);
////		}
//	}
//
//	/**
//	 * 点击操作按钮时要调用的方法.
//	 */
//	@Override
//	protected void fireOpr()
//	{
//		new AlertDialog.Builder(ViewPhotoActivity.this)
//		.setTitle(R.string.general_prompt)
//		.setMessage($$(R.string.main_more_profile_photo_viewphoto_deletehint))
//		.setPositiveButton(R.string.general_yes, new DialogInterface.OnClickListener(){
//			@Override
//			public void onClick(DialogInterface dialog,int which)
//			{
//				new DataLoadingAsyncTask<String, Integer, DataFromServer>(ViewPhotoActivity.this
//						, $$(R.string.main_more_profile_photo_viewphoto_deletewaiting))
//				{
//					@Override
//					protected DataFromServer doInBackground(String... params)
//					{
//						return deleteBinaryRes_photo(photoId, fileName);
//					}
//
//					@Override
//					protected void onPostExecuteImpl(Object arg0)
//					{
//						// 设置相册界面刷新标识量：true表示个人相册管理界面中在onResume时需要刷新界面数据，否则不需要.
//						//（关于相片上传成功后的数据刷新方式说明请参见MyApplication中对该标识量的注释）
//						MyApplication.getInstance(ViewPhotoActivity.this).setNeedRefreshPhotoListForUpdate(true);
//						//
//						finish();
//					}
//				}.execute();
//			}
//		})
//		.setNegativeButton(ViewPhotoActivity.this.getString(R.string.general_no), null)
//		.show();
//	}
//
//	public static DataFromServer deleteBinaryRes_photo(String resourceId, String fileName)
//	{
//		return deleteBinaryRes(resourceId, fileName, "0");
//	}
//	public static DataFromServer deleteBinaryRes_pvoice(String resourceId, String fileName)
//	{
//		return deleteBinaryRes(resourceId, fileName, "1");
//	}
//	public static DataFromServer deleteBinaryRes(String resourceId, String fileName, String resType)
//	{
////		return HttpServiceFactory4AImpl.getInstance().getDefaultService().sendObjToServer(
////				DataFromClient.n().setProcessorId(MyProcessorConst.PROCESSOR_UPLOAD_BINARY)
////				.setJobDispatchId(JobDispatchConst.LOGIC_MGR$PROFILE)
////				.setActionId(SysActionConst.ACTION_APPEND1)
////				.setNewData(new String[]{resource_id, fileName, resType}));
//		return HttpRestHelper.submitDeleteProfileBinaryToServer(resourceId, fileName, resType);
//	}
//}
