import React, { Component } from 'react'
import { Flex,SearchBar,  WhiteSpace } from 'antd-mobile'
import img1 from '../../images/icon.png'
import styles from './index.module.css'


export default class TopBar extends Component {
    render() {
        return (
            <div className={styles.content}>
                <SearchBar className={styles.searchBar} placeholder="Search" maxLength={8} />
                <WhiteSpace />
                <Flex align='center' >
                    <Flex.Item className={styles.accountInfoLeft}  >
                        <img className={styles.iconImg} src={img1} alt=""/>
                        <div className={styles.iconText}>
                            <span>NFTicket</span>
                        </div>
                        
                    </Flex.Item>
                    <Flex.Item className={styles.accountInfoRight} > 
                        <div className={styles.rightText}>
                            <span>0x4234...1e45</span>
                        </div>
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
}
