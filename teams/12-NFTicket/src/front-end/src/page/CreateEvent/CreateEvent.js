import { InputItem,Button,Flex } from 'antd-mobile'
import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './CreateEvent.module.css';

export default class TicketDetail extends Component {
    render() {
        return(
            <div >
                <Flex>
                    <div>
                        <span>Create a event</span>
                    </div>
                </Flex>
            </div>
        )
    }
}