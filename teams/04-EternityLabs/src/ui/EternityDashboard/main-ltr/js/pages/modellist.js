//[Dashboard Javascript]

//Project:	DashboardX Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)
document.write("<script language=javascript src='./js/api.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2612700_uzdaq5d2kzd.js'></script>");
$(function () {

    getModelList();

    'use strict';

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

}); // End of use strict

/**
 * 获取链上数据模型
 */
function getModelList() {
    // 设置表格
    $('#modellistTable').DataTable({
        // 设置分页为中文样式
        // language: {
        // 	"sProcessing": "处理中...",
        // 	"sLengthMenu": "显示 _MENU_ 项结果",
        // 	"sZeroRecords": "没有匹配结果",
        // 	"sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        // 	"sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
        // 	"sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        // 	"sInfoPostFix": "",
        // 	"sSearch": "搜索:",
        // 	"sUrl": "",
        // 	"sEmptyTable": "表中数据为空",
        // 	"sLoadingRecords": "载入中...",
        // 	"sInfoThousands": ",",
        // 	"oPaginate": {
        // 		"sFirst": "首页",
        // 		"sPrevious": "上一页",
        // 		"sNext": "下一页",
        // 		"sLast": "末页"
        // 	},
        // 	"oAria": {
        // 		"sSortAscending": ": 以升序排列此列",
        // 		"sSortDescending": ": 以降序排列此列"
        // 	}
        // },

        ajax: function (data, callback, settings) {
            //ajax请求数据
            $.ajax({
                type: "GET",
                url: baseUrl + "/quantize/modellist",
                cache: false, //禁用缓存
                data: {
                }, //传入组装的参数
                dataType: "json",
                success: function (result) {
                    var returnData = {};
                    returnData.data = result;
                    callback(returnData);
                },
            });
        },
        "columns": [
            { 'data': 'accountid' },
            { 'data': 'blocknumber' },
            { 'data': 'ipfshash' },
        ],
        "paging": true,
        "ordering": true,
        "info": true,
        "searching": true,
        "pagingType": "full_numbers",
        "lengthMenu": [[4, 8, 16, -1], [4, 8, 16, "All"]]
    });
}