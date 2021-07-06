<template>
  <div class="crowdloan-community scroll-content">
    <div class="loading-bg" v-show="!communityInfo">
      <img src="~@/static/images/loading.gif" alt="" />
      <p class="font16">{{ $t("tip.loading") }}</p>
    </div>
      <div class="community-info p-card" v-show="communityInfo">
        <img
          class="poster"
          :src="communityInfo.posterUrl"
          v-show="communityInfo.posterUrl && communityInfo.posterUrl.length > 4"
          alt=""
        />
        <img
          class="back-icon"
          src="~@/static/images/left-arrow.png"
          alt=""
          @click="$router.back()"
        />
        <div class="p-detail-info">
          <img class="logo" :src="communityInfo.iconUrl" alt="" />
          <div class="text-info">
            <span
              class="font20 font-bold title"
              v-if="communityInfo && communityInfo.website.length < 6"
            >
              {{ communityInfo.communityName }}
            </span>
            <a
              class="font20 font-bold title official-link"
              v-else
              :href="communityInfo.website"
              target="_blank"
              >{{ communityInfo.communityName }}</a
            >
            <div
              class="desc"
              v-html="
                (communityInfo.description && (communityInfo.description[lang] || communityInfo.description['zh-CN']))
              "
            ></div>
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="row">
          <div
            class="col-xl-4 col-md-6"
            v-for="(crowdloan, idx) of crowdloanInfo"
            :key="idx"
          >
            <ComCRCard :crowdloan="crowdloan" :communityNominatorId='communityNominatorId' chain="kusama"/>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import ComCRCard from "@/components/Crowdloan/ComCRCard";
import { mapState, mapGetters } from "vuex";
import { stanfiAddress } from "@/utils/commen/account";
import { getOnshowingCrowdloanCard as getOnshowingComCRCard } from "@/apis/api";
import { loadFunds } from "@/utils/kusama/crowdloan";
export default {
  data() {
    return {
      communityNominatorId: null
    };
  },
  name: "Kusama",
  components: {
    ComCRCard,
  },
  props: {},
  computed: {
    ...mapState("kusama", ["showingCrowdloan"]),
    ...mapGetters("kusama", ["showingCard"]),
    ...mapState(["lang"]),
    crowdloanInfo() {
      const id = stanfiAddress(this.$route.params.communityid);
      if (this.showingCard && this.showingCard.length > 0) {
        return this.showingCard.filter(
          (a) => stanfiAddress(a.community.communityId) == id
        );
      }
      return [];
    },
    communityInfo() {
      return this.crowdloanInfo.length > 0 && this.crowdloanInfo[0].community;
    },
  },
  mounted () {
    const nominator = stanfiAddress(this.$route.params.nominatorId)
    if (nominator){
      this.communityNominatorId = nominator;
    } 
  },
  async created() {
    if (this.communityInfo) return;
    const res = await getOnshowingComCRCard({ relaychain: "kusama" });
    loadFunds(res)
  },
};
</script>

<style lang="scss" scoped>
@import "src/static/css/projectInfoCard";
</style>
