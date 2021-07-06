import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './Transaction.module.css'
import nmtIcon from '../../images/icon_nmt.png'


import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
//action
import { setTokenAction, setUsernameAction, setBottomstatusAction } from '../../store/action/App';
import RecordView from '../../component/RecordView/RecordView';

class Transaction extends Component {

  componentDidMount() {
    this.props.actions.setBottomstatus(true);
  }
  render() {
    return (
      <div className={styles.body}>
        <TopBar></TopBar>
        <div className={styles.topLable}>
          <div className={styles.labelView}>
            <span className={styles.transLable}>Transaction</span>
          </div>
          <div className={styles.unitView}>
            <img src={nmtIcon} alt="" className={styles.nmtIcon}></img>
            <span className={styles.unitLable}>NMT(NFTMart)</span>
          </div>
        </div>
        <div className={styles.recordListView}>
          <RecordView></RecordView>
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
)(Transaction);
