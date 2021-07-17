import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './ActivityDetail.module.css'
import share from '../../images/icon_share.png'
import iconaddress from '../../images/icon_address.png'
import time from '../../images/icon_time.png'
import price from '../../images/icon_price.png'
// import BScroll from 'better-scroll'
import { Button,Flex } from 'antd-mobile';


import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
//action
import { setBottomstatusAction } from '../../store/action/App';
import {getZone} from '../../api/polka'
import {parseMoneyText} from '../../utils/formart.js'
import img1 from '../../images/big_1.png'
import img2 from '../../images/big_2.png'
import img3 from '../../images/big_3.png'

class ActivityDetail extends Component {

    state={
        maxMoney:"",
        zoom:[]
    }

    async componentDidMount() {
        const wrapper = document.querySelector('.wrapper')
        //actions  隐藏底部状态栏
        this.props.actions.setBottomstatus(true);
        const data= this.props.location.state
        var {meeting_addr} = data
        getZone(meeting_addr,(result) =>{
            console.log("--------getZone-----------")
            //获取
            var max = result.reduce((obj1,obj2) =>{
                return obj1[1].price > obj2[1].price ? obj1 :obj2
            })
            var moeny = max[1].price;
            const {value}=parseMoneyText(moeny)
            this.setState(
                {
                    maxMoney:value.toString(),
                    zoom:result
                }
            )
            console.log("--------getZone end-----------")
        })
    }
    render() {
        const data= this.props.location.state
        var {name,desc,address,start_time,sponsorFrist,sponsor,poster} = data
        //搜索框高度
        const searchbarHeight = 45;
        //空白区域高度
        const whitespaceHeight = 9;
        //账户信息高度
        const accountInfoHeight = 42;
        //最后+26是因为直接按照前面的减去之后会有一部分留白区域,多种机型上都是26,就加上这个26[**暂时不清楚什么原因**]
        const height = parseInt(window.innerHeight)-searchbarHeight-whitespaceHeight-accountInfoHeight+51;
        var zoomList = this.state.zoom
        var path={
            pathname:'/Home/ConfirmVector',
            state:{
                data,
                zoomList
            }
         }
         var imgPath;
         if(poster==1){
           imgPath= img1
         }else if(poster==2){
           imgPath= img2
         }else{
           imgPath= img3
         }

        return (
            <div className={styles.activityDetail}>
                <TopBar></TopBar>
                <Flex>
                    <div className={styles.wrapper} style={{height:''+height+'px'}}>
                        <div className={styles.wrapperContent}>
                            {/** 活动图片 */}

                            <div className={styles.activityBg}>
                                <img src={imgPath} alt=""></img>
                            </div>
                            {/** 活动名称 */}
                            <div className={styles.shareName}>
                                <span className={styles.detailName}>{name}</span>
                                <img src={share} className={styles.shareIcon}></img>
                            </div>
                            {/** 地址 */}
                            <div className={styles.addressView}>
                                <img src={iconaddress} className={styles.addressIcon}></img>
                                <span className={styles.addressText}>{address}</span>
                            </div>
                            {/** 日期*/}
                            <div className={styles.addressView}>
                                <img src={time} className={styles.timeIcon}></img>
                                <span className={styles.timeText}>{start_time}</span>
                            </div>
                            {/** 金额*/}
                            <div className={styles.priceView}>
                                <img src={price} className={styles.timeIcon}></img>
                                {/* <span className={styles.priceText}>0-{this.state.maxMoney}</span> */}
                                <span className={styles.priceText}>180-360</span>
                                <span className={styles.priceUnitText}>NMT</span>
                            </div>
                            {/** 活动的主办单位信息 */}
                            <span className={styles.actionName}>Sponsor</span>
                            <div className={styles.actionView}>
                                <div className={styles.fillet}>
                                    <span className={styles.topText}>{sponsorFrist}</span>
                                </div>
                                <span className={styles.actionAuth}> {sponsor}</span>

                            </div>
                            {/** 活动的描述信息 */}
                            <span className={styles.actionName}>Discription</span>
                            <div className={styles.descContent}>
                                <span className={styles.descInfo}>
                                  {desc}
                                </span>
                            </div>
                            {/** 购买按钮 */}
                            <Button type="primary" className={styles.buyTicket} onClick={() => this.props.history.push(path)}>Buy Ticket</Button>
                        </div>
                    </div>
                </Flex>

            </div>

        )
    }
}

//获取最新的store里的状态，通过this.props获取
const mapStateToProps = (state)=>{
    return {
        app:state.app
    }
  }
  //更新状态提交到store
  const mapDispatchToProps = (dispatch)=>{
    return {
        actions:bindActionCreators({
          setBottomstatus:setBottomstatusAction
        },dispatch)
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ActivityDetail);
