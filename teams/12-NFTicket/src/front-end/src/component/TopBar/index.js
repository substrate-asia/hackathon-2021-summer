import React, { Component } from 'react'
import { Flex,SearchBar,  WhiteSpace, Button } from 'antd-mobile'
import img1 from '../../images/icon.png'
import styles from './index.module.css'


import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

//action
import { setShowmodalAction } from '../../store/action/App';



class TopBar extends Component {
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
                            <span onClick={()=>{
                                // 账号信息弹出框--全局状态--打开
                                this.props.actions.setShowModal(true)
                            }}>0x4234...1e45</span>
                        </div>
                    </Flex.Item>
                </Flex>
                

            </div>
        )
    }
}

//获取最新的store里的状态，通过this.props获取
const mapStateToProps = (state)=>{
    console.log(state.app);
    return {
        app:state.app
    }
  }
  //更新状态提交到store
  const mapDispatchToProps = (dispatch)=>{
    return {
        actions:bindActionCreators({
          setShowModal:setShowmodalAction
        },dispatch)
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopBar);