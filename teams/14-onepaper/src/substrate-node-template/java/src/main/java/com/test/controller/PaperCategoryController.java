package com.test.controller;


import cn.hutool.core.bean.BeanUtil;
import com.alibaba.fastjson.JSONObject;
import com.test.common.ResultUtil;
import com.test.entity.PO.PaperCategory;
import com.test.entity.VO.CategoryVO;
import com.test.service.IPaperCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 * 论文分类表 前端控制器
 * </p>
 *
 * @author author
 * @since 2021-07-04
 */
@RestController
@RequestMapping("/paperCategory")
@CrossOrigin(originPatterns = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class PaperCategoryController {

    @Autowired
    public IPaperCategoryService categoryService;

    @GetMapping(path ={"/","/index"} )
    public JSONObject index(){
        List<PaperCategory> list = categoryService.list();
        List<CategoryVO> categoryVOS = list.stream().map(data -> BeanUtil.copyProperties(data, CategoryVO.class)).collect(Collectors.toList());
        return ResultUtil.ok(categoryVOS);
    }
}

