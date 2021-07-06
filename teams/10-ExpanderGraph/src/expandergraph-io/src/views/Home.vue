<script>
import Address from './Address.vue';
import TX from './Txdetails.vue';
import TokenInfo from './TokenInfo.vue';
import HoldInfo from './HoldInfo.vue';
import Block from './BlockTx.vue';

export default {
    components: {
        Block,
        Address,
        TX,
        TokenInfo,
        HoldInfo
    },
    data() {
        return {
            show: true,
            value: '',
            key: ''
        };
    },
    created() {},

    methods: {
        onSearch(value) {
            if (value.length >= 40) {
                this.show = true;
                this.key = '1';
            } else {
                this.show = false;
                this.key = '3';
            }
            if (this.key === '3') {
                this.$nextTick(() => {
                    this.$refs.tokeninfo.gettop_exchanges();

                    this.$refs.tokeninfo.getexchange_supply_ratio();
                    this.$refs.tokeninfo.gettxs_num();
                    this.$refs.tokeninfo.getvolume_on_exchanges();
                });
            } else if (this.key === '5') {
                this.$nextTick(() => {
                    this.$refs.holdinfo.getseniority_distribution();
                    this.$refs.holdinfo.getnum_unique_addresses();
                });
            } else if (this.key === '4') {
                this.$nextTick(() => {
                    this.$refs.block.gettop_exchanges();
                });
            } else if (this.key === '1') {
                this.$refs.address.getLabels();
                this.$refs.address.geteth_balance();
                this.$refs.address.getdaily_activities();
                this.$refs.address.getday_activities();
                this.$refs.address.gethour_activities();
                this.$refs.address.gettoken_balances();
            } else if (this.key === '2') {
                this.$nextTick(() => {
                    this.$refs.tx.getin_eth();
                    this.$refs.tx.getout_eth();
                    this.$refs.tx.gettop_labels();
                });
            }
        },
        callback(key) {
            this.key = key;

            if (this.key === '3') {
                this.$nextTick(() => {
                    this.$refs.tokeninfo.gettop_exchanges();

                    this.$refs.tokeninfo.getexchange_supply_ratio();
                    this.$refs.tokeninfo.gettxs_num();
                    this.$refs.tokeninfo.getvolume_on_exchanges();
                });
            } else if (this.key === '5') {
                this.$nextTick(() => {
                    this.$refs.holdinfo.getseniority_distribution();
                    this.$refs.holdinfo.getnum_unique_addresses();
                });
            } else if (this.key === '4') {
                this.$nextTick(() => {
                    this.$refs.block.gettop_exchanges();
                });
            } else if (this.key === '1') {
                this.$refs.address.getLabels();
                this.$refs.address.geteth_balance();
                this.$refs.address.getdaily_activities();
                this.$refs.address.getday_activities();
                this.$refs.address.gethour_activities();
                this.$refs.address.gettoken_balances();
            } else if (this.key === '2') {
                this.$nextTick(() => {
                    this.$refs.tx.getin_eth();
                    this.$refs.tx.getout_eth();
                    this.$refs.tx.gettop_labels();
                });
            }
        }
    }
};
</script>


<template>
    <div class="home">
        <div class="home-header">
            <img src="../assets/img/LOGO.png" alt="" />
        </div>
        <div class="home-query">
            <div class="left"></div>
            <div class="right">
                <a-input-search
                    v-model="value"
                    placeholder="请输入地址/代币名称进行搜索"
                    enter-button
                    style="width: 660px"
                    @search="onSearch"
                />
                <!-- <div>帮助中心</div> -->
                <!-- <div>我的钱包</div> -->
                <!-- <div>退出登录</div> -->
            </div>
        </div>
        <div v-if="show" class="home-tab">
            <div class="right">
                <a-tabs default-active-key="1" style="color: white; width: 100%" @change="callback">
                    <a-tab-pane key="1" tab="地址概览">
                        <Address ref="address" :inputName="value"></Address
                    ></a-tab-pane>

                    <a-tab-pane key="2" tab="交易详情">
                        <TX ref="tx" :inputName="value"></TX
                    ></a-tab-pane>
                </a-tabs>
            </div>
        </div>
        <div v-if="!show" class="home-tab">
            <!-- <div class="left"></div> -->
            <div class="right">
                <a-tabs default-active-key="3" style="color: white; width: 100%" @change="callback">
                    <a-tab-pane key="3" tab="基本信息">
                        <TokenInfo ref="tokeninfo" :inputName="value"></TokenInfo
                    ></a-tab-pane>
                    <a-tab-pane key="4" tab="大额交易">
                        <Block ref="block" :inputName="value"></Block
                    ></a-tab-pane>
                    <a-tab-pane key="5" tab="市场持仓">
                        <HoldInfo ref="holdinfo" :inputName="value"></HoldInfo
                    ></a-tab-pane>
                </a-tabs>
            </div>
        </div>
        <div class="home-content">
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.home {
    background-color: #001421;
    height: 1200px;
    width: 100%;
    color: white;
    &-header {
        height: 60px;
        border-bottom: 1px solid #133752;
        display: flex;
        align-items: center;
        padding-left: 20px;
        img {
            width: 160px;
            height: 40px;
        }
    }
    &-query {
        height: 60px;
        border-bottom: 1px solid #133752;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            width: 80px;
            height: 100%;
            color: #477ee6;
            text-align: center;
            line-height: 60px;
        }
        .right {
            width: 1000px;
            height: 40px;
            align-items: center;
            justify-content: space-around;
            display: flex;
            /deep/.ant-input-group .ant-input {
                border-bottom-left-radius: 50px;
                border-top-left-radius: 50px;
            }
            /deep/.ant-input-group-addon .ant-input-search-button {
                border-top-right-radius: 100px;
                border-bottom-right-radius: 100px;
                background-color: rgb(66, 137, 242);
            }
            /deep/.ant-input-group-addon {
                background-color: transparent;
            }
        }
    }
    &-tab {
        height: 60px;
        border-bottom: 1px solid #133752;
        display: flex;
        .left {
            width: 10%;

            height: 100%;
            background-color: white;
            border-right: 1px solid #133752;
        }
        .right {
            width: 100%;
            height: 100%;
            /deep/ .ant-tabs-nav-animated {
                height: 60px;
            }
            /deep/ .ant-tabs-bar {
                border-bottom: 0px;
            }
        }
    }
    &-content {
        min-width: 100%;
        // height: 100%;
        // background-color: red;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .left {
            width: 500px;
            height: 700px;

            // background-color: red;
        }
        .right {
            // width: 100%;
            // background-color: red;
            height: 700px;
        }
    }
}
</style>
