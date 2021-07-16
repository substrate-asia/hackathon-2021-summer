//package com.tang.util;
//
//import android.app.Activity;
//import android.content.Context;
//import android.content.Intent;
//
//
//import com.eva.android.widget.ImageViewActivity.ImageDataType;
//import com.tang.AllEvaluateChainApplication;
//import com.tang.activity.LoginActivity;
////import com.tang.profile.photo.PhotosViewActivity;
//import com.tang.profile.photo.PreviewAndUploadActivity;
////import com.tang.profile.photo.ViewPhotoActivity;
//import com.x52im.rainbowchat.http.logic.dto.GroupEntity;
//import com.x52im.rainbowchat.http.logic.dto.RosterElementEntity;
//import com.x52im.rainbowchat.http.logic.dto.UserRegisterDTO;
//
//
//
//import java.util.ArrayList;
//
//public class IntentFactory
//{
//
//	/**
//	 * 打开ViewPhotoActivity的Intent构造方法.
//	 *
//	 * @param thisActivity
//	 * @param imageDataType 必需参数：要查看的图看资源来源类型，参见类{@link ImageDataType}
//	 * @param imageDataSrc 必需参数：资源来源
//	 * @param saveToDir 可选参数：当imageDataType={@link ImageDataType#URL}时此参数为必须，表示图片缓存path
//	 * @param canMgr 必需参数：存发送图片功能的应用场景参数: 0 表示仅用于查看、1 表示可
//
//	 * @param photoId 可选参数：放于服务端的对应db记录主键id，当canMgr="true"时，本参数为必需，否则可为null
//	 * @param fileName 可选参数：存放于服务端磁盘上的文件名，当canMgr="true"时，本参数为必需，否则可为null
//	 * @return
//	 */
//	public static Intent createViewPhotoActivityIntent(Context thisActivity
//			, int imageDataType, String imageDataSrc, String saveToDir
//			, boolean canMgr, String photoId, String fileName)
//	{
//		return com.eva.android.IntentFactory.createImageViewActivityIntent(thisActivity, imageDataType, imageDataSrc, ViewPhotoActivity.class
//				, -1, -1
//				, saveToDir 		// exData1
//				, canMgr?"1":"0"    // exData2
//				, photoId   		// exData3
//				, fileName  		// exData4
//				, null, null);
//	}
//
//	/**
//	 * 打开PreviewAndSendActivity的Intent构造方法.
//	 *
//	 * @param thisActivity
//	 * @param imageDataType
//	 * @param imageDataSrc
//	 * @return
//	 */
//	public static Intent createPreviewAndUploadActivityIntent(Context thisActivity
//			, int imageDataType, String imageDataSrc, String friendUID)
//	{
//		return com.eva.android.IntentFactory.createImageViewActivityIntent(thisActivity, imageDataType, imageDataSrc, PreviewAndUploadActivity.class
//				, -1, -1
//				, friendUID
//				, null
//				, null, null, null, null);
//	}
//
//	/**
//	 * 打开SceneMgrActivity的Intent构造方法.
//	 *
//	 * @param thisActivity
//	 * @param photoOfUid 本参数是必须的，表示查看/管理的是谁的相册
//	 * @param canMgr 本参数是必须的，true表示是否有上传、删除等功能
//	 * (通常是本地用户查看自已的相册时)，否则表示仅用查看权限（而无法上
//	 * 传、删除等）通常用于查看别人的相册时
//	 * @return
//	 */
//	public static Intent createPhotosViewActivityIntent(Context thisActivity
//			, String photoOfUid, boolean canMgr)
//	{
//		Intent intent = new Intent(thisActivity, PhotosViewActivity.class);
//		intent.putExtra("__photoOfUid__", photoOfUid);
//		intent.putExtra("__canMgr__", canMgr);
//		return intent;
//	}
//	/**
//	 * 解析intent传过来给SceneMgrActivity的数据.
//	 *
//	 * @param intent
//	 * @return
//	 */
//	public static ArrayList parsePhotosViewActivityIntent(Intent intent)
//	{
//		ArrayList datas = new ArrayList();
//		datas.add(intent.getStringExtra("__photoOfUid__"));
//		datas.add(intent.getBooleanExtra("__canMgr__", false));
//		return datas;
//	}
//
//
////
////	/**
////	 * 打开PreviewAndSendActivity的Intent构造方法.
////	 *
////	 * @param thisActivity
////	 * @param imageDataType
////	 * @param imageDataSrc
////	 * @param usedFor 发送图片功能的应用场景参数，详见{@link PreviewAndSendActivity}
////	 * @return
////	 */
////	public static Intent createPreviewAndSendActivityIntent(Context thisActivity
////			, int imageDataType, String imageDataSrc, String friendUID
////			, String usedFor
////			)
////	{
////		return com.eva.android.IntentFactory.createImageViewActivityIntent(thisActivity
////				, imageDataType
////				, imageDataSrc
////				, PreviewAndSendActivity.class
////				, -1, -1
////				, friendUID
////				, usedFor
////				, null, null, null, null);
////	}
////
//	/**
//	 * 打开VideoCallComeActivity的Intent构造方法.
//	 *
//	 * @param thisActivity
//	 * @return
//	 */
////	public static Intent createHelpActivityIntent(Context thisActivity
////			, int finishAction, boolean isJiaocheng)
////	{
////		Intent intent = new Intent(thisActivity, HelpActivity.class);
////		intent.putExtra("finish_action", finishAction);
////		intent.putExtra("isJiaocheng", isJiaocheng);
////		return intent;
////	}
//	/**
//	 * 解析intent传过来给VideoCallComeActivity的数据.
//	 *
//	 * @param intent
//	 * @return
//	 */
//	public static ArrayList parseHelpActivityIntent(Intent intent)
//	{
//		ArrayList datas = new ArrayList();
//		datas.add(intent.getIntExtra("finish_action", -1));
//		datas.add(intent.getBooleanExtra("isJiaocheng", false));
//		return datas;
//	}
//
//
//	/**
//	 * 打开ForgetPassWordActivity的Intent构造方法.
//	 *
//	 * @param thisActivity
//	 * @return
//	 */
////	public static Intent createForgetPassWordIntent(Context thisActivity)
////	{
////		Intent intent = new Intent(thisActivity, ForgetPassWordActivity.class);
////		return intent;
////	}
//
//	// -------------------------------------------------------------------------------------------
//
//
//
//
//	/**
//	 * 解析intent传过来给SceneMgrActivity的数据.
//	 *
//	 * @param intent
//	 * @return
//	 */
//	public static String parseSceneMgrIntent(Intent intent)
//	{
//		return intent.getStringExtra("__myCurrentSenceName__");
//	}
//
//
//	/**
//	 * 打开RegisterSuccess的Intent构造方法
//	 *
//	 * @param thisActivity
//	 * @return
//	 */
////	public static Intent createRegisterSuccessIntent(Activity thisActivity, UserRegisterDTO u)
////	{
////		Intent intent = new Intent(thisActivity, RegisterSuccessActivity.class);
////		intent.putExtra("__UserRegisterDTO__", u);
////		return intent;
////	}
//
//	/**
//	 * 解析intent传过来的RegisterActivity数据
//	 *
//	 * @param intent
//	 * @return
//	 */
//	public static UserRegisterDTO parseRegisterSuccessIntent(Intent intent)
//	{
//		return (UserRegisterDTO) intent.getSerializableExtra("__UserRegisterDTO__");
//	}
//
//	/**
//	 * 打开LoginActivity的Intent构造方法. 此方法通常用于无法普通地打开登陆界面的场景.
//	 *
//	 * @param thisActivity
//	 * @return
//	 */
////	public static Intent createLoginIntent(Context thisActivity)
////	{
////		// init MobileIMSDK first（必须保证此代码被调用，否则IM框架无法完成IM服务器的连接等工作）
////		// 通常在打开登陆界面调用此方法，是合理的，因为它下一步就是登陆im框架啊
////	    MyApplication.getInstance(thisActivity).getIMClientManager().initMobileIMSDK();
////
////		Intent intent = new Intent(thisActivity, LoginActivity.class);
////		return intent;
////	}
//
//	/**
//	 * 打开LoginActivity的Intent构造方法. 此方法目前用于注册成功后，自动把登陆名和密码传入登陆界面从而方便登陆的场景.
//	 *
//	 * @param thisActivity
//	 * @param loginUidOrEmail
//	 * @param loginPassword
//	 * @return
//	 */
//	public static Intent createLoginIntent(Activity thisActivity, String loginUidOrEmail, String loginPassword)
//	{
//		Intent intent = new Intent(thisActivity, LoginActivity.class);
//		intent.putExtra("__loginUidOrEmail__", loginUidOrEmail);
//		intent.putExtra("__loginPassword__", loginPassword);
//
//		return intent;
//	}
//	/**
//	 * 解析intent传过来给LoginActivity的数据.
//	 *
//	 * @param intent
//	 * @return
//	 */
//	public static ArrayList parseLoginFormIntent(Intent intent)
//	{
//		ArrayList datas = new ArrayList();
//		datas.add(intent.getSerializableExtra("__loginUidOrEmail__"));
//		datas.add(intent.getSerializableExtra("__loginPassword__"));
//		return datas;
//	}
//
//
//
//}
//
//
//
