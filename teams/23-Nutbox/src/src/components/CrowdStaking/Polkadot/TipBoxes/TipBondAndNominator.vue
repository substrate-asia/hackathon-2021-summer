<template>
  <div class="tip-modal">
    <img
      class="close-btn"
      src="~@/static/images/close.svg"
      alt=""
      @click="hide"
    />
    <div class="tip-contribute">
      <div class="text-center mb-4 font20">
        {{ $t("cs.bondAndNominate") }}
      </div>
      <div class="input-group-box">
        <div class="label">{{ $t("cs.available") }}: {{ formatBalance }}</div>
        <div class="flex-between-center">
          <input type="number" v-model="inputAmount" />
        </div>
      </div>
      <div class="text-center mb-4 font16">
        <p class="bondInfo">{{ $t("cs.bondInfo1") }}</p>
        <p class="bondInfo">{{ $t("cs.bondInfo2") }}</p>
        <p class="bondInfo">{{ $t("cs.bondInfo3") }}</p>
      </div>
      <button class="primary-btn" @click="confirm" :disabled="isBondAndNominating">
        <b-spinner small type="grow" v-show="isBondAndNominating"></b-spinner
        >{{ $t("cs.confirm") }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { formatBalance as fb } from "@/utils/polkadot/polkadot";
import BN from "bn.js";
import { bondAndNominate } from "@/utils/polkadot/staking";

export default {
  data() {
    return {
      inputAmount: "",
      inputNonimator: "",
      paraTokenSymbol: "",
      isBondAndNominating: false,
    };
  },
  props: {
    crowdstaking: {
      type: Object,
    }
  },
  computed: {
    ...mapState('polkadot',["symbol", "balance", "nominators"]),
    ...mapState(['lang']),
    ...mapGetters('polkadot',["getFundInfo", "decimal", "available"]),
    formatBalance() {
      let uni = fb(this.available);
      return uni;
    },
  },
  methods: {
    hide() {
      if (this.isBondAndNominating) return;
      this.$emit("hideBondAndNominate");
    },
    checkInput() {
      const reg = /^\d+(\.\d+)?$/;
      const res = reg.test(this.inputAmount);
      if (!res) {
        this.$bvToast.toast("Input error!", {
          title: this.$t("tip.tips"),
          autoHideDelay: 5000,
          variant: "warning", // info success danger
        });
        return false;
      }
      const amount = parseFloat(this.inputAmount);

      if (amount < 0.1) {
        this.$bvToast.toast(this.$t("tip.belowMinBond"), {
          title: this.$t("tip.tips"),
          autoHideDelay: 5000,
          variant: "warning",
        });
        return;
      }

      if (this.available.lte(new BN(amount).mul(new BN(1e10)))) {
        this.$bvToast.toast(this.$t("tip.insufficientBalance"), {
          title: this.$t("tip.tips"),
          autoHideDelay: 5000,
          variant: "warning", // info success danger
        });
        return false;
      }
      return true;
    },
    async confirm() {
      if (!this.checkInput()) {
        return;
      }
      try {
        this.isBondAndNominating = true
        const { community, project } = this.crowdstaking
        await bondAndNominate(
          this.inputAmount,
          project.validators,
          community.communityId,
          project.projectId,
          (info, param) => {
            this.$bvToast.toast(info, param);
          },
          () => {
            this.$emit("hideBondAndNominate");
          }
        );
      } catch (e) {
        console.log("eee", e);
        this.$bvToast.toast(e.message, {
          title: this.$t("tip.error"),
          autoHideDelay: 5000,
          variant: "danger",
        });
      } finally {
        this.isBondAndNominating = false
      }
    },
  },
  mounted() {
  },
};
</script>

<style lang="less">
.tip-modal {
  position: relative;
  .close-btn {
    position: absolute;
    right: 0;
    width: 1rem;
    height: 1rem;
  }
  .primary-btn {
    width: 100%;
  }
  .big {
    background-image: linear-gradient(
      to right,
      var(--primary-custom),
      var(--primary-custom)
    );
    background-size: 90% 50%;
    background-repeat: no-repeat;
    background-position-y: bottom;
    background-position-x: 50%;
  }
}
.bondInfo {
  text-align: left;
  margin-bottom: 0px;
}
</style>
