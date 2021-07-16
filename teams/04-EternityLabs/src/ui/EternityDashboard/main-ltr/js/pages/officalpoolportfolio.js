//[Dashboard Javascript]

//Project:	DashboardX Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)
document.write("<script language=javascript src='./js/api.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2612700_uzdaq5d2kzd.js'></script>");
$(function () {

    getOfficalPoolPortFolio();

    'use strict';

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

}); // End of use strict

/**
 * 返回ENL交易对的资产配比
 */
function getOfficalPoolPortFolio() {
    var officalpoolportfolio;
    $.ajax({
        type: "GET",
        url: baseUrl + "/analiysis/officalpoolportfolio",
        cache: false, //禁用缓存
        data: {
        }, //传入组装的参数
        dataType: "json",
        success: function (result) {
            officalpoolportfolio = result;
            drawTable();
        }
    });

    function drawTable() {
        var str = "";
        officalpoolportfolio.forEach((item, index) => {
            str += '<tr>';
            str += '<td>';
            str += '<img src="' + getImage(item.name) + '" alt="" width="20px" height="20px">';
            str += '<span>&nbsp;&nbsp;&nbsp;' + item.name + '</span></td>';
            str += '<td>' + item.Volume + '</td>';
            str += '<td>' + item.Rate + '</td>';
            str += '<td>' + item.Price + '</td>';
            str += '</tr>';
        });
        $("#offical-tbody").append(str);

        function getImage(name) {
            switch (name) {
                case "BTC":
                    return "../images/currency/BTC.png"
                case "ETH":
                    return "../images/currency/ETH.png"
                case "XRP":
                    return "../images/currency/XRP.png"
                case "ADA":
                    return "../images/currency/ADA.png"
                case "DOGE":
                    return "../images/currency/DOGE.png"
                case "BNB":
                    return "../images/currency/BNB.png"
                case "LTC":
                    return "../images/currency/LTC.png"
                case "DOT":
                    return "../images/currency/DOT.png"
                case "EOS":
                    return "../images/currency/EOS.png"
                case "BCH":
                    return "../images/currency/BCH.png"
                case "UNI":
                    return "../images/currency/UNI.png"
                case "SOL":
                    return "../images/currency/SOL.png"
                case "TRX":
                    return "../images/currency/TRX.png"
                case "LINK":
                    return "../images/currency/LINK.png"
                case "ETC":
                    return "../images/currency/ETC.png"
                case "FIL":
                    return "../images/currency/FIL.png"
                case "MATIC":
                    return "../images/currency/MATIC.png"
                case "LINK":
                    return "../images/currency/LINK.png"
                case "SUSHI":
                    return "../images/currency/SUSHI.png"
                case "XLM":
                    return "../images/currency/XLM.png"
                case "ICP":
                    return "../images/currency/ICP.png"
                case "BSV":
                    return "../images/currency/BSV.png"
                case "USDT":
                    return "../images/currency/USDT.png"
                case "FTT":
                    return "../images/currency/FTT.png"
                case "ENL":
                    return "../images/currency/ENL.png"
                default:
                    break;
            }
        }
    }
}
