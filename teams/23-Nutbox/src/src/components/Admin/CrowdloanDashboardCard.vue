<template>
  <div>
    <div class="loading-bg" v-if="isLoading">
      <img src="~@/static/images/loading.gif" alt="" />
      <p class="font16">{{ $t("tip.loading") }}</p>
    </div>
    <div class="empty-bg" v-if="!isLoading && items.length === 0">
      <img src="~@/static/images/empty-data.png" alt="" />
      <p>{{ $t("tip.noCrowdloan") }}</p>
    </div>
    <div class="row">
      <div class="col-xl-4 col-md-6 mb-4" v-for="(item, index) of items" :key="index">
        <div class="c-card">
          <div class="card-top-box">
            <!--          <div class="status-container text-right">-->
            <!--            <span :class="status">{{ status }}</span>-->
            <!--          </div>-->
            <div class="flex-start-center">
              <div class="card-link-icons">
                <img class="icon1" :src="item.community.iconUrl" alt="" />
                <img class="icon2" :src="item.para.iconUrl" alt="" />
              </div>
              <div class="card-link-title-text font20 font-bold">
                <div class="link-title" @click="!isOfficial(item) && $router.push('/crowdloan/'+ chain.toLowerCase() +'/community/' + item.community.communityId)">
                  <span class="font20">{{ item.community.communityName + ' ' + $t('cl.community') }}</span>
                  <i class="link-icon" v-if="!isOfficial(item)"></i>
                </div>
                <div class="link-title" @click="$router.push('/crowdloan/'+ chain.toLowerCase() +'/parachain/' + item.para.paraId)">
                  <span class="font16">{{ item.para.paraName }}</span>
                  <i class="link-icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="h-line"></div>
          <div class="detail-info-box">
            <div class="project-info-container">
              <span class="name"> {{ $t('cl.contributors') }} </span>
              <div class="info">{{ item.contributorCount }}</div>
            </div>
            <div class="project-info-container">
              <span class="name"> {{ $t('cl.raised') }} </span>
              <div class="info">{{ item.raised }}</div>
            </div>
          </div>
          <button class="primary-btn" @click="downloadCsv(index)">
            {{ $t("dashboard.export") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CsvExportor from "csv-exportor";
import { getDashboardSummary, getExportContributionInfo } from "@/apis/api";
import { formatBalance as fbr } from "@/utils/rococo/rococo";
import { formatBalance as fbk } from "@/utils/kusama/kusama";
import { formatBalance as fbp } from "@/utils/polkadot/polkadot";
import { formatDate } from "@/utils/commen/util";
import { POLKADTO_ADDRESS_FORMAT_CODE } from "@/config"
import { stanfiAddress } from '@/utils/commen/account'

export default {
  data() {
    return {
      items: [],
      isLoading: true,
      fbMethod: {
        polkadot: fbp,
        kusama: fbk,
        rocooc: fbr
      },
      csvHeader: [
        "communityName",
        "paraName",
        "trieIndex",
        "firstPeriod",
        "lastPeriod",
        "contributor",
        "nominatorId",
        "amount",
        "blockHash",
        "contributeTime",
      ],
    };
  },
  props: {
    chain: {
      type: String,
    },
  },
  methods: {
    fb(a){
      const chain = this.chain.toLowerCase()
      if (chain === 'polkadot'){
        return fbp(a)
      }else if(chain === 'kusama'){
        return fbk(a)
      }else {
        return fbr(a)
      }
    },
    async getRaised(raise) {
      const raised = await this.fb(raise);
      return raised;
    },
    isOfficial(item){
      return item.para.communityId === item.community.communityId
    },
    downloadCsv(index) {
      const card = this.items[index];
      const paraId = card.para.paraId;
      const trieIndex = card.trieIndex;
      getExportContributionInfo({
        relaychain: this.chain.toLowerCase(),
        communityId: this.$store.state.polkadot.account.address,
        paraId,
        trieIndex,
        offset: null,
        limit: null,
      })
        .then(async (res) => {
          let csv = res.data;
          console.log(csv);
          if(!csv || csv.length === 0) return;
          let result = [];
          for (let r of csv) {
            const amount = await this.fb(r.amount);
            result.push({
              communityName: card.community.communityName,
              paraName: card.para.paraName,
              trieIndex,
              firstPeriod: card.firstPeriod,
              lastPeriod: card.lastPeriod,
              contributor: stanfiAddress(r.contributor, POLKADTO_ADDRESS_FORMAT_CODE[this.chain]),
              nominatorId: stanfiAddress(r.nominatorId, POLKADTO_ADDRESS_FORMAT_CODE[this.chain]),
              amount,
              blockHash: r.blockHash,
              contributeTime: formatDate(r.createdAt),
            });
          }
          CsvExportor.downloadCsv(
            result,
            { header: this.csvHeader },
            card.community.communityName +
              "-" +
              card.para.paraName +
              "-" +
              card.trieIndex +
              ".csv"
          );
        })
        .catch((err) => {
          console.error("down load crowdloan info fail", err);
        });
    },
  },
  created() {
    getDashboardSummary({
      relaychain: this.chain.toLowerCase(),
      communityId: this.$store.state.polkadot.account.address,
    })
      .then(async (res) => {
        this.isLoading = false;
        let cards = [];
        for (let card of res) {
          const raised = await this.getRaised(card.raisedAmount);
          card.raised = raised;
          cards.push(card);
        }
        this.items = cards;
      })
      .catch((err) => {
        console.error("request dashboard fail", err);
      });
  },
};
</script>

<style lang="scss" scoped>
@import "src/static/css/customCard";
.c-card {
  padding: 1.2rem;
}
.card-top-box {
  background-image: none;
  padding: 0;
}
.primary-btn{
  margin-top: 1rem;
}
</style>
