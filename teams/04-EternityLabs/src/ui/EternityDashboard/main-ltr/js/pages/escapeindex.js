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
    drawEcharts();
}

/**
 * 画逃顶指标
 */
function drawEcharts() {
    var chartDom = document.getElementById('echarts');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['BTC价格', '两年移动平均x5', '两年移动平均']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: 'BTC价格',
                type: 'line',
                symbol: 'none',
                smooth: false,
                color: '#204474',
                // areaStyle: {
                //     // color: "#204474",
                // },
                data: [220, 182, 191, 234, 130, 330, 360, 200, 580, 750, 200, 300, 1500, 1250, 1500],
            },
            {
                name: '两年移动平均x5',
                type: 'line',
                smooth: true,
                symbol: 'none',
                color: '#e1443c',
                // areaStyle: {
                //     // color: "#fff",
                // },
                // stack: "total",
                data: [100, 50, 300, 200, 500, 400, 700, 800, 600, 1000, 1100, 1200, 1300, 1400, 1500]
            },
            {
                name: '两年移动平均',
                type: 'line',
                smooth: true,
                symbol: 'none',
                color: "#9fe6b8",
                // areaStyle: {
                //     // color: "#fff",
                // },
                // stack: "total",
                data: [50, 25, 150, 100, 250, 200, 350, 400, 350, 500, 550, 600, 650, 700, 750]
            },
        ],
        // visualMap: [
        //     {
        //         type: 'piecewise',
        //         show: false,
        //         dimension: 0,
        //         seriesIndex: 0,
        //         pieces: [{
        //             gt: 0,
        //             lt: 1,
        //             color: '#204474',
        //         }]
        //     },
        //     {
        //         type: 'piecewise',
        //         show: false,
        //         dimension: 0,
        //         seriesIndex: 1,
        //         pieces: [{
        //             gt: 0,
        //             lt: 1,
        //             color: '#ffffff'
        //         }]
        //     }, {
        //         type: 'piecewise',
        //         show: false,
        //         dimension: 0,
        //         seriesIndex: 2,
        //         pieces: [{
        //             gte: 7,
        //             lte: 8,
        //             color: '#9fe6b8'
        //         }]
        //     }],
    };





    // var btcPriceData = option.series[0].data;
    // var mvX5Data = option.series[1].data;
    // var mvAverageData = option.series[2].data;

    // option.visualMap.pieces[0] = { gte: 400, lte: 900, areaStyle: 'gold' };

    // for (let i = 0; i < btcPriceData.length; i++) {
    //     if (btcPriceData[i] > mvX5Data[i]) {
    //         console.log("大于");
    //         option.series[0].areaStyle = {
    //             color: '#f9807a',
    //             origin: 'start',
    //         };
    //     } else {
    //         console.log("小于");
    //         option.series[0].areaStyle = {
    //             color: '#fff',
    //             origin: 'start',
    //         };
    //     }
    // }

    option && myChart.setOption(option);

    $(window).resize(function () {
        myChart.resize();
    })

}

