<template>
  <flexbox
    class="main-content"
    orient="vertical"
    align="stretch"
  >
    <slot />
  </flexbox>
</template>

<script>
export default {
  // 内容块
  name: 'MainContent',

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

  methods: {}
}
</script>

<style lang="scss" scoped>
.main-content {
  height: 100%;
  background-color: $wk--background-color-base;
}
</style>
