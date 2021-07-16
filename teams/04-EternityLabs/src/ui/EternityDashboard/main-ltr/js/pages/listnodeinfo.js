//[Dashboard Javascript]

//Project:	DashboardX Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)
document.write("<script language=javascript src='./js/api.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2612700_uzdaq5d2kzd.js'></script>");
$(function () {

    getanaliysis();
getdispatch();
getquantize();
getverify();
    'use strict';

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

}); // End of use strict

/**
 * 获取节点信息
 * 1.获取验证全部节点的信息
 * 2.获取分析全部节点的信息
 * 3.获取调度全部节点的信息
 * 4.获取量化全部节点的信息
 */
function getanaliysis() {
    $.ajax({
        type: "GET",
        url: baseUrl + "/analiysis/substrate/listnodeinfo",
        cache: false, //禁用缓存
        data: {
        }, //传入组装的参数
        dataType: "json",
        success: function (result) {
            var listNodeInfo = [];
            for (let i = 0; i < result.length; i++) {
                var temp = [];
                temp.push(result[i].name);
                temp.push(result[i].IP);
                temp.push(result[i].Status);
                temp.push(result[i].AccountId);
                listNodeInfo[i] = temp;
            }
            //设置表格
            $('#analiysis').DataTable({
                "data": listNodeInfo,
                "paging": true,
                "ordering": true,
                "info": true,
                "searching": true,
              "lengthMenu": [[4, 8, 16, -1], [4, 8, 16, "All"]],
				/* "bLengthChange": false,   //去掉每页显示多少条数据方法 */
                "pagingType": "full_numbers",
            });
        }
    });
}

function getdispatch() {
    $.ajax({
        type: "GET",
        url: baseUrl + "/dispatch/substrate/listnodeinfo",
        cache: false, //禁用缓存
        data: {
        }, //传入组装的参数
        dataType: "json",
        success: function (result) {
            var listNodeInfo = [];
            for (let i = 0; i < result.length; i++) {
                var temp = [];
                temp.push(result[i].name);
                temp.push(result[i].IP);
                temp.push(result[i].Status);
                temp.push(result[i].AccountId);
                listNodeInfo[i] = temp;
            }
            //设置表格
            $('#dispatch').DataTable({
                "data": listNodeInfo,
                "paging": true,
                "ordering": true,
                "info": true,
                "searching": true,
                "lengthMenu": [[4, 8, 16, -1], [4, 8, 16, "All"]],
				/* "bLengthChange": false,   //去掉每页显示多少条数据方法 */
                "pagingType": "full_numbers",
            });
        }
    });
}

function getquantize() {
    $.ajax({
        type: "GET",
        url: baseUrl + "/quantize/substrate/listnodeinfo",
        cache: false, //禁用缓存
        data: {
        }, //传入组装的参数
        dataType: "json",
        success: function (result) {
            var listNodeInfo = [];
            for (let i = 0; i < result.length; i++) {
                var temp = [];
                temp.push(result[i].name);
                temp.push(result[i].IP);
                temp.push(result[i].Status);
                temp.push(result[i].AccountId);
                listNodeInfo[i] = temp;
            }
            //设置表格
            $('#quantize').DataTable({
                "data": listNodeInfo,
                "paging": true,
                "ordering": true,
                "info": true,
                "searching": true,
                 "lengthMenu": [[4, 8, 16, -1], [4, 8, 16, "All"]],
				/* "bLengthChange": false,   //去掉每页显示多少条数据方法 */
                "pagingType": "full_numbers",
            });
        }
    });
}
function getverify() {
    $.ajax({
        type: "GET",
        url: baseUrl + "/verify/substrate/listnodeinfo",
        cache: false, //禁用缓存
        data: {
        }, //传入组装的参数
        dataType: "json",
        success: function (result) {
            var listNodeInfo = [];
            for (let i = 0; i < result.length; i++) {
                var temp = [];
                temp.push(result[i].name);
                temp.push(result[i].IP);
                temp.push(result[i].Status);
                temp.push(result[i].AccountId);
                listNodeInfo[i] = temp;
            }
            //设置表格
            $('#verify').DataTable({
                "data": listNodeInfo,
                "paging": true,
                "ordering": true,
                "info": true,
                "searching": true,
				"title":"111111",
                 "lengthMenu": [[4, 8, 16, -1], [4, 8, 16, "All"]], 
				/* "bLengthChange": false,   //去掉每页显示多少条数据方法 */
                "pagingType": "full_numbers",
            });
        }
    });
}