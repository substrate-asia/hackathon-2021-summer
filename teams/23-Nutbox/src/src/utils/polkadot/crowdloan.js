import {
  u8aConcat,
  u8aToHex,
} from "@polkadot/util"
import {
  blake2AsU8a,
  encodeAddress,
} from "@polkadot/util-crypto"
import BN from "bn.js"
import store from "@/store"

import {
  getApi,
} from './polkadot'
import { withdraw as w, contribute as c, calStatus } from '@/utils/commen/crowdloan'
import { DECIMAL } from '@/constant'

function createChildKey(trieIndex) {
  return u8aToHex(
    u8aConcat(
      ':child_storage:default:',
      blake2AsU8a(
        u8aConcat('crowdloan', trieIndex.toU8a())
      )
    )
  );
}

export const subscribeFundInfo = async (crowdloanCard) => {
  let unsubFund = store.state.rococo.subFund
  if (unsubFund) {
    try {
      unsubFund()
    } catch (e) {}
  } else {
    store.commit('rococo/saveLoadingFunds', true)
  }
  let paraId = crowdloanCard.map(c => parseInt(c.para.paraId))
  paraId = [...new Set(paraId)]
  const api = await getApi()
  try {
    unsubFund = (await api.query.crowdloan.funds.multi(paraId, async (unwrapedFunds) => {
      const bestBlockNumber = (await api.derive.chain.bestNumber()).toNumber()
      let funds = []
      for (let i = 0; i < unwrapedFunds.length; i++) {
        const fund = unwrapedFunds[i]
        const pId = paraId[i]
        if (!fund.toJSON()) {
          continue
        }
        unwrapedFunds[i] = unwrapedFunds[i].unwrap()
        unwrapedFunds[i].paraId = pId
      }
      funds = await Promise.all(unwrapedFunds.map(fund => {
        console.log('fund', fund);
        return new Promise(async(res)=>{
          const pId = fund.paraId;
          const unwrapedFund = fund
          const {
            cap,
            depositor,
            end,
            firstPeriod,
            lastPeriod,
            raised,
            trieIndex
          } = unwrapedFund
          console.log('index', pId, trieIndex.toNumber());
          // const childKey = createChildKey(trieIndex)
          // const keys = await api.rpc.childstate.getKeys(childKey, '0x')
          // const ss58keys = keys.map(k => encodeAddress(k, 0))
          // const values = await Promise.all(keys.map(k => api.rpc.childstate.getStorage(childKey, k)))
          // const contributions = values.map((v, idx) => ({
          //   contributor: ss58keys[idx],
          //   amount: BN(api.createType('(Balance, Vec<u8>)', v.unwrap())[0]),
          //   memo: api.createType('(Balance, Vec<u8>)', v.unwrap())[1].toHuman()
          // }))

          
          const [status, statusIndex] = await calStatus('polkadot', end, firstPeriod, lastPeriod, raised, cap, pId, bestBlockNumber)
          res({
            paraId: pId,
            status,
            statusIndex,
            cap: new BN(cap),
            depositor,
            end: new BN(end),
            firstPeriod: new BN(firstPeriod),
            lastPeriod: new BN(lastPeriod),
            raised: new BN(raised),
            trieIndex,
            funds: contributions
          })
        })
      }))
      // for (let i = 0; i < unwrapedFunds.length; i++) {
      //   const fund = unwrapedFunds[i]
      //   const pId = paraId[i]
      //   if (!fund.toJSON()) {
      //     continue
      //   }
      //   unwrapedFunds[i].paraId = pId
      //   const unwrapedFund = fund.unwrap()
      //   const {
      //     deposit,
      //     cap,
      //     depositor,
      //     end,
      //     firstPeriod,
      //     lastPeriod,
      //     raised,
      //     trieIndex
      //   } = unwrapedFund
      //   console.log('index', pId, trieIndex.toNumber());
      //   const childKey = createChildKey(trieIndex)
      //   const keys = await api.rpc.childstate.getKeys(childKey, '0x')
      //   const ss58keys = keys.map(k => encodeAddress(k, 0))
      //   const values = await Promise.all(keys.map(k => api.rpc.childstate.getStorage(childKey, k)))
      //   const contributions = values.map((v, idx) => ({
      //     contributor: ss58keys[idx],
      //     amount: BN(api.createType('(Balance, Vec<u8>)', v.unwrap())[0]),
      //     memo: api.createType('(Balance, Vec<u8>)', v.unwrap())[1].toHuman()
      //   }))
      //   const [status, statusIndex] = await calStatus('polkadot', end, firstPeriod, lastPeriod, raised, cap, pId, bestBlockNumber)
      //   funds.push({
      //     paraId: pId,
      //     status,
      //     statusIndex,
      //     cap: new BN(cap),
      //     depositor,
      //     end: new BN(end),
      //     firstPeriod: new BN(firstPeriod),
      //     lastPeriod: new BN(lastPeriod),
      //     raised: new BN(raised),
      //     trieIndex,
      //     funds: contributions
      //   })
      // }
      funds = funds.sort((a, b) => a.statusIndex - b.statusIndex)
      const idsSort = funds.map(f => f.paraId)
      if (funds.length > 0) {
        const showingcrowdloanCard = crowdloanCard.filter(c => idsSort.indexOf(parseInt(c.para.paraId)) !== -1).sort((a, b) => idsSort.indexOf(parseInt(a.para.paraId)) - idsSort.indexOf(parseInt(b.para.paraId)))
        store.commit('rococo/saveClProjectFundInfos', funds)
        store.commit('rococo/saveShowingCrowdloan', showingcrowdloanCard)
      } else {
        store.commit('rococo/saveSubFund', null);
      }
      store.commit('rococo/saveLoadingFunds', false)
    }));
    store.commit('rococo/saveSubFund', unsubFund);
  } catch (e) {
    console.error('error', e);
    store.commit('rococo/saveLoadingFunds', false)
  }
}



export const withdraw = async (paraId, toast, callback) => {
   await w('rococo', paraId, toast, callback)
}


export const contribute = async (paraId, amount, communityId, childId, trieIndex, toast, callback) => {
    await c('rococo', paraId, amount, communityId, childId, trieIndex, toast, callback)
}
