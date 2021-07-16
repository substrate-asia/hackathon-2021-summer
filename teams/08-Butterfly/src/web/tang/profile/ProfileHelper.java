package com.tang.profile;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

import com.eva.epc.common.util.CommonUtils;
import com.eva.framework.dto.DataFromServer;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


import java.util.Vector;

public class ProfileHelper
{
	/**
	 * 查询指定用户的相片数、声音数异步线程.
	 */
	public static class QueryPhotosAndPVoiceCountAsyncTask extends AsyncTask<Object, Integer, DataFromServer>
	{
		private Context parentActivity = null;
		private String uid = null;

		public QueryPhotosAndPVoiceCountAsyncTask(Context parentActivity, String uid)
		{
			this.parentActivity = parentActivity;
			this.uid = uid;
		}

		/**
		 * 在后台执行 .
		 *
		 * @param params 外界传进来的参数
		 * @return 查询结果，将传递给onPostExecute(..)方法
		 */
		@Override
		protected DataFromServer doInBackground(Object... params)
		{
//			return AToolKits.queryDataRoot(HttpServiceFactory4AImpl.getInstance().getDefaultService()
//					, "select count(*), res_type from missu_users_binary where user_uid=" +
//							uid+" and res_type in(0,1) group by res_type");// 查询指定用户的相片数、个人声音数
//			return HttpRestHelper.queryPhotosOrVoicesCountFromServer(uid);
            return null;
		}

		/**
		 * 处理服务端返回的登陆结果信息.
		 */
		protected void onPostExecute(DataFromServer result)
		{
			if(result != null && result.isSuccess())
			{
//				Vector<Vector> vecs = (Vector<Vector>)result.getReturnValue();
				Vector<Vector> vecs = new Gson().fromJson(
						(String)result.getReturnValue(), new TypeToken<Vector<Vector>>(){}.getType());
				if(vecs != null && vecs.size() > 0)
				{
					int photosCount = 0;
					int pvoiceCount = 0;
					for(Vector r : vecs)
					{
						String count = (String)r.get(0);
						String resType = (String)r.get(1);
						if(!CommonUtils.isStringEmpty(resType, true))
						{
							// 找到个人相片数
							if("0".equals(resType))
								photosCount = CommonUtils.getIntValue(count);
							// 找到了个人语音数
							else if("1".equals(resType))
								pvoiceCount = CommonUtils.getIntValue(count);
							else
							{
								Log.w(QueryPhotosAndPVoiceCountAsyncTask.class.getSimpleName()
										, "未知的resType="+resType+"!!");
							}
						}
					}

					//
					onPostExecute_findPhotoCount(photosCount);
					onPostExecute_findPVoiceCount(pvoiceCount);
				}
				else
				{
					//
					onPostExecute_findPhotoCount(0);
					onPostExecute_findPVoiceCount(0);
				}
			}
		}

		/**
		 * 成功处理后要调用的方法：找到了相片数.
		 */
		protected void onPostExecute_findPhotoCount(int count)
		{
			// default do nothing
		}

		/**
		 * 成功处理后要调用的方法：找到了我的声音数.
		 */
		protected void onPostExecute_findPVoiceCount(int count)
		{
			// default do nothing
		}
	}
}
