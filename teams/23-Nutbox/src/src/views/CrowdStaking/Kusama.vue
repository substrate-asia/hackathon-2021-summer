<template>
  <div class="p-page crowdloan-page scroll-content">
      <div class="empty-bg">
        <img src="~@/static/images/empty-data.png" alt="" />
        <p> {{ $t('tip.comingSoon') }} </p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Polkadot',
  components: {
  },
  data () {
    return {
      contributeModal: false,
      withdrawModal: false,
      projectFundInfos: []
    }
  },
  methods: {

  },
}
</script>

<style lang="less" scoped>
.crowdloan-page{
    height: 100%;
  position: relative;
}
</style>
