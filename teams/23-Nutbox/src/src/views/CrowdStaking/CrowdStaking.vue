<template>
  <div class="crowdstaking">
    <h3>
      {{ this.$t("cs.crowdstaking") }}
    </h3>
    <div class="nav sub-page-nav">
      <router-link to="/crowdstaking/kusama">Kusama</router-link>
      <router-link to="/crowdstaking/polkadot">Polkadot</router-link>
      <div class="center-blank"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState('polkadot',["projectFundInfos", "symbol", "isConnected", 'balance', 'crowdstakings']),
    funds() {
      const fundInfos = this.getFundInfos();
      return fundInfos || [];
    },
  },
  methods: {
    ...mapGetters('polkadot',["getFundInfos", "paraIds"]),
    ...mapMutations('polkadot',[
      "saveProjectStatus",
      "saveProjectName",
      "saveCommunityName",
      'saveCrowdstakings',
      'saveCommunitys',
      'saveProjects'
    ]),
  },
  created () {

  },
};
</script>

<style lang="less" scoped>
.sub-page-nav {
  margin-bottom: 0.5rem;
}
</style>
