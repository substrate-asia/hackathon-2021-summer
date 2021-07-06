<script>
import { out_eth, in_eth, top_labels } from '../request/api';
const columns = [
    {
        title: '转账地址',
        dataIndex: '# of Addrs'
    },
    {
        title: '交易数',
        dataIndex: '# Txs'
    },
    {
        title: 'ETH交易总量',
        scopedSlots: { customRender: 'ETH Vol' }
    },
    {
        title: 'ETH转出总量',
        scopedSlots: { customRender: 'Vol Out(ETH)' }
    },
    {
        title: 'ETH转入总量',
        scopedSlots: { customRender: 'Vol In(ETH)' }
    },
    {
        title: 'token总交易数',
        scopedSlots: { customRender: '# of Token Txs' }
    },
    {
        title: '转入token交易数',
        scopedSlots: { customRender: 'Txs In (Tokens)' }
    },
    {
        title: '转出token交易数',
        scopedSlots: { customRender: 'Txs Out (Tokens)' }
    }
];
const dataList = [];

export default {
    props: {
        inputName: ''
    },
    data() {
        return {
            chartPie: null,
            dataList,
            columns,
            exinName: [],
            exinNum: [],
            exoutName: [],
            exoutNum: [],
            list: [],
            list2: [],
            inTotal: 0,
            outTotal: 0
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.drawPieChart('chartPie1');
            this.drawPieChart('chartPie2');
        });
    },
    methods: {
        gettop_labels() {
            top_labels(10, 1).then((res) => {
                this.dataList = eval(res.data);
            });
        },
        getout_eth() {
            out_eth(this.inputName).then((res) => {
                let keyMap = {
                    // id: "value",
                    exchange: 'name',
                    pct: 'value'
                };
                this.exoutName = [];
                for (let m = 0; m < res.data.length; m++) {
                    let obj = res.data[m];
                    // eslint-disable-next-line guard-for-in
                    for (let key in obj) {
                        let newKey = keyMap[key];
                        if (newKey) {
                            obj[newKey] = obj[key];
                            delete obj[key];
                        }
                    }
                    this.exoutName.push(res.data[m].name);
                }
                this.outTotal = 0;
                for (let k = 0; k < res.data.length; k++) {
                    this.outTotal += res.data[k].value;
                }
                this.list = res.data;
                this.drawPieChart('chartPie1');
            });
        },
        getin_eth() {
            in_eth(this.inputName).then((res) => {
                let keyMap = {
                    // id: "value",
                    exchange: 'name',
                    pct: 'value'
                };
                this.exinName = [];
                for (let m = 0; m < res.data.length; m++) {
                    let obj = res.data[m];
                    // eslint-disable-next-line guard-for-in
                    for (let key in obj) {
                        let newKey = keyMap[key];
                        if (newKey) {
                            obj[newKey] = obj[key];
                            delete obj[key];
                        }
                    }
                    this.exinName.push(res.data[m].name);
                }
                this.inTotal = 0;
                for (let k = 0; k < res.data.length; k++) {
                    this.inTotal += res.data[k].value;
                }

                this.list2 = res.data;
                this.drawPieChart('chartPie2');
            });
        },
        drawPieChart(id) {
            if (id === 'chartPie1') {
                this.chartPie = this.$echarts.init(document.getElementById(id), 'macarons');
                let option = {
                    title: {
                        text: 'ETH转出',
                        x: '50px',
                        y: '30px',
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        data: this.exoutName,
                        x: '50px',
                        y: '100px',
                        orient: 'vertical',
                        itemGap: 25,
                        textStyle: {
                            color: '#ffffff',
                            padding: 10,
                            align: 'right'
                        },
                        formatter: function (name) {
                            // 获取legend显示内容
                            let list = option.series[0].data;
                            let total = 0;
                            let tarValue = 0;
                            for (let i = 0, l = list.length; i < l; i++) {
                                total += list[i].value;

                                if (list[i].name === name) {
                                    tarValue = list[i].value;
                                }
                            }

                            let p = ((tarValue / total) * 100).toFixed(2);
                            return name + ' ' + ' ' + p + '%';
                        }
                    },
                    series: [
                        {
                            name: 'ETH转入',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            center: ['70%', '60%'],
                            label: {
                                show: false,
                                position: 'center',
                                normal: {
                                    show: true,
                                    position: 'center',
                                    color: '#4c4a4a',
                                    formatter:
                                        '{total|' + this.outTotal + '}' + '\n\r' + '{active|总量}',
                                    rich: {
                                        total: {
                                            fontSize: 35,
                                            fontFamily: '微软雅黑',
                                            color: '#ffffff'
                                        },
                                        active: {
                                            fontFamily: '微软雅黑',
                                            fontSize: 16,
                                            color: '#ffffff',
                                            lineHeight: 30
                                        }
                                    }
                                },
                                emphasis: {
                                    // 中间文字显示
                                    show: true
                                }
                            },

                            data: this.list
                        }
                    ]
                };
                this.chartPie.setOption(option);
            } else {
                this.chartPie = this.$echarts.init(document.getElementById(id), 'macarons');
                let option = {
                    title: {
                        text: 'ETH转入',
                        x: '50px',
                        y: '30px',
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        data: this.exinName,
                        x: '50px',
                        y: '100px',
                        orient: 'vertical',

                        itemGap: 25,
                        textStyle: {
                            color: '#ffffff',
                            padding: 10,
                            align: 'right'
                        },
                        formatter: function (name) {
                            // 获取legend显示内容
                            let list = option.series[0].data;
                            let total = 0;
                            let tarValue = 0;
                            for (let i = 0, l = list.length; i < l; i++) {
                                total += list[i].value;
                                if (list[i].name === name) {
                                    tarValue = list[i].value;
                                }
                            }
                            let p = ((tarValue / total) * 100).toFixed(2);
                            return name + ' ' + ' ' + p + '%';
                        }
                    },
                    series: [
                        {
                            name: 'ETH转出',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            center: ['70%', '60%'],
                            label: {
                                show: false,
                                position: 'center',
                                normal: {
                                    show: true,
                                    position: 'center',
                                    color: '#4c4a4a',
                                    formatter:
                                        '{total|' + this.inTotal + '}' + '\n\r' + '{active|总量}',
                                    rich: {
                                        total: {
                                            fontSize: 35,
                                            fontFamily: '微软雅黑',
                                            color: '#ffffff'
                                        },
                                        active: {
                                            fontFamily: '微软雅黑',
                                            fontSize: 16,
                                            color: '#ffffff',
                                            lineHeight: 30
                                        }
                                    }
                                },
                                emphasis: {
                                    // 中间文字显示
                                    show: true
                                }
                            },

                            data: this.list2
                        }
                    ]
                };
                this.chartPie.setOption(option);
            }
        },
        rowClassName(record, index) {
            let className1 = 'c1';
            let className2 = 'c2';

            if (index % 2 === 1) {
                return className1;
            } else {
                return className2;
            }
        }
    }
};
</script>


<template>
    <div class="tx">
        <div class="tx-top">
            <div class="left">
                <div id="chartPie1" class="pie-wrap" style="width: 100%; height: 80%"></div>
            </div>
            <div class="right">
                <div id="chartPie2" class="pie-wrap" style="width: 100%; height: 80%"></div>
            </div>
        </div>
        <div class="tx-bottom">
            <a-table
                :columns="columns"
                :data-source="dataList"
                :rowClassName="rowClassName"
                :pagination="false"
                style="width: 95%; margin: 0 auto"
            >
                <div slot="ETH Vol" slot-scope="text, record">
                    <a-progress :percent="text['ETH Vol']" size="small" strokeColor="#52BEDD" />
                </div>
                <div slot="Vol Out(ETH)" slot-scope="text, record">
                    <a-progress
                        :percent="text['Vol Out(ETH)']"
                        size="small"
                        strokeColor="#52BEDD"
                    />
                </div>
                <div slot="Vol In(ETH)" slot-scope="text, record">
                    <a-progress :percent="text['Vol In(ETH)']" size="small" strokeColor="#52BEDD" />
                </div>
                <div slot="# of Token Txs" slot-scope="text, record">
                    <a-progress
                        :percent="text['# of Token Txs']"
                        size="small"
                        strokeColor="#52BEDD"
                    />
                </div>
                <div slot="Txs Out (Tokens)" slot-scope="text, record">
                    <a-progress
                        :percent="text['Txs Out (Tokens)']"
                        size="small"
                        strokeColor="#52BEDD"
                    />
                </div>
                <div slot="Txs In (Tokens)" slot-scope="text, record">
                    <a-progress
                        :percent="text['Txs In (Tokens)']"
                        size="small"
                        strokeColor="#52BEDD"
                    />
                </div>
            </a-table>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.tx {
    width: 1700px;
    height: 100%;
    margin: 0 auto;
    &-top {
        width: 1700px;
        display: flex;
        justify-content: space-between;
        .left {
            width: 49%;

            height: 400px;
            background-color: #001a2c;
        }
        .right {
            width: 49%;

            height: 400px;
            background-color: #001a2c;
        }
    }
    &-bottom {
        width: 100%;
        height: 500px;
        background-color: #001a2c;
        margin-top: 20px;
        padding-top: 20px;
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
