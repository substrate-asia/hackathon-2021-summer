//[Dashboard Javascript]

//Project:	DashboardX Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)
document.write("<script language=javascript src='./js/api.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2633648_i277bbsikf.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2633682_4trkav2rnnl.js'></script>");
$(function () {

    getBurstdata();

    $("#ul-currency").on("click", "li", function () {
        if ($(this).text() === "ALL") {
            $("#all-show").show();
            for (let i = 0; i < $(".currencyName").length; i++) {
                $(".currencyName")[i].innerText = "";
            }
        } else {
            $("#all-show").hide();
            for (let i = 0; i < $(".currencyName").length; i++) {
                $(".currencyName")[i].innerText = $(this).text();
            }
        }

        // 删除其他兄弟元素的样式
        $(this).siblings('li').removeClass('li-active');
        // 添加当前元素的样式
        $(this).addClass('li-active');
    });


    //初始化select2插件
    $('.select').select2();

    'use strict';

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

}); // End of use strict

/**
 * 请求接口
 */
function getBurstdata() {
    // $.ajax({
    //     type: "GET",
    //     url: baseUrl + "/user/accountinfo/0x12313123124",
    //     cache: false, //禁用缓存
    //     data: {
    //     }, //传入组装的参数
    //     dataType: "json",
    //     success: function (result) {

    //     }
    // });
    getCurrencyList();
    getBurstTable();
    getSelectCurrency();
    getSelectExchange();
    getBurstStatistics();
    getBurstList();
    drawEcharts();
}

/**
 * 选择币种
 */
function chooseCurrency(obj) {
    console.log(obj);
}

/**
 * 画统计图图
 */
function drawEcharts() {
    var chartDom = document.getElementById('echarts');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        color: ['#2ebd85', '#e0294a', '#f5d05c'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                },
            },
            formatter: function (data) {
                var str = "";
                str += "时间：" + data[0].axisValueLabel + "</br>";
                str += '<div style="display: inline-block;background-color: #50bd93;height: 10px;width:10px;border-radius: 50%;"></div>  ' + data[0].seriesName + "：" + '<span style="color:#50bd93;"> ' + data[0].value + '</span>' + "</br>";
                str += '<div style="display: inline-block;background-color: #d94c66;height: 10px;width:10px;border-radius: 50%;"></div>  ' + data[1].seriesName + "：" + '<span style="color:#d94c66;"> ' + Math.abs(data[1].value) + '</span>' + "</br>";
                str += '<div style="display: inline-block;background-color: #f7d97a;height: 10px;width:10px;border-radius: 50%;"></div>  ' + data[2].seriesName + "：" + '<span style="color:#f7d97a;"> ' + data[2].value + '</span>' + "</br>";
                str += '</div>';
                return str;
            },
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                // magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['多单爆仓', '空单爆仓', '货币价格']
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '总价格',
                // inverse: false,
                axisLabel: {
                    formatter: function (value) {
                        if (value < 0) {
                            return -value + '元';
                        } else {
                            return value + '元';
                        }
                    }
                },
            },
            {
                type: 'value',
                name: '货币价格',
                scale: false,
                axisLabel: {
                    formatter: '{value} 元'
                }
            }
        ],
        series: [
            {
                name: '多单爆仓',
                type: 'bar',
                stack: 'one',
                barWidth: 20,//柱图宽度
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
                name: '空单爆仓',
                stack: 'one',
                type: 'bar',
                barWidth: 20,//柱图宽度
                data: [-2.6, -5.9, -9.0, -26.4, -28.7, -70.7, -175.6, -182.2, -48.7, -18.8, -6.0, -2.3]
            },
            {
                name: '货币价格',
                type: 'line',
                yAxisIndex: 1,
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        ]
    };

    option && myChart.setOption(option);

    $(window).resize(function () {
        myChart.resize();
    })

}

/**
 * 获取币种的导航栏
 */
function getCurrencyList() {
    var str = '<li class="list-inline-item li-active"><a href="#">ALL</a></li>';
    var list = ["BTC", "ETH", "XRP", "ADA", "DOGE", "BNB", "LTC", "DOT", "EOS", "BCH", "UNI", "SOL", "TRX", "LINK", "ETC", "FIL", "MATIC", "SUSHI", "XLM", "ICP", "BSV", "USDT", "FTT"];
    list.forEach((item, i) => {
        str += '<li class="list-inline-item"><a href="#">' + list[i] + '</a></li>';
    });
    $("#ul-currency").append(str);
}

/**
 * 获取币种的下拉列表
 */
function getSelectCurrency() {
    var str = '<option selected="selected">ALL</option>';
    var list = ["BTC", "ETH", "XRP", "ADA", "DOGE", "BNB", "LTC", "DOT", "EOS", "BCH", "UNI", "SOL", "TRX", "LINK", "ETC", "FIL", "MATIC", "SUSHI", "XLM", "ICP", "BSV", "USDT", "FTT"];
    list.forEach((item, i) => {
        str += '<option>' + list[i] + '</option>';
    });
    $(".select-currency").append(str);
}

/**
 * 获取交易所的下拉列表
 */
function getSelectExchange() {
    var str = '<option selected="selected">全部</option>';
    var list = ["Bybit", "Binance", "Huobi", "Okex", "FTX", "Bitmex", "Bitfinex", "Deribit"];
    list.forEach((item, i) => {
        str += '<option>' + list[i] + '</option>';
    });
    $(".select-exchange").append(str);
}


/**
 * 设置各个币种爆仓数据
 */
function getBurstStatistics() {
    var names = ["BTC", "ETH", "XRP", "ADA", "DOGE", "BNB", "LTC", "DOT", "EOS", "BCH", "UNI", "SOL", "TRX", "LINK", "ETC", "FIL", "MATIC", "SUSHI", "XLM", "ICP", "BSV", "USDT", "FTT"];
    var str = "";
    for (let i = 0; i < 9; i++) {
        str += '<div class="col-xl-4 col-6">';
        str += '<div class="text-center" style = "border-radius: 20px;border: 1px solid rgb(218, 214, 214);padding:5px;margin:5px;"> ';
        str += '<img src="' + getImage(names[i]) + '" alt="" width="40px" height="40px">';
        str += '<div><span style="font-size: 24px;">$25.36万</span></div>';
        str += '<div><span style="font-size: 16px;">≈208.41BTC</span></div>';
        str += '</div>';
        str += '</div>';
    }

    $("#burst-statistics").append(str);
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
            default:
                break;
        }
    }
}

/**
 * 获取爆仓统计表数据
 */
function getBurstTable() {
    var data = [{
        Exchange: "Bybit",
        BurstAmount: "3426.36万",
        MultipleOrdersBurstAmount: "3128.60万",
        EmptyOrderExplodes: "296.75万",
        Proportion1: "47.15",
        Proportion2: "91.34%多",
    }, {
        Exchange: "Binance",
        BurstAmount: "950.80万",
        MultipleOrdersBurstAmount: "745.53万",
        EmptyOrderExplodes: "205.27万",
        Proportion1: "13.08",
        Proportion2: "78.41%多",
    }, {
        Exchange: "Okex",
        BurstAmount: "926.51万",
        MultipleOrdersBurstAmount: "774.28万",
        EmptyOrderExplodes: "152.23万",
        Proportion1: "12.75",
        Proportion2: "85.57%多",
    }, {
        Exchange: "Bitmex",
        BurstAmount: "851.10万",
        MultipleOrdersBurstAmount: "850.73万",
        EmptyOrderExplodes: "3700.00",
        Proportion1: "11.71",
        Proportion2: "99.96%多",
    }, {
        Exchange: "Huobi",
        BurstAmount: "752.68万",
        MultipleOrdersBurstAmount: "709.68万",
        EmptyOrderExplodes: "43.01万",
        Proportion1: "10.36",
        Proportion2: "94.29%多",
    }, {
        Exchange: "Ftx",
        BurstAmount: "315.82万",
        MultipleOrdersBurstAmount: "293.72万",
        EmptyOrderExplodes: "22.10万",
        Proportion1: "4.35",
        Proportion2: "93%多",
    }, {
        Exchange: "Deribit",
        BurstAmount: "27.94万",
        MultipleOrdersBurstAmount: "27.94万",
        EmptyOrderExplodes: "0.00",
        Proportion1: "0.38",
        Proportion2: "100%多",
    }, {
        Exchange: "Bitfinex",
        BurstAmount: "15.59万",
        MultipleOrdersBurstAmount: "3.08万",
        EmptyOrderExplodes: "12.51万",
        Proportion1: "0.21",
        Proportion2: "80.24%空",
    }];

    var str = "";
    str += '<tr>';
    str += '<td> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All</td>';
    str += '<td>534.72万</td>';
    str += '<td>97.85万</td>';
    str += '<td>436.85万</td>';
    str += '<td>';
    str += '<div class="progress">';
    str += '<div class="progress-bar progress-bar-info"';
    str += 'role="progressbar" aria-valuenow="100" aria-valuemin="0"';
    str += 'aria-valuemax="100" style="width: 100%">';
    str += '<span style="color: black;">100%</span>';
    str += '</div>';
    str += '</div>';
    str += '</td>';
    str += '<td style="color: #02c076;">81.7%多</td>';
    str += '</tr >';
    for (let i = 0; i < data.length; i++) {
        str += '<tr>';
        str += '<td>';
        str += '<img src="' + getImage(data[i].Exchange) + '" alt="" width="20px" height="20px">';
        str += '<span>&nbsp;&nbsp;&nbsp;' + data[i].Exchange + '</span></td>';
        str += '<td>' + data[i].BurstAmount + '</td>';
        str += '<td>' + data[i].MultipleOrdersBurstAmount + '</td>';
        str += '<td>' + data[i].EmptyOrderExplodes + '</td>';
        str += '<td>';
        str += '<div class="progress">';
        str += '<div class="progress-bar progress-bar-info"';
        str += 'role="progressbar" aria-valuenow="' + data[i].Proportion1 + '"';
        str += 'aria-valuemin="0" aria-valuemax="100"';
        str += 'style="width: ' + data[i].Proportion1 + '%">';
        str += '<span style="color: black;">' + data[i].Proportion1 + '%</span>';
        str += '</div>';
        str += '</div>';
        str += '</td>';
        if (data[i].Proportion2.split("%")[1] === "空") {
            str += '<td style="color: #f84960;">' + data[i].Proportion2 + '</td>';
        } else {
            str += '<td style="color: #02c076;">' + data[i].Proportion2 + '</td>';
        }
        str += '</tr>';
    }
    $("#burst-table").append(str);

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

/**
 * 获取爆仓单列表数据
 */
function getBurstList() {
    var data = [{
        Exchange: "Binance",
        Time: "06-26 02:03",
        Currency: "ETH永续",
        Number: "$12.02",
        Price: "$525.99",
        Status: "空单爆仓",
    }, {
        Exchange: "Binance",
        Time: "06-26 02:01",
        Currency: "BTC永续",
        Number: "$1235.02",
        Price: "$31571.99",
        Status: "多单爆仓",
    }, {
        Exchange: "Huobi",
        Time: "06-26 02:01",
        Currency: "BTC永续",
        Number: "$1235.02",
        Price: "$31571.99",
        Status: "多单爆仓",
    }, {
        Exchange: "Huobi",
        Time: "06-26 02:01",
        Currency: "BTC永续",
        Number: "$1225.02",
        Price: "$3371.99",
        Status: "多单爆仓",
    }, {
        Exchange: "Bybit",
        Time: "06-26 02:01",
        Currency: "BTC永续",
        Number: "$1535.02",
        Price: "$3371.99",
        Status: "空单爆仓",
    }, {
        Exchange: "Okex",
        Time: "06-26 02:01",
        Currency: "BTC永续",
        Number: "$36.02",
        Price: "$21.99",
        Status: "空单爆仓",
    }, {
        Exchange: "Ftx",
        Time: "06-26 02:01",
        Currency: "BTC永续",
        Number: "$565.02",
        Price: "$2536.99",
        Status: "空单爆仓",
    }, {
        Exchange: "Bitfinex",
        Time: "06-26 02:01",
        Currency: "BTC永续",
        Number: "$96.02",
        Price: "$562.99",
        Status: "多单爆仓",
    }, {
        Exchange: "Deribit",
        Time: "06-26 02:01",
        Currency: "BTC永续",
        Number: "$66.02",
        Price: "$4512.99",
        Status: "空单爆仓",
    },];
    var str = "";
    for (let i = 0; i < data.length; i++) {
        str += '<tr>';
        str += '<td>';
        str += '<img src="' + getImage(data[i].Exchange) + '" alt="" width="20px" height="20px">';
        str += '<span>&nbsp;&nbsp;&nbsp;' + data[i].Exchange + '</span></td>';
        str += '<td>' + data[i].Time + '</td>';
        str += '<td>' + data[i].Currency + '</td>';
        str += '<td>' + data[i].Number + '</td>';
        if (data[i].Status === "空单爆仓") {
            str += '<td>' + data[i].Price + '<div style="color:#f84960;">' + data[i].Status + '</div></td>';
        } else {
            str += '<td>' + data[i].Price + '<div style="color:#02c0a1;">' + data[i].Status + '</div></td>';
        }
        str += '<td>';
        str += '</td>';
        str += '</tr>';
    }

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
    $("#burst-list").append(str);
}