<template>
  <main-content class="wallet">
    <navbar />
    <main-content-body>
      <div v-if="address" class="wallet__header">
        <div class="title">我的账号</div>
        <div class="card">
          <wallet-card
            :address="address"
            @change="balanceChange"
            @transfer="transferClick"
          />
        </div>
      </div>

      <div class="wallet__header">
        <div class="title">转账记录</div>
        <div class="card">
          <el-table
            :data="events"
            style="width: 100%"
            height="400"
          >
            <el-table-column
              label="地址"
              prop="accountId1"
            />
            <el-table-column
              label="地址"
              prop="accountId2"
            />
            <el-table-column
              label="金额"
              prop="balance"
              width="120"
            />
          </el-table>
        </div>
      </div>

      <transfer-dialog
        v-if="transferDialogVisible"
        :address="address"
        :balance="balance"
        :visible.sync="transferDialogVisible"
      />
    </main-content-body>
  </main-content>
</template>

<script>
import Navbar from '@/layout/components/Navbar'
import { MainContent, MainContentBody } from '@/components/MainContent'
import WalletCard from '@/components/WalletCard'
import TransferDialog from './components/TransferDialog'

import { mapGetters } from 'vuex'
// import { getTypeDef } from '@polkadot/types'
// import { encodeTypeDef } from '@polkadot/types/create'
// import { isUndefined } from '@polkadot/util'

export default {
  // 钱包
  name: 'Wallet',

  components: {
    Navbar,
    MainContent,
    MainContentBody,
    WalletCard,
    TransferDialog
  },

  props: {},

  data() {
    return {
      unsub: null,
      balance: 0,
      transferDialogVisible: false,
      history: []
    }
  },

  computed: {
    ...mapGetters([
      'apiState',
      'polkadot',
      'pair',
      'events'
    ]),

    address() {
      return this.pair ? this.pair.address : ''
    }
  },

  watch: {
    apiState: {
      handler() {
        if (this.apiState === 'READY') {
          this.queryHistory()
        }
      },
      immediate: true
    }
    // events: {
    //   handler() {
    //     const history = []
    //     for (let index = 0; index < this.events.length; index++) {
    //       const { blockHash, blockNumber, indexes, record } = this.events[index]
    //       console.log(blockHash, blockNumber, indexes, record)
    //       if (record.event && record.event.method === 'Transfer') {
    //         // const params = record.event.typeDef.map(({ type }) => ({ type: getTypeDef(type) }))
    //         const values = record.event.data.map((value) => ({ isValid: true, value }))
    //         // for (let index = 0; index < params.length; index++) {
    //         //   const { name, type } = params[index]
    //         //   console.log('laebl---', isUndefined(name)
    //         //     ? encodeTypeDef(type)
    //         //     : `${name}: ${encodeTypeDef(type)}`)
    //         // }

    //         // for (let index = 0; index < values.length; index++) {
    //         //   const { value } = values[index]
    //         //   console.log(value.toString())
    //         // }
    //         if (values && values.length >= 3) {
    //           history.push({
    //             accountId1: values[0].value.toString(),
    //             accountId2: values[1].value.toString(),
    //             balance: values[2].value.toString()
    //           })
    //         }
    //       }
    //     }
    //     this.history = history
    //   },
    //   immediate: true
    // }
  },

  created() {
    if (!this.address) {
      this.$router.push('/keys/index')
    }
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    /**
     * 查询历史
     */
    queryHistory() {
      this.$store.dispatch('events/query')
    },

    /**
     * 转账
     */
    transferClick(balance) {
      this.balance = balance
      console.log(this.balance)
      this.transferDialogVisible = true
    },

    balanceChange(balance) {
      this.balance = balance
      console.log('balanceChange---', this.balance)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content-body {
  ::v-deep .content-wrap {
    padding: 15px;
  }
}

.wallet {
  .title {
    font-size: 16px;
  }

  .card {
    margin-top: 10px;
  }

  .wallet__header + .wallet__header {
    margin-top: 40px;
  }
}
</style>
