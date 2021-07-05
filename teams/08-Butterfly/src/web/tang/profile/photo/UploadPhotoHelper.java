package com.tang.profile.photo;

import android.content.Context;
import android.os.Environment;

import com.tang.AllEvaluateChainApplication;

import java.io.File;

/**
 * 上传照片的各种实用方法辅助类.
 * 
 * @author Jack Jiang(http://www.52im.net/space-uid-1.html)
 * @since 2.5
 */
public class UploadPhotoHelper
{
	private final static String TAG = UploadPhotoHelper.class.getSimpleName();
	
	/**
	 * 返回存储上传的照片的目录（结尾带反斜线）.
	 * 
	 * @param context
	 * @return 如果SDCard等正常则返回目标路径，否则返回null
	 */
	public static String getSendPhotoSavedDirHasSlash(Context context)
	{
		String dir = getSendPhotoSavedDir(context);
		
		return dir ==  null? null : (dir + "/");
	}
	/**
	 * 返回存储上传的照片的目录.
	 * 
	 * @param context
	 * @return 如果SDCard等正常则返回目标路径，否则返回null
	 */
	public static String getSendPhotoSavedDir(Context context)
	{
		String dir = null;
		File sysExternalStorageDirectory = Environment.getExternalStorageDirectory();
		if(sysExternalStorageDirectory != null && sysExternalStorageDirectory.exists())
		{
			dir = sysExternalStorageDirectory.getAbsolutePath()
					+AllEvaluateChainApplication.getsInstance()._const.DIR_KCHAT_PHOTO_RELATIVE_DIR;
		}
		
		return dir;
	}
	
	/**
	 * 获得下载指定个人照片的2进制数据的完整http地址.
	 * <p>
	 * 形如：“http://192.168.88.138:8080/BinaryDownloader?
	 * action=photo_d&user_uid=400007&file_name=91c3e0d81b2039caa9c9899668b249e8.jpg”。
	 * 
	 * @param context
	 * @param file_name 要下载的照片文件名
	 * @return 完整的http文件下载地址
	 */
	public static String getPhotoDownloadURL(Context context, String file_name)
	{
		String fileURL = null;
		if(AllEvaluateChainApplication.getsInstance().getIMClientManager().getLocalUserInfo() != null)
			fileURL = AllEvaluateChainApplication.BBONERAY_DOWNLOAD_CONTROLLER_URL_ROOT
				+"?action=photo_d"
				// 要下载图片的用户uid
				+"&user_uid="+AllEvaluateChainApplication.getsInstance().getIMClientManager().getLocalUserInfo().getUser_uid()
				+"&file_name="+file_name;
		return fileURL;
	}
}
