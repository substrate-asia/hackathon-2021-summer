package com.test.common;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PaperExceptionHandler {

    @ExceptionHandler(value =Exception.class)
    public JSONObject exceptionHandler(Exception e){
        System.out.println("未知异常！原因是:"+e);
        return ResultUtil.error();
    }
}
