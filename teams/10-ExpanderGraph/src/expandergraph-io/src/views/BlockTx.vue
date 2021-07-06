
<script>
import { top_exchanges, top_transactions, top_balances } from '../request/api';

const columns1 = [
    {
        title: '名称',
        dataIndex: 'exchange'
    },
    {
        title: '变化量',
        dataIndex: 'change'
    },
    {
        title: '余额',
        dataIndex: 'balance'

        // scopedSlots: { customRender: 'balance' }
    },
    {
        title: '周次交易时间',
        dataIndex: 'first in'

        // scopedSlots: { customRender: 'first in' }
    }
];
const columns2 = [
    {
        title: '转账地址',
        dataIndex: 'from'
    },
    {
        title: '接收地址',
        dataIndex: 'to'
    },
    {
        title: '交易量',
        dataIndex: 'volume'

        // scopedSlots: { customRender: 'balance' }
    },
    {
        title: '交易时间',
        // dataIndex: 'time ago'

        scopedSlots: { customRender: 'time ago' }
    }
];
const columns3 = [
    {
        title: '持仓地址',
        dataIndex: 'address'
    },
    {
        title: '持仓量',
        dataIndex: 'balance'
    },
    {
        title: '持仓比例',
        dataIndex: 'pct_ownership'

        // scopedSlots: { customRender: 'balance' }
    },
    {
        title: '7天持仓变化',
        dataIndex: 'change 7d'

        // scopedSlots: { customRender: 'time ago' }
    },
    {
        title: '30天持仓变化',
        dataIndex: 'change 30d'

        // scopedSlots: { customRender: 'time ago' }
    },
    {
        title: '接收总量',
        dataIndex: 'received'

        // scopedSlots: { customRender: 'time ago' }
    },
    {
        title: '发送总量',
        dataIndex: 'sent'

        // scopedSlots: { customRender: 'time ago' }
    },
    {
        title: '首次交易时间',
        // dataIndex: 'first in'

        scopedSlots: { customRender: 'first in' }
    }
];
export default {
    props: {
        inputName: ''
    },
    data() {
        return {
            dataList1: [],
            dataList2: [],
            dataList3: [],

            columns1,
            columns2,
            columns3
        };
    },
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
        gettop_exchanges() {
            console.log(9999);
            top_exchanges(this.inputName).then((res) => {
                this.dataList1 = [];
                this.dataList1 = res.data;
                // console.log(this.dataList1);
            });
            top_transactions(this.inputName).then((res) => {
                this.dataList2 = [];
                this.dataList2 = res.data;
            });
            top_balances(this.inputName).then((res) => {
                this.dataList3 = [];
                this.dataList3 = res.data;
            });
        }
    }
};
</script>

<template>
    <div class="block">
        <div class="top">
            <div style="margin-left: 40px; margin-bottom: 20px">最近7天余额交易</div>
            <a-table
                :columns="columns1"
                :data-source="dataList1"
                :rowClassName="rowClassName"
                :pagination="false"
                style="width: 95%; margin: 0 auto"
            >
            </a-table>
        </div>
        <div class="mid">
            <div style="margin-left: 40px; margin-bottom: 20px">最近7天大额交易</div>

            <a-table
                :columns="columns2"
                :data-source="dataList2"
                :rowClassName="rowClassName"
                :pagination="false"
                style="width: 95%; margin: 0 auto"
            >
                <!-- <div></div> -->
                <div slot="time ago" slot-scope="text, record">{{ text['time ago'] }} time ago</div>
            </a-table>
        </div>

        <div class="bottom">
            <div style="margin-left: 40px; margin-bottom: 20px">最近7天大额交易</div>

            <a-table
                :columns="columns3"
                :data-source="dataList3"
                :rowClassName="rowClassName"
                :pagination="false"
                style="width: 95%; margin: 0 auto"
            >
                <!-- <div></div> -->
                <div slot="first in'" slot-scope="text, record">{{ text['first in'] }} d ago</div>
            </a-table>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.block {
    min-height: 100%;
    background-color: #001420;
    .top {
        width: 80%;
        height: 400px;
        background-color: #001a2c;
        margin: 0 auto;
        padding-top: 20px;
    }
    .mid {
        width: 80%;
        height: 400px;
        background-color: #001a2c;
        margin: 0 auto;
        padding-top: 20px;
        margin-top: 20px;
    }
    .bottom {
        width: 80%;
        height: 400px;
        background-color: #001a2c;
        margin: 0 auto;
        padding-top: 20px;
        margin-top: 20px;
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
