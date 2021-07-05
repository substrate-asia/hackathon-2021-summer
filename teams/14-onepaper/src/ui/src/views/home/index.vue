<template>
  <main-content class="home">
    <navbar />
    <div class="home__body">
      <flexbox class="top-section">
        <flexbox-item class="is-left">
          <span :style="{ color: isContent ? '#1749C7' : '#F11C47' }">{{ isContent ? '已连接' : '未连接' }}</span>
        </flexbox-item>
        <flexbox-item>
          <div class="s-des">名称: <span>{{ topData.chainName }}</span></div>
          <div class="s-des">总发行量: <span>{{ topData.totalIssuance }}</span></div>
          <div class="s-des">当前: <span>{{ topData.bestNumber }}</span></div>
          <div class="s-des">结块: <span>{{ topData.bestNumberFinalized }}</span></div>
        </flexbox-item>
      </flexbox>
      <div class="section">
        <div class="section__content">
          <div class="section__title">最新区块</div>
          <el-table
            :data="tableData"
            :row-key="rowKey"
            style="width: 100%"
          >
            <el-table-column
              prop="number"
              width="100"
            >
              <template slot-scope="{ row }">
                {{ getFormatNumber(row.number) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="hash"
            >
              <template slot-scope="{ row }">
                {{ row.hash.toHex() }}
              </template>
            </el-table-column>
            <el-table-column
              prop="author"
              width="120"
            >
              <template slot-scope="{ row }">
                {{ row.authorFromMapping ? row.authorFromMapping : row.author }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </main-content>
</template>

<script>
import Navbar from '@/layout/components/Navbar'
import { MainContent } from '@/components/MainContent'

import { mapState, mapGetters } from 'vuex'
import { formatNumber } from '@polkadot/util'
import { valueOfUnit } from '@/utils/index'

export default {
  // 主页
  name: 'Home',

  components: {
    Navbar,
    MainContent
  },

  props: {},

  data() {
    return {
      tableData: [],
      intervalId: null,
      topData: {
        chainName: '',
        totalIssuance: 0,
        bestNumber: 0,
        bestNumberFinalized: 0
      }
    }
  },

  computed: {
    ...mapGetters([
      'apiState',
      'polkadot'
    ]),
    isContent() {
      return this.apiState === 'READY'
    },
    ...mapState({
      lastHeaders: state => state.lockAuthors.lastHeaders
    })
  },

  watch: {
    apiState: {
      handler() {
        if (this.apiState === 'READY') {
          this.getChainData()
          this.clearBlockInterval()
          this.intervalId = setInterval(() => {
            this.updateBlockData()
          }, 1000)
        }
      },
      immediate: true
    },

    lastHeaders: {
      handler() {
        this.tableData = this.lastHeaders.filter((header) => !!header)
      },
      immediate: true
    }
  },

  created() {
  },

  mounted() {},

  beforeDestroy() {
    this.clearBlockInterval()
  },

  methods: {
    async getChainData() {
      const { api } = this.polkadot
      const [chainName, totalIssuance] = await Promise.all([
        api.rpc.system.name(),
        api.query.balances.totalIssuance()
      ])
      const { valueU } = valueOfUnit(totalIssuance)
      this.topData.chainName = chainName.toString()
      this.topData.totalIssuance = valueU
    },

    async updateBlockData() {
      const { api } = this.polkadot
      const [bestNumber, bestNumberFinalized] = await Promise.all([
        api.derive.chain.bestNumber(),
        api.derive.chain.bestNumberFinalized()
      ])

      this.topData.bestNumber = bestNumber.toString()
      this.topData.bestNumberFinalized = bestNumberFinalized.toString()
    },

    getFormatNumber(number) {
      return formatNumber(number)
    },

    rowKey(row) {
      return row.number.toString()
    },

    clearBlockInterval() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.home {
  &__body {
    height: calc(100% - 80px);
    overflow-y: auto;
  }

  .top-section {
    padding: 15px 15px 0;
    .vux-flexbox-item {
      border-radius: $wk-border-radius-base;
      background-color: white;
      overflow: hidden;
      padding: 10px;
      height: 110px;
    }

    .vux-flexbox-item.is-left {
      text-align: center;
      line-height: 90px;
      font-size: 30px;
    }

    .s-des {
      span {
        color: #999;
      }
    }
    .s-des + .s-des {
      margin-top: 8px;
    }
  }

  .section {
    padding: 15px;
    &__title {
      padding: 15px 15px 10px;
      font-size: 16px;
    }
    &__content {
      background-color: white;
      border-radius: $wk-border-radius-base;
      overflow: hidden;
      padding-bottom: $wk-border-radius-base;
    }
  }

  ::v-deep .el-table {
    thead {
      display: none;
    }
  }
}
</style>
