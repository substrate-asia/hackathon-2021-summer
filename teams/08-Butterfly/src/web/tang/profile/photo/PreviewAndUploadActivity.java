package com.tang.profile.photo;

import android.os.Bundle;
import android.view.View;

import com.eva.android.widget.AProgressDialog;
import com.eva.android.widget.ImageViewActivity;
import com.eva.android.widget.WidgetUtils;
import com.eva.android.widget.WidgetUtils.ToastType;
import com.tang.AllEvaluateChainApplication;
import com.tang.R;

import java.util.Observable;
import java.util.Observer;

/**
 * 要上传照片的图片预览和上传处理Activity实现类（本类当前仅用于上传照片时）.
 * <p>

 * 为了以冗余换维护的灵活性，先就这么用吧.
 * 
 * @author Jack Jiang(http://www.52im.net/space-uid-1.html)
 * @since 2.5
 */
public class PreviewAndUploadActivity extends ImageViewActivity
{
	private final static String TAG = PreviewAndUploadActivity.class.getSimpleName();
	
	/** 压缩质量：上传前要压缩的图片质量（0~100值） */
	// 在魅族2上，微信先将图片缩小至75%后，再压缩质量（从400K左右到35K左右），经测试估计是质量75哦
	// 调整COMPRESS_QUALITY值可压缩图像大小，最大100. meizu2上100时400K左右，75时35K左右，再低则
	// 图像的大小变化不太明显了（20为13K左右）
	private final int COMPRESS_QUALITY = 75;
	
	/** 
	 * 经过压缩、重命名处理后真正要发送出去的文件名（此文件名可作为发送方的本地缓存直接使用）.
	 * 除非压缩、重命名等处理成功完成，否则本字段将一直是null. */
	private String processedFileName = null;
	
	// 是否正在上传中：因上传是在要界面中完成的，所以为防止重复提交，需要此标识量
	private boolean uploading = false;
	private AProgressDialog uploadingPd = null;
	
	/**
	 * 本方法由父类的onCreate()调用，子类可在此方法中实现自已的UI显示逻辑。
	 */
	@Override
	protected void initViews(Bundle savedInstanceState)
	{
		super.initViews(savedInstanceState);
		
		this.setTitle($$(R.string.main_more_profile_photo_previewandupload_title));
		// 设置操作条可见
		this.getFunctionBarLayout().setVisibility(View.VISIBLE);
		this.getFunctionButton1().setVisibility(View.VISIBLE);
        this.mBtnSavePicToGalery.setVisibility(View.GONE);
		this.getFunctionButton1().setText($$(R.string.main_more_profile_photo_previewandupload_uploadbtn));
		
		//
		uploadingPd = new AProgressDialog(this, $$(R.string.main_more_profile_photo_previewandupload_uploading));
	}
	
	/**
	 * 点击操作按钮时要调用的方法.
	 */
	@Override
	protected void fireOpr()
	{
//		boolean decreaseSizeOK = PreviewAndSendActivity.decreaseAndRenameSize(this
//                , mImageDataType, mImageDataSrc
//				, mBmOriginalForView, COMPRESS_QUALITY
//				, new Observer(){
//					@Override
//					public void update(Observable observable, Object data)
//					{
//						// 将重命名后的文件名保存到全局变量保存
//						processedFileName = (String)data;
//					}
//				});

//		if(decreaseSizeOK)
//		{
//			// 处理结果观察者实现对象
//			SendStatusSecondaryResult sendStatusSecondaryResult = new SendStatusSecondaryResult(){
//				@Override
//				public void processing()
//				{
//					//
//					uploading = true;
//					uploadingPd.show();
//				}
//
//				@Override
//				public void processFaild()
//				{
//					if(uploadingPd.isShowing())
//						uploadingPd.dismiss();
//
//					uploading = false;
//
//					WidgetUtils.showToast(PreviewAndUploadActivity.this
//							, $$(R.string.main_more_profile_photo_previewandupload_uploadfaild), ToastType.WARN);
//				}
//
//				@Override
//				public void processOk()
//				{
//					if(uploadingPd.isShowing())
//						uploadingPd.dismiss();
//
//					uploading = false;
//
//					// 设置标识量，以便相片管理界面在onResume时能即时刷新数据
//					MyApplication.getInstance(PreviewAndUploadActivity.this)
//						.setNeedRefreshPhotoListForUpdate(true);
//
//					WidgetUtils.showToast(PreviewAndUploadActivity.this
//							, $$(R.string.main_more_profile_photo_previewandupload_uploadok), ToastType.OK);
//
//					// 上传成功完成后关闭本界面
//					finish();
//				}
//			};
//
//			// 处理照片的上传
//			SendImageHelper.processImageUpload(this, processedFileName
//					, sendStatusSecondaryResult, true);
//		}
//		else
//		{
//			WidgetUtils.showToast(this
//					, "Image compress failed, send not sucess!", ToastType.WARN);
//
//			// 出错后关闭本界面
//			finish();
//		}
	}
}
