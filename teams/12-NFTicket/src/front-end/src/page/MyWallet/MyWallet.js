import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './MyWallet.module.css'
import { Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
//action
import { setTokenAction, setUsernameAction, setBottomstatusAction } from '../../store/action/App';

import RecordView from '../../component/RecordView/RecordView';

class MyWallet extends Component {

    componentDidMount() {
        this.props.actions.setBottomstatus(true);
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
                        <span >1000NMT</span>
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
    console.log(state.app);
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
