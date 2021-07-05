<template>
  <div class="result-step">
    <i class="el-icon-success">
      <div class="title">恭喜你，已经完成创建! </div>
      <div class="des">创建帐户后，我们将为您提供一个生成的备份文件。只要您有权访问帐户，以后就可以通过单击"密钥"中的"备份"按钮来下载此文件。<br>请确保按要求将此文件和你的密码保存在安全的位置，以供恢复账户时使用。</div>
    </i>
    <div class="result-handle">
      <el-button @click="saveClick">保存</el-button>
      <el-button
        type="primary"
        @click="walletClick"
      >钱包</el-button>
    </div>
  </div>
</template>

<script>
export default {
  // 结果
  name: 'ResultStep',

  components: {},

  props: {},

  data() {
    return {
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  beforeDestroy() {},

  methods: {
    walletClick() {
      this.$emit('action', 'wallet')
    },

    saveClick() {
      this.$emit('action', 'save')
    }
  }
}
</script>

<style lang="scss" scoped>
.result-step {
  text-align: center;
  .el-icon-success {
    color: $wk-color-primary;
    font-size: 65px;
  }
  .title {
    font-weight: bold;
    font-size: 16px;
    margin-top: 20px;
    color: $wk-color-primary;
  }

  .des {
    margin-top: 30px;
    width: 500px;
    padding: 8px 15px;
    background-color: #F8F8F8;
    border-radius: $wk-border-radius-base;
    color: #737A97;
    font-size: 13px;
    line-height: 1.5;

    word-wrap:break-word;
    white-space: pre-wrap;
    word-break: break-all;
  }

  .result-handle {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
