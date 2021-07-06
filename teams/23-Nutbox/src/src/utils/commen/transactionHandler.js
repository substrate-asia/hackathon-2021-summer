
import {
    $t
  } from '../../i18n'
/**
 * 公共方法，处理交易的block状态
 * @param {*} api   
 * @param {*} status 交易状态
 * @param {*} dispatchError 交易错误信息
 * @param {*} toast toast
 * @param {*} callback callback
 * @param {*} unsub unsub
 * @returns 
 */
 export function handelBlockState(api, status, dispatchError, toast, callback, unsub) {
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