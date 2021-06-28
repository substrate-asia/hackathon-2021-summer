import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './Payment.module.css'
import address from '../../images/icon_address.png'
import time from '../../images/icon_time.png'
import user from '../../images/icon_user.png'
import site from '../../images/icon_site.png'
import { Button } from 'antd-mobile'

export default class Payment extends Component {
    // componentDidMount() {
    //     //actions  隐藏底部状态栏
    //     this.props.actions.setBottomstatus(true);
    // }
    render() {
        return (
            <div className={styles.body}>
                {/** 标题栏 */}
                <TopBar></TopBar>
                {/** 活动名称 */}
                <h1 className={styles.detailName}>Event Name</h1>
                {/** 地址 */}
                <div className={styles.addressView}>
                    <img src={address} className={styles.addressIcon}></img>
                    <span className={styles.addressText}>Location detail</span>
                </div>
                {/** 日期*/}
                <div className={styles.addressView}>
                    <img src={time} className={styles.timeIcon}></img>
                    <span className={styles.timeText}>Date + start time</span>
                </div>
                <div className={styles.priceView}>
                    <img src={user} className={styles.timeIcon}></img>
                    <span className={styles.timeText}>Buyer's username</span>
                </div>
                {/*** 票的信息 */}
                <div className={styles.kuang}>
                    <div>
                        <img src={site} alt="" className={styles.site}></img>
                        <span className={styles.siteLable}>Row 5,17</span>
                        <span className={styles.sitePrice}>300NMT</span>
                    </div>
                    <div>
                        <img src={site} alt="" className={styles.site}></img>
                        <span className={styles.siteLable}>Row 5,17</span>
                        <span className={styles.sitePrice}>300NMT</span>
                    </div>
                    <div className={styles.dottedView}>
                        <div className={styles.dottedLine}></div>
                    </div>
                    <div className={styles.ticketPriceView}>
                        <span className={styles.priceLable}>Price</span>
                        <span className={styles.unitLable}>300NMT</span>
                    </div>
                    <div className={styles.ticketPriceView}>
                        <span className={styles.priceLable}>Coupon</span>
                        <span className={styles.unitLable}>None</span>
                    </div>
                </div>
                {/** 备注信息 */}
                <div>
                    <span className={styles.beizhu}>Notice:</span>
                    <div className={styles.beizhuContent}>
                    <span >Tickers can not be refunder once sold</span>
                    </div>
                </div>
                {/** 付款金额 */}
                <div className={styles.paymentView}>
                    <span className={styles.totalLable}>Total:</span>
                    <span className={styles.moneyLable}>600</span>
                    <span className={styles.unitLable}>NMT</span>
                    <Button className={styles.payBtn}>Pay Now</Button>
                </div>
            </div>
        )
    }
}
