<template>
  <div class="ro-card">
    <div class="card-link-top-box">
      <div class="status-container text-right">
        <span :class="status">{{ $t("cl." + status) }}</span>
      </div>
      <div class="flex-start-center">
        <div class="card-link-icons">
          <img
            class="icon1"
            :src="getCardInfo && getCardInfo.community.iconUrl"
            alt=""
          />
          <img
            class="icon2"
            :src="getCardInfo && getCardInfo.para.iconUrl"
            alt=""
          />
        </div>
        <div class="card-link-title-text font20 font-bold">
          <div class="link-title">
            <span class="font20" @click="toCommunity">{{
              getCardInfo &&
              getCardInfo.community.communityName + " " + $t("cl.community")
            }}</span>
            <i class="link-icon" @click="toCommunity"></i>
          </div>
          <div class="link-title">
            <span class="font16" @click="toParachain">{{
              getCardInfo && getCardInfo.para.paraName
            }}</span>
            <i class="link-icon" @click="toParachain"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="c-card">
      <div class="detail-info-box">
        <div class="project-info-container">
          <span class="name"> {{ $t("cl.leasePeriod") }} </span>
          <div class="info">{{ leasePeriod || "Loading" }}</div>
        </div>
        <div class="project-info-container">
          <span class="name"> {{ $t("cl.countDown") }} </span>
          <div class="info">{{ countDown || "Loading" }}</div>
        </div>
        <div class="project-info-container">
          <span class="name"> {{ $t("cl.fund") }} </span>
          <div class="info">
            <RaisedLabel :fund="getFundInfo" :relaychain="chain" />
            <ContributorsLabel :fund="getFundInfo" />
          </div>
        </div>
        <div class="project-info-container">
          <span class="name"> {{ $t("cl.contributed") }} </span>
          <div class="info">
            <RaisedLabel
              :fund="getFundInfo"
              :relaychain="chain"
              :isBalance="true"
            />
          </div>
        </div>
        <div class="project-info-container">
          <span class="name"> {{ $t("cl.rewards") }} </span>
          <div class="info">
            <RewardToken
              :icon="token.icon"
              :token="token.name"
              v-for="(token, idx) in rewardTokens"
              :key="idx"
            />
          </div>
        </div>
      </div>
      <div class="text-center">
        <button
          class="primary-btn"
          :disabled="!isConnected"
          v-show="status === 'Active'"
          @click="showContribute = true"
        >
          <b-spinner small type="grow" v-show="!isConnected"></b-spinner>
          {{ $t("cl.contribute") }}
        </button>
        <button
          class="primary-btn"
          :disabled="!isConnected"
          v-show="status === 'Retired'"
          @click="showWithdraw = true"
        >
          <b-spinner small type="grow" v-show="!isConnected"></b-spinner>
          {{ $t("cl.withdraw") }}
        </button>
        <button class="primary-btn" disabled v-show="status === 'Completed'">
          <b-spinner small type="grow" v-show="!isConnected"></b-spinner>
          {{ $t("cl.completed") }}
        </button>
      </div>
    </div>
    <!-- <ConnectWallet v-else /> -->
    <b-modal
      v-model="showContribute"
      modal-class="custom-modal"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
    >
      <TipContribute
        :communityId="communityId"
        :fund="getFundInfo"
        :relaychain="chain"
        :paraName="getCardInfo && getCardInfo.para.paraName"
        @hideContribute="showContribute = false"
      />
    </b-modal>
    <b-modal
      v-model="showWithdraw"
      modal-class="custom-modal"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
    >
      <TipWithdraw
        :fund="getFundInfo"
        :relaychain="chain"
        @hideWithdraw="showWithdraw = false"
      />
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// import ConnectWallet from "./Buttons/ConnectWallet";
import TipContribute from "@/components/Commen/TipContribute";
import TipWithdraw from "@/components/Commen/TipWithdraw";
import ContributorsLabel from "@/components/Commen/ContributorsLabel";
import RaisedLabel from "@/components/Commen/RaisedLabel";
import { PARA_STATUS } from "@/config";
import { calStatus } from "@/utils/commen/crowdloan";
import RewardToken from "@/components/Commen/RewardToken";
import { formatCountdown } from '@/utils/helper'

export default {
  data() {
    return {
      showContribute: false,
      showWithdraw: false,
      status: PARA_STATUS.COMPLETED,
    };
  },
  props: {
    paraId: {
      type: Number,
    },
    communityId: {
      type: String,
    },
    chain: {
      type: String
    }
  },
  components: {
    TipContribute,
    TipWithdraw,
    ContributorsLabel,
    RaisedLabel,
    RewardToken,
  },
  watch: {
    async currentBlockNum(newValue, _) {
      const fund = this.getFundInfo;
      const end = fund.end;
      const raised = fund.raised;
      const cap = fund.cap;
      const firstPeriod = fund.firstPeriod;
      const lastPeriod = fund.lastPeriod;
      const [status] = await calStatus(
        this.chain,
        end,
        firstPeriod,
        lastPeriod,
        raised,
        cap,
        this.paraId,
        newValue
      );
      this.status = status;
    },
  },
  computed: {
    ...mapState(["lang"]),
    isConnected() {
      return this.$store.state[this.chain].isConnected
    },
    clProjectFundInfos () {
      return this.$store.state[this.chain].clProjectFundInfos
    },
    fundInfo() {
      return this.$store.getters[this.chain + '/fundInfo']
    },
    currentBlockNum() {
      return this.$store.getters[this.chain + '/currentBlockNum']
    },
    cardInfo() {
      return this.$store.getters[this.chain + '/cardInfo']
    },
    getFundInfo() {
      return this.fundInfo(this.paraId);
    },
    getCardInfo() {
      const card = this.cardInfo(this.paraId, this.communityId);
      return card;
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
    completion() {
      try {
        return this.getFundInfo.cap.isZero()
          ? "100.00%"
          : (
              this.getFundInfo.raised
                .muln(10000)
                .div(this.getFundInfo.cap)
                .toNumber() / 100
            ).toFixed(2) + "% ";
      } catch (e) {
        return "0.0%";
      }
    },
    rewardTokens() {
      if (this.getCardInfo) {
        let rewards = this.getCardInfo.para.reward.concat(
          this.getCardInfo.community.reward
        );
        if (rewards.length > 3) {
          rewards = rewards.slice(0, 3);
        }
        return rewards;
      }
      return [];
    },
    contributions() {
      try {
        return this.getFundInfo.funds.length;
      } catch (e) {
        return 0;
      }
    },
  },
  methods: {
    toCommunity() {
      this.$router.push("/crowdloan/" + this.chain + "/community/" + this.communityId);
    },
    toParachain() {
      this.$router.push("/crowdloan/" + this.chain + "/parachain/" + this.paraId);
    },
  },
  mounted() {
    this.status = this.getFundInfo.status;
  },
};
</script>

<style lang="scss" scoped>
@import "src/static/css/customCard";
.ro-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.c-card {
  flex: 1;
  margin-top: -1.2rem;
  padding: 1.8rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.detail-info-box {
  margin-top: 0;
}
</style>
