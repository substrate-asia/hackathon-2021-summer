<template>
  <div>
    <div class="loading-bg" v-if="isLoading">
      <img src="~@/static/images/loading.gif" alt="" />
      <p class="font16">{{ $t("tip.loading") }}</p>
    </div>
    <div class="empty-bg" v-if="!isLoading && items.length === 0">
      <img src="~@/static/images/empty-data.png" alt="" />
      <p>{{ $t("tip.noStakingProject") }}</p>
    </div>
    <div class="row" v-else>
      <div
        class="col-xl-4 col-md-6 mb-4"
        v-for="(item, index) of items"
        :key="index"
      >
        <div class="c-card">
          <div class="card-title-box flex-start-center">
            <div class="card-link-icons">
              <img class="icon1" :src="item.community.iconUrl" alt="" />
            </div>
            <div class="title-text font20 font-bold">
              <span
                >{{ item.community.communityName }}
                {{ $t("cs.community") }}</span
              >
            </div>
          </div>
          <div class="h-line"></div>
          <div class="detail-info-box">
            <div class="project-info-container">
              <span class="name"> {{ $t("dashboard.nominators") }} </span>
              <div class="info">{{ item.nominatorCount }}</div>
            </div>
          </div>
          <button class="primary-btn" @click="downloadCsv(index)">
            <b-spinner small type="grow" v-show="isDownloading"></b-spinner>
            {{ $t("dashboard.export") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CsvExportor from "csv-exportor";
import { getNominationSummary } from "@/apis/api";
import { formatBalance as fbPolkadot } from "@/utils/polkadot/polkadot";
import { formatBalance as fbKusama } from "@/utils/kusama/kusama";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isLoading: true,
      isDownloading: false,
      csvHeader: ["communityName", "communityId", "nominator", "createAt"],
    };
  },
  props: {
    chain: {
      type: String,
    },
  },
  computed: {
    ...mapState("polkadot", ["account"]),
    items() {
      if (this.chain === "polkadot") {
        return this.$store.state.polkadot.crowdstakings.filter(
          (c) => c.projectId === this.account.address
        );
      } else {
        return this.$store.state.kusama.crowdstakings.filter(
          (c) => c.projectId === this.account.address
        );
      }
    },
  },
  methods: {
    async getRaised(raise) {
      if (this.chain.toLowerCase() === "polkadot") {
        return await fbPolkadot(raise);
      } else {
        return await fbKusama(raise);
      }
    },
    downloadCsv(index) {
      const card = this.items[index];
      const projectId = card.projectId;
      const communityId = card.communityId;
      this.isDownloading = true;
      getNominationSummary({
        relaychain: this.chain.toLowerCase(),
        communityId,
        projectId,
      })
        .then(async (res) => {
          this.isDownloading = false;
          let result = [];
          console.log("csv1", res);
          if (res.lenght === 0) {
            return;
          }
          result = res.map((n) => ({
            communityName: n.community.communityName,
            communityId: n.communityId,
            nominator: n.nominator,
            createAt: n.createAt,
          }));
          console.log("csv", result);
          CsvExportor.downloadCsv(
            result,
            { header: this.csvHeader },
            card.community.communityName + ".csv"
          );
        })
        .catch((err) => {
          this.isDownloading = false;
          console.error("down load crowdloan info fail", err);
        });
    },
  },
  created() {
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
@import "src/static/css/customCard";
.c-card {
  padding: 1.2rem;
  .card-title-box .icons {
    margin-right: 1rem;
    .icon1 {
      width: 2.8rem;
      height: 2.8rem;
    }
  }
}
.primary-btn {
  margin-top: 1rem;
}
</style>
