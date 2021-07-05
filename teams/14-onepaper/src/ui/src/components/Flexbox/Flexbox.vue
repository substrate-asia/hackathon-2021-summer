<template>
  <div
    :class="{
      'vux-flex-col': orient === 'vertical',
      'vux-flex-row': orient === 'horizontal'
    }"
    :style="styles"
    class="vux-flexbox"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Flexbox',
  props: {
    gutter: {
      type: Number,
      default: 8
    },
    orient: {
      type: String,
      default: 'horizontal'
    },
    // eslint-disable-next-line vue/require-default-prop
    justify: String,
    // eslint-disable-next-line vue/require-default-prop
    align: String,
    // eslint-disable-next-line vue/require-default-prop
    wrap: String,
    // eslint-disable-next-line vue/require-default-prop
    direction: String
  },
  computed: {
    styles() {
      const styles = {
        'justify-content': this.justify,
        '-webkit-justify-content': this.justify,
        'align-items': this.align,
        '-webkit-align-items': this.align,
        'flex-wrap': this.wrap,
        '-webkit-flex-wrap': this.wrap,
        'flex-direction': this.direction,
        '-webkit-flex-direction': this.direction
      }
      return styles
    }
  }
}
</script>

<style lang="scss">
.vux-flexbox {
  width: 100%;
  text-align: left;
  display: flex;
  display: -webkit-flex;
  box-align: center;
  align-items: center;
  .vux-flexbox-item {
    flex: 1;
    -webkit-flex: 1;
    min-width: 20px;
    width: 0%;
    &:first-child {
      margin-left: 0 !important;
      margin-top: 0 !important;
    }
  }
}

.vux-flex-row {
  box-direction: row;
  box-orient: horizontal;
  flex-direction: row;
}

.vux-flex-col {
  box-orient: vertical;
  flex-direction: column;
  > .vux-flexbox-item {
    width: 100%;
  }
}
</style>
