//[Dashboard Javascript]

//Project:	DashboardX Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)
document.write("<script language=javascript src='./js/api.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2612700_uzdaq5d2kzd.js'></script>");
$(function () {

    getAccountinfo();

    'use strict';

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

}); // End of use strict

/**
 * 返回链上用户的信息以及正在量化的节点信息
 */
function getAccountinfo() {
    var accountInfoData;
    $.ajax({
        type: "GET",
        url: baseUrl + "/user/accountinfo/0x12313123124",
        cache: false, //禁用缓存
        data: {
        }, //传入组装的参数
        dataType: "json",
        success: function (result) {
            accountInfoData = result;
            drapTable();
        }
    });
    function drapTable() {
        //设置AccountId、Token和Income
        $("#accountInfoIncome").html("￥" + accountInfoData.Income);
        $("#accountInfoToken").html("Token：" + accountInfoData.Token);
        $("#accountInfoAccountId").html("AccountId：" + accountInfoData.AccountId);
        //处理表格数据
        var list = [];
        for (let i = 0; i < accountInfoData.Quan.length; i++) {
            var temp = [];
            temp.push(accountInfoData.Quan[i].model);
            temp.push(accountInfoData.Quan[i].Value);
            temp.push(accountInfoData.Quan[i].quanNode);
            list[i] = temp;
        }
        //设置表格
        $('#accountInfoQuanTable').DataTable({
            "data": list,
            "paging": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "lengthMenu": [[4, 8, 16, -1], [4, 8, 16, "All"]],
            "pagingType": "full_numbers",
        });
    }
}