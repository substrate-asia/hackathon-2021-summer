<template>
  <div>
    <span>
      {{ items && items[0] }}
    </span>
    <span class="text-grey-light">
      {{ items && items[1] }}
    </span>
    <span>
      {{ items && items[2] }}
    </span>
    <span v-show="!isBalance" class="text-grey-light">
      {{ items && items[3] }}
    </span>
    <span v-show="!isBalance">
      {{ items && items[4] }}
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { POLKADOT_RELAYCHAIN_SYMBOL } from '@/constant'
import BN from "bn.js";
export default {
  props: {
    fund: {
      type:Object,
    },
    relaychain: {
      type: String,
      default: 'kusama'
    },
    isBalance: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('polkadot', ["account"]),
    items() {
      if (!this.fund) return;
      let raised;
      let cap;
      if (this.isBalance){
        const myData = this.fund.funds.filter(c=>c.contributor == this.account.address)
        if (myData.length === 0){
          raised = new BN(0);
        }else{
          raised = myData[0].amount
        }
        cap = this.balance
        raised = this.convertUni(raised)
        cap = this.convertUni(cap)
      }else{
        raised = this.convertUni(this.fund.raised);
        cap = this.convertUni(this.fund.cap);
      }
      const raisedStr = this.formatBanlance(raised[0]);
      const capStr = this.formatBanlance(cap[0]);
      return [
        raisedStr[0],
        raisedStr[1],
        this.isBalance ? raised[1] + POLKADOT_RELAYCHAIN_SYMBOL[this.relaychain] : raised[1] + "/" + capStr[0],
        capStr[1],
        cap[1] + POLKADOT_RELAYCHAIN_SYMBOL[this.relaychain],
      ];
    },
  },
  methods: {
    convertUni(uni) {
      let unit = " ";
      uni = new BN(uni)
      uni = uni.div(new BN(10).pow(new BN(this.relaychain === 'polkadlot' ? 10 :12).sub(new BN(4))))

      if (uni >= 1e22) {
        uni = uni.div(new BN(1e18));
        unit = " E";
      } else if (uni >= 1e19) {
        uni = uni.div(new BN(1e15));
        unit = " P";
      } else if (uni >= 1e16) {
        uni = uni.div(new BN(1e12));
        unit = " T";
      } else if (uni >= 1e13) {
        uni = uni.div(new BN(1e9));
        unit = " B";
      } else if (uni >= 1e10) {
        uni = uni.div(new BN(1e6));
        unit = " M";
      } else if (uni >= 1e7) {
        uni = uni.div(new BN(1e3))
        unit = " K" 
      }
      return [uni, unit];
    },

    formatBanlance(value) {
      if (!value) return ["0.", "0000"];
      const str = parseFloat(value / 1e4).toFixed(4).toString();
      const integer = str.split(".")[0];
      const fraction = str.split(".")[1];
      return [integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".", fraction];
    },
  },
};
</script>

<style lang="less" scoped>
</style>