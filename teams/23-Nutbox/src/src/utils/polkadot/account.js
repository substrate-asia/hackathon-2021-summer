import {
  web3Accounts,
  web3Enable,
  web3FromSourc
} from '@polkadot/extension-dapp'
import keyring from '@polkadot/ui-keyring';

import {
  cryptoWaitReady
} from "@polkadot/util-crypto"
import BN from "bn.js"
import store from "../../store"
import {
  subBonded,
  subNominators
} from './staking'
import {
  getBalance as getKusamaBalance
} from '../kusama/account'
import {
  getBalance as getRococoBalance
} from '../rococo/account'

import {
  getApi,
} from './polkadot'
import { stanfiAddress } from '@/utils/commen/account'
import { DEBUG } from  '@/config'
import {
  $t
} from '@/i18n'

export const loadAccounts = async () => {
  try {
    await web3Enable('nutbox')
    let allAccounts = await web3Accounts()
    await cryptoWaitReady();
    keyring.loadAll({
      isDevelopment: false
    }, allAccounts)
    allAccounts = allAccounts.map(({
      address,
      meta
    }) => ({
      address: stanfiAddress(address),
      meta
    }))
    store.commit('polkadot/saveAllAccounts', allAccounts)
    let account = store.state.polkadot.account !== 'undefined' && store.state.polkadot.account ? store.state.polkadot.account : allAccounts[0]
    store.commit('polkadot/saveAccount', account)
    getBalance(account)
    getKusamaBalance(account)
    DEBUG && getRococoBalance(account)
    subNominators()
    subBonded()
  } catch (e) {
    console.error('get all accounts fail:', e);
  }
}

export const getBalance = async (account) => {
  const api = await getApi()
  // cancel last
  let subBalance = store.state.polkadot.subBalance
  let subLocked = store.state.polkadot.subLocked

  try {
    subBalance()
  } catch (e) {}
  try {
    subLocked()
  } catch (e) {}

  subBalance = await api.query.system.account(store.state.polkadot.account.address, ({
    data: {
      free: currentFree
    },
    nonce: currentNonce
  }) => {
    store.commit('polkadot/saveBalance', new BN(currentFree))
  })

  subLocked = await api.query.staking.ledger(store.state.polkadot.account.address, (locked) => {
    if (!locked.toJSON() || locked.toJSON().length === 0) {
      store.commit('polkadot/saveLocked', new BN(0))
      store.commit('polkadot/saveTotalStaked', new BN(0))
      store.commit('polkadot/saveUnlocking', new BN(0))
      store.commit('polkadot/saveRedeemable', new BN(0))
      return
    }
    locked = locked.toJSON()
    const total = new BN(locked.total)
    const active = new BN(locked.active)
    const unlocking = new BN(locked.unlocking.reduce((t,u) => t.add(new BN(u.value)), new BN(0)))
    store.commit('polkadot/saveTotalStaked', total)
    store.commit('polkadot/saveLocked',  active)
    store.commit('polkadot/saveUnlocking', unlocking)
    store.commit('polkadot/saveRedeemable', total.sub(active).sub(unlocking))
  })

  store.commit('polkadot/saveSubLocked', subLocked)
  store.commit('polkadot/saveSubBalance', subBalance)
}

/**
 * 转账dot
 * @param {String} to 转账对象
 * @param {Number} amount 转账数目 单位为dot
 */
export const transfer = async (to, amount, toast, callback) => {
  const from = store.state.polkadot.account && store.state.polkadot.account.address
  if (!from){
    reject('no account')
  }
  const api = await getApi()
  const decimal = new BN(10)
  amount = api.createType('Compact<BalanceOf>', new BN(amount * 1e6).mul(new BN(10).pow(decimal.sub(new BN(6)))))
  const nonce = (await api.query.system.account(from)).nonce.toNumber()
  const unsub = await api.tx.balances.transfer(to, amount).signAndSend(from, {
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
 *  绑定KSM
 * @param {number} amount 要绑定的KSM数量， 以KSM为单位
 * @param {function} toast toast
 * @param {function} callback callback
 */
export const bond = async (amount, toast, callback) => {
  const from = store.state.polkadot.account && store.state.polkadot.account.address
  if (!from) {
    reject('no account')
  }
  const api = await getApi()
  const uni = api.createType('Compact<BalanceOf>', new BN(amount * 1e6).mul(new BN(10).pow(new BN(4))))
  const bonded = store.state.polkadot.bonded
  const bondTx = bonded ? api.tx.staking.bondExtra(uni) : api.tx.staking.bond(from, uni, {
    Staked: null
  })
  const nonce = (await api.query.system.account(from)).nonce.toNumber()

  const unsub = await bondTx.signAndSend(from, {
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
 *  解绑绑DOT
 * @param {number} amount 要解绑的DOT数量， 以DOT为单位
 * @param {function} toast toast
 * @param {function} callback callback
 */
 export const unBond = async (amount, toast, callback) => {
  const from = store.state.polkadot.account && store.state.polkadot.account.address
  if (!from) {
    reject('no account')
  }
  const api = await getApi()
  const uni = api.createType('Compact<BalanceOf>', new BN(amount * 1e6).mul(new BN(10).pow(new BN(4))))
  const nonce = (await api.query.system.account(from)).nonce.toNumber()
  console.log('unbond');
  const unsub = await api.tx.staking.unbond(uni).signAndSend(from, {
    nonce
  }, ({
    status,
    dispatchError
  }) => {
    try{
      handelBlockState(api, status, dispatchError, toast, callback, unsub)
    }catch (e){
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
    toast($t('transaction.transactionOk'), {
      title: $t('tip.success'),
      autoHideDelay: 5000,
      variant: "success",
    });
    // 上传daemon
    return true
  }
}
