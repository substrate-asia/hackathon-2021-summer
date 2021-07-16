package com.test.entity.VO;

import lombok.Data;

@Data
public class CategoryVO {


    private Integer id;

    /**
     * 知识分类
     */
    private String className;

    /**
     * 分类简介
     */
    private String categoryTitle;

    /**
     * 封面
     */
    private String categoryCover;

    /**
     * 创建时间
     */
    private String createTime;
}
