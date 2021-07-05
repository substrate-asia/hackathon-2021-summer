package com.tang.network;

import android.util.Log;

import com.eva.android.HttpService4A;
import com.eva.framework.dto.DataFromClient;
import com.eva.framework.dto.DataFromServer;
import com.google.gson.Gson;
import com.tang.AllEvaluateChainApplication;
import com.x52im.rainbowchat.common.dto.cnst.EncodeConf;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;

/**
 * HttpServiceRoot的JSON跨平台（Android、iOS等）数据传输方式的实现类.
 * 
 * @author Jack Jiang(http://www.52im.net/space-uid-1.html)
 */
public class HttpServiceJASONImpl extends HttpService4A
{
	private final static String TAG = HttpServiceJASONImpl.class.getSimpleName();
	
	public HttpServiceJASONImpl(String serviceName, String servletRootURL,
			String servletName)
	{
		super(serviceName, servletRootURL, servletName);
	}
	
	/**
	 * {@inheritDoc}
	 * 重写父类方法，为每个rest请求设置token。
	 */
	@Override
	public synchronized DataFromServer sendObjToServer(DataFromClient _obj
			, boolean neadReceive, int readTimeout)
	{
		// 为每个rest请求设置token
		if(AllEvaluateChainApplication.getInstance2() != null
				&& AllEvaluateChainApplication.getInstance2().getIMClientManager().getLocalUserInfo() != null)
		{
			_obj.setToken(AllEvaluateChainApplication.getInstance2().getIMClientManager().getLocalUserInfo().getToken());
		}

		_obj.setDevice(0);// 0 表示android平台、1  ios平台、2 web平台

		return super.sendObjToServer(_obj, neadReceive, readTimeout);
	}
	
	/**
	 * <p>
	 * 发送数据给服务端servlet的核心实现方法.<br>
	 * 
	 * 默认发送的是Java序列化对象，子类重写本方法可实现自已的数据发送方式，比如直接发送2进制数据等.
	 * </p>
	 * 
	 * @param _obj 要发送给服务端的数据对象
	 * @param connectionOutputStream 用于数据通信的HttpURLConnection对象所对应的输出流对象，能 过此流完成数据发送
	 * @return 返回输出流对象引用，以便外层调用者统计进行关闭
	 * @throws Exception 过程中产生的任何异常
	 * @see ObjectOutputStream#writeObject(Object)
	 */
	// 重写父类方法的目的是使用JSON文本的跨平台方式与服务端进行通信
	@Override
	protected OutputStream processSendData(DataFromClient _obj, OutputStream connectionOutputStream) throws Exception
	{
		// 发出的是JSON文本描述的DataFromClient对象
		String json = new Gson().toJson(_obj);
		byte[] bs = json.getBytes(EncodeConf.ENCODE_TO_CLIENT);//JSON.toJSONString(_obj).getBytes(EncodeConf.ENCODE_TO_CLIENT);
		
		Log.d(TAG, "【HTTP接口"+printRestNum(_obj.getProcessorId()
				, _obj.getJobDispatchId(), _obj.getActionId())+"】发送给服务端的JSON："+json);
		
		OutputStream out = connectionOutputStream;
		out.write(bs);
		out.flush();
		out.close();
		return out;
	}
	
	/**
	 * <p>
	 * 接收服务端servlet数据的核心实现方法.<br>
	 * 默认发送的是Java序列化对象，子类重写本方法可实现自已的数据接收方式，比如直接接收2进制数据等.
	 * <br>
	 * <br>
	 * <b>特别说明：</b>接收的数据将被封装成DataFromServer对象，并请务必确保将此对象放入参数dfsesHandle数组的第0索引位置，
	 * 这是保存接收数据的唯一途径，否则无法保证逻辑的正确性！
	 * </p>
	 * 
	 * @param connectionInputStream 用于数据通信的HttpURLConnection对象所对应的输入流对象，通过此流完成数据读取
	 * @param dfsesHandle
	 * @return 返回输入流对象引用，以便外层调用者统计进行关闭
	 * @throws Exception 过程中产生的任何异常
	 * @see ObjectInputStream#readObject()
	 */
	// 重写父类方法的目的是使用JSON文本的跨平台方式与服务端进行通信
	@Override
	protected InputStream processReceiveData(InputStream connectionInputStream, DataFromServer[] dfsesHandle) throws Exception
	{
		InputStream is = connectionInputStream;//req.getInputStream();
		int ch;
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		while ((ch = is.read()) != -1)
			bos.write(ch);
		is.close();
		byte[] bs = bos.toByteArray();
		bos.close();
		// 接收的数据是JSON文本描述的DataFromClient对象
		String res = new String(bs, EncodeConf.DECODE_FROM_CLIENT);
//		System.out.println(res);
		
		Log.d(TAG, "【HTTP】收到服务端的JSON反馈："+res);
		
		dfsesHandle[0] = new Gson().fromJson(res, DataFromServer.class);//JSON.parseObject(res, DataFromServer.class);
		return is;
	}
	
	// 打印rest接口的编号，方便调试
	private static String printRestNum(int processorId, int jobDispatchId, int actionId)
	{
		String ret = "";
		if(processorId > 0)
			ret += String.valueOf(processorId);
		if(jobDispatchId > 0)
			ret += "-"+String.valueOf(jobDispatchId);
		if(actionId > 0)
			ret += "-"+String.valueOf(actionId);

		return ret;
	}
}
