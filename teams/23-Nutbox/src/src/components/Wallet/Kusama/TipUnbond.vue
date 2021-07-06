<template>
  <div class="tip-modal">
    <img
      class="close-btn"
      src="~@/static/images/close.svg"
      alt=""
      @click="hide"
    />
    <div class="tip-contribute">
      <div class="text-center mb-4 font20 font-bold">
        {{ $t("wallet.unBond") }}
      </div>
      <div class="input-group-box">
        <div class="label">{{ $t("wallet.unbindAmount") }}</div>
        <div class="bind-input">
          <div class="balance flex-between-center">
            <span>{{ $t("wallet.balance") }}</span>
            <span class="text-right">{{ locked / 1e10 | amountForm(4) }} KSM</span>
          </div>
          <input type="number" v-model="inputAmount" :placeholder="$t('wallet.inputAmount')" class="font24"/>
        </div>
      </div>
      <button class="primary-btn" @click="confirm" :disabled="isUnBonding">
        <b-spinner small type="grow" v-show="isUnBonding"></b-spinner
        >{{ $t("cs.confirm") }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import BN from "bn.js";
import { unBond } from "@/utils/kusama/account";

export default {
  data() {
    return {
      inputAmount: "",
      inputNonimator: "",
      paraTokenSymbol: "",
      isUnBonding: false,
    };
  },
  computed: {
    ...mapState(['lang']),
    ...mapState('kusama',["locked"]),
  },
  methods: {
    hide() {
      if (this.isUnBonding) return;
      this.$emit("hideBond");
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

      if (this.locked.lte(new BN(amount*1e4).mul(new BN(1e8)))) {
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
        this.isUnBonding = true
        await unBond(
          this.inputAmount,
          (info, param) => {
            this.$bvToast.toast(info, param);
          },
          () => {
            this.$emit("hideBond");
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
        this.isUnBonding = false
      }
    },
  },
  mounted() {
  },
};
</script>

<style lang="less" scoped>
.bind-input {
  background: rgba(246, 247, 249, 1);
  border-radius: .8rem;
  .balance {
    padding: .8rem .8rem 0;
    color: #717376;
    font-size: .7rem;
  }
}
.bondInfo {
  text-align: left;
  margin-bottom: 0;
}
.primary-btn {
  margin-bottom: .6rem;
}
</style>
