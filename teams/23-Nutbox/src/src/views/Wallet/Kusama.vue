<template>
  <div class="scroll-content">
    <div class="ksm-wallet">
<!--      <p class="item-title">-->
<!--        {{ $t("wallet.asset") }}-->
<!--      </p>-->
      <div class="balance-box row">
        <div class="col-xl-4 col-md-6 mb-2">
          <BalanceView
            name="KSM"
            :balances="available / 1e12"
            desc="KSM"
            :logo="ksmLogo"
            :transfer="true"
          />
        </div>
        <div class="col-xl-4 col-md-6 mb-2">
          <LockedBalanceView
            name="KSM"
            :balances="locked / 1e12"
            desc="Locked KSM"
            :logo="ksmLogo"
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
import BalanceView from "@/components/Wallet/Kusama/BalanceView";
import LockedBalanceView from "@/components/Wallet/Kusama/LockedBalanceView";
import UserContributions from "@/components/Wallet/Kusama/UserContributions";
import UserNominations from "@/components/Wallet/Kusama/UserNominations"
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      ksmLogo: require("../../static/images/tokens/ksm.png"),
    };
  },
  computed: {
    ...mapState("kusama", ["balance", "locked"]),
    ...mapGetters("kusama", ["available"]),
  },
  components: {
    BalanceView,
    UserContributions,
    LockedBalanceView,
    UserNominations
  },
  async mounted() {},
};
</script>

<style lang="less" scoped>

</style>
