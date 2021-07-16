/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-23 17:39:16
 * @Description:
 */
import * as TYPE from "./type"

export const RELATIVES_DIC = [
  {
    label: "自己",
    value: TYPE.RELATIVES_TYPE.SELF,
  },
  {
    label: "父亲",
    value: TYPE.RELATIVES_TYPE.FATHER,
  },
  {
    label: "母亲",
    value: TYPE.RELATIVES_TYPE.MOTHER,
  },
  {
    label: "岳父",
    value: TYPE.RELATIVES_TYPE.FATHER_IN_LAW,
  },
  {
    label: "岳母",
    value: TYPE.RELATIVES_TYPE.MOTHER_IN_LAW,
  },
  {
    label: "其他",
    value: TYPE.RELATIVES_TYPE.OTHER,
  },
]
// 慢性病字典
export const CHRONIC_DIC = [
  {
    label: "糖尿病",
    value: TYPE.CHRONIC_TYPE.DIABETES,
  },
  {
    label: "高血压",
    value: TYPE.CHRONIC_TYPE.HYPERTENSION,
  },
  {
    label: "脂肪肝",
    value: TYPE.CHRONIC_TYPE.FATTY_LIVER,
  },
  {
    label: "高血脂",
    value: TYPE.CHRONIC_TYPE.HYPERLIPIDEMIA,
  },
]
// 设备字典
export const DEVICE_DIC = [
  {
    label: "手环",
    value: TYPE.DEVICE_TYPE.WRISTBAND,
  },
  {
    label: "床垫",
    value: TYPE.DEVICE_TYPE.MATTRESS,
  },
  {
    label: "血糖仪",
    value: TYPE.DEVICE_TYPE.GLUCOSE_METER,
  },
  {
    label: "血压计",
    value: TYPE.DEVICE_TYPE.BLOOD_PRESSURE_METER,
  },
  {
    label: "体温计",
    value: TYPE.DEVICE_TYPE.THERMOMETER,
  },
  {
    label: "跌倒报警",
    value: TYPE.DEVICE_TYPE.FALL_DOWN_WARING,
  },
  {
    label: "电子围栏",
    value: TYPE.DEVICE_TYPE.ELECTRONIC_FENCE,
  },
  {
    label: "其他",
    value: TYPE.DEVICE_TYPE.OTHER,
  },
]
