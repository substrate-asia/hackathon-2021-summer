// Copyright (C) 2020 即时通讯网(52im.net) & Jack Jiang.
// The RainbowChat Project. All rights reserved.
// 
// 【本产品为著作权产品，合法授权后请放心使用，禁止外传！】
// 【本次授权给：<唐林峰（身份证号：360727198911110910）>，授权编号：<NT200909102407>，代码指纹：<A.599618247.472>，技术对接人QQ：<582901605>】
// 【授权寄送：<收件：唐林峰、地址：上海市浦东新区金豫路100号禹州国际3期2号楼、电话：18717758990>】
// 
// 【本系列产品在国家版权局的著作权登记信息如下】：
// 1）国家版权局登记名(简称)和权证号：RainbowChat    （证书号：软著登字第1220494号、登记号：2016SR041877）
// 2）国家版权局登记名(简称)和权证号：RainbowChat-Web（证书号：软著登字第3743440号、登记号：2019SR0322683）
// 3）国家版权局登记名(简称)和权证号：RainbowAV      （证书号：软著登字第2262004号、登记号：2017SR676720）
// 4）国家版权局登记名(简称)和权证号：MobileIMSDK-Web（证书号：软著登字第2262073号、登记号：2017SR676789）
// 5）国家版权局登记名(简称)和权证号：MobileIMSDK    （证书号：软著登字第1220581号、登记号：2016SR041964）
// * 著作权所有人：江顺/苏州网际时代信息科技有限公司
// 
// 【违法或违规使用投诉和举报方式】：
// 联系邮件：jack.jiang@52im.net
// 联系微信：hellojackjiang
// 联系QQ号：413980957
// 授权说明：http://www.52im.net/thread-1115-1-1.html
// 官方社区：http://www.52im.net
package com.tang;

import com.x52im.rainbowchat.im.dto.MsgBodyRoot;

/**
 * 本类中存放的是APP中另一些不需要经常修改的常量。
 * 
 * @author Jack Jiang(http://www.52im.net/space-uid-1.html)
 * @version 1.0
 * @since 4.2
 */
public class Const
{
	//------------------------------------------------------------------ for （1）通用常量（请勿改动）
	/** 功能应用场景：for 好友的正式聊天 */
	public final static String CHAT_TYPE_FREIDN$CHAT = String.valueOf(MsgBodyRoot.CHAT_TYPE_FREIDN$CHAT);
	/** 功能应用场景：for 陌生人聊天（临时聊天） */
	public final static String CHAT_TYPE_GUEST$CHAT = String.valueOf(MsgBodyRoot.CHAT_TYPE_GUEST$CHAT);
	/** 功能应用场景：for 世界频道或普通群聊 */
	public final static String CHAT_TYPE_GROUP$CHAT = String.valueOf(MsgBodyRoot.CHAT_TYPE_GROUP$CHAT);

	//team相关
	/** 功能应用场景：for 世界频道或团队 */
	static int MsgBodyRoot_CHAT_TYPE_TEAM$CHAT=3;
	public final static String CHAT_TYPE_TEAM$CHAT = String.valueOf(MsgBodyRoot_CHAT_TYPE_TEAM$CHAT); //上述变量的扩展

	//------------------------------------------------------------------ for （2）聊天UI的可配置变量（可按需改动）
	/** 礼品工具 - 要赠送的礼品集：每页显示的礼品数  */
	public final static int GIFTS_TOOLS_PAGER_EVERY_PAGE_NUM = 8;
//	/** 礼品工具 - 要索取的礼品集：每页显示的礼品数  */
//	public final static int GIFTS_TOOLS_PAGER_GET$EVERY_PAGE_NUM = 7;

	/** 更多功能：每页显示的功能列数  */
	public final static int MORE_FUNCTIONS_PAGER_EVERY_PAGE_COLUMNS = 4;
	/** 更多功能：每页显示的功能行数  */
	public final static int MORE_FUNCTIONS_PAGER_EVERY_PAGE_LINES = 2;


	//------------------------------------------------------------------ for （3）其它配置变量（可按需改动）
	public final static String DIR_KCHAT_WORK_RELATIVE_ROOT = "/"+".rainbowchatx_pro";
//    public final static String DIR_KCHAT_WORK_RELATIVE_ROOT = "/"+"rainbowchatx_pro";

	/** 通用图片缓存目录（当你的图片缓存不想单独存放时，就用这个目录，当前的用户头像、图片消息、短视频预览图、位置预览图等都是放在这里） */
	public final static String DIR_KCHAT_IMG_RELATIVE_DIR = DIR_KCHAT_WORK_RELATIVE_ROOT+"/"+"img";
//	/** 用户头像缓存目录 */
//	public final static String DIR_KCHAT_AVATART_RELATIVE_DIR = DIR_KCHAT_WORK_RELATIVE_ROOT+"/"+"avatar";
//	/** 聊天图片缓存目录 */
//	public final static String DIR_KCHAT_SENDPIC_RELATIVE_DIR = DIR_KCHAT_WORK_RELATIVE_ROOT+"/"+"image";
	/** 聊天时的语音留言缓存目录 */
	public final static String DIR_KCHAT_SENDVOICE_RELATIVE_DIR = DIR_KCHAT_WORK_RELATIVE_ROOT+"/"+"voice";
	/** 照片缓存目录 */
	public final static String DIR_KCHAT_PHOTO_RELATIVE_DIR = DIR_KCHAT_WORK_RELATIVE_ROOT+"/"+"photo";
	/** 自我介绍语音缓存目录 */
	public final static String DIR_KCHAT_PVOICE_RELATIVE_DIR = DIR_KCHAT_WORK_RELATIVE_ROOT+"/"+"pvoice";
	/** 收到的大文件保存目录 */
	public final static String DIR_KCHAT_FILE_RELATIVE_DIR = DIR_KCHAT_WORK_RELATIVE_ROOT+"/"+"file";
    /** 收到的短视频保存目录 */
    public final static String DIR_KCHAT_SHORTVIDEO_RELATIVE_DIR = DIR_KCHAT_WORK_RELATIVE_ROOT+"/"+"shortvideo";
//	/** 收到的位置消息，地图预览图保存目录 */
//	public final static String DIR_KCHAT_LOCATION_RELATIVE_DIR = DIR_KCHAT_WORK_RELATIVE_ROOT+"/"+"location";

	/** 用户上传头像时，允许的最大用户头像文件大小 */
	public final static long LOCAL_AVATAR_FILE_DATA_MAX_LENGTH = 2 * 1024 * 1024; // 2M
	/** 用户上传头像时，图片质量压缩比率（为0~100的量，0表示不压缩，100表示最大限度压缩，默认75是参考微信的压缩率） */
	public final static int LOCAL_AVATAR_IMAGE_QUALITY = 75; // 75%质量

	/** 用户发送的图片文件，允许的最大文件大小 */
	public final static long LOCAL_IMAGE_FILE_DATA_MAX_LENGTH = 2 * 1024 * 1024;  // 2M
	/** 用户发送的语音留言文件，允许的最大文件大小 */
	public final static long LOCAL_VOICE_FILE_DATA_MAX_LENGTH = 1 * 1024 * 1024;  // 1M

	/** 用户上传的照片文件，允许的最大文件大小 */
	public final static long LOCAL_PHOTO_FILE_DATA_MAX_LENGTH = 3 * 1024 * 1024;  // 3M
	/** 用户上传的自我介绍语音留言文件，允许的最大文件大小 */
	public final static long LOCAL_PVOICE_FILE_DATA_MAX_LENGTH = 1 * 1024 * 1024; // 1M

	/** SQLite本地存储：正式聊天消息的保存周期(目前是保存7天内的聊天消息，早于此消息的将被自动清除：始终保持安全性和防止存储空间的堆积) */
	public final static int SQLITE_CHAT_MESSAGE_SOTRE_RANGE = 15;//7;

	/** 用户发送的文件，允许的最大文件大小 */
    // TODO: 目前最大25M是参考微信的设定。实际上如果必要，此值可设为你需要的数值（比如100M或1G等，就看你服务器多牛了^_^!）
	public final static long SEND_FILE_DATA_MAX_LENGTH = 25 * 1024 * 1024;

    /** 用户发送的短视频，允许的最长录制时间(单位：毫秒) */
    // TODO: 目前最大10秒是参考微信的设定。实际上如果必要，此值可设为你需要的数值（比如易信的3分钟!）
    public final static int SHORT_VIDEO_RECORD_MAX_TIME = 10 * 1000;
    /** 用户发送的短视频，允许的最大文件大小 */
    public final static long SEND_SHORT_VIDEO_DATA_MAX_LENGTH = 50 * 1024 * 1024;
}


