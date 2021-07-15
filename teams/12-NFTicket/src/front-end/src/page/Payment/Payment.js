import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './Payment.module.css'
import address from '../../images/icon_address.png'
import time from '../../images/icon_time.png'
import user from '../../images/icon_user.png'
import site from '../../images/icon_site.png'
import { Button,Flex } from 'antd-mobile'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {parseMoneyText} from '../../utils/formart.js'
//action
import { setBottomstatusAction } from '../../store/action/App';
import {buyTicket} from '../../api/polka';

class Payment extends Component {

    componentDidMount() {
        //actions  隐藏底部状态栏
        this.props.actions.setBottomstatus(true);
    }

    buyTickt= async(zoomId,rows,cols,price) =>{
        console.log("点击了购买按钮",price)
        buyTicket(zoomId,rows,cols,price,(result) =>{
            console.log("-----Payment start------")
            console.log(result);
            this.props.history.push('/Sort')
            console.log("-----Payment end------")
        })
    }

    render() {
        const { data ,max}= this.props.location.state
        var {name,meeting_addr,start_time} = data
        var userAddress=localStorage.getItem('nft-address-hex')
        var moeny = max[1].price;
        console.log(max)
        const {value}=parseMoneyText(moeny)
        //搜索框高度
        const searchbarHeight = 45;
        //空白区域高度
        const whitespaceHeight = 9;
        //账户信息高度
        const accountInfoHeight = 42;
        //最后+26是因为直接按照前面的减去之后会有一部分留白区域,多种机型上都是26,就加上这个26[**暂时不清楚什么原因**]
        const height = parseInt(window.innerHeight)-searchbarHeight-whitespaceHeight-accountInfoHeight;

        return (
            <div className={styles.wrapperbody}>
                {/** 标题栏 */}
                <TopBar></TopBar>
                <Flex>
                    <div className={styles.wrapper} style={{height:''+height+'px'}}>
                        <div className={styles.wrapperContent}>
                            
                            {/** 活动名称 */}
                            <h1 className={styles.detailName}>{name}</h1>
                            {/** 地址 */}
                            <div className={styles.addressView}>
                                <img src={address} className={styles.addressIcon}></img>
                                <span className={styles.addressText}>{meeting_addr}</span>
                            </div>
                            {/** 日期*/}
                            <div className={styles.addressView}>
                                <img src={time} className={styles.timeIcon}></img>
                                <span className={styles.timeText}>{start_time}</span>
                            </div>
                            <div className={styles.priceView}>
                                <img src={user} className={styles.timeIcon}></img>
                                <span className={styles.timeText}>{userAddress}</span>
                            </div>
                            {/*** 票的信息 */}
                            <div className={styles.kuang}>
                                <div className={styles.rowline}>
                                    <img src={site} alt="" className={styles.site}></img>
                                    <span className={styles.siteLable}>Row 5,17</span>
                                    <span className={styles.sitePrice}>{value.toString()} NMT</span>
                                </div>
                                {/* <div className={styles.rowline}>
                                    <img src={site} alt="" className={styles.site}></img>
                                    <span className={styles.siteLable}>Row 5,17</span>
                                    <span className={styles.sitePrice}>300 NMT</span>
                                </div> */}
                                <div className={styles.dottedView}>
                                    <div className={styles.dottedLine}></div>
                                </div>
                                <div className={styles.ticketPriceView}>
                                    <span className={styles.priceLable}>Price</span>
                                    <div className={styles.unitLable}>
                                        <span className={styles.unitLable1}>{value.toString()}</span>
                                        <span className={styles.unitLable2}>NMT</span>
                                    </div>
                                </div>
                                <div className={styles.ticketPriceView}>
                                    <span className={styles.priceLable}>Coupon</span>
                                    <span className={styles.unitLable}>None</span>
                                </div>
                            </div>
                            {/** 备注信息 */}
                            <div className={styles.beizhuView}>
                                <span className={styles.beizhu}>Notice:</span>
                                <div className={styles.beizhuContent}>
                                <span >Tickers can not be refunder once sold</span>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/** 付款金额 */}
                    <div className={styles.paymentView}>
                        <span className={styles.totalLable}>Total:</span>
                        <span className={styles.moneyLable}>{value.toString()}</span>
                        <span className={styles.unitLable}>NMT</span>
                        <Button className={styles.payBtn} onClick={() => this.buyTickt(max[0],max[1].rows,max[1].cols,max[1].price)}>Pay Now</Button>
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
  )(Payment);
