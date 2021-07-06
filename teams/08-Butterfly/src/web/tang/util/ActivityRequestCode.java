package com.tang.util;

/**
 * 用于集中管理用于各Activity中的rquest code常量。
 *
 * <p>
 * 集中管理的目的是，防止不同的常量当用于同一个activity时出现重复，仅此而已。
 * </p>
 *
 * @author Jack Jiang
 * @since 6.0
 */
public interface ActivityRequestCode
{
    /**
     * 回调常量之：拍照

     */
    int TAKE_BIG_PICTURE = 1001;
    /**
     * 回调常量之：从相册中选取2

     */
    int CHOOSE_BIG_PICTURE2 = 1002;

    /**
     * 回调常量：充值积分.

     */
    int GIFTS_RECHARGE_CIONS_RESULT = 1003;

    /**
     * 回调常量：选择文件.

     */
    int CHOOSE_FILE_RESULT_FROM_ACTIVITY = 1004;

    /**
     * 回调常量：录制短视频.

     */
    int SHORTVIDEO_RECORD_RESULT_FROM_ACTIVITY = 1005;

    /**
     * 请求码：前往群查看页面.

     */
    int REQUEST_CODE_FOR_VIEW_GROUP_INFO = 1006;
    /**
     * 请求码：前往群成员管理(可删除群员)页面.

     */
    int REQUEST_CODE_FOR_VIEW_MEMBERS = 1007;
    /**
     * 请求码：前往群成员邀请页面.

     */
    int REQUEST_CODE_FOR_INVITE_MEMBERS = 1008;
    /**
     * 请求码：前往群转让页面（即选择新群主页面）.

     */
    int REQUEST_CODE_FOR_TRANSFER = 1009;

    /**
     * 请求码：前往用户选择页面（比如：个人名片消息时，选择要发送的人）.

     */
    int REQUEST_CODE_FOR_USER_CHOOSE = 1010;

    /**
     * 请求码：前往位置搜索页面（用如：位置消息时）.

     */
    int REQUEST_CODE_FOR_SEARCH_LOCATION = 1011;

    /**
     * 请求码：前往位置选择页面（用如：位置消息时）.

     */
    int REQUEST_CODE_FOR_GETTION = 1012;


    //team
    /**
     * 请求码：前往团队查看页面.

     */
    int REQUEST_CODE_FOR_VIEW_TEAM_INFO = 1013;
    /**
     * 请求码：前往群成员管理(可删除群员)页面.

     */
    int REQUEST_CODE_FOR_VIEW_TEAM_MEMBERS = 1014;
    /**
     * 请求码：前往群成员邀请页面.

     */
    int REQUEST_CODE_FOR_INVITE__TEAM_MEMBERS = 1015;
    /**
     * 请求码：前往群转让页面（即选择新群主页面）.

     */
    int REQUEST_CODE_FOR__TEAM_TRANSFER = 1016;

}
