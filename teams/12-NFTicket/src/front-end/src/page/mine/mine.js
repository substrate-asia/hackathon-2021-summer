import React, { Component } from 'react';
import { SearchBar, } from 'antd-mobile'
import styles from './mine.module.css'
import edit from '../../images/icon_edit.png'
import event from '../../images/my_event.png'
import price from '../../images/my_wallets.png'
import right from '../../images/icon_right.png'

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
//action
import { setTokenAction, setUsernameAction, setBottomstatusAction } from '../../store/action/App';

class mine extends Component {


  componentDidMount() {
    this.props.actions.setBottomstatus(false);
}
  render() {
    const address = localStorage.getItem("nft-address")
    var accountId="";
    if(address!=null){
      var pre=address.substr(0,4);
      var end = address.substr(address.length-4,4)
      accountId = pre+"...."+end
    }else{
      accountId="nft-ticket"
    }
   
    return (
      <div className={styles.body}>
        <SearchBar className={styles.searchBar} placeholder="Search" maxLength={8} />
        {/** 显示头像 */}
        <div className={styles.topHeader}>
          <div className={styles.fillet}>
            <span className={styles.topText}>A</span>
          </div>
          <div className={styles.address}>
            <span>{accountId}</span>
            <img src={edit} className={styles.iconEdit}></img>
          </div>
        </div>
        {/** 显示其他项目 */}
        <div className={styles.otherView}>
          <div className={styles.myItem} onClick={() => this.props.history.push('/Mine/wallet')}>
            <img src={price} className={styles.iconWallets} ></img>
            <span className={styles.textLable}>My wallets</span>
            <img src={right} className={styles.rightArrow}></img>
          </div>
          {/** 分割线 */}
          <div className={styles.dotLine}></div>
          <div className={styles.myItem} onClick={()=>this.props.history.push('/Sort')}>
            <img src={event} className={styles.iconWallets}></img>
            <span className={styles.textLable}>My event</span>
            <img src={right} className={styles.rightArrow}></img>
          </div>
          <div className={styles.dotLine}></div>
          <div className={styles.myItem} onClick={() => {
            console.log("点击了交易按钮")
            this.props.history.push('/Mine/Transaction')
          }
          }>
            <img src={event} className={styles.iconWallets}></img>
            <span className={styles.textLable}>Transaction</span>
            <img src={right} className={styles.rightArrow}></img>
          </div>
          <div className={styles.dotLine}></div>
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
)(mine);

