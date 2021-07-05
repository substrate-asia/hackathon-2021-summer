<template>
  <div class="k-page crowdloan-page scroll-content">
    <div class="loading-bg" v-if="loadingFunds">
      <img src="~@/static/images/loading.gif" alt="" />
      <p class="font16">{{ $t('tip.loading') }}</p>
    </div>
    <template v-else>
      <div v-if="funds.length > 0"></div>
      <div class="empty-bg" v-else>
        <img src="~@/static/images/empty-data.png" alt="" />
        <p> {{ $t('tip.noAuction') }} </p>
      </div>
      <div class="cards-container">
          <div class="row">
            <div class="col-xl-4 col-md-6 mb-4" 
                v-show="card.para.communityId !== card.community.communityId" v-for="card, idx of showingCard()" :key="idx">
                <CrowdloanCard
                  :paraId="parseInt(card.para.paraId)"
                  :communityId="card.community.communityId"
                />
            </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import CrowdloanCard from "../../components/Crowdloan/Rococo/CrowdloanCard";
import {
  subscribeFundInfo as subscribeKusamaFundInfo
} from "@/utils/rococo/crowdloan";
import { mapState, mapGetters } from "vuex";
import { getOnshowingCrowdloanCard } from "@/apis/api"

export default {
  name: "Rococo",
  components: {
    CrowdloanCard,
  },
  computed: {
    ...mapState('rococo', ["clProjectFundInfos", "loadingFunds"]),
    funds() {
      const fundInfos = this.clProjectFundInfos;
      return fundInfos || [];
    },
  },
  methods: {
    ...mapGetters('rococo', ['showingCard']),
  },
  async created() {
    const res = await getOnshowingCrowdloanCard({relaychain:"rococo"})
    await subscribeKusamaFundInfo(res);
  },
};
</script>

<style lang="scss" scoped>
@import 'src/static/css/crowdloanPage.scss'
</style>
