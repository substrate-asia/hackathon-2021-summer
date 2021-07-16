<template>
  <div class="scroll-content">
    <div class="ksm-wallet">
<!--      <p class="item-title">-->
<!--        {{ $t("wallet.asset") }}-->
<!--      </p>-->
      <div class="balance-box row">
        <div class="col-xl-4 col-md-6 mb-2">
          <BalanceView
            name="DOT"
            :balances="available / 1e10"
            desc="DOT"
            :logo="dotLogo"
            :transfer="true"
          />
        </div>
        <div class="col-xl-4 col-md-6 mb-2">
          <LockedBalanceView
            name="DOT"
            :balances="locked / 1e10"
            desc="Locked DOT"
            :logo="dotLogo"
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
      <UserNominations>
        <template #title>
          <div class="item-title">{{ $t("wallet.nomination") }}</div>
        </template>
      </UserNominations>
    </div>
  </div>
</template>

<script>
import BalanceView from "@/components/Wallet/Polkadot/BalanceView";
import LockedBalanceView from "@/components/Wallet/Polkadot/LockedBalanceView";
import { mapState, mapGetters } from "vuex";
import UserNominations from "@/components/Wallet/Polkadot/UserNominations";
import UserContributions from "@/components/Wallet/Polkadot/UserContributions"

export default {
  data() {
    return {
      dotLogo: require("../../static/images/tokens/dot.png"),
    };
  },
  computed: {
    ...mapState("polkadot", ["balance", "locked"]),
    ...mapGetters("polkadot", ["available"]),
  },
  components: {
    BalanceView,
    UserNominations,
    LockedBalanceView,
    UserContributions
  },
  async mounted() {},
};
</script>

<style lang="less" scoped>

</style>
