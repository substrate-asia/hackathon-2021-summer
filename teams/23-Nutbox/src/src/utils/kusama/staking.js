
import store from "@/store"

import {
  $t
} from '@/i18n'

import {
  getApi,
  getTxPaymentInfo
} from './kusama'
import { stanfiAddress } from '@/utils/commen/account'
/**
 * 监听用户的绑定储蓄账户
 */
export const subBonded = async () => {
  let subBonded = store.state.polkadot.subBonded
  try {
    subBonded()
  } catch (e) {}
  const api = await getApi()
  subBonded = await api.query.staking.bonded(store.state.polkadot.account.address, (bonded) => {
    if (!bonded.toJSON()) {
      store.commit('kusama/saveBonded', null)
      return;
    }
    store.commit('kusama/saveBonded', bonded.toJSON())
  })
  store.commit('kusama/saveSubBonded', subBonded)
}

/**
 * 监听用户的投票节点
 */
export const subNominators = async () => {
  let subNominators = store.state.kusama.subNominators
  try {
    subNominators()
  } catch (e) {}
  const api = await getApi()
  const {validators} = await api.derive.staking.overview()

  store.commit('polkadot/saveLoadingStaking', true)
// 获取用户投票的情况
  const nominators = await api.query.staking.nominators(store.state.polkadot.account.address, async (nominators) => {
    if (!nominators.toJSON()) {
      store.commit('kusama/saveNominators', [])
      store.commit('kusama/saveLoadingStaking', false)
      return;
    }
    // 获取节点的昵称
    let infos = await Promise.all(nominators.toJSON().targets.map(v => api.derive.accounts.info(v)))
    infos = infos.map(acc => {
      let nick = ''
      let address = stanfiAddress(acc.accountId)
      if (acc.identity?.displayParent){
        if (acc.identity?.display){
          nick = acc.identity.displayParent + ' (' + acc.identity.display + ')'
        }else{
          nick = acc.identity.displayParent
        }
      }else{
        nick = `${address.slice(0,16)}...${address.slice(-5)}`
      }
      return {
        address: stanfiAddress(acc.accountId),
        nick
      }
    })
    // 获取用户投票的节点的详细信息
    const currentEra = await api.query.staking.currentEra()
    for (let i = 0; i<infos.length; i++){
      const addr = infos[i].address
      const validatorStake = await api.query.staking.erasStakers(currentEra.toString(), addr)
      const validatorComissionRate = await api.query.staking.erasValidatorPrefs(currentEra.toString(), addr)
      const validatorTotalStake = parseInt(validatorStake['total'].toString() / 1e10)
      const validatorOwnStake = parseInt(validatorStake['own'].toString() / 1e10)
      const validatorNominators = validatorStake['others'].toJSON()
      infos[i]['otherStake'] = (validatorTotalStake - validatorOwnStake) + '(' + validatorNominators.length + ')'
      infos[i]['ownStake'] = validatorOwnStake
      infos[i]['commission'] = (validatorComissionRate['commission'].toString() / 10000000).toFixed(1) + '%'
    }
    store.commit('kusama/saveLoadingStaking', false)
    store.commit('kusama/saveNominators', infos)
  })
  store.commit('kusama/saveSubNominators', subNominators)
}

/**
 * 为社区投票, 适用已经有绑定的用户来操作
 * @param {Array} validators 要投票的节点列表（处理好的所有投票列表）
 * @param {string} communityId 社区id
 * @param {string} projectId 项目id
 * @param {function} toast toast
 * @param {function} callback callback
 */
export const nominate = async (validators, communityId, projectId, toast, callback) => {
    const from = store.state.polkadot.account && store.state.polkadot.account.address
    communityId = stanfiAddress(communityId)
    projectId = stanfiAddress(projectId)
    if (!from) {
      reject('no account')
    }
    const api = await getApi()
    const nominatorTx = api.tx.staking.nominate(validators)
    const remark = encodeRemark(communityId, projectId)
    const remarkTx = api.tx.system.remarkWithEvent(remark)
    const nonce = (await api.query.system.account(from)).nonce.toNumber()
  
    const unsub = await api.tx.utility
      .batch([nominatorTx, remarkTx]).signAndSend(from, {
        nonce
      }, ({
        status,
        dispatchError
      }) => {
        try {
          handelBlockState(api, status, dispatchError, toast, callback, unsub)
        } catch (e) {
          toast(e.message, {
            title: $t('tip.error'),
            variant: 'danger'
          })
        }
      })
}

/**
 *  绑定DOT，并为社区投票
 * @param {number} amount 要绑定的DOT数量， 以DOT为单位
 * @param {Array} validators 要投票的节点列表（处理好的所有投票列表）
 * @param {string} communityId 社区id
 * @param {string} projectId 项目id
 * @param {function} toast toast
 * @param {function} callback callback
 */
export const bondAndNominate = async (amount, validators, communityId, projectId, toast, callback) => {
  const from = store.state.polkadot.account && store.state.polkadot.account.address
  communityId = stanfiAddress(communityId)
  projectId = stanfiAddress(projectId)
  if (!from) {
    reject('no account')
  }
  const api = await getApi()
  const uni = api.createType('Compact<BalanceOf>', new BN(amount * 1e6).mul(new BN(10).pow(new BN(6))))
  const bondTx = api.tx.staking.bond(store.state.polkadot.account.address, uni, {
    Staked: null
  })

  const nominatorTx = api.tx.staking.nominate(validators)
  const remark = encodeRemark(communityId, projectId)
  const remarkTx = api.tx.system.remarkWithEvent(remark)
  const nonce = (await api.query.system.account(from)).nonce.toNumber()


  //   const bondFee = await getTxPaymentInfo(api.tx.utility.batch([bondTx, nominatorTx, remarkTx]))
  //   console.log('bondfee', bondFee);

  const unsub = await api.tx.utility
    .batch([bondTx, nominatorTx, remarkTx]).signAndSend(from, {
      nonce
    }, ({
      status,
      dispatchError
    }) => {
      try {
        handelBlockState(api, status, dispatchError, toast, callback, unsub)
      } catch (e) {
        toast(e.message, {
          title: $t('tip.error'),
          variant: 'danger'
        })
      }
    })
}

/**
 * 内部方法， 处理交易的block状态
 * @param {*} status 交易状态
 * @param {*} dispatchError 交易错误信息
 * @param {*} toast toast
 * @param {*} callback callback
 * @param {*} unsub unsub
 * @returns 
 */
function handelBlockState(api, status, dispatchError, toast, callback, unsub) {
  if (status.isInBlock || status.isFinalized) {
    if (dispatchError) {
      let errMsg = ''
      if (dispatchError.isModule) {
        // for module errors, we have the section indexed, lookup
        const decoded = api.registry.findMetaError(dispatchError.asModule);
        const {
          documentation,
          name,
          section
        } = decoded;
        errMsg = `${section}.${name}: ${documentation.join(' ')}`
        console.log(`${section}.${name}: ${documentation.join(' ')}`);
      } else {
        // Other, CannotLookup, BadOrigin, no extra info
        console.log(dispatchError.toString());
        errMsg = dispatchError.toString()
      }
      toast(errMsg, {
        title: $t('tip.error'),
        variant: 'danger'
      })
      unsub()
      return false
    }
  }
  if (status.isBroadcast) {
    if (callback) callback()
    setTimeout(() => {
      toast($t('transaction.broadcasting'), {
        title: $t('tip.tips'),
        autoHideDelay: 5000,
        variant: 'warning'
      })
    }, 700);
  } else if (status.isInBlock) {
    console.log("Transaction included at blockHash.", status.asInBlock.toJSON());
    toast($t('transaction.inBlock'), {
      title: $t('tip.tips'),
      autoHideDelay: 6000,
      variant: 'warning'
    })
  } else if (status.isFinalized) {
    unsub()
    toast($t('transaction.nominateOk'), {
      title: $t('tip.success'),
      autoHideDelay: 5000,
      variant: "success",
    });
    // 上传daemon
    return true
  }
}
