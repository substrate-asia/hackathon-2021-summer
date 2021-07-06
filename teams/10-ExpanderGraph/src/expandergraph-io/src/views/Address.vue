<script>
const columns = [
    {
        title: '名称',
        dataIndex: 'token'
    },
    {
        title: '持仓量',
        dataIndex: 'balance'
    }
];
const dataList = [];
import {
    labels,
    eth_balance,
    daily_activities,
    day_activities,
    hour_activities,
    token_balances
} from '../request/api';
export default {
    props: {
        inputName: ''
    },

    data() {
        return {
            labels: [],
            eth_balance: '',
            totalTx: [],
            txDate: [],
            txNum: [],
            dayTx: [],
            houerTx: [],
            columns,
            dataList
        };
    },
    mounted() {},
    methods: {
        rowClassName(record, index) {
            let className1 = 'c1';
            let className2 = 'c2';

            if (index % 2 === 1) {
                return className1;
            } else {
                return className2;
            }
        },
        gettoken_balances() {
            token_balances(this.inputName).then((res) => {
                this.dataList = res.data;
            });
        },
        gethour_activities() {
            hour_activities(this.inputName).then((res) => {
                this.houerTx = res.data;
                this.drawLine('myChart3');
            });
        },
        getday_activities() {
            day_activities(this.inputName).then((res) => {
                this.dayTx = [];
                this.dayTx = res.data;
                this.drawLine('myChart2');
            });
        },
        getdaily_activities() {
            daily_activities(this.inputName).then((res) => {
                console.log(res);
                this.totalTx = eval(res.data);
                this.txDate = [];
                this.txNum = [];
                for (let m = 0; m < this.totalTx.length; m++) {
                    this.txDate.push(this.totalTx[m].date);
                    this.txNum.push(this.totalTx[m].transactions);
                    console.log(8888888);
                    this.drawLine('myChart1');
                }
            });
        },
        getLabels() {
            labels(this.inputName).then((res) => {
                if (res.data) {
                    this.labels = res.data;
                }
            });
        },
        geteth_balance() {
            eth_balance(this.inputName).then((res) => {
                this.eth_balance = res.data['balance'];
            });
        },
        drawLine(id) {
            let myChart = this.$echarts.init(document.getElementById(id));
            // 获取容器元素
            if (id === 'myChart1') {
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    title: {
                        text: '总交易数统计',
                        x: '30px',
                        textStyle: {
                            color: 'white',
                            fontSize: 12
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: this.txDate
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: this.txNum,
                            type: 'bar',
                            barWidth: 30,
                            itemStyle: {
                                normal: {
                                    color: '#4E88F7'
                                }
                            }
                        }
                    ]
                };
                // 防止越界，重绘canvas
                window.onresize = myChart.resize;
                myChart.setOption(option); // 设置option
            } else if (id === 'myChart2') {
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    title: {
                        text: '按天统计交易数',
                        x: '30px',
                        textStyle: {
                            color: 'white',
                            fontSize: 12
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: this.dayTx,
                            type: 'bar',
                            barWidth: 30,
                            itemStyle: {
                                normal: {
                                    color: '#00ECF4'
                                }
                            }
                        }
                    ]
                };
                // 防止越界，重绘canvas
                window.onresize = myChart.resize;
                myChart.setOption(option); // 设置option
            } else if (id === 'myChart3') {
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    title: {
                        text: '按时统计交易数',
                        x: '30px',
                        textStyle: {
                            color: 'white',
                            fontSize: 12
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                            '14',
                            '15',
                            '16',
                            '17',
                            '18',
                            '19',
                            '20',
                            '21',
                            '22',
                            '23'
                        ]
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: this.houerTx,
                            type: 'bar',
                            barWidth: 5,
                            itemStyle: {
                                normal: {
                                    color: '#FC8E4A'
                                }
                            }
                        }
                    ]
                };
                // 防止越界，重绘canvas
                window.onresize = myChart.resize;
                myChart.setOption(option); // 设置option
            }
        }
    }
};
</script>

<template>
    <div class="adress">
        <div class="left">
            <div class="top">
                <div style="font-size: 20px; margin-left: 20px; margin-top: 20px">地址标签</div>
                <div style="font-size: 30px; margin-left: 20px; margin-top: 20px; width: 50%">
                    NFT Collector
                </div>
                <div v-if="labels.length" style="margin-left: 20px; margin-top: 20px">
                    {{ labels.toString() }}
                </div>
            </div>

            <div class="mid">
                <div style="font-size: 20px; margin-left: 20px; margin-top: 20px">余额</div>
                <div style="margin-top: 20px; margin-left: 20px">0.1 ETH</div>
            </div>
            <div class="bottom">
                <div style="margin-top: 20px; margin-left: 20px">名资产持仓量</div>
                <a-table
                    :columns="columns"
                    :data-source="dataList"
                    :rowClassName="rowClassName"
                    :pagination="false"
                    style="width: 95%; margin: 0 auto; margin-top: 10px"
                >
                </a-table>
            </div>
        </div>
        <div class="right">
            <div class="top">
                <div
                    id="myChart1"
                    :style="{ width: '100%', height: '90%', marginTop: '40px' }"
                ></div>
            </div>
            <div class="bottom">
                <div class="left">
                    <div
                        id="myChart2"
                        :style="{ width: '100%', height: '90%', marginTop: '10px' }"
                    ></div>
                </div>
                <div class="right">
                    <div
                        id="myChart3"
                        :style="{ width: '100%', height: '90%', marginTop: '10px' }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.adress {
    width: 100%;
    height: 900px;
    display: flex;
    justify-content: space-between;

    .left {
        width: 50%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        .top {
            width: 90%;

            height: 290px;
            background-color: #001a2c;
        }
        .mid {
            width: 90%;

            height: 160px;
            background-color: #001a2c;
        }
        .bottom {
            width: 90%;

            height: 350px;
            background-color: #001a2c;
        }
    }
    .right {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .top {
            width: 95%;
            height: 440px;
            background-color: #001a2c;
        }
        .bottom {
            width: 95%;
            height: 400px;
            display: flex;
            justify-content: space-between;
            .left,
            .right {
                width: 50%;
                height: 100%;
                background-color: #001a2c;
            }
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

