<template>
  <div class="word-search">
    <span
      v-for="(word,i) in words"
      :key="i"
      :class="{'is-select': index === word}"
      @click="selectClick(word)"
    >{{ word }}</span>
  </div>
</template>

<script>
export default {
  // 字母搜索
  name: 'WordSearch',

  components: {},

  props: {},

  data() {
    return {
      words: [],
      index: null
    }
  },

  computed: {},

  watch: {},

  created() {
    this.words = this.generateBig()
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    generateBig() {
      var ch_big = 'A'
      var str_big = []
      for (var i = 0; i < 26; i++) {
        str_big.push(String.fromCharCode(ch_big.charCodeAt(0) + i))
      }
      return str_big
    },

    selectClick(i) {
      if (this.index === i) {
        this.index = ''
      } else {
        this.index = i
      }
      this.$emit('change', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.word-search {
  word-wrap:break-word;
  white-space: pre-wrap;
  word-break: break-all;
  span {
    display: inline-block;
    padding: 4px 0;
    color: #777777;
    font-size: 18px;
    width: 30px;
    cursor: pointer;
    text-align: center;
    margin-bottom: 5px;

    &.is-select,
    &:hover {
      color: $wk-color-primary;
      background-color: #eee;
      border-radius: $wk-border-radius-base;
    }
  }
}
</style>
