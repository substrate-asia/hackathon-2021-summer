<script>
import { seniority_distribution, num_unique_addresses } from '../request/api';
export default {
    props: {
        inputName: ''
    },
    data() {
        return {
            token: [],
            address: [],
            date: [],
            num: []
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.drawLine('myChart1');
            this.drawLine('myChart2');
        });
    },
    methods: {
        getseniority_distribution() {
            seniority_distribution(this.inputName).then((res) => {
                this.token = [];
                this.address = [];
                this.token.push(res.data['< 7 days'].tokens);
                this.address.push(res.data['< 7 days'].addresses);

                this.token.push(res.data['7-30 days'].tokens);
                this.address.push(res.data['7-30 days'].addresses);
                this.drawLine('myChart1');
            });
        },
        getnum_unique_addresses() {
            num_unique_addresses(this.inputName).then((res) => {
                this.date = [];
                this.num = [];
                for (let p = 0; p < res.data.length; p++) {
                    this.date.push(res.data[p].date);
                    this.num.push(res.data[p].addresses);
                }
                console.log(this.num);
                this.drawLine('myChart2');
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
                        x: '50px',
                        textStyle: {
                            color: 'white',
                            fontSize: 12
                        }
                    },
                    legend: {
                        data: ['流通数量', '交易所'],
                        x: '50px',
                        y: '25px',
                        textStyle: {
                            color: 'white'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: ['< 7 days', '7-30 days']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '流通数量',
                            type: 'bar',
                            barWidth: 100,
                            barGap: '0%',
                            itemStyle: {
                                normal: {
                                    color: '#5A77F8'
                                }
                            },
                            data: this.token
                        },
                        {
                            name: '交易所',
                            type: 'bar',
                            barWidth: 100,
                            itemStyle: {
                                normal: {
                                    color: '#4DD2C9'
                                }
                            },
                            data: this.address
                        }
                    ]
                };
                // 防止越界，重绘canvas
                window.onresize = myChart.resize;
                myChart.setOption(option); // 设置option
            } else {
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },

                    calculable: true,
                    title: {
                        text: '持仓地址变化',
                        x: '50px',
                        textStyle: {
                            color: 'white',
                            fontSize: 12
                        }
                    },
                    xAxis: [
                        {
                            // axisLabel: {
                            //     rotate: 30,
                            //     interval: 0
                            // },
                            axisLine: {
                                lineStyle: {
                                    color: '#CECECE'
                                }
                            },
                            type: 'category',
                            boundaryGap: false,
                            data: this.date
                            // data: (function () {
                            //     let list = [];
                            //     for (let i = 10; i <= 18; i++) {
                            //         if (i <= 12) {
                            //             list.push('2016-' + i + '-01');
                            //         } else {
                            //             list.push('2017-' + (i - 12) + '-01');
                            //         }
                            //     }
                            //     return list;
                            // })()
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#CECECE'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            symbol: 'none',
                            smooth: 0.2,
                            color: ['#F6903D'],
                            data: this.address,
                            areaStyle: {
                                normal: {
                                    color: '#95562A'
                                }
                            }
                        }
                    ]
                };
                window.onresize = myChart.resize;
                myChart.setOption(option); // 设置option
            }
        }
    }
};
</script>


<template>
    <div class="hold">
        <div class="left">
            <div id="myChart1" style="width: 800px; height: 100%; margin-top: 20px"></div>
        </div>
        <div class="right">
            <div id="myChart2" style="width: 800px; height: 100%; margin-top: 20px"></div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.hold {
    width: 1650px;
    height: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left,
    .right {
        width: 800px;
        height: 100%;
        background-color: #001a2c;
    }
}
</style>

