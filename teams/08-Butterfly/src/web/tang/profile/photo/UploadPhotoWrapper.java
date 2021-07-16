//package com.tang.profile.photo;
//
//import android.app.Activity;
//import android.content.Intent;
//import android.net.Uri;
//import android.util.Log;
//import android.view.Gravity;
//import android.view.View;
//import android.view.View.OnClickListener;
//
//import com.eva.android.OpenFileUtil;
//
//import com.eva.android.UriToFileHelper;
//import com.eva.android.widget.ImageViewActivity;
//import com.eva.android.widget.WidgetUtils;
//import com.eva.android.widget.WidgetUtils.ToastType;
//import com.eva.epc.common.file.FileHelper;
//import com.tang.R;
//
//
//import java.io.File;
//
///**
// * 上传照片的业务功能集包装实现类.
// * <p>
// * 本类完全参考自 {@link com.x52im.rainbowchat.logic.chat_root.sendimg.SendImageWrapper}，
// * 之所以没有考虑重用 {@link com.x52im.rainbowchat.logic.chat_root.sendimg.SendImageWrapper}，是
// * 为了以冗余换维护的灵活性，先就这么用吧.
// *
// * @author Jack Jiang(http://www.52im.net/space-uid-1.html)
// * @since 2.5
// */
//public class UploadPhotoWrapper
//{
//	private final static String TAG = UploadPhotoWrapper.class.getSimpleName();
//
////	/** 回调常量之：拍照 */
////	public static final int TAKE_BIG_PICTURE = 991;
////	/** 回调常量之：从相册中选取2 */
////	public static final int CHOOSE_BIG_PICTURE2 = 996;
//
//	private Activity parentActivity = null;
//	/** 选项弹出窗口的相对显示位置将以此组件为父进行调整显示位置  */
//	private View parentViewForShow = null;
//	// 本地用户uid（也即是照片上传人的uid）
//	private String localUID = null;
//
//	// 自定义的选项弹出框类
//	private SendImageChoicePopWindow menuWindowForSendPic = null;
//
//	// 修改照片的临时文件存放路径（照片修改成功后，会自动删除之）
//	private String __tempImageFileLocation = null;
//
//	public UploadPhotoWrapper(Activity parentActivity, View parentViewForShow
//			, String friendUID
//			)
//	{
//		this.parentActivity = parentActivity;
//		this.parentViewForShow = parentViewForShow;
//		this.localUID = friendUID;
//
//		initViews();
//		initListeners();
//	}
//
//	private void initViews()
//	{
//
//	}
//
//	private void initListeners()
//	{
//	}
//
//	public void showChoice()
//	{
//		//实例化SelectPicPopupWindow
//		if(menuWindowForSendPic == null)
//		{
//			// 为发送照片选项弹出窗口实现监听类
//			OnClickListener  itemsOnClickForSendPic = new OnClickListener(){
//				public void onClick(View v)
//				{
//					menuWindowForSendPic.dismiss();
//					switch (v.getId())
//					{
//						case R.id.chatting_list_view_sendpic_choice_dialog_btn_take_photo:
//						{
//							PictureHelper.takePhoto(parentActivity, ActivityRequestCode.TAKE_BIG_PICTURE, getTempImageFileUri());
//							break;
//						}
//						case R.id.chatting_list_view_sendpic_choice_dialog_btn_pick_photo:
//						{
//							PictureHelper.choosePhoto2(parentActivity, ActivityRequestCode.CHOOSE_BIG_PICTURE2);//, getTempImageFileUri());
//							break;
//						}
//						default:
//							break;
//					}
//				}
//			};
//			menuWindowForSendPic = new SendImageChoicePopWindow(parentActivity, itemsOnClickForSendPic);
//		}
//		//显示窗口
//		menuWindowForSendPic.showAtLocation(parentViewForShow
//				, Gravity.BOTTOM|Gravity.CENTER_HORIZONTAL, 0, 0); //设置layout在PopupWindow中显示的位置
//	}
//
//	/**
//	 * 要由父类调用的回调处理方法.
//	 *
//	 * @param requestCode
//	 * @param resultCode
//	 * @param data
//	 */
//	public void onParantActivityResult(int requestCode, int resultCode, Intent data)
//	{
//		if(resultCode != Activity.RESULT_OK)
//		{
//			//result is not correct
//			Log.d(TAG, "【SendPhoto】requestCode = " + requestCode);
//			Log.d(TAG, "【SendPhoto】resultCode = " + resultCode);
//			Log.d(TAG, "【SendPhoto】data = " + data);
//			return;
//		}
//		else
//		{
//			// 无法成功取到临时文件存放路径（可能是用户没有SD卡或其它原因哦），当然就为往下走了
//			final Uri uri = getTempImageFileUri();
//			final String tempImaheLocation = getTempImageFileLocation();
//			if(uri == null || tempImaheLocation == null)
//			{
//				WidgetUtils.showToast(parentActivity
//						, parentActivity.getString(R.string.chat_sendpic_image_sdcar_error), ToastType.WARN);
//				return;
//			}
//
//			switch (requestCode)
//			{
//				case ActivityRequestCode.TAKE_BIG_PICTURE:// 拍照完成则新拍的文件将会存放于指定的位置（即uri、tempImaheLocation所表示的地方）
//				{
//					Log.d(TAG, "【SendPhoto】TAKE_BIG_PICTURE: data = " + data
//							+",data.getdata="+(data!= null?data.getData():"null"));//it seems to be null
//
//					parentActivity.startActivity(IntentFactory.createPreviewAndUploadActivityIntent(parentActivity
//							, ImageViewActivity.ImageDataType.FILE_PATH, tempImaheLocation, localUID
//							));
//					break;
//				}
//				//【新的从相册选取图片的裁切实现方法自2014-01-03日启用】，原因如下：
//				//    2014-01-02日在Android3.0平台上测试从相册选册时没有问题（这么简单当然没有问题），但是貌似系统自已
//				//    提供的裁切功能不能正常使用（经常卡死，原因不明），估计又是Android奇葩的不同厂商兼容性问题，干脆裁切
//				//	     就使用自行实现（其实是来自开源）裁切功能而再也不利用系统功能了（目前裁切利用跟拍照一样的原理实现！）
//				case ActivityRequestCode.CHOOSE_BIG_PICTURE2:// 图片选取完成时，其实该图片还有原处（跟拍照不一样哦）
//				{
//					if(data == null || data.getData() == null)
//						return;
//					// 相册中选择相片的Uri
//					Uri originalPhotoForChoose = data.getData();
//					// 该原始相片Uri所对应的File文件
//					File originalPhotoForChooseCopySrc = UriToFileHelper.uri2File(parentActivity, originalPhotoForChoose);
//					// 将选择的原始图片复制1份（以便发送前的压缩）
//					File originalPhotoForChooseCopyDest = new File(tempImaheLocation);
//					if(originalPhotoForChooseCopySrc != null)
//					{
//						boolean copyOK = false;
//						try{
//							// 将选择的原始图片复制1份（以便发送前的压缩）
//							copyOK = FileHelper.copyFile(originalPhotoForChooseCopySrc, originalPhotoForChooseCopyDest);
//						}
//						catch (Exception e){
//							Log.e(TAG, e.getMessage(), e);
//						}
//
//						// 要发送的图片复制ok（其实就是复制到temp文件的位置，相机里是拍完照自动就存到了temp位置，所以没有这么烦）
//						if(copyOK)
//						{
//							Log.d(TAG, "【SendPhoto】CHOOSE_BIG_PICTURE2: data = " + data//+",uri=="+uri
//									+",originalPhotoForChoose="+originalPhotoForChoose);//it seems to be null
//							// 复制完成，进入预览和发送处理（之所以要复制一份，就是因为发送前还要进行压缩和处理等）
//							if(originalPhotoForChoose != null)
//								parentActivity.startActivity(IntentFactory.createPreviewAndUploadActivityIntent(parentActivity
//										, ImageViewActivity.ImageDataType.FILE_PATH
//										, originalPhotoForChooseCopyDest.getAbsolutePath()
//										, localUID
//										));
//						}
//						else
//							WidgetUtils.showToast(parentActivity
//									, parentActivity.getString(R.string.chat_sendpic_image_sdcar_error)+"[copy faild!]", ToastType.WARN);
//					}
//					break;
//				}
//				default:
//					break;
//			}
//		}
//	}
//
//	/**
//	 * 获得临时文件存放地址的Uri(此地址存在与否并不代表该文件一定存在哦).
//	 *
//	 * @return 正常获得uri则返回，否则返回null
//	 */
//	private Uri getTempImageFileUri()
//	{
//		String tempImageFileLocation = getTempImageFileLocation();
//		if(tempImageFileLocation != null)
//		{
////			return Uri.parse("file://"+tempImageFileLocation);
//			return OpenFileUtil.getUri(parentActivity, new File(tempImageFileLocation));
//		}
//		return null;
//	}
//	/**
//	 * 获得临时文件存放地址(此地址存在与否并不代表该文件一定存在哦).
//	 *
//	 * @return 正常获得则返回，否则返回null
//	 */
//	private String getTempImageFileLocation()
//	{
//		try
//		{
//			if(__tempImageFileLocation == null)
//			{
//				String avatarTempDirStr = UploadPhotoHelper.getSendPhotoSavedDir(parentActivity);
//				File avatarTempDir = new File(avatarTempDirStr);
//				if(avatarTempDir != null)
//				{
//					// 目录不存在则新建之
//					if(!avatarTempDir.exists())
//						avatarTempDir.mkdirs();
//
//					// 临时文件名
//					__tempImageFileLocation = avatarTempDir.getAbsolutePath()+"/"+"local_sendphoto_temp.jpg";
//				}
//			}
//		}
//		catch (Exception e)
//		{
//			Log.e(TAG, "【SendPhoto】读取本地用户的发送图片临时存储路径时出错了，"+e.getMessage(), e);
//		}
//
//		Log.d(TAG, "【SendPhoto】正在获取本地用户的发送图片临时存储路径："+__tempImageFileLocation);
//
//		return __tempImageFileLocation;
//	}
//}
