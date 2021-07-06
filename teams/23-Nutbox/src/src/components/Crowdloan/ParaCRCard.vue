<template>
  <div class="c-card">
    <div class="card-title-box flex-start-center">
      <div class="icons">
        <img
          class="icon1"
          :src="crowdloan.community.iconUrl"
          alt=""
        />
      </div>
      <div class="card-link-title-text">
        <div class="font20 font-bold link-title" @click="toCommunity">
          <span>
            {{crowdloan.community.communityName + (isOfficial ? '' : ' ' + $t('cl.community'))}}
          </span>
        <i class="link-icon" v-show="!isOfficial"></i>
        </div>
      </div>
    </div>
    <div class="h-line"></div>
   <div class="detail-info-box">
       <p class="description font14">
           {{ crowdloan.community.description[this.$store.state.lang] || crowdloan.community.description['zh-CN'] }}
       </p>
     <div class="project-info-container">
       <span class="name"> {{ $t('cl.rewards') }} </span>
       <div class="info">
         <RewardToken :icon='token.icon' :token='token.name' v-for="(token, idx) in rewardTokens" :key="idx"/>
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
      <button class="primary-btn" disabled v-show="status === 'Completed' || status === ''">
        <b-spinner small type="grow" v-show="!isConnected"></b-spinner>
        {{ $t("cl.completed") }}
      </button>
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
        :fund="fundInfo(paraId)"
        :relaychain='chain'
        :paraName="crowdloan.para.paraName"
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
      <TipWithdraw :fund='fundInfo(paraId)' :relaychain='chain' @hideWithdraw="showWithdraw = false" />
    </b-modal>
  </div>
</template>

<script>
// import ConnectWallet from "./Buttons/ConnectWallet";
import TipContribute from "@/components/Commen/TipContribute";
import TipWithdraw from "@/components/Commen/TipWithdraw";
import RewardToken from "@/components/Commen/RewardToken"

export default {
  data() {
    return {
      showContribute: false,
      showWithdraw: false,
    };
  },
  components: {
      TipContribute,
      TipWithdraw,
      RewardToken
  },
  props: {
    crowdloan: {
      type: Object,
    },
    status: {
        type: String
    },
    chain: {
      type: String
    }
  },
  methods: {
      toCommunity() {
        if (this.isOfficial) return;
        this.$router.push('/crowdloan/' + this.chain + '/community/' + this.crowdloan.community.communityId)
      }
  },
  mounted () {
  },
  computed: {
    fundInfo() {
      return this.$store.getters[this.chain + '/fundInfo']
    },
    isConnected(){
      return this.$store.state[this.chain].isConnected
    },
    paraId() {
        return parseInt(this.crowdloan.para.paraId)
    },
    communityId() {
        return this.crowdloan.community.communityId
    },
    isOfficial(){
      return this.communityId === this.crowdloan.para.communityId
    },
    rewardTokens(){
      if (this.crowdloan){
        let rewards = this.crowdloan.para.reward.concat(this.crowdloan.community.reward)
        if (rewards.length > 3) {
          rewards = rewards.slice(0, 3)
        }
        return rewards
      }
      return []
    }
  },
};
</script>

<style lang="scss" scoped>
@import "src/static/css/customCard";
.c-card {
  .card-title-box .icons {
    margin-right: 1rem;
    .icon1 {
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 2.8rem;
    }
  }
  .detail-info-box{
    .description{
      font-weight: 600;
      color: #BDBFC2;
      line-height: 18px;
      word-break: break-word;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
  .h-line {
    margin-top: 1rem;
  }
  .primary-btn {
    margin-top: 1.8rem;
  }
}
</style>
