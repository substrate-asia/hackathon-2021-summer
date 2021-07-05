<script>
import { exchange_supply_ratio, txs_num, volume_on_exchanges, top_exchanges } from '../request/api';
const columns = [
    {
        title: '交易所',
        dataIndex: 'exchange'
    },
    {
        title: '余额',
        dataIndex: 'balance'
    },
    {
        title: '变化量',
        dataIndex: 'change'
    },
    {
        title: '首次交易时间',

        scopedSlots: { customRender: 'first in' }
    }
];
const dataList = [];
export default {
    props: {
        inputName: ''
    },
    data() {
        return {
            columns,
            dataList,
            ratio: 0
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.drawLineChart('chartLine1');
            this.drawLineChart('chartLine2');
        });
    },
    methods: {
        gettop_exchanges() {
            top_exchanges(this.inputName).then((res) => {
                this.dataList = eval(res.data);
            });
        },
        getvolume_on_exchanges() {
            volume_on_exchanges(this.inputName).then((res) => {
                console.log(res.data);
            });
        },
        gettxs_num() {
            txs_num(this.inputName).then((res) => {
                // console.log(res);
            });
        },
        getexchange_supply_ratio() {
            exchange_supply_ratio(this.inputName).then((res) => {
                this.ratio = res.data.ratio * 100;
            });
        },
        rowClassName(record, index) {
            let className1 = 'c1';
            let className2 = 'c2';

            if (index % 2 === 1) {
                return className1;
            } else {
                return className2;
            }
        },
        drawLineChart(id) {
            let myChart = this.$echarts.init(document.getElementById(id));

            if (id === 'chartLine1') {
                // 基于准备好的dom，初始化echarts实例
                let option = {
                    title: {
                        // text: '交易数：交易所和交易人',
                        textStyle: {
                            fontWeight: 'normal',
                            color: '#A3FFFC' // 标题颜色
                        }
                    },

                    color: ['#5A77F8', '#3E9397'],

                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['去中心化交易人员', '交易所'],
                        textStyle: {
                            color: 'white'
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisTick: {
                                show: false
                            },

                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#0B2F48' // y轴分割线颜色
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '去中心化交易人员',
                            type: 'line',
                            stack: '总量',
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '交易所',
                            type: 'line',
                            stack: '总量',
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表
                myChart.setOption(option);
            } else {
                // 基于准备好的dom，初始化echarts实例
                let option = {
                    title: {
                        // text: '各交易所交易量（最近60天）',
                        textStyle: {
                            fontWeight: 'normal',
                            color: '#A3FFFC' // 标题颜色
                        }
                    },

                    color: ['#5A77F8', '#3E9397', '#FF4F3A', '#1C55C8', '#FD323A'],

                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['Uniswap', 'MXC', 'Binance', 'Other', 'Gate.io'],
                        textStyle: {
                            color: 'white'
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisTick: {
                                show: false
                            },

                            data: ['1', '2', '3', '4']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#0B2F48' // y轴分割线颜色
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: 'Uniswap',
                            type: 'line',
                            stack: '总量',
                            data: [3210, 3322, 3011, 3324, 1110]
                        },
                        {
                            name: 'MXC',
                            type: 'line',
                            stack: '总量',
                            data: [121, 2121, 9011, 1330, 1320]
                        },
                        {
                            name: 'Gate.io',
                            type: 'line',
                            stack: '总量',
                            data: [820, 932, 9021, 934, 12970]
                        },

                        {
                            name: 'Binance',
                            type: 'line',
                            stack: '总量',
                            data: [820, 9132, 901, 1290, 11320]
                        },
                        {
                            name: 'Other',
                            type: 'line',
                            stack: '总量',
                            data: [820, 932, 1290, 1330, 12320]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表
                myChart.setOption(option);
            }
        }
    }
};
</script>

<template>
    <div class="info">
        <div class="top">
            <div class="left">
                <div>流通比</div>
                <div>{{ ratio }}%</div>
            </div>
            <div class="right">
                <div style="margin-top: 10px; margin-left: 10px">交易数：交易所和交易人</div>
                <div id="chartLine1" class="line-wrap" style="width: 100%; height: 330px"></div>
            </div>
        </div>
        <div class="bottom">
            <div class="left">
                <div style="margin-top: 10px; margin-left: 10px">各交易所交易量（最近60天）</div>
                <div id="chartLine2" class="line-wrap" style="width: 100%; height: 450px"></div>
            </div>
            <div class="right">
                <a-table
                    :columns="columns"
                    :data-source="dataList"
                    :rowClassName="rowClassName"
                    :pagination="false"
                    style="width: 95%; margin: 0 auto; margin-top: 20px"
                >
                    <div slot="first in" slot-scope="text, record">
                        {{ text['first in'] }} min ago
                    </div>
                </a-table>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.info {
    .top {
        width: 97%;
        height: 350px;
        display: flex;
        margin: 0 auto;

        justify-content: space-between;
        .left {
            width: 38%;
            height: 340px;
            background-color: #001a2c;
            div {
                text-align: center;
                margin-top: 10px;
            }
            div:first-child {
                text-align: center;
                margin-top: 150px;
            }
        }
        .right {
            width: 60%;
            height: 340px;
            background-color: #001a2c;
        }
    }
    .bottom {
        width: 97%;
        height: 450px;
        margin: 0 auto;

        display: flex;
        justify-content: space-between;
        .left,
        .right {
            width: 49%;
            height: 450px;
            background-color: #001a2c;
        }
    }
    /deep/.ant-table-thead > tr > th {
        color: #86929d;
        background: #00263c !important;
    }
    /deep/.ant-table-row:hover > td {
        background: transparent !important;
    }
    /deep/.c1 {
        background-color: #001a2c;
        color: white;
    }
    /deep/.c2 {
        background-color: #00263c;
        color: white;
    }
    /deep/.ant-progress-text {
        color: white;
    }
}
</style>

