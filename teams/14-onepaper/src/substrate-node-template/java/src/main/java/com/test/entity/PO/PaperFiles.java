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
 * 论文列表
 * </p>
 *
 * @author author
 * @since 2021-07-04
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class PaperFiles implements Serializable {

    private static final long serialVersionUID=1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

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
    public String fileCover;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 创建人账号
     */
    private String account;

    /**
     * 创建人名称
     */
    private String accountName;

    /**
     * 文件MD5
     */
    private String messageDigest;


    /**
     * 首字母
     */
    private String firstChar;

    /**
     * 作者
     */
    private String author;

    /**
     * 年份
     */
    private String createYear;


}
