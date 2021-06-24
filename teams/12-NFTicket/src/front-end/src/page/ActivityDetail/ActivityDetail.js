import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './ActivityDetail.module.css'
import bg from '../../images/icon_detail.png'

export default class ActivityDetail extends Component {
    render() {
        return (
            <div className={styles.activityDetail}>
                <TopBar></TopBar>
                {/** 活动图片 */}
                <img src={bg} alt="" className={styles.activityBg}></img>
            </div>
        )
    }
}
