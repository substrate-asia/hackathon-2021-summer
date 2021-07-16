<template>
  <div class="wallet-card">
    <span class="wallet-card__title">paper </span><br>
    <div class="wallet-card__balance">
      <span class="des">余额</span><br>
      <span>{{ balance }}</span>
    </div>
    <div class="wallet-card__type">
      <div class="type">
        <span class="des-a50">类型</span><br>
        <span class="value-a80" style="min-width: 46px;">
          <template v-if="apiState === 'READY'">{{ getCryptoType() }}</template>
          <template v-else>--</template>
        </span>
      </div>
      <div class="type">
        <span class="des-a50">标签</span><br>
        <span class="value-a80">个人</span>
      </div>
      <!-- <div>
        <span>交易</span><br>
      <span>2000</span>
      </div> -->
    </div>
    <div class="wallet-card__address value-a80">{{ address || '--' }}</div>
    <div class="wallet-card__handle">
      <span @click="transfer">我要转账 <i class="el-icon-arrow-right" /></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CryptoType } from '@/utils'

export default {
  // 钱包卡
  name: 'WalletCard',

  components: {},

  props: {
    // eslint-disable-next-line vue/require-default-prop
    address: String
  },

  data() {
    return {
      unsub: null,
      balance: 0
    }
  },

  computed: {
    ...mapGetters([
      'apiState',
      'polkadot'
    ])
  },

  watch: {
    apiState: {
      handler() {
        if (this.apiState === 'READY') {
          this.queryMoney()
        }
      },
      immediate: true
    }
  },

  created() {},

  mounted() {},

  beforeDestroy() {},

  methods: {
    async queryMoney() {
      if (this.unsub) {
        this.unsub()
        this.unsub = null
      }
      const { api } = this.polkadot
      // console.log(api, this.apiState, this.address)
      const unsub = await api.query.system.account(this.address, ({ nonce, data: balance }) => {
        // const arr = balance.free.toHuman().split(' ')
        this.balance = balance.free.toHuman()
        this.$emit('change', this.balance)
      })
      this.unsub = unsub
    },

    /**
     * 转账
     */
    transfer() {
      this.$emit('transfer', this.balance)
    },

    getCryptoType() {
      return CryptoType(this.address)
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet-card {
  background: url("./bg.png") center center;
  background-size: cover;
  width: 340px;
  height: 214px;
  border-radius: 8px;
  overflow: hidden;
  color: #ffffff;

  padding: 10px 20px;

  span {
    display:inline-block;
  }

  .des {
    font-size: 12px;
    transform: scale(0.85);
    transform-origin: 0 0 0;
  }

  .des-a50 {
    font-size: 12px;
    color: rgba($color: #fff, $alpha: 0.5);
    transform: scale(0.85);
    transform-origin: 0 0 0;
  }

  .value-a80 {
    font-size: 12px;
    color: rgba($color: #fff, $alpha: 0.8);
  }

  &__title {
    font-weight: 500;
  }

  &__balance {
    margin-top: 20px;
  }

  &__type {
    margin-top: 20px;
    .type {
      display: inline-block;
    }
    .type + .type {
      margin-left: 30px;
    }
  }

  &__address {
    margin-top: 15px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    word-wrap:break-word;
    white-space: pre-wrap;
    word-break: break-all;
  }

  &__handle {
    text-align: right;
    margin: 12px -20px 0;
    padding-right: 15px;
    padding-top: 8px;
    border-top: 1px solid rgba($color: #fff, $alpha: 0.4);
    span {
      cursor: pointer;
      font-size: 12px;
      transform: scale(0.85);
      transform-origin: 0 0 0;
    }
  }
}
</style>
