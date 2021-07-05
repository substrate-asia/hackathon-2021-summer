//[Dashboard Javascript]

//Project:	DashboardX Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)
document.write("<script language=javascript src='./js/api.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2633648_i277bbsikf.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2633682_4trkav2rnnl.js'></script>");
$(function () {

    getHuobiData();
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
function getHuobiData() {
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
    drawEcharts2();
    drawEcharts3();
    drawEcharts4();
    drawEcharts5();
    drawEcharts6();
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
        color: ['#000000'],
        xAxis: {
            type: 'value',
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['BSV', 'ADA', 'BCH', 'XRP', 'DOT', 'EOS', 'FIL', 'DOGE', 'LTC', 'ETH', 'BTC']
        },
        series: [{
            data: [20, 23, 23, 33, 36, 38, 45, 51, 52, 584, 786],
            type: 'bar',
            label: {
                show: true,
                position: 'right',
                formatter: function (params) {
                    if (params.data > 1000) {
                        return '$' + (params.data) / 1000 + 'B';
                    }
                    return '$' + params.data + 'M';
                }
            },
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }]
    };

    option && myChart.setOption(option);

    $(window).resize(function () {
        myChart.resize();
    })
}

function drawEcharts2() {
    var chartDom = document.getElementById('echarts2');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        color: ['#000000'],
        xAxis: {
            type: 'value',
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['ETC', 'LINK', 'LTC', 'EOS', 'ADA', 'DOT', 'FIL', 'XRP', 'DOGE', 'ETH', 'BTC']
        },
        series: [{
            data: [174, 205, 239, 368, 305, 343, 345, 436, 2100, 5300, 9000],
            type: 'bar',
            label: {
                show: true,
                position: 'right',
                formatter: function (params) {
                    if (params.data > 1000) {
                        return '$' + (params.data) / 1000 + 'B';
                    }
                    return '$' + params.data + 'M';
                }
            },
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }]
    };

    option && myChart.setOption(option);

    $(window).resize(function () {
        myChart.resize();
    })
}

function drawEcharts3() {
    var chartDom = document.getElementById('echarts3');
    var myChart = echarts.init(chartDom);

    var dataCount = 500;
    var data = generateData(dataCount);
    var data2 = generateData2(dataCount);
    var option = {
        color: ['#000000', '#f5d05c'],
        legend: {
            data: ['BTC价格', 'Huobi']
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            bottom: 90
        },
        dataZoom: [{
            type: 'inside'
        }, {
            type: 'slider'
        }],
        xAxis: {
            data: data.categoryData,
            silent: false,
            splitLine: {
                show: false
            },
            splitArea: {
                show: false
            }
        },
        yAxis: [
            {
                min: function (value) {
                    return value.min;
                },
                type: 'value',
                // inverse: false,
                axisLabel: {
                    formatter: function (value) {

                        return '$' + value / 100 + '亿元';

                    }
                },

            },
            {
                min: function (value) {
                    return value.min;
                },
                type: 'value',
                scale: false,
                axisLabel: {
                    formatter: function (value) {
                        return '$' + value / 10000 + '万';
                    }
                }
            }
        ],
        series: [{
            type: 'bar',
            name: 'Huobi',
            data: data.valueData,
            // Set `large` for large data amount
            large: true
        }, {
            name: 'BTC价格',
            type: 'line',
            yAxisIndex: 1,
            data: data2.valueData,
        }]
    };

    function generateData(count) {
        var baseValue = Math.random() * 1000;
        var time = +new Date(2011, 0, 1);
        var smallBaseValue;

        function next(idx) {
            smallBaseValue = idx % 30 === 0
                ? Math.random() * 700
                : (smallBaseValue + Math.random() * 500 - 250);
            baseValue += Math.random() * 20 - 10;
            return Math.max(
                0,
                Math.round(baseValue + smallBaseValue) + 1000
            );
        }

        var categoryData = [];
        var valueData = [];

        for (var i = 0; i < count; i++) {
            categoryData.push(echarts.format.formatTime('MM-dd', time));
            valueData.push(next(i).toFixed(2));
            time += 1000 * 60 * 60 * 24;
        }

        return {
            categoryData: categoryData,
            valueData: valueData
        };
    }
    function generateData2(count) {
        var baseValue = Math.random() * 60000;
        var time = +new Date(2011, 0, 1);
        var smallBaseValue;

        function next(idx) {
            smallBaseValue = idx % 30 === 0
                ? Math.random() * 7000
                : (smallBaseValue + Math.random() * 5000 - 2500);
            baseValue += Math.random() * 1000 - 500;
            return Math.max(
                0,
                Math.round(baseValue + smallBaseValue) + 1000
            );
        }

        var categoryData = [];
        var valueData = [];

        for (var i = 0; i < count; i++) {
            categoryData.push(echarts.format.formatTime('MM-dd', time));
            valueData.push(next(i).toFixed(2));
            time += 1000 * 60 * 60 * 24;
        }

        return {
            categoryData: categoryData,
            valueData: valueData
        };
    }
    option && myChart.setOption(option);

    $(window).resize(function () {
        myChart.resize();
    })
}

function drawEcharts4() {
    var chartDom = document.getElementById('echarts4');
    var myChart = echarts.init(chartDom);

    var dataCount = 500;
    var data = generateData(dataCount);
    var data2 = generateData2(dataCount);
    var option = {
        color: ['#000000', '#f5d05c'],
        legend: {
            data: ['BTC价格', 'Huobi']
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            bottom: 90
        },
        dataZoom: [{
            type: 'inside'
        }, {
            type: 'slider'
        }],
        xAxis: {
            data: data.categoryData,
            silent: false,
            splitLine: {
                show: false
            },
            splitArea: {
                show: false
            }
        },
        yAxis: [
            {
                min: function (value) {
                    return value.min;
                },
                type: 'value',
                // inverse: false,
                axisLabel: {
                    formatter: function (value) {

                        return '$' + value / 100 + '亿元';

                    }
                },
            },
            {
                min: function (value) {
                    return value.min;
                },
                type: 'value',
                scale: false,
                axisLabel: {
                    formatter: function (value) {
                        return '$' + value / 10000 + '万';
                    }
                }
            }
        ],
        series: [{
            type: 'bar',
            name: 'Huobi',
            data: data.valueData,
            // Set `large` for large data amount
            large: true
        }, {
            name: 'BTC价格',
            type: 'line',
            yAxisIndex: 1,
            data: data2.valueData,
        }]
    };

    function generateData(count) {
        var baseValue = Math.random() * 10000;
        var time = +new Date(2011, 0, 1);
        var smallBaseValue;

        function next(idx) {
            smallBaseValue = idx % 300 === 0
                ? Math.random() * 7000
                : (smallBaseValue + Math.random() * 5000 - 2500);
            baseValue += Math.random() * 200 - 100;
            return Math.max(
                0,
                Math.round(baseValue + smallBaseValue) + 10000
            );
        }

        var categoryData = [];
        var valueData = [];

        for (var i = 0; i < count; i++) {
            categoryData.push(echarts.format.formatTime('MM-dd', time));
            valueData.push(next(i).toFixed(2));
            time += 1000 * 60 * 60 * 24;
        }

        return {
            categoryData: categoryData,
            valueData: valueData
        };
    }
    function generateData2(count) {
        var baseValue = Math.random() * 60000;
        var time = +new Date(2011, 0, 1);
        var smallBaseValue;

        function next(idx) {
            smallBaseValue = idx % 30 === 0
                ? Math.random() * 7000
                : (smallBaseValue + Math.random() * 5000 - 2500);
            baseValue += Math.random() * 1000 - 500;
            return Math.max(
                0,
                Math.round(baseValue + smallBaseValue) + 1000
            );
        }

        var categoryData = [];
        var valueData = [];

        for (var i = 0; i < count; i++) {
            categoryData.push(echarts.format.formatTime('MM-dd', time));
            valueData.push(next(i).toFixed(2));
            time += 1000 * 60 * 60 * 24;
        }

        return {
            categoryData: categoryData,
            valueData: valueData
        };
    }
    option && myChart.setOption(option);

    $(window).resize(function () {
        myChart.resize();
    })
}

function drawEcharts5() {
    var chartDom = document.getElementById('echarts5');
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
                min: function (value) {
                    return value.min;
                },
                type: 'value',
                name: '总价格',
                // inverse: false,
                axisLabel: {
                    formatter: function (value) {
                        if (value > 1000) {
                            return '$' + value / 1000 + 'B';
                        } else {
                            return '$' + value + 'M';
                        }

                    }
                },
            },
            {
                min: function (value) {
                    return value.min;
                },
                type: 'value',
                name: '货币价格',
                scale: false,
                axisLabel: {
                    formatter: function (value) {

                        return '$' + value + 'K';


                    }
                }
            }
        ],
        series: [
            {
                name: '多单爆仓',
                type: 'bar',
                // stack: 'one',
                barWidth: 20,//柱图宽度
                data: [7.0, 14.9, 7.0, 23.2, 256, 767, 135.6, 162.2, 1252, 3215, 420, 3200]
            },
            {
                name: '空单爆仓',
                // stack: 'one',
                type: 'bar',
                barWidth: 20,//柱图宽度
                data: [7.0, 16.9, 9.0, 232, 25.6, 176.7, 1135.6, 2162.2, 3332.6, 420.0, 66.4, 2698.3],
            },
            {
                name: '货币价格',
                type: 'line',
                yAxisIndex: 1,
                data: [39.0, 64.0, 13.3, 14.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        ]
    };

    option && myChart.setOption(option);

    $(window).resize(function () {
        myChart.resize();
    })

}

function drawEcharts6() {
    var chartDom = document.getElementById('echarts6');
    var myChart = echarts.init(chartDom);

    var dataCount = 500;
    var data = generateData(dataCount);
    var data2 = generateData2(dataCount);
    var data3 = generateData3(dataCount);
    var option = {
        color: ['#000000', '#00ffff', '#f5d05c'],
        legend: {
            data: ['BTC价格', '持仓量', '成交额']
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            bottom: 90
        },
        dataZoom: [{
            type: 'inside'
        }, {
            type: 'slider'
        }],
        xAxis: {
            data: data.categoryData,
            silent: false,
            splitLine: {
                show: false
            },
            splitArea: {
                show: false
            }
        },
        yAxis: [
            {
                min: function (value) {
                    return value.min;
                },
                type: 'value',
                // inverse: false,
                axisLabel: {
                    formatter: function (value) {
                        if (value > 1000) {
                            return '$' + value / 1000 + 'B';
                        } else {
                            return '$' + value + 'M';
                        }

                    }
                },
            },
            {
                min: function (value) {
                    return value.min;
                },
                type: 'value',
                scale: false,
                axisLabel: {
                    formatter: function (value) {
                        return '$' + value / 10000 + 'K';
                    }
                }
            }
        ],
        series: [{
            type: 'line',
            name: '成交额',
            data: data.valueData,
            // Set `large` for large data amount
            large: true
        }, {
            name: '持仓量',
            type: 'line',
            yAxisIndex: 1,
            data: data2.valueData,
            areaStyle: {
                color: ['#afdfe4']
            },
        },
        {
            name: 'BTC价格',
            type: 'line',
            yAxisIndex: 1,
            data: data3.valueData,
        }]
    };

    function generateData(count) {
        var baseValue = Math.random() * 10000;
        var time = +new Date(2011, 0, 1);
        var smallBaseValue;

        function next(idx) {
            smallBaseValue = idx % 300 === 0
                ? Math.random() * 7000
                : (smallBaseValue + Math.random() * 5000 - 2500);
            baseValue += Math.random() * 200 - 100;
            return Math.max(
                0,
                Math.round(baseValue + smallBaseValue) + 10000
            );
        }

        var categoryData = [];
        var valueData = [];

        for (var i = 0; i < count; i++) {
            categoryData.push(echarts.format.formatTime('MM-dd', time));
            valueData.push(next(i).toFixed(2));
            time += 1000 * 60 * 60 * 24;
        }

        return {
            categoryData: categoryData,
            valueData: valueData
        };
    }
    function generateData2(count) {
        var baseValue = Math.random() * 30000;
        var time = +new Date(2011, 0, 1);
        var smallBaseValue;

        function next(idx) {
            smallBaseValue = idx % 30 === 0
                ? Math.random() * 7000
                : (smallBaseValue + Math.random() * 3000 - 1500);
            baseValue += Math.random() * 1000 - 500;
            return Math.max(
                0,
                Math.round(baseValue + smallBaseValue) + 1000
            );
        }

        var categoryData = [];
        var valueData = [];

        for (var i = 0; i < count; i++) {
            categoryData.push(echarts.format.formatTime('MM-dd', time));
            valueData.push(next(i).toFixed(2));
            time += 1000 * 60 * 60 * 24;
        }

        return {
            categoryData: categoryData,
            valueData: valueData
        };
    }

    function generateData3(count) {
        var baseValue = Math.random() * 70000;
        var time = +new Date(2011, 0, 1);
        var smallBaseValue;

        function next(idx) {
            smallBaseValue = idx % 30 === 0
                ? Math.random() * 7000
                : (smallBaseValue + Math.random() * 6000 - 2500);
            baseValue += Math.random() * 1000 - 500;
            return Math.max(
                0,
                Math.round(baseValue + smallBaseValue) + 1500
            );
        }

        var categoryData = [];
        var valueData = [];

        for (var i = 0; i < count; i++) {
            categoryData.push(echarts.format.formatTime('MM-dd', time));
            valueData.push(next(i).toFixed(2));
            time += 1000 * 60 * 60 * 24;
        }

        return {
            categoryData: categoryData,
            valueData: valueData
        };
    }
    option && myChart.setOption(option);

    $(window).resize(function () {
        myChart.resize();
    })
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

