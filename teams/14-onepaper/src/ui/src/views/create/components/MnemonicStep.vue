<template>
  <div class="mnemonic-steps">
    <div class="tips-wrap">创建paper账户<el-tooltip content="备注此账户的秘密种子值。请确保你会将它保存在一个安全的地方，拥有该种子时你才可以重新创建此账户。" placement="top">
      <i class="one one-icon-question" />
    </el-tooltip></div>
    <div class="tips-wrap" style="margin-top: 30px;">助记词<el-tooltip content="备注此账户的秘密种子值。请确保你会将它保存在一个安全的地方，拥有该种子时你才可以重新创建此账户。" placement="top">
      <i class="one one-icon-question" />
    </el-tooltip></div>

    <div class="mnemonic-wrods">
      <span
        v-for="(item, index) in mnemonicList"
        :key="index"
        class="word"
      >{{ item }}</span>
    </div>
    <div class="mnemonic-copy">
      <el-button
        v-clipboard:copy="mnemonic"
        v-clipboard:success="clipboardSuccess"
        icon="one one-icon-copy"
        plain
      >点击复制</el-button>
    </div>

    <div class="mnemonic-handle">
      <el-radio v-model="agree" label="2">我已经同意该助记词已经安全保存</el-radio>
      <div style="margin-top: 40px;">
        <el-button @click="cancelClick">取消</el-button>
        <el-button
          type="primary"
          :disabled="!agree"
          @click="nextClick"
        >下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mnemonicGenerate } from '@polkadot/util-crypto'

import clipboard from '@/directives/clipboard'

export default {
  // 助力词步骤
  name: 'MnemonicStep',

  directives: {
    clipboard
  },

  components: {},

  props: {},

  data() {
    return {
      // 助记词
      mnemonic: '',
      agree: false
    }
  },

  computed: {
    mnemonicList() {
      if (this.mnemonic) {
        return this.mnemonic.split(' ')
      }
      return []
    }
  },

  watch: {},

  created() {
    this.mnemonic = mnemonicGenerate(12)
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    /**
     * 复制地址
     */
    clipboardSuccess() {
      this.$message.success('复制成功')
    },

    cancelClick() {
      this.$emit('action', 'cancel', this.mnemonic)
    },

    nextClick() {
      this.$emit('action', 'next', this.mnemonic)
    }
  }
}
</script>

<style lang="scss" scoped>
.mnemonic-steps {
  .tips-wrap {
  }

  .mnemonic-wrods {
    margin: 30px;
    word-break: break-all;

    .word {
      padding: 5px 8px;
      border-radius: $wk-border-radius-base;
      border: #9BA0B5 solid 1px;
      white-space: nowrap;
      line-height: 40px;
      margin-left: 15px;
    }
  }

  .mnemonic-copy {
    text-align: center;
    ::v-deep .el-button {
      i {
        margin-right: 5px;
      }
    }
  }

  .mnemonic-handle {
    margin-top: 20px;
  }
}
</style>
