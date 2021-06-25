import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './ActivityDetail.module.css'
import bg from '../../images/icon_detail.png'
import share from '../../images/icon_share.png'
import address from '../../images/icon_address.png'
import time from '../../images/icon_time.png'
import price from '../../images/icon_price.png'
import BScroll from 'better-scroll'
import { Button } from 'antd-mobile';


export default class ActivityDetail extends Component {

    componentDidMount() {
        const wrapper = document.querySelector('.wrapper')
        const scroll = new BScroll(wrapper, { scrollX: false, className: true, scrollY: true })

    }


    render() {
        return (
            <div className={styles.activityDetail}>
                <TopBar></TopBar>
                <div className={styles.wrapper}>
                    {/** 活动图片 */}
                    <img src={bg} alt="" className={styles.activityBg}></img>
                    {/** 活动名称 */}
                    <div className={styles.shareName}>
                        <span className={styles.detailName}>Event Name</span>
                        <img src={share} className={styles.shareIcon}></img>
                    </div>
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
                    {/** 金额*/}
                    <div className={styles.priceView}>
                        <img src={price} className={styles.timeIcon}></img>
                        <span className={styles.priceText}>180-360</span>
                        <span className={styles.priceUnitText}>NMT</span>
                    </div>
                    {/** 活动的主办单位信息 */}
                    <span className={styles.actionName}>Sponsor</span>
                    <div className={styles.actionView}>
                        <div className={styles.fillet}>
                            <span className={styles.topText}>A</span>
                        </div>
                        <span className={styles.actionAuth}> Adorine</span>

                    </div>
                    {/** 活动的描述信息 */}
                    <span className={styles.actionName}>Discription</span>
                    <div clclassName={styles.descContent}>
                        <span className={styles.descInfo}>
                            33242342423423432423354345345345345334
                            534543
                        </span>
                    </div>
                    {/** 购买按钮 */}
                    <Button type="primary" className={styles.buyTicket}>Buy Ticket</Button>
                </div>

            </div>

        )
    }
}
