<template>
  <div class="crowdloan-parachain scroll-content">
    <div class="loading-bg" v-if="!paraInfo">
      <img src="~@/static/images/loading.gif" alt="" />
      <p class="font16">{{ $t('tip.loading') }}</p>
    </div>
    <div class="parachain-info p-card" v-show="paraInfo">
      <img class="poster" :src="paraInfo.posterUrl" v-show="paraInfo.posterUrl && paraInfo.posterUrl.length>4" alt="">
      <img class="back-icon" src="~@/static/images/left-arrow.png" alt="" @click="$router.back()"/>
      <div class="p-detail-info">
        <img class="logo" :src="paraInfo.iconUrl" alt="" />
        <div class="text-info">
          <span class="font20 font-bold title" v-if="paraInfo && paraInfo.website.length === 0">
              {{ paraInfo.paraName }}
          </span>
          <a class="font20 font-bold title official-link" v-else :href="paraInfo.website"
             target="_blank">{{ paraInfo.paraName }}</a>
          <div class="desc">{{ paraInfo && paraInfo.description[lang] }}</div>
        </div>
      </div>
    </div>
    <div class="c-card" v-show="paraInfo">
      <a class="font20 font-bold title link" :href="paraInfo && paraInfo.rewardLink[lang]"
         target="_blank">{{ $t("cl.auctionPlan") }}</a>
      <div class="desc" style="margin-top: .8rem" v-html="paraInfo && paraInfo.rewardPlan[lang]">
        
      </div>
    </div>

    <div class="c-card crowdloan-detail" v-show="paraInfo">
      <div class="flex-between-center mb-2">
        <div class="font20 font-bold title">{{ $t("cl.auctionInfo") }}</div>
        <div class="status-container">
          <span :class="status" v-show="status">{{ $t('cl.'+status) }}</span>
        </div>
      </div>

      <b-table-simple responsive>
        <b-thead>
          <b-tr>
            <b-th>{{ $t('cl.leasePeriod') }}</b-th>
            <b-th>{{ $t('cl.countDown') }}</b-th>
            <b-th>{{ $t('cl.raised') }}</b-th>
            <b-th>{{ $t('cl.fund') }}</b-th>
            <b-th>{{ $t('cl.progress') }}</b-th>
            <b-th>{{ $t('cl.contributors') }}</b-th>
            <b-th>{{ $t('cl.contributed') }}</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr>
            <td data-label="Lease Period">{{ leasePeriod }}</td>
            <td data-label="Countdown">{{ countDown || 'Loading' }}</td>
            <td data-label="Raised">{{ getFundInfo && fb(getFundInfo.raised) }}</td>
            <td data-label="Fund">{{ getFundInfo && fb(getFundInfo.cap) }}</td>
            <td data-label="Progress">{{ percent }}</td>
            <td data-label="Contributors">{{ getFundInfo && getFundInfo.funds.length }}</td>
            <td data-label="Contributed">{{ fb(contributed) }}</td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>

    <div class="card-container" v-show="paraInfo">
      <div class="font20 font-bold title">{{ $t('cl.joinAuction') }}</div>
      <div class="row">
        <div class="col-xl-4 col-md-6 mb-4" v-for="crowdloan in crowdloanInfo"
             :key="crowdloan.community.communtiyId">
          <ParaCRCard
            :crowdloan="crowdloan"
            :status="status || 'Completed'"
            chain='rococo'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ParaCRCard from "@/components/Crowdloan/ParaCRCard";
import { mapState, mapGetters } from "vuex";
import { getOnshowingCrowdloanCard } from "@/apis/api";
import { loadFunds } from "@/utils/rococo/crowdloan";
import { formatBalance } from "@/utils/rococo/rococo";
import { calStatus } from "@/utils/commen/crowdloan";
import { stanfiAddress } from "@/utils/commen/account"
import { formatCountdown } from '@/utils/helper'

export default {
  name: "Rococo",
  data() {
      return {
        status: 'Compeleted'
      }
  },
  components: {
    ParaCRCard,
  },
  computed: {
    ...mapState(["lang"]),
    ...mapState('polkadot', ['account']),
    ...mapState("rococo", ["isConnected", "clProjectFundInfos"]),
    ...mapGetters("rococo", [
      "showingCard",
      "fundInfo",
      "currentBlockNum",
      "cardInfo",
    ]),
    paraId(){
        return parseInt(this.$route.params.paraid)
    },
    crowdloanInfo() {
      if (this.showingCard && this.showingCard.length > 0) {
        const crowdloan = this.showingCard.filter(
          (f) => parseInt(f.para.paraId) === this.paraId
        );
        const official = crowdloan.filter(c => c.community.communityId === c.para.communityId)
        const others = crowdloan.filter(c => c.community.communityId !== c.para.communityId)
        return official.concat(others)
      }
      return [];
    },
    paraInfo() {
      return this.crowdloanInfo.length > 0 && this.crowdloanInfo[0].para;
    },
    getFundInfo() {
      const fund = this.fundInfo(this.paraId)
      this.status = fund ? fund.status : null
      return this.fundInfo(this.paraId);
    },
    leasePeriod() {
      try {
        const first = parseInt(this.getFundInfo.firstPeriod);
        const last = parseInt(this.getFundInfo.lastPeriod);
        return first === last
          ? first + ""
          : parseInt(this.getFundInfo.firstPeriod) +
              " - " +
              parseInt(this.getFundInfo.lastPeriod);
      } catch (e) {
        return "0";
      }
    },
    countDown() {
      try {
        if (!this.getFundInfo) return;
        const end = parseInt(this.getFundInfo.end);
        return formatCountdown(end, this.currentBlockNum)
      } catch (e) {
        console.error("err", e);
        return "Loading";
      }
    },
    percent() {
      if (!this.getFundInfo) return ;
      return (
        this.getFundInfo.cap.isZero()
        ? "100.00%"
        : (this.getFundInfo.raised.muln(10000).div(this.getFundInfo.cap).toNumber() / 100).toFixed(2) + "% "
      );
    },
    contributions() {
      try {
        return this.getFundInfo.funds.length;
      } catch (e) {
        return 0;
      }
    },
    contributed(){
      try{
        const c = this.getFundInfo.funds.filter(c=>stanfiAddress(c.contributor) == this.account.address)
        if (c.length === 0){
          return 0
        }else{
          return c[0].amount
        }
      }catch(e){
        return 0
      }
    }
  },
    watch: {
      async currentBlockNum(newValue, _) {
        try{
          const fund = this.getFundInfo;
          const end = fund.end;
          const raised = fund.raised;
          const cap = fund.cap;
          const firstPeriod = fund.firstPeriod;
          const lastPeriod = fund.lastPeriod
          const [status] = await calStatus(
            'rococo',
            end,
            firstPeriod,
            lastPeriod,
            raised,
            cap,
            this.paraId,
            newValue
          );
          this.status = status;
        }catch(e) {
        }
      }
  },
  methods: {
      fb(a){
        return formatBalance(a)
      }
  },
  async created() {
    try{
      if (this.getFundInfo && this.crowdloanInfo) {
        this.status = this.getFundInfo && this.getFundInfo.status;
        return;
      };
      const res = await getOnshowingCrowdloanCard({ relaychain: "rococo" });
      loadFunds(res)
      const para = res.filter(c => parseInt(c.para.paraId) === this.paraId)
      this.status = para.length > 0 ? para.status : 'Completed'
    }catch(e){}

  },
};
</script>

<style lang="scss" scoped>
@import "src/static/css/projectInfoCard";
.table-responsive {
  margin-bottom: 0;
}
.table th {
  background-color: #F6F7F9;
  text-align: right;
  &:first-child {
    text-align: left;
  }
}
.table td {
  word-break: break-word;
  white-space: normal;
  text-align: right;
  font-size: .6rem;
}
@media (min-width: 960px) {
  .table td:first-child {
    text-align: left;
  }
}
@media (max-width: 960px) {
  .table {
    thead {
      display: none;
    }
    tbody > tr > [data-label]::before {
      content: attr(data-label);
      width: 40%;
      float: left;
      text-align: left;
      overflow-wrap: break-word;
      font-weight: bold;
      font-style: normal;
      padding: 0 calc(1rem / 2) 0 0;
      margin: 0;
    }
    td {
      display: block;
    }
  }
}
</style>
