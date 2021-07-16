package com.tang.network;

import com.eva.android.HttpService4A;
import com.eva.android.HttpServiceFactory4A;
import com.tang.AllEvaluateChainApplication;
import com.tang.AllEvaluateChainApplication;
import com.tang.R;

/**
 * <p>
 * 本类是实现了以跨平台（Android、iOS等）的JSON文本为HTTP通信内容的实现类.
 * 
 * <p>
 * 本类的使用，不能与http收发java序列化对象等同视之，所有的newData和oldData数据
 * 内容必须是JSON字符串文本，否则到服务端后将被反射或处理失败！
 * 
 * <p>
 * 另，从服务端收到的数据即returnValue字段中，也是JSON文本，收到后需要自行从JSON
 * 文本进行转换后才能使用！
 * 
 * @author Jack Jiang(http://www.52im.net/space-uid-1.html)
 * @version 1.0
 */
public class HttpServiceFactory4AJASONImpl extends HttpServiceFactory4A
{
	private static HttpServiceFactory4AJASONImpl instance = null;

	public static HttpServiceFactory4AJASONImpl getInstance()
	{
		if(instance == null)
		{
			HttpServiceFactory4A.defaultTipMsgIfFail = AllEvaluateChainApplication.getInstance2().getString(R.string.general_network_faild);
			instance = new HttpServiceFactory4AJASONImpl();
		}
		return instance;
	}

	@Override
	public HttpService4A getService(String serviceName)
	{
		HttpService4A serviceInstance = getServiceInstances().get(serviceName);
		if(serviceInstance == null)
		{
			if(DEFAULT_SERVICE_NAME.equals(serviceName))
			{
				serviceInstance = new HttpServiceJASONImpl(serviceName
						, AllEvaluateChainApplication.HTTP_COMMON_CONTROLLER_URL
						, "rest_post"
						);
				addServices(
						AllEvaluateChainApplication.HTTP_COMMON_CONTROLLER_URL
						, serviceInstance);
			}
		}
		return serviceInstance;
	}
}