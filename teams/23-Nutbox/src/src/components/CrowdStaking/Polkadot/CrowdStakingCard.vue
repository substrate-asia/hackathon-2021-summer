<template>
  <div class="c-card staking-card">
    <div class="card-top">
      <div class="flex-start-center">
        <div class="card-icons">
          <img class="icon2" :src="crowdstaking.project.iconUrl" alt="" />
          <img class="icon1" :src="crowdstaking.community.iconUrl" alt="" />
        </div>
        <div class="card-title-text font20 font-bold">
          <span>{{crowdstaking.community.communityName }}</span>
          <img src="~@/static/images/close.svg" alt="" />
          <span>{{ crowdstaking.project.projectName }}</span>
        </div>
      </div>
      <div class="h-line"></div>
      <div class="desc">
        {{ crowdstaking.community.description[lang] }}
      </div>
      <div class="validator-container">
        <div class="validator" v-for="v in crowdstaking.project.validators" :key="v">
          {{ v | formatValidatorAdd }}
        </div>
      </div>
    </div>
    <div class="detail-info-box">
      <template v-if="isConnected">
        <button
          class="primary-btn"
          @click="nominate"
          :disabled="nominated || loadingStaking"
        >
          <b-spinner small type="grow" v-show="loadingStaking"></b-spinner
          >{{ nominated ? $t("cs.nominated") : $t("cs.nominate") }}
        </button>
      </template>
      <div class="project-info-container">
        <span class="name"> TVL </span>
        <div class="info">{{ tvl | amountForm(4)}} ({{crowdstaking.project.validators.length}})</div>
      </div>
      <div class="project-info-container">
        <span class="name"> APY </span>
        <div class="info">13.0%</div>
      </div>
    </div>

    <b-modal
      v-model="showNominate"
      modal-class="custom-modal"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
    >
      <TipNominator
        :crowdstaking="crowdstaking"
        @hideNominate="showNominate = false"
      />
    </b-modal>

    <b-modal
      v-model="showBondAndNominator"
      modal-class="custom-modal"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
    >
      <TipBondAndNominator
        :crowdstaking="crowdstaking"
        @hideBondAndNominate="showBondAndNominator = false"
      />
    </b-modal>
  </div>
</template>

<script>
import TipBondAndNominator from "./TipBoxes/TipBondAndNominator";
import TipNominator from "./TipBoxes/TipNominator";
import { mapState } from "vuex";
import { stanfiAddress } from "@/utils/commen/account";
import BN from "bn.js";

export default {
  data() {
    return {
      showNominate: false,
      showBondAndNominator: false,
    };
  },
  props: {
    crowdstaking: {
      type: Object,
    },
    symbol: {
      type: String,
      default: "Kusama",
    },
  },
  filters: {
    formatValidatorAdd: function(add) {
      return add.slice(0,3) + '...' + add.slice(-3);
    }
  },
  components: {
    TipBondAndNominator,
    TipNominator,
  },
  methods: {
    async nominate() {
      if (this.bonded) {
        this.showNominate = true;
      } else {
        this.showBondAndNominator = true;
      }
    },
  },
  computed: {
    ...mapState("polkadot", [
      "isConnected",
      "lang",
      "bonded",
      "nominators",
      "loadingStaking",
      "allValidatorInfosInOurDB",
    ]),
    ...mapState(["lang"]),
    // 用户已经投了该项目的节点
    nominated() {
      const val = this.crowdstaking.project.validators.map((tcd) =>
        stanfiAddress(tcd)
      );
      return (
        this.nominators.filter(({ address }) => val.indexOf(address) !== -1)
          .length === val.length
      );
    },
    tvl() {
      if (this.allValidatorInfosInOurDB.length === 0) {
        return 0;
      }
      const total = this.crowdstaking.project.validators.reduce(
        (t, v) =>
          t.add(new BN(this.allValidatorInfosInOurDB[v].total.toString())),
        new BN(0)
      );
      return total.toString() / 1e10;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "src/static/css/customCard";
.staking-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.project-info-container .info {
  color: #BDBFC2;
}
</style>
