//
//package com.tang.sendimag;
//
//import android.app.Activity;
//import android.content.Context;
//import android.os.Environment;
//import android.util.Log;
//
//import com.eva.android.widget.DataLoadingAsyncTask;
//import com.eva.android.widget.WidgetUtils;
//import com.eva.android.widget.WidgetUtils.ToastType;
//import com.x52im.rainbowchat.Const;
//import com.x52im.rainbowchat.MyApplication;
//import com.x52im.rainbowchat.R;
//import com.x52im.rainbowchat.http.logic.dto.RosterElementEntity;
//import com.x52im.rainbowchat.logic.chat_root.meta.Message.SendStatusSecondaryResult;
//import com.x52im.rainbowchat.logic.profile.photo.UploadPhotoHelper;
//import com.x52im.rainbowchat.network.http.HttpFileUploadHelper;
//
//import java.io.File;
//import java.util.HashMap;
//
///**
// * 发送图片消息的各种实用方法辅助类.
// *
// * @author Jack Jiang(http://www.52im.net/space-uid-1.html)
// * @since 2.2
// */
//public class SendImageHelper
//{
//	private final static String TAG = SendImageHelper.class.getSimpleName();
//
//	/**
//	 * 组织返回要发送的图片文件名.
//	 *
//	 * @param md5ForCachedAvatar
//	 * @return
//	 */
//	public static String constructImageFileName(String md5ForCachedAvatar)
//	{
//		if(md5ForCachedAvatar == null)
//		{
//			Log.w(TAG, "无效的参数：md5ForImage == null!");
//			return null;
//		}
//		return md5ForCachedAvatar+".jpg";
//	}
//
//	/**
//	 * 返回存储发送图片的目录（结尾带反斜线）.
//	 *
//	 * @param context
//	 * @return 如果SDCard等正常则返回目标路径，否则返回null
//	 */
//	public static String getSendPicSavedDirHasSlash(Context context)
//	{
//		String dir = getSendPicSavedDir(context);
//
//		return dir ==  null? null : (dir + "/");
//	}
//	/**
//	 * 返回存储发送图片的目录.
//	 *
//	 * @param context
//	 * @return 如果SDCard等正常则返回目标路径，否则返回null
//	 */
//	public static String getSendPicSavedDir(Context context)
//	{
//		String dir = null;
//		File sysExternalStorageDirectory = Environment.getExternalStorageDirectory();
//		if(sysExternalStorageDirectory != null && sysExternalStorageDirectory.exists())
//		{
//			dir = sysExternalStorageDirectory.getAbsolutePath()
//					+MyApplication.getInstance(context)._const
////						.DIR_KCHAT_SENDPIC_RELATIVE_DIR;
//						.DIR_KCHAT_IMG_RELATIVE_DIR;
//		}
//
//		return dir;
//	}
//
//	/**
//	 * 获得下载指定图片消息的图片2进制数据的完整http地址.
//	 * <p>
//	 * 形如：“http://192.168.88.138:8080/BinaryDownloadController?
//	 * action=image_d&user_uid=400007&file_name=91c3e0d81b2039caa9c9899668b249e8.jpg”。
//	 *
//	 * @param context
//	 * @param file_name 要下载的图片文件名
//	 * @param needDump 是否需要转储：true表示需要转储，否则不需要. 转储是用于图片消息接收方在打开了该图片消息完整图后
//	 * 通知服务端将此图进行转储（转储的可能性有2种：直接删除掉、移到其它存储位置），转储的目的是防止大量用户的大量图片
//	 * 被读过后还存储在服务器上，加大了服务器的存储压力。<b>注意：</b><u>读取缩略图时无需转储！</u>
//	 * @return 完整的http文件下载地址
//	 */
//	public static String getImageDownloadURL(Context context, String file_name, boolean needDump)
//	{
//		String fileURL = null;
//		if(MyApplication.getInstance(context).getIMClientManager().getLocalUserInfo() != null)
//			fileURL = MyApplication.BBONERAY_DOWNLOAD_CONTROLLER_URL_ROOT
//				+"?action=image_d"
//				// 要下载图片的用户uid
//				+"&user_uid="+MyApplication.getInstance(context).getIMClientManager().getLocalUserInfo().getUser_uid()
//				+"&file_name="+file_name
//				+"&need_dump="+(needDump?"1":"0");
//		return fileURL;
//	}
//
//	//--------------------------------------------------------------------------------------
//	/**
//	 * 本地用户（图片消息发送方）的图片消息中图片数据的上传实现方法.
//	 * <p>
//	 * 本方法中用关图片上传处理的任何结果都将试图通知参数 result, 因而如果
//	 * 需要针对图片数据上传结果进行客外处理的请<b>一定要实现{@link SendStatusSecondaryResult}类并作
//	 * 为参数传过来</b>.
//	 *
//	 * @param imageFileName 服务端收到文件数据后要保存的文件名，<b>此参数为必须！</b>
//	 * @param result 辅助发送状态的处理结果观察者实现对象，如果不需要理会处理结果则此参数可为null
//	 * @param usedForUploadProfilePhoto true表示用于用户照片上传时，否则用于图片消息的图片文件上传
//	 * @see ImageUploadAsync
//	 */
//	public static void processImageUpload(Context context
//			, final String imageFileName
//			, final SendStatusSecondaryResult result
//			, boolean usedForUploadProfilePhoto)
//	{
//		// 将处理结果通知观察者
//		if(result != null)
//			result.processing();
//
//		if(imageFileName == null)
//		{
//			Log.d(TAG, "【SendPic】要上传的图片文件名居然是null!");
//			// 将处理结果通知观察者
//			if(result != null)
//				result.processFaild();
//			return;
//		}
//
//		try
//		{
//			// ***************************** 【第1步】读取图片文件数据
//			final File fileOfImage = new File(
//					(usedForUploadProfilePhoto?UploadPhotoHelper.getSendPhotoSavedDirHasSlash(context)
//							:SendImageHelper.getSendPicSavedDirHasSlash(context))+imageFileName);
//
//			try{
//				// 看看要上传的图片文件是否过大（按目前压缩比和测试结果，一般都是100K左右
//				// ，但无法排除个别奇葩机器或其它原因导致图片文件很大，还是判断一下使得代码更健壮）
//				if(fileOfImage != null
//						&& fileOfImage.length() > (usedForUploadProfilePhoto? Const.LOCAL_PHOTO_FILE_DATA_MAX_LENGTH :Const.LOCAL_IMAGE_FILE_DATA_MAX_LENGTH))
//				{
//					WidgetUtils.showToast(context
//							, context.getString(R.string.chat_sendpic_image_is_so_big), ToastType.WARN);
//					Log.e(TAG, "【SendPic】要发送的图片大小大于"
//							+ (usedForUploadProfilePhoto?Const.LOCAL_PHOTO_FILE_DATA_MAX_LENGTH :Const.LOCAL_IMAGE_FILE_DATA_MAX_LENGTH)
//							+ "字节，上传（到服务端）没有继续！");
//
//					// 将处理结果通知观察者
//					if(result != null)
//						result.processFaild();
//
//					return;
//				}
//			}
//			catch (Exception e){
//				Log.e(TAG, "【SendPic】尝试将图片临时文件数据读取出来时出错了，"+e.getMessage()+"，上传将不能继续！", e);
//			}
//
//			// ***************************** 【第2步】上传图片文件数据（到服务端暂存）
//			// 本地用户信息
//			final RosterElementEntity localUser = MyApplication.getInstance(context).getIMClientManager().getLocalUserInfo();
////			Log.d(TAG, "【SendPic】========================fileLength="+fileData.length);
//			Log.d(TAG, "【SendPic】========================filePath="+fileOfImage.getAbsolutePath());
//			if(localUser != null)
//			{
//				// 执行异步图片上传线程
//				new SendImageHelper.ImageUploadAsync((Activity)context)
//				{
//					@Override
//					protected void afterSucess()
//					{
//						// 将处理结果通知观察者
//						if(result != null)
//							result.processOk();
//					}
//
//					@Override
//					protected void afterFaild()
//					{
//						// 将处理结果通知观察者
//						if(result != null)
//							result.processFaild();
//					}
//				}
//				.execute
//				(
//					// 上传的文件名
//					imageFileName
//					// 本地用户的uid
//					, localUser.getUser_uid()
//                    // 要上传图片的绝对路径
//					, fileOfImage.getAbsolutePath() // add by js 20170312
//					// http上传服务URL
//					, usedForUploadProfilePhoto?MyApplication.MY$PHOTO_UPLOAD_CONTROLLER_URL_ROOT:
//							MyApplication.MSG$IMG_UPLOAD_CONTROLLER_URL_ROOT // add by js 20170312
//				);
//			}
//		}
//		catch (Exception e)
//		{
//			// 将处理结果通知观察者
//			if(result != null)
//				result.processFaild();
//			Log.e(TAG, "【SendPic】出错了。", e);
//		}
//	}
//
//	/**
//	 * 图片消息的图片数据上传异步线程.
//	 *
//	 * <p>
//	 * 本类使用时需要通过excute(...)方法传递3个参数，依次是：“服务端收到文件数据后要保存的文件名”
//	 * 、“上传者的uid（上传者也即是图片消息的发起人）”、“图片数据（byte数组）”、“是否用于用户照片上传时”，4个参数缺一不可，
//	 * 否则上传将被忽略！
//	 *
//	 * @author Jack Jiang, 2014-01-24
//	 * @version 1.0
//	 * @see HttpFileUploadHelper#uploadFile(String, String, String , HashMap<String, String>)
//	 */
//	private static abstract class ImageUploadAsync extends DataLoadingAsyncTask<Object, Integer, Boolean>
//	{
//		public ImageUploadAsync(Activity parentActivity)
//		{
//			super(parentActivity, false);
//		}
//
//		@Override
//		protected Boolean doInBackground(Object... params)
//		{
//			Boolean result = Boolean.FALSE;
//			// 需要3个参数（缺一不可，否则上传将被忽略）
//			if(params != null && params.length == 4)
//			{
//				// 服务端收到文件数据后要保存的文件名
//				String fileName = (String)params[0];
//				// 上传者的uid（上传者也即是图片消息的发起人）
//				String localUserUid = (String)params[1];
//				String filePath = (String)params[2];
//				// 上传接口的URL
//				String serverURL = (String)params[3];
//
//				if(fileName != null && localUserUid != null && filePath != null && serverURL != null)
//				{
//					// 将本地用户的uid作为参数传递到服务端
//					HashMap<String, String> requestProperties = new HashMap<String, String>();
//					// 此参数名注意要与服务端保持一致哦
//					requestProperties.put("user_uid", localUserUid);
//					requestProperties.put("file_name", fileName);   // 因为服务端是支持多文件上传的API，所以此处单独把文件名带过去，方便使用！
//
//					// 提交文件上传处理
//					result = Boolean.valueOf(
//						// ## 20170306前使用java对象上传文件的方法
////						ImageDataUploadHttpHelper.uploadImageFile(fileName, localUserUid, fileData, usedForUploadProfilePhoto)
//						// ## 20170306后使用okhttp3上传文件的方法
//						HttpFileUploadHelper.uploadFile(filePath, fileName, serverURL, requestProperties)
////						HttpUploadHelper2.uploadFile(filePath, fileName, serverURL, requestProperties)
////						HttpUploadHelper.post(filePath, serverURL, requestProperties)
//						);
//				}
//				else
//				{
//					Log.e(ImageUploadAsync.class.getSimpleName(), "无效的参数：fileName="+fileName
//							+", localUserUid="+localUserUid
//							+", filePath="+filePath
//							+", serverURL="+serverURL
//							);
//				}
//			}
//			else
//				Log.e(ImageUploadAsync.class.getSimpleName(), "无效的参数个数："+(params == null?0:params.length));
//
//			return result;
//		}
//
//		@Override
//		protected void onPostExecuteImpl(Object _result)
//		{
//			if(_result != null)
//			{
//				Boolean result = (Boolean)_result;
//				if(result)
//					afterSucess();
//				else
//					afterFaild();
//			}
//	    }
//
//		/**
//		 * 上传图片成功后要调用的方法.
//		 */
//		protected abstract void afterSucess();
//
//		/**
//		 * 上传图片失败后要调用的方法.
//		 */
//		protected abstract void afterFaild();
//	}
//}
