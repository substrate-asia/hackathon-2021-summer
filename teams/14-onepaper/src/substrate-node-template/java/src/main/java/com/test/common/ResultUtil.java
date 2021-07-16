package com.test.common;

import com.alibaba.fastjson.JSONObject;

public class ResultUtil {
    public static JSONObject ok(){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code",0);
        return jsonObject;
    }

    public static JSONObject error(){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code",-1);
        return jsonObject;
    }
    public static JSONObject error(String msg){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code",-1);
        jsonObject.put("msg",msg);
        return jsonObject;
    }
    public static JSONObject ok(Object data){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code",0);
        jsonObject.put("data",data);
        return jsonObject;
    }
}
