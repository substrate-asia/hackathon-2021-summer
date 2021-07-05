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
} from './rococo'
import {
  withdraw as w,
  contribute as c,
  calStatus
} from '@/utils/commen/crowdloan'

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
        unwrapedFunds[i].pId = pId
      }
      const storedFunds = [...store.state.rococo.clProjectFundInfos]
      funds = await Promise.all(unwrapedFunds.map(fund => {
        return new Promise(async (res) => {
          const {
            pId,
            cap,
            depositor,
            end,
            firstPeriod,
            lastPeriod,
            raised,
            trieIndex
          } = fund
          console.log('index', pId, trieIndex.toNumber());
          const [status, statusIndex] = await calStatus('kusama', end, firstPeriod, lastPeriod, raised, cap, pId, bestBlockNumber)
          let contributions = []
          // 如果有缓存，先直接用已经缓存的contribution数据
          if (storedFunds && storedFunds.length > 0) {
            const f = storedFunds.filter(a => a.paraId === pId)
            if (f && f.length > 0) {
              contributions = f[0].funds || []
            }
          }
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
      funds = funds.sort((a, b) => a.statusIndex - b.statusIndex)
      const idsSort = funds.map(f => f.paraId)
      if (funds.length > 0) {
        const showingcrowdloanCard = crowdloanCard.filter(c => idsSort.indexOf(parseInt(c.para.paraId)) !== -1).sort((a, b) => idsSort.indexOf(parseInt(a.para.paraId)) - idsSort.indexOf(parseInt(b.para.paraId)))
        store.commit('rococo/saveClProjectFundInfos', funds)
        store.commit('rococo/saveShowingCrowdloan', showingcrowdloanCard)
        // 异步加载投票数据
        handleContributors(api, funds)
      } else {
        store.commit('rococo/saveSubFund', null);
      }
      store.commit('rococo/saveLoadingFunds', false)
    }));
    store.commit('rococo/saveSubFund', unsubFund);
  } catch (e) {
    console.log('error', e);
    store.commit('rococo/saveLoadingFunds', false)
  }
}

// 此过程最慢，使用异步加载的方式
export const handleContributors = async (api, funds) => {
  try {
    const updateFunds = await Promise.all(funds.map(fund => {
      return new Promise(async (res) => {
        const childKey = createChildKey(fund.trieIndex)
        const keys = await api.rpc.childstate.getKeys(childKey, '0x')
        const ss58keys = keys.map(k => encodeAddress(k, 0))
        const values = await Promise.all(keys.map(k => api.rpc.childstate.getStorage(childKey, k)))
        const contributions = values.map((v, idx) => ({
          contributor: ss58keys[idx],
          amount: BN(api.createType('(Balance, Vec<u8>)', v.unwrap())[0]),
        }))
        fund.funds = contributions || []
        res(fund)
      })
    }))
    store.commit('rococo/saveClProjectFundInfos', updateFunds)
  } catch (e) {
    console.log(4523, e);
  }
}

export function loadFunds(res) {
  let funds = [];
  // 预先展示服务器请求的数据
  for (const crowdloan of res) {
    const fund = crowdloan.para
    funds.push({
      paraId: parseInt(fund.paraId),
      status: fund.status,
      statusIndex: fund.statusIndex,
      cap: new BN(fund.cap),
      end: new BN(fund.end),
      firstPeriod: new BN(fund.firstPeriod),
      lastPeriod: new BN(fund.lastPeriod),
      raised: new BN(fund.raised),
      trieIndex: new BN(fund.trieIndex),
      funds: [],
    });
  }
  // 调整显示顺序
  const idsSort = funds.map(f => f.paraId)
  const showingcrowdloanCard = res.filter(c => idsSort.indexOf(parseInt(c.para.paraId)) !== -1).sort((a, b) => idsSort.indexOf(parseInt(a.para.paraId)) - idsSort.indexOf(parseInt(b.para.paraId)))
  store.commit("rococo/saveClProjectFundInfos", funds);
  store.commit("rococo/saveShowingCrowdloan", showingcrowdloanCard);
  store.commit("rococo/saveLoadingFunds", false)
  subscribeFundInfo(res)
}

export const withdraw = async (paraId, toast, callback) => {
  return await w('rococo', paraId, toast, callback)
}


export const contribute = async (paraId, amount, communityId, childId, trieIndex, toast, callback) => {
  return await c('rococo', paraId, amount, communityId, childId, trieIndex, toast, callback)
}
