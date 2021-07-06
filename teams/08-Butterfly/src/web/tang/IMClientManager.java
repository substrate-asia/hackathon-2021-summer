package com.tang;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

import com.x52im.rainbowchat.http.logic.dto.RosterElementEntity;


import net.openmob.mobileimsdk.android.ClientCoreSDK;
import net.openmob.mobileimsdk.android.conf.ConfigEntity;
import net.openmob.mobileimsdk.android.core.LocalUDPDataSender;

import java.util.Observer;

/**
 * RainbowChat中的IM相关数据模型、全局变量等管理类.
 * 
 * @author Jack Jiang(http://www.52im.net/space-uid-1.html)
 * @version 2.0
 * @since 1.0
 */
public class IMClientManager
{
	private static String TAG = IMClientManager.class.getSimpleName();
	
	private Context context;
	
	/** 
	 * MobileIMSDK的基础通信消息的回调事件实现类（回调事件可以是：登陆成功事件 通知、掉线事件通知等）。
	 * <p> 
	 * 通过 ClientCoreSDK.setChatBaseEvent(..) 方法设置之，可实现回调事件的通知和处理。
	 */
//	private ChatBaseEventListener baseEventListener = null;
	

	/**
	 * MobileIMSDK的QoS质量保证机制的回调事件实现类。
	 * <p> 
	 * 通过 ClientCoreSDK.setMessageQoSEvent(..) 方法设置之，可实现消息已被收到或未成功送出的通知和处理。
	 */
//	private MessageQoSListener messageQoSListener = null;
	
	/**
	 * 当前登陆用户的个人信息全局对象。
	 * 本对象在用户登陆成功后被设置，后绪的个人信息显示、更新等统一使用本对象来完成即可。
	 */
	private RosterElementEntity localUserInfo = null;

	/** 一对一聊天(含好友聊天、陌生人聊天)消息数据提供者(key=uid，value=与每个好友或陌生人的消息集合)。 */
//	private MessagesProvider messagesProvider = null;
	/** 普通群聊/世界频道聊天消息的数据提供者(key=gid，value=与每个群的消息集合)*/

	/** 首页“消息”提示信息的数据提供者 */
//	private AlarmsProvider alarmsProvider = null;




	
	/* MobileIMSDK是否已被初始化. true表示已初化完成，否则未初始化. */
	private boolean _init;

    private String currentFrontTeamChattingTeamID = null;

	
	public IMClientManager(Context context)
	{
		this.context = context;
		
		init();
	}
	
	private void init()
	{
		// 设置IM聊天服务端IP地址或域名
		ConfigEntity.serverIP = AllEvaluateChainApplication.IM_SERVER_IP;
		// 设置IM聊天服务端的UDP监听端口（不设置则默认是7901）
		ConfigEntity.serverUDPPort = AllEvaluateChainApplication.IM_SERVER_PORT;
//        // 设置本地客户端的网络兼听端口，此端口可随便设置，只要不与其它手机端程
//        // 序端口冲突即可（不设置则默认是7801，如果设置为0则表示由系统自动分配端口）
//        ConfigEntity.localUDPPort = 7803;
		
		// 初始化
		initMobileIMSDK();
	}
	
	/**
	 * IM框架初始化方法，本方法在连接IM服务器前必须被调用1次，否则IM底层框架将无法工作。
	 */
	public void initMobileIMSDK() 
	{
		if(!this._init)
		{
//			baseEventListener = new ChatBaseEventListener(context);
//			transDataListener = new ChatTransDataEventListener(context);
//			messageQoSListener = new MessageQoSListener(context);
//
//			ClientCoreSDK.getInstance().init(context);
//			ClientCoreSDK.getInstance().setChatBaseEvent(baseEventListener);
//			ClientCoreSDK.getInstance().setChatTransDataEvent(transDataListener);
//			ClientCoreSDK.getInstance().setMessageQoSEvent(messageQoSListener);
//
////			ClientCoreSDK.DEBUG = true;
//
//			friendsListProvider = new FriendsListProvider();
//			groupsProvider = new GroupsProvider();
//			messagesProvider = new MessagesProvider();
//			groupsMessagesProvider = new GroupsMessagesProvider();
//            teamsMessagesProvider=new TeamsMessagesProvider();
//			alarmsProvider = new AlarmsProvider(this.context);
//			teamsProvider=new TeamsProvider();
			this._init = true;
		}
	}
	
	/**
	 * 释放IM框架所占用的资源，在退出登陆时请务必调用本方法，否则重
	 * 新登陆将不能正常实现（指APP进程不退出时切换账号这种情况）。
	 */
	public void releaseMobileIMSDK()
	{
		// 释放IM核心库资源
		ClientCoreSDK.getInstance().release();
		
		// 重置本类的初始化标识
	    this.resetInitFlag();
		
		// 清空设置的回调
		ClientCoreSDK.getInstance().setChatBaseEvent(null);
		ClientCoreSDK.getInstance().setChatTransDataEvent(null);
		ClientCoreSDK.getInstance().setMessageQoSEvent(null);

	    // 清空本量中的关键全局变量
	    this.localUserInfo = null;
//	    this.currentFrontGroupChattingGroupID = null;
//	    this.currentFrontTempChattingUserUID = null;
//	    this.currentFrontChattingUserUID = null;
//        this.currentFrontTeamChattingTeamID = null;
//
//	    // 重置关键数据模型变量
//		this.friendsListProvider = null;
//		this.groupsProvider = null;
//		this.teamsProvider = null;
//	    this.messagesProvider = null;
//	    this.groupsMessagesProvider = null;
//		this.teamsMessagesProvider = null;
//		this.alarmsProvider = null;
//
//	    this.currentVideoChattingActivity = null;
//
//		ProhibitSpeechCheckerProvider.getInstance().clear();
//
//		// 释放实时音视频相关资源
//        VVP2PProvider.getInstance(context).release();
	}
	
	/**
	 * 重置本类的初始化标识。
	 */
	private void resetInitFlag()
	{
	    this._init = false;
	}
	
//	public ChatTransDataEventListener getTransDataListener()
//	{
//		return transDataListener;
//	}
//
//	public ChatBaseEventListener getBaseEventListener()
//	{
//		return baseEventListener;
//	}
//
//	public MessageQoSListener getMessageQoSListener()
//	{
//		return messageQoSListener;
//	}
//
//	/**
//	 * 获得当前正在聊天中的用户UID.
//	 * <p>
//	 * <b>重要说明：</b>此变量只在{@link FriendChattingActivity}处于前景（即在onResume()方法调用的情况下）被
//	 * 设置、在{@link FriendChattingActivity}处于非激活或关闭（即在onPause()方法调用的情况下）被取消设置（置成null）.
//	 *
//	 * @return
//	 */
//	public String getCurrentFrontChattingUserUID()
//	{
//		return currentFrontChattingUserUID;
//	}
//
//	/**
//	 * 设置当前正在聊天中的用户UID.
//	 * <p>
//	 * <b>重要说明：</b>此变量只在{@link FriendChattingActivity}处于前景（即在onResume()方法调用的情况下）被
//	 * 设置、在{@link FriendChattingActivity}处于非激活或关闭（即在onPause()方法调用的情况下）被取消设置（置成null）.
//	 *
//	 * @param currentFrontChattingUserUID
//	 */
//	public void setCurrentFrontChattingUserUID(String currentFrontChattingUserUID)
//	{
//		this.currentFrontChattingUserUID = currentFrontChattingUserUID;
//	}
//
//	/**
//	 * 获得当前正在临时聊天中的用户UID.
//	 * <p>
//	 * <b>重要说明：</b>此变量只在{@link TempChattingActivity}处于前景（即在onResume()方法调用的情况下）被
//	 * 设置、在{@link TempChattingActivity}处于非激活或关闭（即在onPause()方法调用的情况下）被取消设置（置成null）.
//	 *
//	 * @return
//	 */
//	public String getCurrentFrontTempChattingUserUID()
//	{
//		return currentFrontTempChattingUserUID;
//	}
//
//	/**
//	 * 设置当前正在临时聊天中的用户UID.
//	 * <p>
//	 * <b>重要说明：</b>此变量只在{@link TempChattingActivity}处于前景（即在onResume()方法调用的情况下）被
//	 * 设置、在{@link TempChattingActivity}处于非激活或关闭（即在onPause()方法调用的情况下）被取消设置（置成null）.
//	 *
//	 * @param currentFrontTempChattingUserUID
//	 */
//	public void setCurrentFrontTempChattingUserUID(String currentFrontTempChattingUserUID)
//	{
//		this.currentFrontTempChattingUserUID = currentFrontTempChattingUserUID;
//	}
	

    public void setCurrentFrontTeamChattingTeamID(String currentFrontTeamChattingTeamID)
    {
        this.currentFrontTeamChattingTeamID = currentFrontTeamChattingTeamID;
    }




//	public void setCurrentFrontGroupChattingGroupID(String currentFrontGroupChattingGroupID)
//	{
//		this.currentFrontGroupChattingGroupID = currentFrontGroupChattingGroupID;
//	}
	
	public RosterElementEntity getLocalUserInfo()
	{
		return localUserInfo;
	}
	
	public void setLocalUserInfo(RosterElementEntity localUserInfo)
	{
		this.localUserInfo = localUserInfo;
	}

//	public FriendsListProvider getFriendsListProvider()
//	{
//		return friendsListProvider;
//	}
//
//	public GroupsProvider getGroupsProvider()
//	{
//		return groupsProvider;
//	}
//
//	public TeamsProvider getTeamsProvider()
//	{
//		return teamsProvider;
//	}
//
//	public AlarmsProvider getAlarmsProvider()
//	{
//		return alarmsProvider;
//	}
//
//	public MessagesProvider getMessagesProvider()
//	{
//		return messagesProvider;
//	}
//
//	public MessagesProvider getGroupsMessagesProvider()
//	{
//		return groupsMessagesProvider;
//	}
//
//    public MessagesProvider getTeamsMessagesProvider()
//    {
//        return teamsMessagesProvider;
//    }
//
//	public IVideoActivity getCurrentVideoChattingActivity()
//	{
//		return currentVideoChattingActivity;
//	}
//	public void setCurrentVideoChattingActivity(
//			IVideoActivity currentVideoChattingActivity)
//	{
//		this.currentVideoChattingActivity = currentVideoChattingActivity;
//	}
	
	
	/**
	 * 退出IM服务器连接并释放IM所占的所有资源（含退出IM框架连接、再释放IM框架所占的资源）。
	 * <p>
	 * 在切换账号等功能场景下，使用本方法可以保证重新登陆时IM框架
	 * 已回到重初状态，从而完全正常的重新登陆。
	 * 
	 * @see LocalUDPDataSender#sendLoginout()
	 * @see IMClientManager#releaseMobileIMSDK()
	 */
	public static void doLogoutIMServer(final Context context, final Observer obsForSucess)
	{
		// 退出登陆
		new AsyncTask<Object, Integer, Integer>(){
			
			private Observer obsForSucess = null;
			
			@Override
			protected Integer doInBackground(Object... params)
			{
				int code = -1;
				try
				{
					if(params != null)
						obsForSucess = (Observer)params[0];
					
					// local user info 为空即意味着用户极是打开了登陆界面而尚未有登陆过，那当然就不需要退出登陆罗
					if(AllEvaluateChainApplication.getsInstance().getIMClientManager().getLocalUserInfo() != null)
						code = LocalUDPDataSender.getInstance(context).sendLoginout();
				}
				catch (Exception e)
				{
					Log.e(TAG, "错误发生于doLogout:sendLoginout时："+e.getMessage(), e);
				}
				return code;
			}

			@Override
			protected void onPostExecute(Integer code)
			{
				// local user info 为空即意味着用户极是打开了登陆界面而尚未有登陆过，那当然就不需要退出登陆罗
//				if(AllEvaluateChainApplication.getsInstance().getIMClientManager().getLocalUserInfo() != null)
//				{
//					if(code == 0)
//						Log.d(LoginActivity.class.getSimpleName(), "注销登陆请求已成功发出！");
//					else
//						Log.w(LoginActivity.class.getSimpleName(), "注销登陆请求发送失败。错误码是："+code+"！");
//				}
//
//				try
//				{
//					// 释放IM所占资源
//					MyApplication.getInstance(context).getIMClientManager().releaseMobileIMSDK();
//				}
//				catch (Exception e)
//				{
//					Log.e(TAG, "错误发生于logoutMobileIMSDK:onPostExecute:releaseMobileIMSDK()时："+e.getMessage(), e);
//				}
				
				// * 处理完成后通知观察者做其它事哦
				if(obsForSucess != null)
					obsForSucess.update(null, null);
			}
		}.execute(obsForSucess);
	}
}
