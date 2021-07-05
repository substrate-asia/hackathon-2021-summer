//[Dashboard Javascript]

//Project:	DashboardX Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)
document.write("<script language=javascript src='./js/api.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2612700_uzdaq5d2kzd.js'></script>");
$(function () {

    getContractPriceDifference();

    'use strict';

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

}); // End of use strict

/**
 * 返回不同币种合约价格的最大价差
 */
function getContractPriceDifference() {
    var contractPriceDifference;
    $.ajax({
        type: "GET",
        url: baseUrl + "/analiysis/contractpricedifference",
        cache: false, //禁用缓存
        data: {
        }, //传入组装的参数
        dataType: "json",
        success: function (result) {
            contractPriceDifference = result;
            drawTable();
        }
    });

    function drawTable() {
        var str = "";
        contractPriceDifference.forEach((item, index) => {
            str += '<tr>';
            str += '<td>';
            str += '<img src="' + getImage(item.dex) + '" alt="" width="20px" height="20px">';
            str += '<span>&nbsp;&nbsp;&nbsp;' + item.dex[0].toUpperCase() + item.dex.substr(1) + '</span></td>';
            str += '<td><span>' + item.price + '</span></td>';
            str += '<td>' + item.gasfee + '</td>';
            str += '</tr>';
        });
        $("#contractpricedifference-tbody").append(str);

        /**
         * 获取交易所的图标
         */
        function getImage(name) {
            switch (name[0].toUpperCase() + name.substr(1)) {
                case "Bybit":
                    return "../images/exchange/Bybit.png"
                case "Binance":
                    return "../images/exchange/Binance.png"
                case "Okex":
                    return "../images/exchange/Okex.png"
                case "Bitmex":
                    return "../images/exchange/Bitmex.png"
                case "Huobi":
                    return "../images/exchange/Huobi.png"
                case "Ftx":
                    return "../images/exchange/Ftx.png"
                case "Deribit":
                    return "../images/exchange/Deribit.png"
                case "Bitfinex":
                    return "../images/exchange/Bitfinex.png"
                case "Mxc":
                    return "../images/exchange/Mxc.png"
                case "Heco":
                    return "../images/exchange/Heco.png"
                case "Uniswap":
                    return "../images/exchange/Uniswap.png"
                default:
                    break;
            }
        }
    }

}