<template>
  <div class="steps">
    <div class="white-wrap" style="padding: 20px 0;">
      <el-steps :active="active" align-center>
        <el-step title="默认生成助记词" />
        <el-step title="创建用户名和密码" />
        <el-step title="完成创建" />
      </el-steps>
    </div>

    <div v-loading="loading" class="white-wrap">
      <mnemonic-step
        v-show="active == 1"
        class="steps-content"
        @action="mnemonicAction"
      />
      <account-step
        v-show="active == 2"
        class="steps-content"
        @action="accountAction"
      />
      <result-step
        v-show="active == 3"
        class="steps-content"
        @action="resultAction"
      />
    </div>
  </div>
</template>

<script>
import MnemonicStep from './MnemonicStep'
import AccountStep from './AccountStep'
import ResultStep from './ResultStep'

import keyring from '@polkadot/ui-keyring'
import { mapGetters } from 'vuex'
import { backAccount } from '@/utils'

export default {
  // 步骤
  name: 'Steps',

  components: {
    MnemonicStep,
    AccountStep,
    ResultStep
  },

  props: {},

  data() {
    return {
      active: 1,
      mnemonic: '',
      accountForm: null,
      result: null,
      loading: false
    }
  },

  computed: {
    ...mapGetters([
      'polkadot'
    ])
  },

  watch: {},

  created() {
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    /**
     * 上一步
     */
    preActive() {
      if (this.active <= 1) {
        this.$emit('cancel')
      } else if (this.active < 3) {
        this.active--
      }
    },

    /**
     * 助力词
     */
    mnemonicAction(type, mnemonic) {
      if (type === 'cancel') {
        this.$emit('cancel')
      } else if (type === 'next') {
        this.active = 2
        this.mnemonic = mnemonic
      }
    },

    /**
     * 账号
     */
    accountAction(type, accountForm) {
      if (type === 'cancel') {
        this.$emit('cancel')
      } else if (type === 'next') {
        if (this.polkadot.keyringState === 'READY') {
          // 5CWcrfFTPAD5UunqDzVAmHDzNi6M4yP4jwC6H1DBY236jt6G

          // 2
          // nose north peanut pig summer coral usual desert balcony asthma link funny
          // 小刚 xiao123
          // 5CMe9uVR1TUeVHHL8QsetADBJXA8dQsWf7DSPvkKKxdohcew
          this.loading = true
          setTimeout(() => {
            this.accountForm = accountForm
            const result = keyring.addUri(this.mnemonic, accountForm.password, { name: accountForm.username })
            this.result = result
            backAccount(this.result.json, this.result.pair.address)
            this.loading = false
            this.active = 3
          }, 100)
        }
      } else if (type === 'pre') {
        this.preActive()
      }
    },

    /**
     * 结果
     */
    resultAction(type) {
      if (type === 'wallet') {
        this.$store.commit('user/SET_PAIR', this.result.pair)
        this.$router.push('/wallet/index')
      } else if (type === 'save') {
        // 保存
        backAccount(this.result.json, this.result.pair.address)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.steps {
  height: 100%;
  background-color: $wk--background-color-base;

  ::v-deep .el-steps {
    width: 60%;
    margin: auto;
    .el-step__title {
      font-size: 13px;
    }

    .el-step.is-simple .el-step__arrow::before,
    .el-step.is-simple .el-step__arrow::after {
      height: 10px;
      width: 2px;
    }

    .el-step__line {
      height: 1px;
    }
    .el-step__icon-inner {
      font-weight: normal;
    }
    .el-step__icon.is-text {
      border-width: 1px;
    }

    .el-step__head.is-process {
      color: #C0C4CC;
      border-color: #C0C4CC;
    }
    .el-step__title.is-process {
      color: #C0C4CC;
      font-weight: normal;
    }
    .el-step__head.is-finish {
      .el-step__icon.is-text {
        color: white;
        background-color: $wk-color-primary;
      }
    }

    .el-step.is-simple .el-step__arrow::after {
      transform: rotate(45deg) translateY(3px);
    }
    .el-step.is-simple .el-step__arrow::before {
      transform: rotate(-45deg) translateY(-2px);
    }
  }

  .steps-content {
    width: 60%;
    margin: auto;
    padding: 40px 0 20px;
  }

  .account-step {
    width: 350px;
  }

  .result-step {
    width: 500px;
  }
}
</style>
