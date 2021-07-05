package com.test.entity.BO;

import lombok.Data;

@Data
public class PaperFileBO {

    /**
     * 标题
     */
    private String title;

    /**
     * 预览内容
     */
    private String content;

    /**
     * 类型ID
     */
    private Integer categoryId;

    /**
     * 文件地址
     */
    private String filePath;

    /**
     * 文件封面
     */
    private String fileCover;

    /**
     * 创建人账号
     */
    private String account;

    /**
     * 创建人名称
     */
    private String accountName;

    /**
     * 作者
     */
    private String author;

    /**
     * 年份
     */
    private String createYear;
}
