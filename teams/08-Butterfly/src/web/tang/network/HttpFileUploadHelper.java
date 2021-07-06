package com.tang.network;

import android.os.Environment;
import android.util.Log;

import com.tang.AllEvaluateChainApplication;
import com.tang.AllEvaluateChainApplication;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Observer;
import java.util.concurrent.TimeUnit;

import okhttp3.Cache;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * HTTP文件上传实用类（只支持单个文件上传）.
 * 
 * <p>
 * 经鉴于KChat时代使用Android的HttpURLConnection实现的http rest方式
 * 上传文件有一定几率不成功的问题，RainbowChat v4中已换成okhttp3库，
 * 
 * @author Jack Jiang(http://www.52im.net/space-uid-1.html)
 * @version 1.0
 * @since 4.0
 */
public class HttpFileUploadHelper
{
	private final static String TAG = HttpFileUploadHelper.class.getSimpleName();
	
	public final static int UPLOAD_SUCESS = 1;
	public final static int UPLOAD_FAIL = 0;
	
	/**
	 * 上传文件处理方法（okhttp3的同步上传方式，可用于AsyncTask中）.
	 * 
	 * @param filePath 要上传的文件所处的绝对路径（包含文件名）
	 * @param fileName 文件名（filePath去掉父目录的部分）
	 * @param uploadUrl 上传服务URL地址
	 * @param requestProperties 要附加传过去的参数
	 * @return true表示上传操作已成功发出，否则表示上传还没有成功准备好（因使用的是okhttp3的异步上传
	 * 方式，因而无法知道确切的上传结果，最终上传结果以 #resultObserver 对象的通知结果为准 ）
	 */
	public static boolean uploadFile(String filePath
			, String fileName
			, String uploadUrl
			, HashMap<String, String> requestProperties)
	{
		try
		{
			if(filePath == null || filePath == null || uploadUrl == null)
			{
//				Log.w(TAG, "无效的参数:filePath="+filePath+", fileName="+fileName+", "+uploadUrl);
				throw new IllegalArgumentException("无效的参数:filePath="+filePath
						+", fileName="+fileName+", "+uploadUrl);
			}

			int cacheSize = 10 * 1024 * 1024;  
			//** 设置超时时间及缓存  
			OkHttpClient.Builder builder = new OkHttpClient.Builder()  
				.connectTimeout(15, TimeUnit.SECONDS)  
				.writeTimeout(20, TimeUnit.SECONDS)  
				.readTimeout(20, TimeUnit.SECONDS);  

			File sysExternalStorageDirectory = Environment.getExternalStorageDirectory();
			if(sysExternalStorageDirectory != null && sysExternalStorageDirectory.exists())
				builder.cache(new Cache(sysExternalStorageDirectory.getAbsoluteFile(), cacheSize));

			OkHttpClient mOkHttpClient = builder.build();  
			MultipartBody.Builder mbody = new MultipartBody.Builder().setType(MultipartBody.FORM);  

			//** 要上传的文件
			mbody.addFormDataPart("image1"
					, fileName
					, RequestBody.create(MediaType.parse("application/octet-stream"), new File(filePath))); 

			//** 附加上要上传的额外参数
			if(requestProperties == null)
				requestProperties = new HashMap<String, String>();
			
			// 默认带上token，用于服务端的安全检查，以便排除掉非法请求
			mbody.addFormDataPart("token", AllEvaluateChainApplication.getInstance2()
					.getIMClientManager().getLocalUserInfo().getToken());
			
			// 额外参数
			for(String key: requestProperties.keySet())
				mbody.addFormDataPart(key, requestProperties.get(key)); 
			
			RequestBody requestBody = mbody.build();  
			Request request = new Request.Builder()  
				.header("Authorization", "Client-ID " + "...")  
				.url(uploadUrl)  
				.post(requestBody)  
				.build();  

			//** 为了更方便的兼容历史的AsycTask异步调用代码，以下使用的是okhttp3的同步上传方式
			Response response = mOkHttpClient.newCall(request).execute();
			final boolean ok = response.isSuccessful();  
			final String result = response.body().string();  
			
			if(ok)
				Log.i(TAG, "文件上传成功完成！(code="+response.code()+",result="+result+")"); 
			else
				Log.w(TAG, "文件上传失败：(code="+response.code()+",result="+result+")"); 
			
			return ok;
		}
		catch (Exception e)
		{
			Log.w(TAG, "文件上传出错了："+e.getMessage(), e);
			return false;
		}
	}
	
	/**
	 * 上传文件处理方法（okhttp3的异步方式，无需自已包装AsyncTask实现异步后台上传）.
	 * 
	 * @param filePath 要上传的文件所处的绝对路径（包含文件名）
	 * @param fileName 文件名（filePath去掉父目录的部分）
	 * @param uploadUrl 上传服务URL地址
	 * @param requestProperties 要附加传过去的参数
	 * @param resultObserver 异步结果观察者
	 * @return true表示上传操作已成功发出，否则表示上传还没有成功准备好（因使用的是okhttp3的异步上传
	 * 方式，因而无法知道确切的上传结果，最终上传结果以 参数#resultObserver 对象的通知结果为准 ）
	 */
	public static void uploadFileAsync(String filePath
			, String fileName
			, String uploadUrl
			, HashMap<String, String> requestProperties
			, final Observer resultObserver)
	{
		try
		{
			if(filePath == null || filePath == null || uploadUrl == null)
			{
//				Log.w(TAG, "无效的参数:filePath="+filePath+", fileName="+fileName+", "+uploadUrl);
				throw new IllegalArgumentException("无效的参数:filePath="+filePath
						+", fileName="+fileName+", "+uploadUrl);
			}

			int cacheSize = 10 * 1024 * 1024;  
			//设置超时时间及缓存  
			OkHttpClient.Builder builder = new OkHttpClient.Builder()  
				.connectTimeout(15, TimeUnit.SECONDS)  
				.writeTimeout(20, TimeUnit.SECONDS)  
				.readTimeout(20, TimeUnit.SECONDS);  

			File sysExternalStorageDirectory = Environment.getExternalStorageDirectory();
			if(sysExternalStorageDirectory != null && sysExternalStorageDirectory.exists())
				builder.cache(new Cache(sysExternalStorageDirectory.getAbsoluteFile(), cacheSize));

			OkHttpClient mOkHttpClient = builder.build();  
			MultipartBody.Builder mbody = new MultipartBody.Builder().setType(MultipartBody.FORM);

			//** 要上传的文件
			mbody.addFormDataPart("image1"
					, fileName
					, RequestBody.create(MediaType.parse("application/octet-stream"), new File(filePath)));

			//** 附加上要上传的额外参数
			if(requestProperties == null)
				requestProperties = new HashMap<String, String>();

			// 默认带上token，用于服务端的安全检查，以便排除掉非法请求
			mbody.addFormDataPart("token", AllEvaluateChainApplication.getInstance2()
					.getIMClientManager().getLocalUserInfo().getToken());

			// 额外参数
			for(String key: requestProperties.keySet())
				mbody.addFormDataPart(key, requestProperties.get(key)); 
			

			RequestBody requestBody = mbody.build();  
			Request request = new Request.Builder()  
				.header("Authorization", "Client-ID " + "...")  
				.url(uploadUrl)  
				.post(requestBody)  
				.build();  

			// 利用okhttp3的异步机制上传文件
			mOkHttpClient.newCall(request).enqueue(new Callback() {  
				@Override  
				public void onFailure(Call call, IOException e) {  
					Log.e(TAG, "文件上传出错："+e.getMessage(), e);
					if(resultObserver != null)
						resultObserver.update(null, UPLOAD_FAIL);
				}  

				@Override  
				public void onResponse(Call call, Response response) throws IOException {  
					final boolean ok = response.isSuccessful();  
					final String result = response.body().string();  
					Log.i(TAG, "code="+response.code()
							+",result="+response.body().string());  

					if(resultObserver != null)
					{
						if(ok)
						{
							Log.i(TAG, "文件上传成功完成！(code="+response.code()+",result="+result+")");
							resultObserver.update(null, UPLOAD_SUCESS);
						}
						else 
						{
							Log.w(TAG, "文件上传失败：(code="+response.code()+",result="+result+")");
							resultObserver.update(null, UPLOAD_FAIL);
						}
					}
				}  
			});  
		}
		catch (Exception e)
		{
			Log.w(TAG, "文件上传出错了："+e.getMessage(), e);
			if(resultObserver != null)
				resultObserver.update(null, UPLOAD_FAIL);
//			return false;
		}
	}
}
