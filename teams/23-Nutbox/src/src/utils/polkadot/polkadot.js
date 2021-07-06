import BN from "bn.js"
import store from "../../store"
import { waitApi } from '@/utils/commen/api'

export async function getApi() {
  return await waitApi('polkadot')
}

export const formatBalance = (b) => {
  let uni = new BN(b)
  let unit = ' '
  if (uni >= 1e28) {
    uni = uni.div(new BN(1e24));
    unit = " E";
  } else if (uni >= 1e25) {
    uni = uni.div(new BN(1e21));
    unit = " P";
  } else if (uni >= 1e22) {
    uni = uni.div(new BN(1e18));
    unit = " T";
  } else if (uni >= 1e19) {
    uni = uni.div(new BN(1e15));
    unit = " B";
  } else if (uni >= 1e16) {
    uni = uni.div(new BN(1e12))
    unit = " M";
  } else if (uni >= 1e13) {
    uni = uni.div(new BN(1e9))
    unit = " K"
  } else if (uni >= 1e9) {
    uni = uni.div(new BN(1e6))
  } else if (uni >= 1e6) {
    uni = uni.div(new BN(1e3))
    unit = " milli "
  }
  uni = parseFloat(uni)
  uni = (uni / 1e4).toFixed(4)
  return uni + unit + 'DOT';
}

/**
 * 估计交易的手续费
 * @param {object} tx 待执行的交易 
 */
export async function getTxPaymentInfo(tx) {
  const info = await tx.paymentInfo(store.state.polkadot.account.address)
  console.log(info.partialFee.toHuman());
  return info.partialFee.toNumber()
}
