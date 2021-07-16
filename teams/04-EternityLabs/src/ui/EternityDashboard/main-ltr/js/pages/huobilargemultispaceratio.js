//[Dashboard Javascript]

//Project:	DashboardX Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)
document.write("<script language=javascript src='./js/api.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2633648_i277bbsikf.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2633682_4trkav2rnnl.js'></script>");
$(function () {

    getHuobiLargeMultiSpaceRatioData();
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
function getHuobiLargeMultiSpaceRatioData() {
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

    getSelecCurrency();

    drawAccountEcharts();
    drawOpenInterestEcharts();
}

/**
 * 选择币种
 */
function chooseCurrency() {

}

/**
 * 画Huobi大户账户数多空比
 */
function drawAccountEcharts() {
    var chartDom = document.getElementById('account-echarts');
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
 * 画Huobi大户持仓量多空比
 */
function drawOpenInterestEcharts() {
    var chartDom = document.getElementById('open-interest-echarts');
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
 * 获取Huobi大户账户数多空比的货币下拉列表
 */
function getSelecCurrency() {
    var str = '';
    var list = ["BTC", "ETH", "XRP", "ADA", "DOGE", "BNB", "LTC", "DOT", "EOS", "BCH", "UNI", "SOL", "TRX", "LINK", "ETC", "FIL", "MATIC", "SUSHI", "XLM", "ICP", "BSV", "USDT", "FTT"];
    list.forEach((item, i) => {
        if (i === 0) {
            str += '<option selected="selected">' + list[i] + '</option>';
        } else {
            str += '<option>' + list[i] + '</option>';
        }
    });
    $(".select-account-currency").append(str);
    $(".open-interest-currency").append(str);
}

