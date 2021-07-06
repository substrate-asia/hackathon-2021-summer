//[Dashboard Javascript]

//Project:	DashboardX Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)
document.write("<script language=javascript src='./js/api.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2633648_i277bbsikf.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2633682_4trkav2rnnl.js'></script>");
$(function () {

    getRealTimeMultiSpaceRatioData();
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
function getRealTimeMultiSpaceRatioData() {
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
    getSelectCurrency();
    drawEcharts();
    chooseCurrency();
    exchangeChooseCurrency();
    getExchangeMultiSpaceRatioTable();
}

/**
 * 选择多空比币种
 */
function chooseCurrency() {
    $("#multi-space-ratio-title").html($('#multi-space-ratio-select').val());
}

/**
 * 选择交易所多空比比例币种
 */
function exchangeChooseCurrency() {
    $("#exchange-multi-space-ratio-title").html($('#exchange-multi-space-ratio-select').val());
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
                str += '<div style="display: inline-block;background-color: #50bd93;height: 10px;width:10px;border-radius: 50%;"></div>  ' + data[0].seriesName + "：" + '<span style="color:#50bd93;"> ' + data[0].value + "%" + '</span>' + "</br>";
                str += '<div style="display: inline-block;background-color: #d94c66;height: 10px;width:10px;border-radius: 50%;"></div>  ' + data[1].seriesName + "：" + '<span style="color:#d94c66;"> ' + data[1].value + "%" + '</span>' + "</br>";
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
                name: '占比',
                // inverse: false,
                axisLabel: {
                    formatter: '{value}'
                },
            },
            {
                type: 'value',
                name: '比例',
                scale: false,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: '多单占比',
                type: 'bar',
                stack: 'one',
                barWidth: 20,//柱图宽度
                data: [52, 44, 30, 40, 55, 78, 73, 44, 50, 47, 25, 49]
            },
            {
                name: '空单占比',
                stack: 'one',
                type: 'bar',
                barWidth: 20,//柱图宽度
                data: [48, 56, 70, 60, 45, 22, 27, 56, 50, 53, 75, 51]
            },
            {
                name: '多空单比例',
                type: 'line',
                yAxisIndex: 1,
                data: [1.2, 1.4, 1.6, 0.2, 0.5, 0.1, 1.2, 0.5, 0.2, 2.0, 1.2, 0.4]
            }
        ]
    };

    option && myChart.setOption(option);

    $(window).resize(function () {
        myChart.resize();
    })

}


/**
 * 获取币种的下拉列表
 */
function getSelectCurrency() {
    var str = '';
    var list = ["BTC", "ETH", "XRP", "ADA", "DOGE", "BNB", "LTC", "DOT", "EOS", "BCH", "UNI", "SOL", "TRX", "LINK", "ETC", "FIL", "MATIC", "SUSHI", "XLM", "ICP", "BSV", "USDT", "FTT"];
    list.forEach((item, i) => {
        if (i === 0) {
            str += '<option selected="selected">' + list[i] + '</option>';
        } else {
            str += '<option>' + list[i] + '</option>';
        }
    });
    $(".select-currency").append(str);
}

/**
 * 设置全网交易所币种多空比例表
 */
function getExchangeMultiSpaceRatioTable() {
    var data = [{
        Exchange: "Bybit",
        Proportion1: "47.15",
        Proportion2: "52.85",
    }, {
        Exchange: "Binance",
        Proportion1: "13.08",
        Proportion2: "86.92",
    }, {
        Exchange: "Okex",
        Proportion1: "12.75",
        Proportion2: "87.25",
    }, {
        Exchange: "Bitmex",
        Proportion1: "11.71",
        Proportion2: "88.29",
    }, {
        Exchange: "Huobi",
        Proportion1: "45.25",
        Proportion2: "54.75",
    }, {
        Exchange: "Ftx",
        Proportion1: "66.22",
        Proportion2: "33.78",
    }, {
        Exchange: "Deribit",
        Proportion1: "22.66",
        Proportion2: "77.34",
    }, {
        Exchange: "Bitfinex",
        Proportion1: "55",
        Proportion2: "55",
    }];
    var str = '';
    for (let i = 0; i < data.length; i++) {
        str += '<tr>';
        str += '<td>';
        str += '<img src="' + getImage(data[i].Exchange) + '" alt="" width="20px"';
        str += 'height="20px">';
        str += '<span style="font-size: 18px;">&nbsp;&nbsp;' + data[i].Exchange + '</span></td>';
        str += '<td>';
        str += '<div class="progress" style="height: 30px;border-radius: 5px">';
        str += '<div class="progress-bar progress-bar-success"';
        str += 'aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + data[i].Proportion1 + '"';
        str += 'style="width: ' + data[i].Proportion1 + '%; border-radius: 0px;background-color: #4aa49f;">';
        str += '<span style="color: black;font-size: 18px;"> ' + data[i].Proportion1 + ' %</span>';
        str += '</div>';
        str += '<div class="progress-bar progress-bar-danger"';
        str += 'aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + data[i].Proportion2 + '"';
        str += 'style="width:' + data[i].Proportion2 + '%;border-radius: 0px 0px;background-color: #e3aaa8;">';
        str += '<span style="color: black;font-size: 18px;">' + data[i].Proportion2 + '%</span>';
        str += '</div>';
        str += '</div>';
        str += '</td>';
        str += '</tr>';
    }
    $("#exchange-table").append(str);

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

