/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-23 20:27:21
 * @Description: 工具方法
 */
import { CHRONIC_DIC } from "@/const/dic"
import * as DIC from "@/const/dic"

export const idToGender = (idNo) => {
  let gender = "男"
  gender = Number(idNo.charAt(idNo.length - 2)) % 2 === 0 ? "女" : "男"
  return gender
}

export const idToAge = (idNo) => {
  let birthYear = Number(idNo.substring(6, 10))
  let currentYear = new Date().getFullYear()
  return currentYear - birthYear
}

export const getBMILabel = (height, weight) => {
  let BMI = ((10000 * weight) / (height * height)).toFixed(1)
  let label
  if (BMI < 18.5) {
    label = "体重过轻"
  } else if (BMI >= 18.5 && BMI < 24) {
    label = "正常"
  } else if (BMI >= 24 && BMI <= 28) {
    label = "超重"
  } else if (BMI > 28) {
    label = "肥胖"
  }
  return `${BMI}(${label})`
}

export const chronicToDic = (chronics) => {
  let chronicsLabel = chronics.map((item) => {
    return CHRONIC_DIC.find((dicItem) => dicItem.value === item).label
  })
  return !chronicsLabel || chronicsLabel.length === 0
    ? "健康"
    : chronicsLabel.join(",")
}

export function toDicLabel(value, dicName) {
  let dicItem = DIC[dicName].find((item) => item.value === String(value))
  return dicItem ? dicItem.label : ""
}
