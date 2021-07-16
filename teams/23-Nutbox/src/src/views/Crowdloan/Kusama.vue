<template>
  <div class="k-page crowdloan-page scroll-content">
    <div class="loading-bg" v-if="loadingFunds">
      <img src="~@/static/images/loading.gif" alt="" />
      <p class="font16">{{ $t("tip.loading") }}</p>
    </div>
    <template v-else>
      <div v-if="funds.length > 0"></div>
      <div class="empty-bg" v-else>
        <img src="~@/static/images/empty-data.png" alt="" />
        <p>{{ $t("tip.noAuction") }}</p>
      </div>
      <div class="cards-container">
        <div class="row">
          <div
            class="col-xl-4 col-md-6 mb-4"
            v-show="card.para.communityId !== card.community.communityId"
            v-for="(card, idx) of searchedCards || showingCard()"
            :key="idx"
          >
            <CrowdloanCard
              :paraId="parseInt(card.para.paraId)"
              :communityId="card.community.communityId"
              chain="kusama"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import CrowdloanCard from "../../components/Crowdloan/CrowdloanCard";
import { loadFunds } from "@/utils/kusama/crowdloan";
import { mapState, mapGetters } from "vuex";
import { getOnshowingCrowdloanCard } from "@/apis/api";
import { initCustomApi } from "@/utils/commen/api";

export default {
  name: "Kusama",
  components: {
    CrowdloanCard,
  },
  data() {
    return {
      searchedCards: null,
    };
  },
  computed: {
    ...mapState("kusama", ["clProjectFundInfos", "loadingFunds"]),
    ...mapState(["crowdloanCardSearchText"]),
    funds() {
      const fundInfos = this.clProjectFundInfos;
      return fundInfos || [];
    },
  },
  methods: {
    ...mapGetters("kusama", ["showingCard"]),
  },
  watch: {
    crowdloanCardSearchText(newValue, oldValue) {
      if (!newValue || newValue === "") {
        this.searchedCards = null;
        return null;
      }
      const seachText = newValue.toLowerCase();
      this.searchedCards = this.showingCard().filter(
        ({ community, para }) =>
          community.communityName.toLowerCase().includes(seachText) ||
          para.paraName.toLowerCase().includes(seachText)
      );
    },
  },
  async created() {
    //  clear seach box
    if (this.showingCard() && this.showingCard().length > 0) {
      return;
    }
    const res = await getOnshowingCrowdloanCard({ relaychain: "kusama" });
    // get all custom node
    const nodes = res
      .reduce((t, r) => t.concat(r.para.reward), [])
      .filter((r) => r.node && r.pallet)
      .map((r) => r.node);
    console.log("All nodes", new Set(nodes));
    for (const node of new Set(nodes)) {
      initCustomApi(node);
    }
    // 缓存数据
    loadFunds(res);
  },
};
</script>

<style lang="scss" scoped>
@import "src/static/css/crowdloanPage.scss";
</style>
