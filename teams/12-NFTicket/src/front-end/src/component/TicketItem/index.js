import React, { Component } from 'react'
import styles from './index.module.css'
import {Flex} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import img1 from '../../images/sample_1.png'
import img2 from '../../images/sample_2.png'
import img3 from '../../images/sample_3.png'

function TicketItem({history,data}){
    
    var path;
    if(data.id==1){
        path= img1
    }else if(data.id==2){
        path= img2
    }else{
        path= img3
    }
    return (
        <Flex className={styles.ticketView} onClick={ () =>{
            //跳转到详情页面
            history.push('/Sort/ticketDetail')
          }}>
            <img src={path} alt="" className={styles.actionImg}></img>
            <div>
                <h2>{data.name}</h2>
                <div className={styles.address}>
                    <img src='./images/icon_address.png' alt="" className={styles.addressImg}></img>
                    <span className={styles.addressText}> {data.type}</span>
                </div>
                <div className={styles.ticketItem}>
                    <img src='./images/icon_time.png' alt="" className={styles.timeImg}></img>
                    <span className={styles.addressText}> {data.time}</span>
                </div>
                <div className={styles.ticketItem}>
                    <img src='./images/icon_price.png' alt="" className={styles.timeImg}></img>
                    <span className={styles.addressText}> Total:{data.totalMoney}NMT/{data.ticketNum}tickets</span>
                </div>
            </div>
        </Flex>

    )
}

export default withRouter(TicketItem)

