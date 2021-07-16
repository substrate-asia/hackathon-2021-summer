<template>
  <div class="tip-modal">
    <img
      class="close-btn"
      src="~@/static/images/close.svg"
      alt=""
      @click="hide"
    />
    <div class="tip-transfer">
      <div class="text-center font20 font-bold">
        {{ $t("wallet.transfer") }}
      </div>
      <div class="modal-h-line"></div>
      <div class="input-group-box">
        <div class="label">{{$t('wallet.receiveAddress')}}</div>
        <div class="flex-between-center">
          <input type="string" v-model="inputAddress" :placeholder="$t('tip.inputAddressType', {relaychain: 'KUSAMA'})" class="font16" />
        </div>
      </div>
      <div class="input-group-box">
        <div class="label">{{ $t("wallet.transferAmount") }}</div>
        <div class="transfer-input">
          <div class="balance flex-between-center">
            <span>{{ $t("wallet.balance") }}</span>
            <span class="text-right"> {{ available / 1e12  | amountForm(6)}} KSM</span>
          </div>
          <input type="number" v-model="inputAmount" :placeholder="$t('wallet.inputAmount')" class="font24"/>
        </div>
      </div>
      <button class="primary-btn" @click="confirm" :disabled="isTransfering">
        <b-spinner small type="grow" v-show="isTransfering"></b-spinner
        >{{ $t("cs.confirm") }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import BN from "bn.js";
import { transfer } from "@/utils/kusama/account";
import { stanfiAddress } from "@/utils/commen/account"

export default {
  data() {
    return {
      inputAmount: "",
      inputAddress: '',
      paraTokenSymbol: "",
      isTransfering: false,
    };
  },
  computed: {
    ...mapGetters('kusama',["available"]),
  },
  methods: {
    hide() {
      if (this.isTransfering) return;
      this.$emit("hideTransfer");
    },
    checkInput() {
      const reg = /^\d+(\.\d+)?$/;
      const res = reg.test(this.inputAmount);
      if (!res) {
        this.$bvToast.toast("Input amount error!", {
          title: this.$t("tip.tips"),
          autoHideDelay: 5000,
          variant: "warning", // info success danger
        });
        return false;
      }
      const amount = parseFloat(this.inputAmount);

      if (this.inputAddress !== stanfiAddress(this.inputAddress, 2)) {
        this.$bvToast.toast(this.$t('tip.inputAddressType', {relaychain: 'KUSAMA'}), {
          title: this.$t('tip.tips'),
          autoHideDelay: 5000,
          variant: 'warning'
        })
        return false;
      }

      if (this.available.lte(new BN(amount).mul(new BN(1e12)))) {
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
        this.isTransfering = true
        await transfer(
          this.inputAddress,
          parseFloat(this.inputAmount),
          (info, param) => {
            this.$bvToast.toast(info, param);
          },
          () => {
            this.$emit("hideTransfer");
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
        this.isTransfering = false
      }
    },
  },
  mounted() {
  },
};
</script>

<style lang="less" scoped>
.transfer-input {
  background: rgba(246, 247, 249, 1);
  border-radius: .8rem;
  .balance {
    padding: .8rem .8rem 0;
    color: #717376;
    font-size: .7rem;
  }
}
.primary-btn {
  margin-bottom: .6rem;
}
</style>
