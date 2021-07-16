/* eslint-disable no-undef */
/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-21 13:31:12
 * @Description: 家人
 */
import React from "react"
import { WingBlank, WhiteSpace, Popover } from "antd-mobile"
import "./index.less"
import { useHistory } from "react-router-dom"
import { connect, useSelector } from "react-redux"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { cryptoWaitReady } from "@polkadot/util-crypto"
import typeSettings from "@/const/typeSettings"
import { hexToNumber, u8aToString, hexToString } from "@polkadot/util"

import { getBMILabel, chronicToDic, idToGender, idToAge } from "@/util"
import Wristband from "@/pages/family/charts/wristband"
import SleepReport from "@/pages/family/charts/sleepReport"
import SleepBreath from "@/pages/family/charts/sleepBreath"
import { CHRONIC_TYPE, RELATIVES_TYPE } from "@/const/type"

import menuImg3 from "@/assets/images/device.png"
import menuImg2 from "@/assets/images/scan.png"
import menuImg1 from "@/assets/images/archives.png"
import avatarMale from "@/assets/images/male.png"
import avatarFemale from "@/assets/images/female.png"

// 菜单KEY
const MENU_KEY = {
  ARCHIVE: 1,
  DISH: 2,
  DEVICE: 3,
}
/**
 * 家人列表
 */
function FamilyList(props) {
  return (
    <Popover
      visible={props.visible}
      onSelect={props.onSelect}
      overlay={props.relatives.map((relative) => (
        <Popover.Item key={relative.id_card} value={relative.id_card}>
          {relative.name}
        </Popover.Item>
      ))}
    >
      <i className="iconfont icon-xiala"></i>
    </Popover>
  )
}

function HealthStatus(props) {
  return (
    <div className="health-status-wrapper">
      <h2>健康状况</h2>
      <div className="data-list">
        <div className="list-item">
          <i className="iconfont icon-sg"></i>
          <div className="title">身高/体重</div>
          <div className="num">
            {props.user.height + "cm/" + props.user.weight + "kg"}
          </div>
        </div>
        <div className="list-item">
          <i className="iconfont icon-bmi"></i>
          <div className="title">BMI</div>
          <div className="num">
            {getBMILabel(props.user.height, props.user.weight)}
          </div>
        </div>
        <div className="list-item">
          <i className="iconfont icon-health"></i>
          <div className="title">健康状况</div>
          <div className="num">{chronicToDic(props.user.chronic)}</div>
        </div>
      </div>
    </div>
  )
}
/**
 * 健康建议
 */
function HealthAdvice(props) {
  let hasHyperTension = props.user.chronic.includes(CHRONIC_TYPE.HYPERTENSION)
  let hasDiabetes = props.user.chronic.includes(CHRONIC_TYPE.DIABETES)
  let hasChronic = hasHyperTension || hasDiabetes

  if (!hasChronic) {
    return <div />
  }
  return (
    <div className="health-advice-wrapper">
      <h2>健康建议</h2>
      {hasHyperTension && (
        <div className="hyper-tension-wrapper">
          <p>
            <i className="index-wrapper">1</i>
            <span className="title">限制食盐：</span>
            <span className="desc">每天食盐摄入量应控制在5g以下。</span>
          </p>
          <p>
            <i className="index-wrapper">2</i>
            <span className="title">戒烟：</span>
            <span className="desc">
              吸烟可促使血管收缩，促使脂肪和胆固醇沉积在血管壁，加快血栓形成。
            </span>
          </p>
          <p>
            <i className="index-wrapper">3</i>
            <span className="title">尽量避免食用：</span>
            <span className="desc">
              动物内脏、鸡蛋黄、猪油、肥肉、全脂牛奶、酸奶、油炸食物。
            </span>
          </p>
        </div>
      )}
      {hasDiabetes && (
        <div className="dabetes-wrapper">
          <h3>饮食疗法：</h3>
          <p>
            食物多样、谷类为主，多吃蔬菜、水果，少吃肥肉和荤油，清淡少盐，避免甜食，戒烟限酒。
          </p>
          <p>
            烹调得法：亦选鸡肉、瘦肉及鱼，煮肉前先切去肥脂或鸡皮，避免用大量调味料，避免用大量糖调味，烹调方法以蒸、煮、灼、焖为主。
          </p>
          <p>定时定量，少食多餐，可以避免餐后高血糖。</p>
          <p>食量与体力活动要均衡，保持适量体重。</p>
          <h3>运动疗法</h3>
          <p>
            益处：更好的利用胰岛素，控制血糖，改善血脂成分，减轻体重，调整心肺神经及内分
            泌功能，防止骨质疏松预防并控制糖尿病并发症的发生和发展。
          </p>
          <p>
            适宜选择非竞争性运动项目，用到腿部肌肉的运动比较好，散步、游侠、慢跑、骑自行车等最佳。打太极拳、溜冰、有氧舞蹈、爬山等也是不错的选择。
          </p>
        </div>
      )}
    </div>
  )
}
// <List renderHeader={() => "健康建议"} className="advice-list">
//   {props.user.chronic.includes(CHRONIC_TYPE.HYPERTENSION) && (
//     <Item wrap>
//       1、限制食盐；每天食盐摄入量应控制在5g以下。
//       <br />
//       2、戒烟：吸烟可促使血管收缩，促使脂肪和胆固醇沉积在血管壁，加快血栓形成。
//       <br />
//       3、尽量避免食用：动物内脏、鸡蛋黄、猪油、肥肉、全脂牛奶、酸奶、油炸食物。
//     </Item>
//   )}
//   {props.user.chronic.includes(CHRONIC_TYPE.DIABETES) && (
//     <Item wrap>
//       一、饮食疗法：
//       <br />
//       1、食物多样、谷类为主，多吃蔬菜、水果，少吃肥肉和荤油，清淡少盐，避免甜食，戒烟限酒。
//       <br />
//       2、烹调得法：亦选鸡肉、瘦肉及鱼，煮肉前先切去肥脂或鸡皮，避免用大量调味料，避免用大量糖调味，烹调方法以蒸、煮、灼、焖为主。
//       <br />
//       3、定时定量，少食多餐，可以避免餐后高血糖。
//       <br />
//       4、食量与体力活动要均衡，保持适量体重。
//       <br />
//       二、运动疗法：
//       <br />
//       1、益处：更好的利用胰岛素，控制血糖，改善血脂成分，减轻体重，调整心肺神经及内分
//       泌功能，防止骨质疏松预防并控制糖尿病并发症的发生和发展。
//       <br />
//       2、适宜选择非竞争性运动项目，用到腿部肌肉的运动比较好，散步、游侠、慢跑、骑自行车等最佳。打太极拳、溜冰、有氧舞蹈、爬山等也是不错的选择。
//     </Item>
//   )}
// </List>

function Profile(props) {
  let history = useHistory()
  const currentRelatives = useSelector((state) => state.user.currentRelatives)

  function addFamily() {
    history.push("/addFamily")
  }

  let genderImg =
    idToGender(currentRelatives.id_card) === "男" ? avatarMale : avatarFemale
  return (
    <div className="profile-wrapper">
      <div className="info-wrapper">
        <div className="info">
          <img className="avatar" src={genderImg} />
          <div className="name-wrapper">
            <div className="name">
              {currentRelatives.name}
              {props.familySelect}
            </div>
            <div className="gender">
              {idToGender(currentRelatives.id_card)}·
              {idToAge(currentRelatives.id_card)}岁
            </div>
          </div>
        </div>
        <div className="action" onClick={addFamily}>
          <i className="iconfont icon-add"></i>
        </div>
      </div>
    </div>
    // <Flex>
    //   <img
    //     className="avatar"
    //     style={{ width: "100px", height: "100px" }}
    //     src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F03%2F07%2F7059a58db4ebc4f4438edb26b9046bd9.jpg%21%2Ffwfh%2F804x829%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626848536&t=45b98be05fb25e08239f128f835e67d2"
    //     alt=""
    //   />
    //   <Flex.Item style={{ height: "100px" }}>
    //     <div className="info-item">{currentRelatives.name}</div>
    //     <div className="info-item">{idToGender(currentRelatives.id_card)}</div>
    //     <div className="info-item">{idToAge(currentRelatives.id_card)}</div>
    //   </Flex.Item>
    // </Flex>
  )
}

function Menu() {
  let history = useHistory()

  const menuData = [
    {
      title: "健康档案",
      desc: "健康的身体",
      key: MENU_KEY.ARCHIVE,
      icon: "jiankangdangan",
      img: menuImg1,
    },
    {
      title: "菜品识别",
      desc: "新鲜的食物",
      key: MENU_KEY.DISH,
      icon: "tupianshibie",
      img: menuImg2,
    },
    {
      title: "绑定设备",
      desc: "稳定的连接",
      key: MENU_KEY.DEVICE,
      icon: "bangdingshebei",
      img: menuImg3,
    },
  ]

  /**
   * 菜单跳转
   * @param {Object} item 菜单项
   */
  function clickMenu(item) {
    if (item.key === MENU_KEY.DISH) {
      history.push("/dish")
    } else if (item.key === MENU_KEY.DEVICE) {
      history.push("/bindDevice")
    } else if (item.key === MENU_KEY.ARCHIVE) {
      history.push("/healthArchives")
    }
  }

  return (
    <div className="menu-list">
      {menuData.map((item) => {
        return (
          <div
            className="menu-item"
            key={item.key}
            onClick={() => {
              clickMenu(item)
            }}
          >
            <div className="title">{item.title}</div>
            <div className="desc">{item.desc}</div>
            <img src={item.img} alr="" />
          </div>
        )
      })}
    </div>
  )
}
class Family extends React.Component {
  constructor() {
    super()
    this.state = {
      info: {
        name: "",
        gender: "",
        age: "",
      },
      relatives: [],
    }
  }

  async getRelatives() {
    const wsProvider = new WsProvider(process.env.REACT_APP_WS_URL)
    const api = await ApiPromise.create({
      provider: wsProvider,
      types: typeSettings,
    })
    let result = await api.query.healthAi.acRelations(this.props.user.addr)
    let persons = result.value
    if (!persons.isEmpty) {
      let relatives = persons.map((item) => {
        let person = {}
        person.height = hexToNumber(item.get("height"))
        person.weight = hexToNumber(item.get("weight"))
        person.name = u8aToString(item.get("name"))
        person.id_card = u8aToString(item.get("id_card"))
        person.relationType = hexToNumber(item.get("relation_type"))
        person.chronic = u8aToString(item.get("chronic")).split(",")
        return person
      })
      this.props.setRelativesList(relatives)
      if (!this.props.user.currentRelatives) {
        let relative = relatives.find(
          (item) => item.relationType === Number(RELATIVES_TYPE.SELF)
        )
        this.props.setCurrentRelatives(relative ? relative : relatives[0])
      }
      this.setState({
        relatives: relatives,
      })
    }
  }

  async getChronicTaboos() {
    const wsProvider = new WsProvider(process.env.REACT_APP_WS_URL)
    const api = await ApiPromise.create({
      provider: wsProvider,
      types: typeSettings,
    })
    await api.query.healthAi.chronicTaboos.multi(
      [
        CHRONIC_TYPE.DIABETES,
        CHRONIC_TYPE.HYPERTENSION,
        CHRONIC_TYPE.FATTY_LIVER,
        CHRONIC_TYPE.HYPERLIPIDEMIA,
      ],
      (results) => {
        let chronicTaboos = {}
        chronicTaboos[CHRONIC_TYPE.DIABETES] = hexToString(
          "0x" + u8aToString(results[0].value)
        ).split(",")
        chronicTaboos[CHRONIC_TYPE.HYPERTENSION] = hexToString(
          "0x" + u8aToString(results[1].value)
        ).split(",")
        chronicTaboos[CHRONIC_TYPE.FATTY_LIVER] = hexToString(
          "0x" + u8aToString(results[2].value)
        ).split(",")
        chronicTaboos[CHRONIC_TYPE.HYPERLIPIDEMIA] = hexToString(
          "0x" + u8aToString(results[3].value)
        ).split(",")
        this.props.setChronicTaboos(chronicTaboos)
      }
    )
  }

  componentDidMount() {
    this.getRelatives()
    this.getChronicTaboos()
  }

  onSelect(opt) {
    this.props.setDeviceList([])
    let currentRelatives = this.props.user.relativesList.find(
      (item) => opt.props.value === item.id_card
    )
    this.props.setCurrentRelatives(currentRelatives)
    this.setState({
      visible: false,
    })
    this.getDeviceList()
  }

  async getDeviceList() {
    await cryptoWaitReady()
    const wsProvider = new WsProvider(process.env.REACT_APP_WS_URL)
    const api = await ApiPromise.create({
      provider: wsProvider,
      types: typeSettings,
    })
    let res = await api.query.signData.acOwnedDevices([
      this.props.user.addr,
      this.props.user.currentRelatives.relationType,
    ])
    if (!res.isEmpty) {
      let deviceList = res.value.map((item) => {
        return {
          deviceType: hexToNumber(item[0]),
          deviceSN: u8aToString(item[1]),
        }
      })
      this.props.setDeviceList(deviceList)
    } else {
      this.props.setDeviceList([])
    }
  }

  render() {
    return (
      <div className="family-wrapper">
        <div>
          {this.props.user.currentRelatives && (
            <div>
              <Profile
                familySelect={
                  this.props.user.relativesList.length > 0 && (
                    <FamilyList
                      visible={this.state.visible}
                      relatives={this.props.user.relativesList}
                      onSelect={this.onSelect.bind(this)}
                    />
                  )
                }
              ></Profile>
              <WhiteSpace></WhiteSpace>
              <HealthStatus user={this.props.user.currentRelatives}></HealthStatus>
            </div>
          )}
          <Menu></Menu>
          {this.props.user.currentRelatives && (
            <div>
              <HealthAdvice user={this.props.user.currentRelatives}></HealthAdvice>
            </div>
          )}
          <WhiteSpace></WhiteSpace>
          <WingBlank>
            <Wristband deviceList={this.props.user.deviceList}></Wristband>
            <SleepReport deviceList={this.props.user.deviceList}></SleepReport>
            <SleepBreath deviceList={this.props.user.deviceList}></SleepBreath>
          </WingBlank>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentRelatives: (currentRelatives) =>
    dispatch({
      type: "user/setCurrentRelatives",
      payload: currentRelatives,
    }),
  setRelativesList: (relativesList) =>
    dispatch({
      type: "user/setRelativesList",
      payload: relativesList,
    }),
  setDeviceList: (deviceList) =>
    dispatch({
      type: "user/setDeviceList",
      payload: deviceList,
    }),
  setChronicTaboos: (chronicTaboos) =>
    dispatch({
      type: "user/setChronicTaboos",
      payload: chronicTaboos,
    }),
})

function mapStateToProps(state) {
  return Object.assign({}, state)
}

export default connect(mapStateToProps, mapDispatchToProps)(Family)
