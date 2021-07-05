package com.test.controller;


import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.*;
import cn.hutool.crypto.SecureUtil;
import cn.hutool.extra.pinyin.PinyinUtil;
import cn.hutool.extra.servlet.ServletUtil;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.conditions.query.LambdaQueryChainWrapper;
import com.sun.imageio.plugins.common.ImageUtil;
import com.test.common.ResultUtil;
import com.test.entity.BO.BasePage;
import com.test.entity.BO.PaperFileBO;
import com.test.entity.PO.PaperFiles;
import com.test.service.IPaperFilesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.File;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * <p>
 * 论文列表 前端控制器
 * </p>
 *
 * @author author
 * @since 2021-07-04
 */
@RestController
@RequestMapping("/paperFiles")
@CrossOrigin(originPatterns = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@Slf4j
public class PaperFilesController {

    @Autowired
    private IPaperFilesService paperFilesService;

    @Value("${upload.path:'/usr/local/upload/'}")
    private String path;

    @PostMapping("/upload")
    public JSONObject upload(@RequestParam("file") MultipartFile file, @RequestParam("type") Integer type) {
        String suffix = FileUtil.getSuffix(file.getOriginalFilename());
        if (suffix == null) {
            return ResultUtil.error("文件类型错误");
        }
        String fileType;
        if (Objects.equals(1, type)) {
            if (!"pdf".equalsIgnoreCase(suffix)) {
                return ResultUtil.error("文件类型错误");
            }
            fileType = "private";
        } else if (Objects.equals(2, type)) {
            if (!Arrays.asList("jpg", "png", "bmp","jpeg").contains(suffix.toLowerCase())) {
                return ResultUtil.error("文件类型错误");
            }
            fileType = "public";
        } else {
            return ResultUtil.error("文件类型错误");
        }
        try {
            String uploadKey = DateUtil.format(new Date(), "yyyyMMdd") + "/" + IdUtil.simpleUUID() + "." + suffix.toLowerCase();
            FileUtil.writeFromStream(file.getInputStream(), path + fileType + "/" + uploadKey);
            return ResultUtil.ok(uploadKey);
        } catch (Exception ex) {
            return ResultUtil.error("文件上传失败！");
        }
    }

    @PostMapping("/add")
    public JSONObject add(@RequestBody PaperFileBO paperFileBO) {
        File file = FileUtil.file(path + "private/" + paperFileBO.getFilePath());
        File cover = FileUtil.file(path + "public/" + paperFileBO.getFileCover());
        if (!file.exists() || !cover.exists()) {
            return ResultUtil.error("文件参数错误");
        }
        String md5 = SecureUtil.md5(file);
        Integer count = paperFilesService.lambdaQuery().eq(PaperFiles::getMessageDigest, md5).count();
        if (count > 0) {
            return ResultUtil.error("文件已存在");
        }
        PaperFiles paperFiles = BeanUtil.copyProperties(paperFileBO, PaperFiles.class);
        paperFiles.setCreateTime(new Date());
        paperFiles.setMessageDigest(md5);
        paperFiles.setFirstChar(String.valueOf(PinyinUtil.getFirstLetter(paperFiles.getTitle().charAt(0))));
        paperFilesService.save(paperFiles);
        List<String> strings = RuntimeUtil.execForLines("python3 /opt/reward.py "+ paperFiles.getAccount());
        if(strings.size() > 5) {
            if(strings.get(2).contains("Success")){
                log.info("转账操作成功，处理账号：{}",paperFiles.getAccount());
                return ResultUtil.ok();
            }
        }
        throw new RuntimeException("操作失败");
    }

    @PostMapping("/list")
    public JSONObject list(@RequestBody BasePage<PaperFiles> basePage) {
        LambdaQueryChainWrapper<PaperFiles> chainWrapper = paperFilesService.lambdaQuery();
        chainWrapper.eq(basePage.getCategoryId() != null, PaperFiles::getCategoryId, basePage.getCategoryId());
        chainWrapper.eq(StrUtil.isNotEmpty(basePage.getFirstChar()), PaperFiles::getFirstChar, basePage.getFirstChar());
        BasePage<PaperFiles> filesBasePage = chainWrapper.page(basePage);
        return ResultUtil.ok(filesBasePage);
    }

    @RequestMapping("/down/{accountId}")
    public void down(@PathVariable("accountId") String accountId, @RequestParam("id") Integer id, HttpServletResponse response) {
        PaperFiles service = paperFilesService.getById(id);
        File file = FileUtil.file(path + "private/" + service.getFilePath());
        final String fileName = file.getName();
        final String contentType = ObjectUtil.defaultIfNull(FileUtil.getMimeType(fileName), "application/octet-stream");
        List<String> strings = RuntimeUtil.execForLines("python3 /opt/deduct.py "+ accountId);
        if(strings.size() > 5) {
            if(!strings.get(2).contains("Success")){
                ServletUtil.write(response,"没有足够的Paper","text/plain;charset=utf-8");
                return;
            }
        }else {
            ServletUtil.write(response,"没有足够的Paper","text/plain;charset=utf-8");
            return;
        }
        BufferedInputStream in = null;
        try {
            in = FileUtil.getInputStream(file);
            response.setContentType(contentType);
            ServletUtil.write(response, in);
        } finally {
            IoUtil.close(in);
        }
    }
}

