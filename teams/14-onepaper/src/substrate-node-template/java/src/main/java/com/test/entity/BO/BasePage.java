package com.test.entity.BO;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

public class BasePage<T> extends Page<T> {

    /**
     * 首字符
     */
    private String firstChar;

    /**
     * 类型ID
     */
    private Integer categoryId;

    public String getFirstChar() {
        return firstChar;
    }

    public void setFirstChar(String firstChar) {
        this.firstChar = firstChar;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
}
