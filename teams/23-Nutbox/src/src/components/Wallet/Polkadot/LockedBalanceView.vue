<template>
  <div>
    <Card>
      <div class="top">
        <img :src="logo" alt="" class="icon" />
        <div class="balance-right">
          <div class="balance-name">
            <span class="title">
              {{ name }}
            </span>
            <div>
              <span style="font-size: 12px; color: var(--secondary-text)">
                {{ desc }}
              </span>
            </div>
          </div>
          <div class="balance">
            <span class="title">
              {{ balances | amountForm(4) }}
            </span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <b-button variant="primary" @click="showUnbond=true" :disabled='parseFloat(balances) < 0.0001'>
          {{ $t('wallet.unBond') }}
        </b-button>
        <!-- <b-button variant="primary" @click="redeem" :disabled='parseFloat(balances) < 0.0001'>
          {{ $t('wallet.redeem') }}
        </b-button> -->
      </div>
    </Card>
      <b-modal
      v-model="showUnbond"
      modal-class="custom-modal"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
    >
      <TipUnbond @hideBond="showUnbond = false" />
    </b-modal>
  </div>
</template>

<script>
import Card from "@/components/ToolsComponents/Card";
import TipUnbond from "./TipUnbond"
import { mapState } from "vuex"

export default {
  name: "BalanceView",
  data() {
    return {
      showTransfer: false,
      showUnbond: false
    };
  },
  props: {
    name: {
      type: String,
      default: "DOT",
    },
    balances: {
      type: Number,
      default: 0.00,
    },
    logo: {
      type: String,
      default: "",
    },
    transfer:{
      type: Boolean,
      default: true
    },
    walletType: {
      type: String,
      default: "DOT", // 0:steem  1: tron
    },
    desc: {
      type: String,
      default: "DOT",
    },
    balanceDigit: {
      type: Number,
      default: 4,
    },
    address: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState('polkadot', ['redeemable'])
  },
  components: {
    Card,
    TipUnbond
  },
  methods: {
    redeem(){

    }
  },
};
</script>

<style lang="scss" scoped>
@import "src/static/css/walletBalanceCard";
button {
  flex: 1;
}
</style>
