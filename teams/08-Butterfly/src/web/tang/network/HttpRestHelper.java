package com.tang.network;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.eva.epc.common.util.RestHashMap;
import com.eva.framework.dto.DataFromClient;
import com.eva.framework.dto.DataFromServer;
import com.eva.framework.dto.LoginInfo2;
import com.eva.framework.dto.LogoutInfo;
import com.eva.framework.dto.SysActionConst;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.x52im.rainbowchat.common.dto.AutoUpdateInfoFromServer;
import com.x52im.rainbowchat.common.dto.cnst.MyProcessorConst;
import com.x52im.rainbowchat.http.logic.dto.GiftProcessResult;
import com.x52im.rainbowchat.http.logic.dto.GroupEntity;
import com.x52im.rainbowchat.http.logic.dto.GroupMemberEntity;
import com.x52im.rainbowchat.http.logic.dto.JobDispatchConst;
import com.x52im.rainbowchat.http.logic.dto.OfflineMsgDTO;
import com.x52im.rainbowchat.http.logic.dto.RosterElementEntity;
import com.x52im.rainbowchat.http.logic.dto.UserRegisterDTO;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * RainbowChat的所有Http Rest接口调用及服务端返回结果解析实用类。
 * 
 * @author Jack Jiang(http://www.52im.net/space-uid-1.html)
 * @version 1.0
 * @since 4.0
 */
public class HttpRestHelper
{
	/**
	 * 【接口1009】HTTP登陆认证请求接口调用.
	 * 
	 * @param ai
	 * @return
	 */
	public static DataFromServer submitLoginToServer(LoginInfo2 ai)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIN$CHECKUPDATE_4A)
				.setNewData(JSON.toJSONString(ai));// 注意：目前的通信协议是扁平JASON文本，不支持直接传输java序列化对象！
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static RosterElementEntity parseLoginFromServer(String jsonOfResult)
	{
		return new Gson().fromJson(jsonOfResult, RosterElementEntity.class);
	}

    /**
     * 【接口-2】注销HTTP登陆认证请求接口调用.
     *
     * @param ao
     * @return
     * @since 4.3
     */
    public static DataFromServer submitLogoutToServer(LogoutInfo ao)
    {
        // 提交请求到http rest服务端
        DataFromClient dataFromClient = DataFromClient.n()
                .setProcessorId(MyProcessorConst.PROCESSSOR_LOGOUT)
                .setNewData(JSON.toJSONString(ao));// 注意：目前的通信协议是扁平JASON文本，不支持直接传输java序列化对象！
        return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
    }
	
	/**
	 * 【接口1010】版本更新检查接口调用.
	 * 
	 * @param versionCode
	 * @return
	 */
	public static DataFromServer submitCheckUpdateToServer(String versionCode)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_CHECK_UPDATE_4A)
				.setNewData(versionCode);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static AutoUpdateInfoFromServer parseCheckUpdateFromServer(String jsonOfResult)
	{
		return new Gson().fromJson(jsonOfResult, AutoUpdateInfoFromServer.class);
	}
	
	/**
	 * 【接口1008-5-7】删除指定的好友接口调用.
	 * 
	 * @param localUserUid 本地用户uid
	 * @param selectedFriendUid 要删除的好友uid
	 * @return
	 */
	public static DataFromServer submitDeleteFriendToServer(String localUserUid, String selectedFriendUid)
	{
		HashMap<String, String> m = new HashMap<String, String>();
		m.put("local_uid", localUserUid);
		m.put("friend_uid", selectedFriendUid);
		
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_DELETE$FRIEND)
				.setActionId(SysActionConst.ACTION_APPEND1)
				.setNewData(new Gson().toJson(m));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	
	/**
	 * 【接口1008-1-7】用户注册接口调用.
	 * 
	 * @return
	 */
	public static DataFromServer submitRegisterToServer(UserRegisterDTO registerData)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_REGISTER)
				.setActionId(SysActionConst.ACTION_APPEND1)
				.setNewData(new Gson().toJson(registerData));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static String parseRegisterFromServer(String jsonOfResult)
	{
		JSONObject nwObj = JSONObject.parseObject(jsonOfResult);
		return nwObj.getString("new_uid");
	}
	
	/**
	 * 【接口1008-1-8】用户基本信息修改接口调用.
	 * 
	 * @param nickName 要修改的昵称
	 * @param sex 要修改的性别（1表示男性，0表示女性）
	 * @param localUid 本地用户的uid
	 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
	 * returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
	 */
	public static DataFromServer submitUserBaseInfoModifiyToServer(String nickName, String sex, String localUid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_REGISTER)
				.setActionId(SysActionConst.ACTION_APPEND2)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("nickName", nickName)
							.p("sex", sex)
							.p("uid", localUid)
				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
//	public static String parseUserBaseInfoModifiyFromServer(String jsonOfResult)
//	{
//		JSONObject nwObj = JSONObject.parseObject(jsonOfResult);
//		return nwObj.getString("new_uid");
//	}

	/**
	 * 【接口1008-1-9】修改登陆密码接口调用.
	 *
	 * @param oldPassword 原密码（用于服务端验证原密码的正确性）
	 * @param newPassword 新密码
	 * @param localUid 本地用户的uid
	 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
	 * returnValue：1 表示更新成功，0 表示失败，2 表示原密码不正确。具体返回值详见接口文档！
	 */
	public static DataFromServer submitUserPasswordModifiyToServer(String oldPassword
			, String newPassword, String localUid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_REGISTER)
				.setActionId(SysActionConst.ACTION_APPEND3)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("uid", localUid)
							.p("old_psw", oldPassword)
							.p("psw", newPassword)
				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
//	public static String parseUserPasswordModifiyFromServer(String jsonOfResult)
//	{
//		JSONObject nwObj = JSONObject.parseObject(jsonOfResult);
//		return nwObj.getString("new_uid");
//	}
	
	/**
	 * 【接口1008-1-22】用户What'sUp（个性签名）修改接口调用.
	 *
	 * @param localUid 本地用户的uid
	 * @param whats_up 要修改的个性签名内容
	 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
	 * 			returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
	 */
	public static DataFromServer submitUserWhatsUpModifiyToServer(String whats_up, String localUid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_REGISTER)
				.setActionId(SysActionConst.ACTION_APPEND4)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("uid", localUid)
							.p("whats_up", whats_up)
				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	
	/**
	 * 【接口1008-1-24】用户其它说明修改接口调用.
	 * <p>
	 * 个性签名与其它说明的区别：个性签名可能经常但每天会改（比如用户每日的心态
	 * 和感悟等），但这个其它说明或许不常修改。
	 * 
	 * @param localUid 本地用户的uid
	 * @param otherCaption 要修改的个人其它说明
	 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
	 * 			returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
	 */
	public static DataFromServer submitUserOtherCaptionModifiyToServer(String otherCaption, String localUid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_REGISTER)
				.setActionId(SysActionConst.ACTION_APPEND6)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("uid", localUid)
							.p("user_desc", otherCaption)
				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	
	/**
	 * 【接口1008-2-7】获取本地用户的好友列表接口调用.
	 * 
	 * @return
	 */
	public static DataFromServer submitGetRosterToServer(String uid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_ROSTER)
				.setActionId(SysActionConst.ACTION_APPEND1)
				.setNewData(uid);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static ArrayList<RosterElementEntity> parseGetRosterFromServer(String jsonOfResult)
	{
		return new Gson().fromJson(jsonOfResult, new TypeToken<ArrayList<RosterElementEntity>>(){}.getType());
	}
	
	/**
	 * 【接口1008-3-7】发送邀请朋友邮件接口调用.
	 * <p>
	 * 注意：因为发送邮件是个比较慢的过程，为了提升客户端体验，此次的接口调用时服务端
	 * 返回了只是表示邮件请求已发到服务器，但至于服务器有没有成功发出，那就不知道了，
	 * 否则需要等到服务端发送邮件完成的话，会等更多时间，这样就影响用户体验了。
	 * 
	 * @param receiver_mail 接收邀请的email地址
	 * @param local_nickname 发起邀请人的昵称
	 * @param local_mail 发起邀请人的email（作为被邀请人加好友的凭证）
	 * @param local_uid 发起邀请人的uid（作为被邀请人加好友的凭证）
	 * @return
	 */
	public static DataFromServer submitInviteFriendToServer(String receiver_mail, String local_nickname
			, String local_mail, String local_uid)
	{
		// 提交请求到服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_SNS)
				.setActionId(SysActionConst.ACTION_APPEND1)
				// 要接收邀请的邮件地址
				.setNewData(
						new Gson().toJson(
								RestHashMap.n()
								// 接收邀请的email地址
								.p("receiver_mail", receiver_mail)
								// 发起邀请人的昵称
								.p("local_nickname", local_nickname)
								// 发起邀请人的email（作为被邀请人加好友的凭证）
								.p("local_mail", local_mail)
								// 发起邀请人的uid（作为被邀请人加好友的凭证）
								.p("local_uid", local_uid)
						)
				);
		// 服务端发送邮件可能会有点慢，客户端就不用等了，否则体验就会有点差
		dataFromClient.setDoInput(false);
		// 提交请求到http rest服务端
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	
	/**
	 * 【接口1008-3-8】获取用户/好友的个人信息接口调用.
	 * 
	 * @param use_mail "1"表示用好友的mail地址查找，否则表示用好友的uid查找
	 * @param friend_mail 用户或好友的mail地址（use_mail为true时本参数必须不为空哦）
	 * @param friend_uid 用户或好友的uid（use_mail为false时本参数必须不为空哦）
	 * @return
	 */
	public static DataFromServer submitGetFriendInfoToServer(boolean use_mail,
                                                             String friend_mail, String friend_uid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_SNS)
				.setActionId(SysActionConst.ACTION_APPEND2)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
						// "1"表示用好友的mail地址查找，否则表示用好友的uid查找
						.p("use_mail", use_mail?"1":"0")
						// 用户或好友的mail地址（use_mail为true时本参数必须不为空哦）
						.p("friend_mail", friend_mail)
						// 用户或好友的uid（use_mail为false时本参数必须不为空哦）
						.p("friend_uid", friend_uid)
				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static RosterElementEntity parseGetFriendInfoFromServer(String jsonOfResult)
	{
		return new Gson().fromJson(jsonOfResult, RosterElementEntity.class);
	}
	
	/**
	 * 【接口1008-3-9】“密记密码”邮件请求接口调用.
	 * <p>
	 * 注意：因为发送邮件是个比较慢的过程，为了提升客户端体验，此次的接口调用时服务端
	 * 返回了只是表示邮件请求已发到服务器，但至于服务器有没有成功发出，那就不知道了，
	 * 否则需要等到服务端发送邮件完成的话，会等更多时间，这样就影响用户体验了。
	 * 
	 * @param receiveProcessedMail 接收“忘记密码”处理邮件的邮箱地址
	 * @return
	 */
	public static DataFromServer submitForgotPasswordToServer(String receiveProcessedMail)
	{
		// 提交请求到服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_SNS)
				.setActionId(SysActionConst.ACTION_APPEND3)
				// 要接收“密记密码”邮件的邮件地址
				.setNewData(receiveProcessedMail);
		// 服务端发送邮件可能会有点慢，客户端就不用等了，否则体验就会有点差
		dataFromClient.setDoInput(false);
		// 提交请求到http rest服务端
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	
	/**
	 * 【接口1008-3-23】查找好友功能子接口：获取“随机查找好友”结果的接口调用.
	 * <p>
	 * <b>关于”随机查找“好友的说明：</b><br>
	 * 这个功能其实是参考QQ的查找好友功能来做的，”随机“可以给这种陌生人交友带来新鲜感，
	 * 试想，一个传统的”查找所有线上好友“的界面里，每次点进来第一页都是之前看过的人，就
	 * 太乏味了！
     * <br>
	 * UI界面上可以仿照早期的qq随机查找好友方式：在结果页面上加一个”换一批“，每点一次都是
	 * 一个随机结果，这就有意思、有意义多了。
	 * </p>
	 * 
	 * @param local_uid 本地用户的uid：用于查询结果中排除“自已”
	 * @param sex_condition 性别查询条件：-1 表示不使用本条件，1  表只查男性，0  表只查女性
	 * @param online_condition 在线状态查询条件：-1 表示不使用本条件，1  表只查在线，0 表只查离线
	 * @return
	 */
	public static DataFromServer submitGetRandomFindFriendsToServer(String local_uid
			, String sex_condition, String online_condition)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_SNS)
				.setActionId(SysActionConst.ACTION_APPEND5)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
						// 本地用户的uid：用于查询结果中排除“自已”
						.p("local_uid", local_uid)
						// 性别查询条件：-1 表示不使用本条件，1  表只查男性，0  表只查女性
						.p("sex_condition", sex_condition)
						// 在线状态查询条件：-1 表示不使用本条件，1  表只查在线，0 表只查离线
						.p("online_condition", online_condition)
				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static ArrayList<RosterElementEntity> parseGetRandomFindFriendsFromServer(String jsonOfResult)
	{
		return new Gson().fromJson(jsonOfResult, new TypeToken<ArrayList<RosterElementEntity>>(){}.getType());
	}
	
	/**
	 * 【接口1008-4-7】获取离线加好友请求列表的接口调用.
	 * 
	 * @return
	 */
	public static DataFromServer submitGetOfflineAddFriendsReqToServer(String local_uid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_GET_OFFLINE_ADD$FRIENDS$REQ)
				.setActionId(SysActionConst.ACTION_APPEND1)
				.setNewData(local_uid);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static ArrayList<RosterElementEntity> parseGetOfflineAddFriendsReqFromServer(String jsonOfResult)
	{
		return new Gson().fromJson(jsonOfResult, new TypeToken<ArrayList<RosterElementEntity>>(){}.getType());
	}



	/**
	 * 【接口1008-4-8】获取离线聊天消息的接口调用.
	 *
     * @param user_uid 离线消息所有者的uid
     * @param from_user_uid 离线消息由谁发送的uid
	 * @return
	 */
	public static DataFromServer submitGetOfflineChatMessagesToServer(String user_uid
			, String from_user_uid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_GET_OFFLINE_ADD$FRIENDS$REQ)
				.setActionId(SysActionConst.ACTION_APPEND2)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("user_uid", user_uid)
							.p("from_user_uid", from_user_uid)
					)
				);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static ArrayList<OfflineMsgDTO> parseGetOfflineChatMessagesFromServer(String jsonOfResult)
	{
		return new Gson().fromJson(jsonOfResult, new TypeToken<ArrayList<OfflineMsgDTO>>(){}.getType());
	}
	
	/**
	 * 【接口1008-10-7】删除个人相册、个人介绍语音留言等2进制资料的接口调用.
	 * 
	 * @param resourceId 要删除的资源对应的数据库id
	 * @param fileName 要删除的资源文件名
	 * @param resType "0"表示本次要删除的是个人相册中的照片，"1"表示本次要删除的是个人语音介绍中的语音
	 * @return
	 */
	public static DataFromServer submitDeleteProfileBinaryToServer(String resourceId, String fileName, String resType)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_MGR$PROFILE)
				.setActionId(SysActionConst.ACTION_APPEND1)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("resourceId", resourceId)
							.p("fileName", fileName)
							.p("resType", resType)
					)
				);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	
	/**
	 * 【接口1008-10-8】查询个人相册、个人介绍语音留言预览数量的接口调用.
	 * 
	 * @param user_uid 被查询人的UID
	 * @return 形如“[[0,个人相片总数],[1,个人语音介绍总数]]”的2维数组
	 */
	public static DataFromServer queryPhotosOrVoicesCountFromServer(String user_uid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_MGR$PROFILE)
				.setActionId(SysActionConst.ACTION_APPEND2)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("user_uid", user_uid)
					)
				);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	
	/**
	 * 【接口1008-10-9】查询个人相册、个人介绍语音留言的完整数据列表（
	 * 目前用于客户端个人信息查看界面中显示照片和语音完整列表时使用）的接口调用.
	 * 
	 * @param resourceType 要查询的资源类型：0表示查询个人相册数据、1表示查询个人语音介绍数据
	 * @return 返回结果是 2 维数组，子数组单元含义分别是:“resourceId、资源文件名、资源大小(人类可读)
     *          、资源大 小(单位:字节)、被查看数、上传时间”
	 */
	public static DataFromServer queryPhotosOrVoicesListFromServer(String resourceOfUid, int resourceType)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_MGR$PROFILE)
				.setActionId(SysActionConst.ACTION_APPEND3)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("user_uid", resourceOfUid)
							.p("res_type", resourceType)
					)
				);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	
	/**
	 * 【接口1008-10-22】查询好友信息中个人相册的预览图片列表（
	 * 目前用于客户端个人信息查看界面中显示照片和语音预览列表时
	 * 使用，通常最多只返回该用户的最新4张照片）的接口调用.
	 * 
	 * @param resourceOfUid 相册的所有者UID
	 * @return 形如“[[33232jk2j32k3k.jpg],[3eweweew32k3k.jpg]]”的2维数组，一行一个图片的文件名
	 */
	public static DataFromServer queryPhotosPreviewListFromServer(String resourceOfUid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_LOGIC)
				.setJobDispatchId(JobDispatchConst.LOGIC_MGR$PROFILE)
				.setActionId(SysActionConst.ACTION_APPEND4)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("user_uid", resourceOfUid)
					)
				);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	
	/**
	 * 【接口1012-21-7】查询用户积分的接口调用.
	 * 
	 * @param uid 被查询用户的uid
	 * @return 返回值是整数字符串：如果没有查询到积分则返回“0”，否则返回该用户的积份值
	 */
	public static DataFromServer queryUserScoreFromServer(String uid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GIFT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GIFTANDSCORE)
				.setActionId(SysActionConst.ACTION_APPEND1)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("user_uid", uid)
					)
				);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	
	/**
	 * 【接口1012-21-8】处理某人向另一人赠送礼品数据的接口调用.
	 * 
	 * @param src_uid 礼品赠送发起人的用户uid
	 * @param dest_uid 礼品接收人的用户uid
	 * @param gift_ident 礼品ident（即礼品的数据库主键id值）
	 * @return 返回值是 GiftProcessResult对象转JSON后的文本
	 */
	public static DataFromServer submitSendGifToFriendFromServer(String src_uid, String dest_uid, String gift_ident)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GIFT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GIFTANDSCORE)
				.setActionId(SysActionConst.ACTION_APPEND2)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("src_uid", src_uid)
							.p("dest_uid", dest_uid)
							.p("gift_ident", gift_ident)
					)
				);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static GiftProcessResult parseSendGifToFriendFromServer(String jsonOfResult)
	{
		return new Gson().fromJson(jsonOfResult, GiftProcessResult.class);
	}
	
	/**
	 * 【接口1012-21-9】处理指定用户所有礼品兑换成积分的接口调用.
	 * 
	 * @param src_uid 要进行兑换的用户uid
	 * @return 返回值是 GiftProcessResult对象转JSON后的文本
	 */
	public static DataFromServer submitGiftToJifenFromServer(String src_uid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GIFT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GIFTANDSCORE)
				.setActionId(SysActionConst.ACTION_APPEND3)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("src_uid", src_uid)
					)
				);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static GiftProcessResult parseGiftToJifenFromServer(String jsonOfResult)
	{
		return new Gson().fromJson(jsonOfResult, GiftProcessResult.class);
	}

	/**
	 * 【接口1012-21-22】处理查询用户的礼品赠送记录的接口调用.
	 * 
	 * @param local_uid 被查询用户的uid
	 * @param gif_ident 礼品ident（即礼品的数据库主键id值）
	 * @return Vector<Vector> 2维数组对象转JSON后的文本（数组内容详见文档说明）
	 */
	public static DataFromServer queryUserGifHistoryFromServer(String local_uid, String gif_ident)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GIFT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GIFTANDSCORE)
				.setActionId(SysActionConst.ACTION_APPEND4)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("local_uid", local_uid)
							.p("gif_ident", gif_ident)
					)
				);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	
	/**
	 * 【接口1012-21-23】处理查询用户的礼物列表的接口调用.
	 * 
	 * @param local_uid 被查询用户的uid
	 * @return Vector<Vector> 2维数组对象转JSON后的文本（数组内容详见文档说明）
	 */
	public static DataFromServer queryUserGifsFromServer(String local_uid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GIFT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GIFTANDSCORE)
				.setActionId(SysActionConst.ACTION_APPEND5)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("local_uid", local_uid)
					)
				);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	
	/**
	 * 【接口1012-21-24】处理查询当前系统设定的礼物列表的接口调用.
	 * 
	 * @return Vector<Vector> 2维数组对象转JSON后的文本（数组内容详见文档说明）
	 */
	public static DataFromServer queryGifsFromServer()
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GIFT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GIFTANDSCORE)
				.setActionId(SysActionConst.ACTION_APPEND6);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}

	/**
	 * 【接口1015-23-7】获取指定md5码的大文件上传信息的接口调用.
	 *
     * @param fileMd5 要上传文件的md5码
     * @param userUid 上传者的uid（非必须参数）
     * @param fileType 上传文件类型（0：表示普通大文件、1：表示短视频文件）
	 * @return HashMap的k-v键值对（详见文档说明）
	 */
	public static DataFromServer queryBigFileInfoFromServer(String fileMd5, String userUid, int fileType)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_FILE)
				.setJobDispatchId(JobDispatchConst.LOGIC_FILE_MGR)
				.setActionId(SysActionConst.ACTION_APPEND1)
//				.setNewData(fileMd5);
				.setNewData(new Gson().toJson(
						RestHashMap.n()
								.p("file_md5", fileMd5)
								.p("user_uid", userUid)
                                .p("file_type", fileType)
						)
				);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static JSONObject parseBigFileInfoFromServer(String jsonOfResult)
	{
		return JSONObject.parseObject(jsonOfResult);
	}

	//////////////Group
	/**
	 * 【接口1016-25-7】获取用户的群聊列表的接口调用.
	 *
	 * @param user_uid 要获取群聊列表的用户uid
	 * @return
	 */
	public static DataFromServer submitGetGroupsListFromServer(String user_uid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GROUP_CHAT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GROUP_QUERY_MGR)
				.setActionId(SysActionConst.ACTION_APPEND1)
				.setNewData(user_uid);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static ArrayList<GroupEntity> parseGetGroupsListFromServer(String jsonOfResult)
	{
		return new Gson().fromJson(jsonOfResult, new TypeToken<ArrayList<GroupEntity>>(){}.getType());
	}

	/**
	 * 【接口1016-24-7】创建群聊的接口调用.
     *
     * @param localUserUid 创建者（群主）的uid
     * @param localUserNickname 群主昵称
     * @param members 群成员(一维对象数组)
	 *
	 * @return
	 */
	public static DataFromServer submitCreateGroupToServer(String localUserUid
			, String localUserNickname, ArrayList<GroupMemberEntity> members)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GROUP_CHAT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GROUP_BASE_MGR)
				.setActionId(SysActionConst.ACTION_APPEND1)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
								// 创建者（群主）的uid
								.p("owner_uid", localUserUid)
								// 群主昵称
								.p("owner_nickname", localUserNickname)
								// 群成员
								.p("members", new Gson().toJson(members))
						)
				);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static GroupEntity parseCreateGroupFromServer(String jsonOfResult)
	{
	    // 返回值“0”表示服务端虽成功处理完成接口请求，但建群是失败的！(详见"【接口1016-24-7】"文档)
	    if("0".equals(jsonOfResult))
	        return null;
	    else
            return new Gson().fromJson(jsonOfResult, GroupEntity.class);

    }

	/**
	 * 【接口1016-25-8】查询群基本信息的接口调用.
	 *
	 * @param gid 查询的群id
	 * @param myUserId 非必须参数，如果本参数不为空，则表示要同时把”我“在该群中的昵称给查出来，否则不需要查
	 * @return
	 */
	public static DataFromServer submitGetGroupInfoToServer(String gid, String myUserId)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GROUP_CHAT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GROUP_QUERY_MGR)
				.setActionId(SysActionConst.ACTION_APPEND2)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
								.p("gid", gid)
								.p("my_user_id", myUserId)
				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static GroupEntity parseGetGroupInfoFromServer(String jsonOfResult)
	{
		return new Gson().fromJson(jsonOfResult, GroupEntity.class);
	}

	/**
	 * 【接口1016-24-8】修改群名称接口调用.
	 *
	 * @param group_name 本次要修改成的新群名
	 * @param gid 被修改的群id
     * @param modify_by_uid 修改者的uid
	 * @param modify_by_nickname 修改者的昵称
	 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
	 * returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
	 */
	public static DataFromServer submitGroupNameModifiyToServer(String group_name
			, String gid, String modify_by_uid, String modify_by_nickname)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GROUP_CHAT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GROUP_BASE_MGR)
				.setActionId(SysActionConst.ACTION_APPEND2)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
								.p("group_name", group_name)
								.p("gid", gid)
								.p("modify_by_uid", modify_by_uid)
								.p("modify_by_nickname", modify_by_nickname)
				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}

	/**
	 * 【接口1016-24-9】修改"我"的群昵称接口调用.
	 *
	 * @param nickname_ingroup 新的群内昵称
	 * @param gid 我所在的群id
	 * @param user_uid 被修改的用户uid
	 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
	 * returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
	 */
	public static DataFromServer submitGroupNickNameModifiyToServer(String nickname_ingroup
			, String gid, String user_uid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GROUP_CHAT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GROUP_BASE_MGR)
				.setActionId(SysActionConst.ACTION_APPEND3)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
								.p("nickname_ingroup", nickname_ingroup)
								.p("gid", gid)
								.p("user_uid", user_uid)
				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}

	/**
	 * 【接口1016-24-22】修改群公告接口调用.
	 *
	 * @param g_notice 新的公告
	 * @param g_notice_updateuid 本次公告修改人
	 * @param gid 被修改的群id
	 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
	 * returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
	 */
	public static DataFromServer submitGroupNoticeModifiyToServer(String g_notice
			, String g_notice_updateuid, String gid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GROUP_CHAT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GROUP_BASE_MGR)
				.setActionId(SysActionConst.ACTION_APPEND4)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
								.p("g_notice", g_notice)
								.p("g_notice_updateuid", g_notice_updateuid)
								.p("g_id", gid)
				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}

	/**
	 * 【接口1016-25-9】查询群成员列表的接口调用.
	 *
	 * @return
	 */
	public static DataFromServer submitGetGroupMembersListFromServer(String gid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GROUP_CHAT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GROUP_QUERY_MGR)
				.setActionId(SysActionConst.ACTION_APPEND3)
				.setNewData(gid);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}
	public static ArrayList<GroupMemberEntity> parseGetGroupMembersListFromServer(String jsonOfResult)
	{
		return new Gson().fromJson(jsonOfResult, new TypeToken<ArrayList<GroupMemberEntity>>(){}.getType());
	}

	/**
	 * 【接口1016-24-23】删除群成员或退群接口调用.
	 *
     * @param del_opr_uid 本次删除或退群的操作人uid（群主踢人时本参数为群主，如果是用户自已退出退路时本参数为退出者自已）
     * @param del_opr_nickname 本次删除或退群的操作人昵称
	 * @param membersBeDelete 要删除或退群的群员（如果只是个人退群时，本参数就是只有一行的2维数组）
     * @param gid 本次删除发生的群id
//     * @param gname 本次删除发生的群名称
	 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
	 * returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
	 */
	public static DataFromServer submitDeleteOrQuitGroupToServer(String del_opr_uid
	        , String del_opr_nickname, String gid
//			, String gname
			, ArrayList<ArrayList> membersBeDelete)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GROUP_CHAT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GROUP_BASE_MGR)
				.setActionId(SysActionConst.ACTION_APPEND5)
                .setNewData(new Gson().toJson(
                        RestHashMap.n()
                                // 本次删除的操作人uid（群主踢人时本参数为群主，如果是用户自已退出退路时本参数为退出者自已）
                                .p("del_opr_uid", del_opr_uid)
                                // 本次删除的操作人昵称
                                .p("del_opr_nickname", del_opr_nickname)
                                // 本次删除发生的群id
                                .p("gid", gid)
//                                // 本次删除发生的群名称
//                                .p("gname", gname)
                                // 要删除的群成员
                                .p("members", new Gson().toJson(membersBeDelete))
                        )
                );
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}

	/**
	 * 【接口1016-24-24】邀请入群的接口调用.
	 *
     * @param invite_uid 邀请发起人的uid
     * @param invite_nickname 邀请发起人的昵称
     * @param invite_to_gid 邀请至群
     * @param members 被邀请的成员
	 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
     * returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
	 */
	public static DataFromServer submitInviteToGroupToServer(String invite_uid, String invite_nickname
			, String invite_to_gid, ArrayList<ArrayList> members)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GROUP_CHAT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GROUP_BASE_MGR)
				.setActionId(SysActionConst.ACTION_APPEND6)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
								// 邀请发起人的uid
								.p("invite_uid", invite_uid)
								// 邀请发起人的昵称
								.p("invite_nickname", invite_nickname)
								// 邀请至群
								.p("invite_to_gid", invite_to_gid)
								// 被邀请的成员
								.p("members", new Gson().toJson(members))
						)
				);
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}

	/**
	 * 【接口1016-24-26】解散群（仅开放给群主）接口调用.
	 *
	 * @param owner_uid 群主uid
	 * @param gid 将要被解散的群
	 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
	 * returnValue：1 表示更新成功，否则失败（其中2表示解散发起人已不是群主，本次解散失败）。具体返回值详见接口文档！
	 */
	public static DataFromServer submitDismissGroupToServer(String owner_uid
			, String owner_nickname, String gid
//			, String gname
	)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GROUP_CHAT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GROUP_BASE_MGR)
				.setActionId(SysActionConst.ACTION_APPEND8)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
								.p("owner_uid", owner_uid)
								.p("owner_nickname", owner_nickname)
								.p("g_id", gid)
//								.p("g_name", gname)
				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}

	/**
	 * 【接口1016-24-25】转让本群（仅开放给群主）接口调用.
	 *
	 * @param old_owner_uid 原群主uid
	 * @param new_owner_uid 新群主uid（即将被转让为群主）
     * @param new_owner_nickname 新群主的昵称
	 * @param gid 转让发生的群
	 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
	 * returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
	 */
	public static DataFromServer submitTransferGroupToServer(
			String old_owner_uid
//			, String old_owner_nickname
			, String new_owner_uid, String new_owner_nickname
			, String gid
//			, String gname
	)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst.PROCESSOR_GROUP_CHAT)
				.setJobDispatchId(JobDispatchConst.LOGIC_GROUP_BASE_MGR)
				.setActionId(SysActionConst.ACTION_APPEND7)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
								.p("old_owner_uid", old_owner_uid)
//								.p("old_owner_nickname", old_owner_nickname)
								.p("new_owner_uid", new_owner_uid)
								.p("new_owner_nickname", new_owner_nickname)
								.p("g_id", gid)
//								.p("g_name", gname)
				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}




	//team

	//下述常量由于只在SDK中定义，所以需要扩展，最简单的方法就是直接添加。注意这些数值与服务器对接。
	static int  MyProcessorConst_PROCESSOR_TEAM_CHAT=1017; //直接设置团队处理器常量  MyProcessorConst.PROCESSOR_GROUP_CHAT
	static int JobDispatchConst_LOGIC_TEAM_BASE_MGR =28; //  JobDispatchConst.LOGIC_GROUP_BASE_MGR
	static int  JobDispatchConst_LOGIC_TEAM_QUERY_MGR=29; //调度器也直接设置相应的常量

	//团队申请相关，处理器采用团队上面的团队处理器
//	static int JobDispatchConst_LOGIC_PART_IN_TEAM_BASE_MGR =30; //  JobDispatchConst.LOGIC_GROUP_BASE_MGR
//	static int  JobDispatchConst_LOGIC_PART_IN_TEAM_QUERY_MGR=31; //调度器也直接设置相应的常量



	static int SysActionConst_ACTION_TEAM1=30; //行为ID  //获取团队列表、创建团队的接口调用
	static int SysActionConst_ACTION_TEAM2=31; //行为ID  //查询团队基本信息的接口、修改团队名称的接口
	static int SysActionConst_ACTION_TEAM3=32; //行为ID  //删除团队成员（队长）或者退出团队（普通队员）接口、查询团队成员列表接口
	static int SysActionConst_ACTION_TEAM4=33; //行为ID  //邀请入团队的接口
	static int SysActionConst_ACTION_TEAM5=34; //行为ID  //解散团队接口
	
	static int SysActionConst_ACTION_TEAM6=35; //行为ID
	static int SysActionConst_ACTION_TEAM7=36; //行为ID  //转让队长
	static int SysActionConst_ACTION_TEAM8=37; //行为ID

	static int SysActionConst_ACTION_TEAM9=38; //行为ID
	static int SysActionConst_ACTION_TEAM10=39; //设置本人状态时间数据。

	//修改团队状态
	static int SysActionConst_ACTION_TEAM11=40; //





	//结伴
	static int MyProcessorConst_PROCESSOR_JIEBAN =1018; //结伴处理器常量
	static int  JobDispatchConst_JIEBAN_QUERY_MGR=30;
	static int SysActionConst_ACTION_JIEBAN1=40;   //获取所有相关的结伴成员数据。




	/**
		 * 【接口1016】获取用户的团队列表的接口调用.
		 *
		 * @param user_uid 要获取团队列表的用户uid
		 * @return
		 */
		public static DataFromServer submitGetTeamsListFromServer(String user_uid)
		{
			// 提交请求到http rest服务端
			DataFromClient dataFromClient = DataFromClient.n()
					.setProcessorId(MyProcessorConst_PROCESSOR_TEAM_CHAT)
					.setJobDispatchId(JobDispatchConst_LOGIC_TEAM_QUERY_MGR)
					.setActionId(SysActionConst_ACTION_TEAM1) //注意这里虽然名称不一样但是对应的ActionId是一致的。
					.setNewData(user_uid);
			return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
		}


	
		/**
		 * 【接口1016】修改团队名称接口调用.
		 *
		 * @param team_name 本次要修改成的新团队名
		 * @param tid 被修改的团队id
		 * @param modify_by_uid 修改者的uid
		 * @param modify_by_nickname 修改者的昵称
		 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
		 * returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
		 */
		public static DataFromServer submitTeamNameModifiyToServer(String team_name
				, String tid, String modify_by_uid, String modify_by_nickname)
		{
			// 提交请求到http rest服务端
			DataFromClient dataFromClient = DataFromClient.n()
					.setProcessorId(MyProcessorConst_PROCESSOR_TEAM_CHAT)
					.setJobDispatchId(JobDispatchConst_LOGIC_TEAM_BASE_MGR)
					.setActionId(SysActionConst_ACTION_TEAM2)
					.setNewData(new Gson().toJson(
							RestHashMap.n()
									.p("team_name", team_name)
									.p("tid", tid)
									.p("modify_by_uid", modify_by_uid)
									.p("modify_by_nickname", modify_by_nickname)
					));
			return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
		}
	
		/**
		 * 【接口1016】修改"我"的团队昵称接口调用.
		 *
		 * @param nickname_inteam 新的群内昵称
		 * @param tid 我所在的群id
		 * @param user_uid 被修改的用户uid
		 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
		 * returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
		 */
		public static DataFromServer submitTeamNickNameModifiyToServer(String nickname_inteam
				, String tid, String user_uid)
		{
			// 提交请求到http rest服务端
			DataFromClient dataFromClient = DataFromClient.n()
					.setProcessorId(MyProcessorConst_PROCESSOR_TEAM_CHAT)
					.setJobDispatchId(JobDispatchConst_LOGIC_TEAM_BASE_MGR)
					.setActionId(SysActionConst_ACTION_TEAM3)                    //这个接口在服务器端也没有使用
					.setNewData(new Gson().toJson(
							RestHashMap.n()
									.p("nickname_inteam", nickname_inteam)
									.p("tid", tid)
									.p("user_uid", user_uid)
					));
			return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
		}



		/**
		 * 【接口1016】修改团队公告接口调用.
		 *
		 * @param t_notice 新的公告
		 * @param t_notice_updateuid 本次公告修改人
		 * @param tid 被修改的群id
		 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
		 * returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
		 */
		public static DataFromServer submitTeamNoticeModifiyToServer(String t_notice
				, String t_notice_updateuid, String tid)
		{
			// 提交请求到http rest服务端
			DataFromClient dataFromClient = DataFromClient.n()
					.setProcessorId(MyProcessorConst_PROCESSOR_TEAM_CHAT)
					.setJobDispatchId(JobDispatchConst_LOGIC_TEAM_BASE_MGR)
					.setActionId(SysActionConst_ACTION_TEAM4)    //该方法不用，因此这个接口在服务器端没有用到
					.setNewData(new Gson().toJson(
							RestHashMap.n()
									.p("t_notice", t_notice)
									.p("t_notice_updateuid", t_notice_updateuid)
									.p("t_id", tid)
					));
			return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
		}

		/**
		 * 【接口1016】删除团队成员或退团队接口调用.
		 *
		 * @param del_opr_uid 本次删除或团队群的操作人uid（队长踢人时本参数为队长主，如果是用户自已退出退路时本参数为退出者自已）
		 * @param del_opr_nickname 本次删除或退团队的操作人昵称
		 * @param membersBeDelete 要删除或退团队的队员（如果只是个人退团队时，本参数就是只有一行的2维数组）
		 * @param tid 本次删除发生的团队id
	//	   * @param gname 本次删除发生的团队名称
		 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
		 * returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
		 */
		public static DataFromServer submitDeleteOrQuitTeamToServer(String del_opr_uid
				, String del_opr_nickname, String tid
                                                                    //			, String tname
				, ArrayList<ArrayList> membersBeDelete)
		{
			// 提交请求到http rest服务端
			DataFromClient dataFromClient = DataFromClient.n()
					.setProcessorId(MyProcessorConst_PROCESSOR_TEAM_CHAT)
					.setJobDispatchId(JobDispatchConst_LOGIC_TEAM_BASE_MGR)
					.setActionId(SysActionConst_ACTION_TEAM3)
					.setNewData(new Gson().toJson(
							RestHashMap.n()
									// 本次删除的操作人uid（群主踢人时本参数为群主，如果是用户自已退出退路时本参数为退出者自已）
									.p("del_opr_uid", del_opr_uid)
									// 本次删除的操作人昵称
									.p("del_opr_nickname", del_opr_nickname)
									// 本次删除发生的群id
									.p("tid", tid)
	//								  // 本次删除发生的群名称
	//								  .p("gname", gname)
									// 要删除的群成员
									.p("members", new Gson().toJson(membersBeDelete))
							)
					);
			return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
		}
	
		/**
		 * 【接口1016】邀请入团队的接口调用.
		 *
		 * @param invite_uid 邀请发起人的uid
		 * @param invite_nickname 邀请发起人的昵称
		 * @param invite_to_tid 邀请至团队
		 * @param members 被邀请的成员
		 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
		 * returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
		 */
		public static DataFromServer submitInviteToTeamToServer(String invite_uid, String invite_nickname
				, String invite_to_tid, ArrayList<ArrayList> members)
		{
			// 提交请求到http rest服务端
			DataFromClient dataFromClient = DataFromClient.n()
					.setProcessorId(MyProcessorConst_PROCESSOR_TEAM_CHAT)
					.setJobDispatchId(JobDispatchConst_LOGIC_TEAM_BASE_MGR)
					.setActionId(SysActionConst_ACTION_TEAM4)
					.setNewData(new Gson().toJson(
							RestHashMap.n()
									// 邀请发起人的uid
									.p("invite_uid", invite_uid)
									// 邀请发起人的昵称
									.p("invite_nickname", invite_nickname)
									// 邀请至群
									.p("invite_to_tid", invite_to_tid)
									// 被邀请的成员
									.p("members", new Gson().toJson(members))
							)
					);
			return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
		}
	
		/**
		 * 【接口1016】解散团队（仅开放给队长）接口调用.
		 *
		 * @param owner_uid 队长uid
		 * @param tid 将要被解散的团队
		 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
		 * returnValue：1 表示更新成功，否则失败（其中2表示解散发起人已不是队长，本次解散失败）。具体返回值详见接口文档！
		 */
		public static DataFromServer submitDismissTeamToServer(String owner_uid
				, String owner_nickname, String tid
                                                               //			, String tname
		)
		{
			// 提交请求到http rest服务端
			DataFromClient dataFromClient = DataFromClient.n()
					.setProcessorId(MyProcessorConst_PROCESSOR_TEAM_CHAT)
					.setJobDispatchId(JobDispatchConst_LOGIC_TEAM_BASE_MGR)
					.setActionId(SysActionConst_ACTION_TEAM5)
					.setNewData(new Gson().toJson(
							RestHashMap.n()
									.p("owner_uid", owner_uid)
									.p("owner_nickname", owner_nickname)
									.p("t_id", tid)
	//								.p("t_name", tname)
					));
			return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
		}
	
		/**
		 * 【接口1016】转让本团队（仅开放给队长）接口调用.
		 *
		 * @param old_owner_uid 原团队uid
		 * @param new_owner_uid 新团队uid（即将被转让为队长）
		 * @param new_owner_nickname 新队长的昵称
		 * @param tid 转让发生的群
		 * @return DataFromServer中sucess参数：true表示本次接口成功完成、否则表失败，
		 * returnValue：1 表示更新成功，否则失败。具体返回值详见接口文档！
		 */
		public static DataFromServer submitTransferTeamToServer(
				String old_owner_uid
	//			, String old_owner_nickname
				, String new_owner_uid, String new_owner_nickname
				, String tid
	//			, String gname
		)
		{
			// 提交请求到http rest服务端
			DataFromClient dataFromClient = DataFromClient.n()
					.setProcessorId(MyProcessorConst_PROCESSOR_TEAM_CHAT)
					.setJobDispatchId(JobDispatchConst_LOGIC_TEAM_BASE_MGR)
					.setActionId(SysActionConst_ACTION_TEAM7)
					.setNewData(new Gson().toJson(
							RestHashMap.n()
									.p("old_owner_uid", old_owner_uid)
	//								.p("old_owner_nickname", old_owner_nickname)
									.p("new_owner_uid", new_owner_uid)
									.p("new_owner_nickname", new_owner_nickname)
									.p("t_id", tid)
	//								.p("g_name", gname)
					));
			return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
		}






	/**
	 * 【接口1016】查询结伴相关成员的接口调用.
	 *
	 * @param saiShiId 赛事id
	 * @param schoolId 学校Id
	 * @return
	 */
	public static DataFromServer submitGetJieBanMembersToServer(String saiShiId, String schoolId, int hasLoadTeamCount, int searchtype) {

		DataFromClient dataFromClient = new DataFromClient();

//		if (searchtype==0) { //只筛选赛事Id;
//
//			// 提交请求到http rest服务端
//			dataFromClient = DataFromClient.n()
//					.setProcessorId(MyProcessorConst_PROCESSOR_JIEBAN)
//					.setJobDispatchId(JobDispatchConst_JIEBAN_QUERY_MGR)
//					.setActionId(SysActionConst_ACTION_JIEBAN1)
//					.setNewData(new Gson().toJson(
//							RestHashMap.n()
//									.p("saiShiId", saiShiId)
//									.p("hasLoadCount",hasLoadCount)
//									.p("searchType", searchtype)
//					));
//
//		} else if (searchtype==1) {
//
//			// 提交请求到http rest服务端
//			dataFromClient = DataFromClient.n()
//					.setProcessorId(MyProcessorConst_PROCESSOR_JIEBAN)
//					.setJobDispatchId(JobDispatchConst_JIEBAN_QUERY_MGR)
//					.setActionId(SysActionConst_ACTION_JIEBAN1)
//					.setNewData(new Gson().toJson(
//							RestHashMap.n()
//									.p("schoolId", schoolId)
//									.p("hasLoadCount",hasLoadCount)
//									.p("searchType", searchtype)
//					));
//
//		}else if(searchtype==2){ //两个条件一起
			// 提交请求到http rest服务端
			dataFromClient = DataFromClient.n()
					.setProcessorId(MyProcessorConst_PROCESSOR_JIEBAN)
					.setJobDispatchId(JobDispatchConst_JIEBAN_QUERY_MGR)
					.setActionId(SysActionConst_ACTION_JIEBAN1)
					.setNewData(new Gson().toJson(
							RestHashMap.n()
									.p("saiShiId", saiShiId)
									.p("schoolId", schoolId)
									.p("hasLoadTeamCount",hasLoadTeamCount) //注意一下这些数据类型
									.p("searchType", searchtype)
					));


		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}




	//设置本人状态时间
	public static DataFromServer submitSetStateTimeToServer(String team_id, String user_uid, String state, String stateTime){

		DataFromClient dataFromClient= DataFromClient.n()
				.setProcessorId(MyProcessorConst_PROCESSOR_TEAM_CHAT)
				.setJobDispatchId(JobDispatchConst_LOGIC_TEAM_BASE_MGR)
				.setActionId(SysActionConst_ACTION_TEAM10)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
							.p("team_id",team_id)
							.p("user_uid",user_uid)
							.p("state",state)
							.p("stateTime",stateTime)


				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}



	//队长改变团队的招募状态
	public static DataFromServer submitSetTeamStateToServer(String owner_uid, String team_id, String team_invite_state){
		DataFromClient dataFromClient= DataFromClient.n()
				.setProcessorId(MyProcessorConst_PROCESSOR_TEAM_CHAT)
				.setJobDispatchId(JobDispatchConst_LOGIC_TEAM_BASE_MGR)
				.setActionId(SysActionConst_ACTION_TEAM11)
				.setNewData(new Gson().toJson(
						RestHashMap.n()
						.p("owner_uid", owner_uid)
						.p("team_id",team_id)
						.p("team_invite_state",team_invite_state)

				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);

	}




	//获得团队申请离线信息
	static int SysActionConst_ACTION_PART_IN_TEAM_OFFLINE_INFO=41;
	static int SysActionConst_ACTION_AGREE_PART_IN_TEAM=42;



	//招募完成操作流程，只需在队员审核加入的队员时（注意同意加入权利不只是队长），
	// 做一个判断看是否达到最大招募人数/队长自定招募人数。其它地方基本不用处理。



	/**
	 * 【接口1017】获取离线加入团队请求列表的接口调用.
	 *
	 * @return
	 */
	public static DataFromServer submitGetOfflinePartInTeamReqToServer(String user_uid)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst_PROCESSOR_TEAM_CHAT)
				.setJobDispatchId(JobDispatchConst_LOGIC_TEAM_QUERY_MGR)
				.setActionId(SysActionConst_ACTION_PART_IN_TEAM_OFFLINE_INFO)
				.setNewData(new Gson().toJson(
						RestHashMap.n().p("user_uid",new Gson().toJson(user_uid))
				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}


	/**
	 * 【接口1017】同意加入团队请求列表的接口调用.
	 *
	 *
	 *
	 * team_leader_tid 队长Id,可以看做是数据库中邀请人Id
	 * @return
	 */
	public static DataFromServer submitAgreePartInTeamReqToServer(String team_id, String user_uid, String user_nickname, String  team_leader_tid, String team_leader_nickname)
	{
		// 提交请求到http rest服务端
		DataFromClient dataFromClient = DataFromClient.n()
				.setProcessorId(MyProcessorConst_PROCESSOR_TEAM_CHAT)
				.setJobDispatchId(JobDispatchConst_LOGIC_TEAM_BASE_MGR)
				.setActionId(SysActionConst_ACTION_AGREE_PART_IN_TEAM)
				.setNewData(new Gson().toJson(
						RestHashMap.n().p("team_id",new Gson().toJson(team_id))
								.p("user_uid",user_uid)
								.p("user_nickname",user_nickname)
								.p("team_leader_id",team_leader_tid)
								.p("team_leader_nickname",team_leader_nickname)

				));
		return HttpServiceFactory4AJASONImpl.getInstance().getDefaultService().sendObjToServer(dataFromClient);
	}


	//团队申请加入接口










}
