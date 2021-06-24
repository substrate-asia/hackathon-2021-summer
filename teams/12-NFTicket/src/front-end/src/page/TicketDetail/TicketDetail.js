import { Flex, Pagination, Icon } from 'antd-mobile'
import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import icon from '../../images/icon_detail.png'
import iconEwm from '../../images/icon_ewm.png'
import left from '../../images/icon_left.png'
import right from '../../images/icon_right.png'
import styles from './TicketDetail.module.css'

const locale = {
    prevText: 'Prev',
    nextText: 'Next',
};

export default class TicketDetail extends Component {
    render() {
        return (
            <div className={styles.detail}>
                <TopBar></TopBar>
                <div className={styles.detailView}>
                    <div >
                        <img src={icon} alt="" className={styles.detailImg}></img>
                    </div>

                    {/** 票据信息 */}
                    <div className={styles.eventName}>
                        <label> Event name</label>
                        <h1 className={styles.removeMargin}>Event name</h1>
                    </div>
                    <Flex className={styles.ticketDesc}>
                        <Flex.Item>
                            <label className={styles.labelText}> Date</label>
                            <div className={styles.descText}>
                                <span>Event name</span>
                            </div>
                        </Flex.Item>
                        <Flex.Item >
                            <label className={styles.labelText}> Time</label>
                            <div className={styles.descText}>
                                <span>14:00-18:00</span>
                            </div>
                        </Flex.Item>
                    </Flex>
                    <Flex className={styles.ticketDesc}>
                        <Flex.Item>
                            <label className={styles.labelText}> Row</label>
                            <div className={styles.descText}>
                                <span>12</span>
                            </div>
                        </Flex.Item>
                        <Flex.Item >
                            <label className={styles.labelText}> Seat</label>
                            <div className={styles.descText}>
                                <span>36</span>
                            </div>
                        </Flex.Item>
                    </Flex>
                    {/** 绘制虚线 */}
                    
                    <div className={styles.dottedLine}></div>

                    {/** 分页器 */}
                    <div>
                        <div className={styles.showEwm}>
                            <img src={left} alt="" className={styles.leftArrow}></img>
                            <img src={iconEwm} alt="" className={styles.ewmImg}></img>
                            <img src={right} alt="" className={styles.rightArrow}></img>
                        </div>
                        <Pagination mode="number" total={5} current={3} />
                    </div>


                </div  >



            </div>
        )
    }
}
