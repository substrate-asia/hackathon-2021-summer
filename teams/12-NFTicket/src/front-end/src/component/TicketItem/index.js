import React, { Component } from 'react'
import styles from './index.module.css'
import {Flex} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

function TicketItem({history}){
    return (
        <Flex className={styles.ticketView} onClick={ () =>{
            //跳转到详情页面
            history.push('/Sort/ticketDetail')
          }}>
            <img src='./images/sample_demo.png' alt="" className={styles.actionImg}></img>
            <div>
                <h2>Event name</h2>
                <div className={styles.address}>
                    <img src='./images/icon_address.png' alt="" className={styles.addressImg}></img>
                    <span className={styles.addressText}> Location details</span>
                </div>
                <div className={styles.ticketItem}>
                    <img src='./images/icon_time.png' alt="" className={styles.timeImg}></img>
                    <span className={styles.addressText}> Location details</span>
                </div>
                <div className={styles.ticketItem}>
                    <img src='./images/icon_price.png' alt="" className={styles.timeImg}></img>
                    <span className={styles.addressText}> Location details</span>
                </div>
            </div>
        </Flex>

    )
}

export default withRouter(TicketItem)

