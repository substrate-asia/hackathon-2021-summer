package com.test.entity.PO;

import com.baomidou.mybatisplus.annotation.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 论文分类表
 * </p>
 *
 * @author author
 * @since 2021-07-04
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class PaperCategory implements Serializable {

    private static final long serialVersionUID=1L;

    @TableId(value = "id", type = IdType.AUTO)
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
    private Date createTime;


}
