/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

import FileSaver from 'file-saver'
/**
 * 备份账号
 */
export function backAccount(json, address) {
  const blob = new Blob([JSON.stringify(json)], { type: 'application/json; charset=utf-8' })

  FileSaver.saveAs(blob, `${address}.json`)
}

import { keyring } from '@polkadot/ui-keyring'
/**
 * 获取 CryptoType
 * @param {*} obj
 * @returns
 */
export function CryptoType(accountId) {
  try {
    const current = accountId
      ? keyring.getPair(accountId)
      : null

    if (current) {
      return current.meta.isInjected
        ? 'injected'
        : current.meta.isHardware
          ? current.meta.hardwareType || 'hardware'
          : current.meta.isExternal
            ? current.meta.isMultisig
              ? 'multisig'
              : current.meta.isProxied
                ? 'proxied'
                : 'external'
            : current.type
    }
  } catch (error) {
    return ''
    // cannot determine, keep unknown
  }
}

import { BN_ONE, BN_TEN, BN_TWO, BN_ZERO, formatBalance/*, isBn*/, isUndefined } from '@polkadot/util'
export function reformat(value, isDisabled, siDecimals) {
  if (!value) {
    return []
  }

  const decimals = isUndefined(siDecimals)
    ? formatBalance.getDefaults().decimals
    : siDecimals
  const si = isDisabled
    ? formatBalance.calcSi(value.toString(), decimals)
    : formatBalance.findSi('-')

  return [
    formatBalance(value, { decimals, forceUnit: si.value, withSi: false }).replace(',', isDisabled ? ',' : ''),
    si
  ]
}

/**
 * 带单位的值
 * @param {*} value
 */
export function valueOfUnit(balance) {
  const test = new BN((balance || '0').toString()).toString(10)
  const reforma = reformat(test, true)
  console.log(reforma)
  const si = reforma[1] || formatBalance.findSi('-')
  return {
    valueU: `${reforma[0]} ${si.text}`,
    reforma,
    si
  }
}

import BN from 'bn.js'
export function getSiPowers(si, decimals) {
  if (!si) {
    return [BN_ZERO, 0, 0]
  }

  const basePower = isUndefined(decimals)
    ? formatBalance.getDefaults().decimals
    : decimals

  return [new BN(basePower + si.power), basePower, si.power]
}

/**
 * 获取单位
 * @param {*} symbol
 * @param {*} decimals
 * @returns
 */
export function getSiOptions(symbol = formatBalance.getDefaults().unit, decimals) {
  const settings = formatBalance.getOptions(decimals).map(({ power, text, value }) => ({
    text: power === 0
      ? symbol
      : text,
    value
  }))
  return settings
}

import store from '@/store'
import { BitLengthOption } from './constants'
const DEFAULT_BITLENGTH = BitLengthOption.NORMAL_NUMBERS
export function inputToBn(input, si, bitLength = DEFAULT_BITLENGTH, isZeroable = true, maxValue, decimals) {
  const { api } = store.state.polkadot
  const [siPower, basePower, siUnitPower] = getSiPowers(si, decimals)
  const inputStr = input.toString()
  const isDecimalValue = inputStr.match(/^(\d+)\.(\d+)$/)

  let result

  if (isDecimalValue) {
    if (siUnitPower - isDecimalValue[2].length < -basePower) {
      result = new BN(-1)
    }

    const div = new BN(inputStr.replace(/\.\d*$/, ''))
    const modString = inputStr.replace(/^\d+\./, '').substr(0, api.registry.chainDecimals[0])
    const mod = new BN(modString)

    result = div
      .mul(BN_TEN.pow(siPower))
      .add(mod.mul(BN_TEN.pow(new BN(basePower + siUnitPower - modString.length))))
  } else {
    result = new BN(inputStr.replace(/[^\d]/g, ''))
      .mul(BN_TEN.pow(siPower))
  }

  return [
    result,
    isValidNumber(result, bitLength, isZeroable, maxValue)
  ]
}

export function isValidNumber(bn, bitLength, isZeroable, maxValue) {
  if (
    // cannot be negative
    bn.lt(BN_ZERO) ||
    // cannot be > than allowed max
    !bn.lt(getGlobalMaxValue(bitLength)) ||
    // check if 0 and it should be a value
    (!isZeroable && bn.isZero()) ||
    // check that the bitlengths fit
    (bn.bitLength() > (bitLength || DEFAULT_BITLENGTH)) ||
    // cannot be > max (if specified)
    (maxValue && maxValue.gtn(0) && bn.gt(maxValue))
  ) {
    return false
  }

  return true
}

function getGlobalMaxValue(bitLength) {
  return BN_TWO.pow(new BN(bitLength || DEFAULT_BITLENGTH)).isub(BN_ONE)
}

export function FileUrl(url) {
  return `${process.env.VUE_APP_BASE_API}file/${url}`
}

export function DownloadFileUrl(accoundId, id) {
  return `${process.env.VUE_APP_BASE_API}paperFiles/down/${accoundId}?id=${id}`
}

export function downloadFileWithBuffer(data, name, type) {
  var blob = new Blob([data], {
    type: type || ''
  })
  var downloadElement = document.createElement('a')
  var href = window.URL.createObjectURL(blob) // 创建下载的链接
  downloadElement.href = href
  downloadElement.download = name // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href) // 释放掉blob对象
}
