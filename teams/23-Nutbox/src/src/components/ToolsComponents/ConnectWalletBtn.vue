<template>
  <div class="connect-wallet">
    <b-button
      class="login-btn"
      variant="primary"
      :style="'width:'+width+'px;'"
      @click="unlock"
      :disabled="isConnecting"
      v-if="
        type == 'STEEM'
          ? !steemAccount || steemAccount.length === 0
          : !isConnectTron
      "
    >
    <b-spinner small type="grow" v-show="isConnecting"></b-spinner>
      <!-- <b-button variant="primary" @click="unlock"> -->
      {{
        type == "STEEM" ? $t("wallet.connectSteem") : $t("wallet.connectTron")
      }}
    </b-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { sleep } from '../../utils/helper'
import { TRON_LINK_ADDR_NOT_FOUND } from '../../config'

export default {
  name: "ConnectWalletBtn",
  data() {
    return {
      isConnecting:false
    };
  },
  props: {
    type: {
      type: String,
      default: "STEEM",
    },
    width: {
      type: String,
      default: "272"
    }
  },
  computed: {
    ...mapState(["steemAccount", "tronAddress"]),
    isConnectTron() {
      return (
        this.tronAddress &&
        this.tronAddress.length > 0 &&
        this.tronAddress !== TRON_LINK_ADDR_NOT_FOUND.noTronLink &&
        this.tronAddress !== TRON_LINK_ADDR_NOT_FOUND.walletLocked
      );
    },
  },
  methods: {
    async unlock() {
      if (this.type === "STEEM") {
        this.$emit("steemLogin");
      } else {
        // loading
        this.$emit("tronLogin");
        this.isConnecting = true;
        await sleep(4);
        this.isConnecting= false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.connect-wallet {
  z-index: 999;
}
button {
  margin-top: 24px;
  width: 272px;
  height: 48px;
}
</style>