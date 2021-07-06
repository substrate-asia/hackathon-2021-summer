import {
  isHex,
  hexToU8a,
} from "@polkadot/util"
import {
  encodeAddress,
  decodeAddress,
} from "@polkadot/util-crypto"
import store from '@/store'
import { waitingCustomApi } from './api'
import { BN } from "bn.js"

// 将地址统一成polkadot的格式
export const stanfiAddress = (address, type = 0) => {
  try {
    return encodeAddress(
      isHex(address) ?
      hexToU8a(address) :
      decodeAddress(address),
      type
    );
  } catch (e) {
    return false
  }
}

/**
 * subscripte custom token balance
 * @param {*} reward 
 */
export const subCustomBalance = async (reward) => {
  const { node,  name, pallet } = reward
  if (!node || !pallet){
    return
  } 
  let sub = store.state.subCustomBalance[name]
  try{
    sub()
  }catch(e){console.log}
  const api = await waitingCustomApi(node)
  sub = await api.query[pallet].account(store.state.polkadot.account.address, (res) => {
    const balance = res.data ? res.data.free : res.free
    const customBalance = store.state.customBalance
    customBalance[name] = new BN(balance)
    store.commit('saveCustomBalance', customBalance)
  })
  store.commit('saveSubCustomBalance', {name, subBalance: sub})
}
