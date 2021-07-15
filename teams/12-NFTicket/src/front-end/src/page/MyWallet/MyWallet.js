import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './MyWallet.module.css'
import { Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
//action
import { setTokenAction, setUsernameAction, setBottomstatusAction } from '../../store/action/App';

import RecordView from '../../component/RecordView/RecordView';

import {initPolkadotApi,getBalance,regBalanceEvent} from '../../api/polka'


class MyWallet extends Component {

    state={
        account:"0MNMT"
    }
     componentDidMount() {
        initPolkadotApi( async () =>{
            const res =await getBalance(localStorage.getItem("nft-address"))
            console.log("xujie:::::::>>>>>",res)
            if(res!=null){
                regBalanceEvent(localStorage.getItem("nft-address"),(mAccount) =>{
                   this.setState({
                    account:mAccount.free
                   })
                })
                this.setState({
                    account:res.free
                })
            }
        })
    }
    render() {
        return (
            <div className={styles.body}>
                <TopBar></TopBar>
                <div className={styles.topLable}>
                    <div className={styles.labelView}>
                        <span className={styles.transLable}>My wallet</span>
                    </div>
                    <span className={styles.totalLable}>Total asset</span>
                    <div className={styles.moneyLable}>
                        <span >{this.state.account}</span>
                    </div>
                    <div className={styles.totalLable}>
                        <span >≈</span>
                        <span >1000USDT</span>
                    </div>

                </div>
               
                <div className={styles.recordListView}>
                    <RecordView></RecordView>
                </div>
                <div className={styles.bottomBtn}>
                    <Button type="primary" className={styles.depositTicket} >Deposit</Button>
                    <div className={styles.withDraw}>
                        <span >Withdraw</span>
                    </div>
                </div>

            </div>
        )
    }
}

//获取最新的store里的状态，通过this.props获取
const mapStateToProps = (state) => {
    return {
        app: state.app
    }
}
//更新状态提交到store
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            setToken: setTokenAction,
            setUsername: setUsernameAction,
            setBottomstatus: setBottomstatusAction
        }, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyWallet);
