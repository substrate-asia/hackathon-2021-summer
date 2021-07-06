import { TIME_PERIOD, BLOCK_SECOND } from "@/constant"
import {
  $t
} from '@/i18n'


export const firstToUpper = function (str) {
  if (!str) {
    return
  }
  if (str.trim().length === 0) {
    return str
  }
  return str.trim().replace(str[0], str[0].toUpperCase())
}

export const sleep = async function (interval = 6) {
  return new Promise(resolve => {
    setTimeout(resolve, interval * 1000) // 6秒
  })
}

export const retryMethod = async function (func, retries = 5, interval = 1) {
  return new Promise((resolve, reject) => {
    const exc = async (retries) => {
      try {
        const res = await func()
        resolve(res)
      } catch (e) {
        setTimeout(async () => {
          if (retries > 0) {
            // console.log('retry method', retries)
            await exc(retries - 1)
          } else {
            reject(e)
          }
        }, interval * 1000)
      }
    }
    exc(retries)
  })
}

export const formatBalance = function (value, digit = 3) {
  if (!value) return '0'
  const str =
    digit != null && digit >= 0 ?
    Number(value).toFixed(digit).toString() :
    value.toString()
  let integer = str
  let fraction = ''
  if (str.includes('.')) {
    integer = str.split('.')[0]
    fraction = '.' + str.split('.')[1]
  }
  return integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + fraction
}

export const formatUserAddress = (address, long=true) => {
  if (!address) return 'Loading Account'
  if (long){
    if (address.length < 16) return address
    const start = address.slice(0, 28)
    const end = address.slice(-5)
    return `${start}...`
  }else{
    const start = address.slice(0, 6)
    const end = address.slice(-6)
    return `${start}...${end}`
  }
}

export function getDateString(now, timezone, extra = 0) {
  now = now || new Date()
  const offset = timezone != null ? timezone * 60 : 0
  now = new Date(now.getTime() + (offset + extra) * 60 * 1000)
  return now.toISOString().replace('T', ' ').substring(0, 19)
}

// 竞拍倒计时
export function formatCountdown(end, currentBlockNum) {
  try {
    if (!end || !currentBlockNum) return 'Loading'
    const diff = end - parseInt(currentBlockNum);
    if (diff > 0) {
      const secs = diff * BLOCK_SECOND;
      const month = Math.floor(secs / TIME_PERIOD["MONTH"]);
      const day = Math.floor(
        (secs % TIME_PERIOD["MONTH"]) / TIME_PERIOD["DAY"]
      );
      const hour = Math.floor(
        (secs % TIME_PERIOD["DAY"]) / TIME_PERIOD["HOUR"]
      );
      const min = Math.floor(
        (secs % TIME_PERIOD["HOUR"]) / TIME_PERIOD["MINUTES"]
      );
      const sec = Math.floor(secs % TIME_PERIOD["MINUTES"]);

      let res = ''
      if (secs >= TIME_PERIOD["MONTH"]) {
        res = month + $t('date.month') + day + $t('date.day') + hour + $t('date.hour');
      } else if (secs >= TIME_PERIOD["DAY"]) {
        res = day + $t('date.day') + hour + $t('date.hour')+ min + $t('date.min');
      } else if (secs >= TIME_PERIOD["HOUR"]) {
        res = hour + $t('date.hour') + min + $t('date.min');
      } else {
        res = min + $t('date.min') + sec + $t('date.sec');
      }
      return res.trim()
    }
  } catch (e) {
    console.error("err", e);
    return "Loading";
  }
}