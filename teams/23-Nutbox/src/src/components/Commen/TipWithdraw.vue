<template>
  <div class="tip-modal">
    <img
      class="close-btn"
      src="~@/static/images/close.svg"
      alt=""
      @click="hide"
    />
    <div class="tip-contribute">
      <div class="text-center font20">{{ $t('cl.youWillWithdraw')}}</div>
      <div class="tip-withdraw mt-3 mb-1">
        {{ contributed + " ROC" }}
      </div>
      <button
        class="primary-btn"
        @click="withdrawClick"
        :disabled="isWithdraw"
      >
      <b-spinner small type="grow" v-show="isWithdraw"></b-spinner>
        {{ $t('cl.confirm') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { withdraw as pW } from "@/utils/polkadot/crowdloan";
import { withdraw as kW, withdraw } from '@/utils/kusama/crowdloan';
import { withdraw as rW } from "@/utils/rococo/crowdloan";
import BN from "bn.js";
import { formatBalance } from "@/utils/helper"

export default {
  props: {
    fund: {
      type: Object
    },
    relaychain: {
      type: String,
      default: 'kusama'
    }
  },
  data() {
    return {
      isWithdraw: false,
      contributed:0.0000
    };
  },
  computed: {
    ...mapState('polkadot', ["account"]),
    ...mapGetters('rococo', ["fundInfo"]),
  },
  async mounted () {
    const fund = this.fund;
      const contributions = fund.funds
        .filter((c) => c.contributor === this.account.address)
        .reduce((total, c) => total.add(c.amount), new BN(0)) / 1e12;
        
        this.contributed = await formatBalance(contributions)
  },
  methods: {
    hide() {
      if (this.isWithdraw) return;
      this.$emit("hideWithdraw");
    },
    async withdrawClick() {
      if (this.contributed <= 0){
        this.$bvToast.toast(this.$t('tip.noNeedWithdraw'), {
          title: this.$t('tip.tips'),
          variant: 'info'
        })
        return
      }
      try {
        this.isWithdraw = true
        const withdraw = {
          polkadot: pW,
          kusama: kW,
          rococo: rW
        }
        const res = await withdraw[this.relaychain](this.fund.paraId, (info, param) => {
          this.$bvToast.toast(info, param);
        },()=>{
          this.$emit("hideWithdraw");
        });
      } catch (e) {
        this.$bvToast.toast(e.message, {
          title: this.$t('tip.error'),
          variant: "danger",
        });
      } finally{
        this.isWithdraw = false
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tip-withdraw {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(255, 91, 77, 1);
  text-align: center;
}
</style>
