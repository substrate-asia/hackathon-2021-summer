<template>
  <div class="scroll-content">
    <div class="ksm-wallet">
      <div class="balance-box row">
        <div class="col-xl-4 col-md-6 mb-2">
          <BalanceView
            name="ROC"
            :balances="balance / 1e12"
            desc="ROC"
            :logo="rocLogo"
            :transfer="true"
          />
        </div>
      </div>
      <UserContributions>
        <template #title>
          <div class="item-title">
            {{ $t("wallet.contribution") }}
          </div>
        </template>
      </UserContributions>
    </div>
  </div>
</template>

<script>
import BalanceView from "@/components/Wallet/Rococo/BalanceView";
import UserContributions from "@/components/Wallet/Rococo/UserContributions";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      rocLogo: require("../../static/images/tokens/roc.png"),
    };
  },
  computed: {
    ...mapState("rococo", ["balance"]),
  },
  components: {
    BalanceView,
    UserContributions,
  },
  async mounted() {},
};
</script>

<style lang="less" scoped>

</style>
