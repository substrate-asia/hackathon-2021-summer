<template>
  <flexbox class="create" orient="vertical" justify="center">
    <el-button
      class="el-button--create"
      icon="el-icon-plus"
      circle
      @click="createClick"
    />
    <div class="title">创建paper账户</div>
    <div class="des">备注此账户的秘密种子值。请确保你会将它保存在一个安全的地方，拥有该种子时你才可以重新创建此账户。</div>
  </flexbox>
</template>

<script>
export default {
  // 创建
  name: 'Create',

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
    createClick() {
      this.$emit('create')
    }
  }
}
</script>

<style lang="scss" scoped>
.create {
  height: 100%;
  .title {
    margin-top: 20px;
    color: #343D63;
    font-weight: bold;
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
  }

  .el-button--create {
    color: #fff;
    background-color: #27DBC2;
    border-color: #27DBC2;
    font-size: 24px;
    ::v-deep i {
      font-weight: bold;
    }

    &:hover {
      transform: scale(1.2);
      transition: all .3s;
    }
  }
}
</style>
