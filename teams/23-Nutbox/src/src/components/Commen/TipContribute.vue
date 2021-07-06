<template>
  <div class="tip-modal">
    <img
      class="close-btn"
      src="~@/static/images/close.svg"
      alt=""
      @click="hide"
    />
    <div class="tip-contribute">
      <div class="text-center mb-4 font20" v-if="lang==='en'">
        Contribute to<span class="big"> {{ paraName }} </span>crowdloan fund<br />
        in<span class="big"> {{ getChain }} </span>network
      </div>
      <div class="text-center mb-4 font20" v-else>
        为<span class="big"> {{ paraName }} </span>项目<br/>
        在<span class="big"> {{ getChain }} </span>网络中的平行链竞拍投票
      </div>
      <div class="text-center mb-4 font14" style="color: red;">
        {{ $t('tip.tokenSafeTip', {symbol: getChain}) }}
      </div>
      <div class="input-group-box">
        <div class="label flex-between-start">
         <span>{{ $t('cl.amount')}}</span>
         <span style="min-width: 5rem">{{ $t('wallet.balance') }}: {{ fbBalance }}</span>
        </div>
        <div class="input-bg flex-between-center">
          <input
            type="number"
            v-model="inputAmount"
            :placeholder="$t('cl.inputAmount')"
          />
          <span class="text-right">{{ symbol }}</span>
        </div>
      </div>
      <div class="input-group-box">
        <div class="label">{{ $t('cl.nominator')}}</div>
        <div class="input-bg flex-between-center">
          <input
            type="text"
            v-model="inputNonimator"
            :placeholder="$t('cl.inputNominator')"
          />
          <span class="text-grey text-right" style="opacity: 0.4">{{ $t('cl.optional') }}</span>
        </div>
      </div>
      <button class="primary-btn" @click="confirm" :disabled="isComtribution">
        <b-spinner small type="grow" v-show="isComtribution"></b-spinner>{{ $t('cl.confirm') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { contribute as pC } from "@/utils/polkadot/crowdloan"
import { contribute as kC } from "@/utils/kusama/crowdloan"
import { contribute as rC } from "@/utils/rococo/crowdloan"
import { formatBalance as fbp } from "@/utils/polkadot/polkadot"
import { formatBalance as fbk } from "@/utils/kusama/kusama"
import { formatBalance as fbr } from "@/utils/rococo/rococo"

import BN from "bn.js";
import { stanfiAddress } from '@/utils/commen/account';
import { POLKADOT_RELAYCHAIN_SYMBOL } from '@/constant'
import { POLKADTO_ADDRESS_FORMAT_CODE } from '@/config'


export default {
  data() {
    return {
      inputAmount: "",
      inputNonimator: "",
      isComtribution: false,
    };
  },
  props: {
    communityId: {
      type: String,
    },
    paraName:{
      type: String,
    },
    fund: {
      type: Object
    },
    relaychain: {
      type:String,
      default: 'kusama'
    },
    communityNominatorId: {
      type: String
    }
  },
  computed: {
    ...mapState(['lang']),
    getChain (){
      return this.relaychain.toUpperCase()
    },
    paraId(){
      return this.fund.paraId
    },
    symbol(){
      console.log(this.relaychain);
      return POLKADOT_RELAYCHAIN_SYMBOL[this.relaychain.toLowerCase()]
    },
    balance(){
      switch (this.relaychain){
        case 'polkadot':
          return this.$store.getters["polkadot/available"]
        case 'kusama':
          return this.$store.getters['kusama/available']
        default:
          return this.$store.state.rococo.balance
      }
    },
    fbBalance(){
      switch (this.relaychain){
        case 'polkadot':
          return fbp(this.balance)
          case 'kusama':
            return fbk(this.balance)
          case 'rococo':
            return fbr(this.balance)
      }
    }
  },
  methods: {
    hide() {
      // if (this.isComtribution) return;
      this.$emit("hideContribute");
    },
    checkInput() {
      const reg = /^\d+(\.\d+)?$/;
      const res = reg.test(this.inputAmount);
      if (!res) {
        this.$bvToast.toast("Input error!", {
          title: this.$t('tip.tips'),
          autoHideDelay: 5000,
          variant: "warning", // info success danger
        });
        return false;
      }
      // check nominator address
      this.inputNonimator = this.inputNonimator?.trim()
      if (
        this.inputNonimator &&
        this.inputNonimator.length > 0 &&
        this.inputNonimator != stanfiAddress(this.inputNonimator, POLKADTO_ADDRESS_FORMAT_CODE[this.relaychain])
      ) {
        this.$bvToast.toast(this.$t('tip.inputAddressType',{relaychain: this.relaychain.toUpperCase()}), {
          title: this.$t('tip.tips'),
          autoHideDelay: 5000,
          variant: "warning", // info success danger
        });
        return false;
      }

      const amount = parseFloat(this.inputAmount);
      const mins = {
        polkadot: 1.0000,
        kusama: 0.0999,
        rococo:1
      }
      if (amount < mins[this.relaychain]) {
        this.$bvToast.toast(
          this.$t('tip.belowMinContribution', {min: mins[this.relaychain].toFixed(4)}),
          {
            title: this.$t('tip.tips'),
            autoHideDelay: 5000,
            variant: "warning",
          }
        );
        return;
      }

      // below cap
      const fund = this.fund;
      const raised = fund.raised;
      const cap = fund.cap;
      const gap = cap.sub(raised);
      if (gap.lt(new BN(amount))) {
        this.$bvToast.toast(this.$t('tip.outOfCap'), {
          title: this.$t('tip.tips'),
          autoHideDelay: 5000,
          variant: "warning", // info success danger
        });
        return false;
      }
      if (this.balance.lte(new BN(amount).mul(new BN(10).pow(new BN(this.relaychain === 'polkadot' ? 10 : 12))))) {
        this.$bvToast.toast(this.$t('tip.insufficientBalance'), {
          title: this.$t('tip.tips'),
          autoHideDelay: 5000,
          variant: "warning", // info success danger
        });
        return false;
      }
      return true;
    },
    async confirm() {
      this.isComtribution = true;
      console.log('sign');
      if (!this.checkInput()) {
        this.isComtribution = false
        return;
      }
      try {
        this.$bvToast.toast(this.$t('tip.signing'), {
          title: this.$t('tip.tips'),
          autoHideDelay: 6000,
          variant: "warning",
        });
        this.isComtribution = true;
        const trieIndex = this.fund.trieIndex;
        const contribute = {
          polkadot: pC,
          kusama: kC,
          rococo: rC
        }
        const res = await contribute[this.relaychain](
          this.paraId,
          parseFloat(this.inputAmount),
          this.communityId,
          this.inputNonimator,
          trieIndex,
          (info, param) => {
            this.$bvToast.toast(info, param);
          },
          () => {
            this.$emit("hideContribute");
          }
        );
      } catch (e) {
        console.log("eee", e);
        this.$bvToast.toast(e.message, {
          title: this.$t('tip.error'),
          autoHideDelay: 5000,
          variant: "danger",
        });
      } finally {
        this.isComtribution = false;
      }
    },
  },
  mounted() {
    if (this.communityNominatorId) {
      this.inputNonimator = stanfiAddress(this.communityNominatorId, 2)
    }
  },
};
</script>

<style lang="less">
</style>
