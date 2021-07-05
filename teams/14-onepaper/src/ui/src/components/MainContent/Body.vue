<template>
  <flexbox-item class="main-content-body">
    <div class="content-wrap">
      <slot />
    </div>
  </flexbox-item>
</template>

<script>
export default {
  // MainContentBody
  name: 'MainContentBody',

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
.main-content-body {
  margin-top: 0 !important;
  padding: 15px;
  .content-wrap {
    border-radius: $wk-border-radius-base;
    background-color: white;
    height: 100%;
  }
}
</style>
